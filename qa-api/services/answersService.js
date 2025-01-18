import { sql } from "../database/database.js";

const getAnswersOfGivenQuestion = async (question_id, user_id, page) => {
  return await sql`
  SELECT 
    a.id AS id,
    a.content AS content,
    COUNT(an.id) AS total_votes,
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM answer_upvotes an_inner 
            WHERE an_inner.answer_id = a.id AND an_inner.user_uuid = ${user_id}
        ) THEN true
        ELSE false
    END AS user_liked
  FROM 
    answers a
  LEFT JOIN 
    answer_upvotes an ON a.id = an.answer_id
  WHERE 
    a.question_id = ${question_id}
  GROUP BY 
    a.id, a.content
  ORDER BY updated_at DESC
  LIMIT (20*${page});`;
};

const getLastAnswerOfUser = async (user_uuid) =>{
  return await sql`
  SELECT * from answers 
    WHERE user_uuid=${user_uuid}
    ORDER BY id DESC
    LIMIT 1;
  `;
}

const createAnswer = async (user_uuid, content, question_id) => {
  return await sql`
  INSERT INTO answers(user_uuid, content, question_id) 
  VALUES(${user_uuid}, ${content}, ${question_id});`
}

const updateUpdatedAt = async(answer_id) =>{
  return await sql`
  UPDATE answers set updated_at = NOW() WHERE id=${answer_id};
  `;
}

export { getAnswersOfGivenQuestion, getLastAnswerOfUser, updateUpdatedAt, createAnswer};
 