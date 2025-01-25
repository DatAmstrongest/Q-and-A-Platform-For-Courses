import { serve } from "./deps.js";
import EventEmitter from 'https://esm.sh/eventemitter3';
import { cacheMethodCalls } from "./util/cacheUtil.js";

import * as coursesService from "./services/coursesService.js";
import * as questionsService from "./services/questionsService.js";
import * as upvotesService from "./services/upvotesService.js";
import * as answersService from "./services/answersService.js";

const cachedCoursesService = cacheMethodCalls(coursesService, []);
const cachedQuestionsService = cacheMethodCalls(questionsService, ['createQuestion', 'updateUpdatedAt']);
const cachedAnswersService = cacheMethodCalls(answersService, ['createAnswer', 'updateUpdatedAt']);


const questionEvents = new EventEmitter();
const answerEvents = new EventEmitter();

const sendQuestionToLLM = async (question) => {
  for (let i=0; i<3; i++){
    const response = await fetch("http://llm-api:7000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"question":question["content"]}),
    });
    const responseJson = await response.json();
    const requestData = {
      "question_id": question["id"],
      "user_uuid": "LLM",
      "content": responseJson[0]["generated_text"]
    };
    await handlePostAnswer(null, requestData);

  }
}

const handleQuestionsSSE = async (request, urlPatternResult) => {
  // Extract the course_id from the URL
  const course_id = urlPatternResult.pathname.groups.course_id;
  // Create a ReadableStream to send events to the client
  const body = new ReadableStream({
    start(controller) {
      // Function to send new questions as events
      const sendEvent = (newQuestion) => {
        try{
          const message = `data: ${JSON.stringify(newQuestion)}\n\n`;
          controller.enqueue(new TextEncoder().encode(message));
        }
        catch(e){
          console.log(e);
        }
        
      };

      // Subscribe to "newQuestion" events for the specific course
      questionEvents.on(course_id, sendEvent);

      // Handle stream closure when the client disconnects
      request.signal?.addEventListener("abort", () => {
        questionEvents.off(course_id, sendEvent);
        controller.close();
      });
    },
  });

  // Return the response with appropriate headers for SSE
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    },
  });
};

const handleGetCourses = async (request) => {
  const courses = await cachedCoursesService.getAllCourses();
  return Response.json(courses);
}

const handleGetQuestionsOfCourse = async (request, urlPatternResult) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const user_uuid = params.get('user_uuid');
  let page = params.get('page');
  const course_id = urlPatternResult.pathname.groups.course_id;

  const questions = await cachedQuestionsService.getQuestionsOfGivenCourse(course_id, user_uuid, page);
  return Response.json(questions);

}

const handleLikeQuestion = async (request, urlPatternResult) =>{
  const requestData = await request.json();
  const user_id = requestData.user_id;
  const question_id = urlPatternResult.pathname.groups.question_id;

  await upvotesService.createQuestionUpvote(question_id, user_id)
  await cachedQuestionsService.updateUpdatedAt(question_id)
  return new Response("OK", { status: 200 });
}

const handlePostQuestion = async (request) =>{
  const requestData = await request.json();
  const user_uuid = requestData.user_uuid;
  const content = requestData.content;
  const course_id = requestData.course_id;
  
  const lastQuestion = await cachedQuestionsService.getLastQuestionOfUser(user_uuid)
  if (lastQuestion.length > 0){
    let last_question_time = new Date(lastQuestion[0].created_at);
    let currentTime = new Date()
    if ((currentTime.getTime()/60000 - last_question_time.getTime()/60000 < 1)){
      return new Response(JSON.stringify({ error: "You can only post one question every minute. Please try again later." }), { status: 403 });
    }
  }

  await cachedQuestionsService.createQuestion(user_uuid, content, course_id);
  const question = await cachedQuestionsService.getLastQuestionOfUser(user_uuid);
  const data = {
    "id": question[0].id,
    "total_votes": "0",
    "content": question[0].content,
    "user_liked": false
  }
  sendQuestionToLLM(question[0]);
  questionEvents.emit(course_id.toString(), data);

  return new Response("OK", { status: 200 });
}

const handleGetAnswersOfQuestion = async (request, urlPatternResult) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const user_uuid = params.get('user_uuid');
  let page = params.get('page');
  const question_id = urlPatternResult.pathname.groups.question_id;

  const answers = await cachedAnswersService.getAnswersOfGivenQuestion(question_id, user_uuid, page);
  return Response.json(answers);
}

const handleAnswersSSE = async (request, urlPatternResult) => {
  // Extract the question_id from the URL
  const question_id = urlPatternResult.pathname.groups.question_id;
  // Create a ReadableStream to send events to the client
  const body = new ReadableStream({
    start(controller) {
      // Function to send new questions as events
      const sendEvent = (newAnswer) => {
        try{
          const message = `data: ${JSON.stringify(newAnswer)}\n\n`;
          controller.enqueue(new TextEncoder().encode(message));
        }
        catch(e){ 
          console.log(e);
        }
        
      };

      // Subscribe to "newQuestion" events for the specific course
      answerEvents.on(question_id, sendEvent);

      // Handle stream closure when the client disconnects
      request.signal?.addEventListener("abort", () => {
        questionEvents.off(course_id, sendEvent);
        controller.close();
      });
    },
  });

  // Return the response with appropriate headers for SSE
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    },
  });
};

const handleLikeAnswer = async (request, urlPatternResult) =>{
  const requestData = await request.json();
  const user_id = requestData.user_id;
  const answer_id = urlPatternResult.pathname.groups.answer_id;

  await upvotesService.createAnswerUpvote(answer_id, user_id)
  await cachedAnswersService.updateUpdatedAt(answer_id)
  return new Response("OK", { status: 200 });
}

const handlePostAnswer = async (request, givenData=null) =>{
  let user_uuid;
  let content;
  let question_id
  if (givenData.content !== undefined){
    user_uuid = givenData.user_uuid;
    content = givenData.content;
    question_id = givenData.question_id;
  }
  else{
    const requestData = await request.json();
    user_uuid = requestData.user_uuid;
    content = requestData.content;
    question_id = requestData.question_id;

  }

  const lastAnswer = await cachedAnswersService.getLastAnswerOfUser(user_uuid);
  if (lastAnswer.length > 0){
    let last_answer_time = new Date(lastAnswer[0].created_at);
    let currentTime = new Date()
    if ((currentTime.getTime()/60000 - last_answer_time.getTime()/60000 < 1) && (givenData.content === undefined)){
      return new Response(JSON.stringify({error:"You can only post one answer every minute. Please try again later."}), { status: 403 });
    }
  }

  await cachedAnswersService.createAnswer(user_uuid, content, question_id)
  const answer = await cachedAnswersService.getLastAnswerOfUser(user_uuid);
  const data = {
    "id": answer[0].id,
    "total_votes": "0",
    "content": answer[0].content,
    "user_liked": false
  }
  answerEvents.emit(question_id.toString(), data);

  return new Response("OK", { status: 200 });
}



const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    return new Response(e.stack, { status: 500 });
  }
};

const urlMapping = [

  {
    method: "GET",
    pattern: new URLPattern({pathname: "/courses"}),
    fn: handleGetCourses,
  },
  {
    method: "GET",
    pattern: new URLPattern({pathname:"/courses/:course_id/questions"}),
    search: "*",
    fn: handleGetQuestionsOfCourse,
  },
  {
    method: "GET",
    pattern: new URLPattern({pathname: "/courses/:course_id/questions/sse"}),
    fn: handleQuestionsSSE
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname:"/questions/:question_id/like"}),
    fn: handleLikeQuestion
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname:"/questions"}),
    fn: handlePostQuestion
  },
  {
    method: "GET",
    pattern: new URLPattern({pathname:"/questions/:question_id/answers"}),
    fn: handleGetAnswersOfQuestion
  },
  {
    method: "GET",
    pattern: new URLPattern({pathname:"/questions/:question_id/answers/sse"}),
    fn: handleAnswersSSE
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname:"/answers/:answer_id/like"}),
    fn: handleLikeAnswer
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname:"/answers"}),
    fn: handlePostAnswer

  }

];

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
