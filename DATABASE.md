TODO: The DATABASE.md outlines the database schema and justifies the used indexes and database denormalization decisions.
## Schema
### Tables
1. **courses:** It includes courses offered by the university. Each course has unique id and a name
2. **questions:** It includes questions for given course. It has `course_id` as foreign key and `user_uuid` to identify the user who submitted the question. `created_at` shows the creation time of the question and updated_at shows the last update made to the question. `content` contains the question text.
3. **answers:** It includes answers for given question_id as foreign key. `content` contains the answer text for the question. `user_uuid` shows who submitted the answer. `created_at` show creation time of the answer and `updated_at` shows last update on answer.
4. **question_upvotes:** It includes `question_id` of the upvoted question and `user_uuid` of person who upvoted the question. 
5. **answer_upvotes:** It includes `answer_id` of the upvoted answer and `user_uuid` of person who upvoted the answer. 

## Indexes
1. **idx_questions_course_id:** Speeds up queries that filter questions by course_id, which is useful for retrieving all questions related to a specific course.
2. **idx_answers_question_id:** Optimizes queries that filter answers by question_id, which is essential for fetching all answers related to a specific question.
3. **idx_question_upvotes_question_id_user_uuid:** Enhances performance for queries that check if a user has upvoted a specific question, which is useful for displaying whether a user has already liked a question.
4. **idx_answer_upvotes_answer_id_user_uuid:** Improves the speed of queries that check if a user has upvoted a specific answer, which is important for displaying whether a user has already liked an answer.

## Caching
Redis is used for server-side caching. All the queries of `coursesService` are cached because they are always used in the beginning of the website and they are supposed to be updated rarely. Also, all of the get queries of `answersService` and `questionsService` are cached. Especially `getAnswersOfGivenQuestion` and `getQuestionsOfGivenCourse` are expensive operations and they need to be cached. Cache is invalidated after any update.