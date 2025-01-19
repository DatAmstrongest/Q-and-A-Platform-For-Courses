-- Sample data
INSERT INTO courses (name) VALUES
('Database Systems'),
('Operating Systems'),
('Machine Learning');

INSERT INTO questions (course_id, content, user_uuid) VALUES
(1, 'What is normalization?', '550e8400-e29b-41d4-a716-446655440000'),
(1, 'How do indexes work?', '550e8400-e29b-41d4-a716-446655440001'),
(2, 'What is a process in OS?', '550e8400-e29b-41d4-a716-446655440002');

INSERT INTO answers (question_id, content, user_uuid) VALUES
(1, 'Normalization reduces redundancy.', '550e8400-e29b-41d4-a716-446655440003'),
(1, 'It organizes data efficiently.', '550e8400-e29b-41d4-a716-446655440004'),
(2, 'Indexes speed up queries.', '550e8400-e29b-41d4-a716-446655440005');

INSERT INTO question_upvotes (question_id, user_uuid) VALUES
(1, '550e8400-e29b-41d4-a716-446655440000'),
(2, '550e8400-e29b-41d4-a716-446655440000'),
(3, '550e8400-e29b-41d4-a716-446655440000');

INSERT INTO answer_upvotes (answer_id, user_uuid) VALUES
(1, '550e8400-e29b-41d4-a716-446655440000'),
(2, '550e8400-e29b-41d4-a716-446655440000'),
(3, '550e8400-e29b-41d4-a716-446655440000');

-- Insert 30 questions for each course
DO $$
DECLARE
  course_id INT;
  question_content TEXT;
  user_uuid TEXT;
  i INT;
BEGIN
  FOR course_id IN (SELECT id FROM courses) LOOP
    FOR i IN 1..30 LOOP
      -- Generate question content dynamically
      question_content := 'Question ' || i || ' for course ' || course_id;
      -- Generate a pseudo-random user UUID for variety
      user_uuid := '550e8400-e29b-41d4-a716-446655440' || LPAD(course_id::TEXT, 3, '0') || LPAD(i::TEXT, 3, '0');
      -- Insert the question
      INSERT INTO questions (course_id, content, user_uuid)
      VALUES (course_id, question_content, user_uuid);
    END LOOP;
  END LOOP;
END $$;
