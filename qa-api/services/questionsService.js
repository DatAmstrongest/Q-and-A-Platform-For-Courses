import { sql } from "../database/database.js";


const getQuestionsOfGivenCourse = async (course_id) => {
  return await sql`SELECT * FROM questions WHERE course_id=${course_id};`;
};



export { getQuestionsOfGivenCourse };
 