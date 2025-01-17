import { sql } from "../database/database.js";


const getQuestionsOfGivenCourse = async (course_id, user_id) => {
  return await sql`
  SELECT 
    q.id AS id,
    q.content AS content,
    COUNT(qu.id) AS total_votes,
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM question_upvotes qu_inner 
            WHERE qu_inner.question_id = q.id AND qu_inner.user_id = ${user_id}
        ) THEN true
        ELSE false
    END AS user_liked
  FROM 
    questions q
  LEFT JOIN 
    question_upvotes qu ON q.id = qu.question_id
  WHERE 
    q.course_id = ${course_id}
  GROUP BY 
    q.id, q.content`;
};



export { getQuestionsOfGivenCourse };
 