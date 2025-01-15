import { sql } from "../database/database.js";


const getAllCourses = async () => {
  return await sql`SELECT * from courses;`;
};



export { getAllCourses };
