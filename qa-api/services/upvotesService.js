import { sql } from "../database/database.js";

const createQuestionUpvote = async (question_id, user_id) => {
    return await sql`
    INSERT INTO question_upvotes(question_id, user_uuid) 
    VALUES(${question_id}, ${user_id})
     `;
}

const createAnswerUpvote = async (answer_id, user_id) =>{
    return await sql`
    INSERT INTO answer_upvotes(answer_id, user_uuid) 
    VALUES(${answer_id}, ${user_id})
     `;
}

export { createQuestionUpvote, createAnswerUpvote};