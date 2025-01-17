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
