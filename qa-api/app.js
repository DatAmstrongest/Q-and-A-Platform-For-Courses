import { serve } from "./deps.js";

import * as coursesService from "./services/coursesService.js"
import * as questionsService from "./services/questionsService.js"


const handleGetCourses = async (request) => {
  const courses = await coursesService.getAllCourses();
  return Response.json(courses);
}

const handleGetQuestions = async (request, urlPatternResult) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const user_uuid = params.get('user');
  const course_id = urlPatternResult.pathname.groups.course_id;

  const questions = await questionsService.getQuestionsOfGivenCourse(course_id, user_uuid);
  return Response.json(questions);

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
    fn: handleGetQuestions,
  }

];

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
