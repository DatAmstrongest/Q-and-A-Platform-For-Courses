import { serve } from "./deps.js";

import * as coursesService from "./services/coursesService.js";
import * as questionsService from "./services/questionsService.js";
import * as upvotesService from "./services/upvotesService.js";


const handleGetCourses = async (request) => {
  const courses = await coursesService.getAllCourses();
  return Response.json(courses);
}

const handleGetQuestionsOfCourse = async (request, urlPatternResult) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const user_uuid = params.get('user_uuid');
  let page = params.get('page');
  const course_id = urlPatternResult.pathname.groups.course_id;

  const questions = await questionsService.getQuestionsOfGivenCourse(course_id, user_uuid, page);
  return Response.json(questions);

}

// TODO: Last upvote'u düzelt
const handleLikeQuestion = async (request, urlPatternResult) =>{
  const requestData = await request.json();
  const user_id = requestData.user_id;
  const question_id = urlPatternResult.pathname.groups.question_id;

  await upvotesService.createQuestionUpvote(question_id, user_id)
  return new Response("OK", { status: 200 });
}

const handlePostQuestion = async (request) =>{
  const requestData = await request.json();
  const user_uuid = requestData.user_uuid;
  const content = requestData.content;
  const course_id = requestData.course_id;

  await questionsService.createQuestion(user_uuid, content, course_id);
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
    method: "POST",
    pattern: new URLPattern({pathname:"/questions/:question_id/like"}),
    fn: handleLikeQuestion
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname:"/questions"}),
    fn: handlePostQuestion
  }

];

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
