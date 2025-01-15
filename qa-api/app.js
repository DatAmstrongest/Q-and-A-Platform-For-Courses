import { serve } from "./deps.js";
import * as coursesService from "./services/coursesService.js"

const handleGetCourses = async (request) => {
  const courses = await coursesService.getAllCourses();
  return Response.json(courses);

}


const handleRequest = async (request) => {
  console.log("ameno")
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

];

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
