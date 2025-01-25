-- Sample data
INSERT INTO courses (name) VALUES
('Database Systems'),
('Operating Systems'),
('Machine Learning');

-- Insert Questions for "Database Systems"
INSERT INTO questions (course_id, content, user_uuid) VALUES
(1, 'What is normalization?', '550e8400-e29b-41d4-a716-446655440000'),
(1, 'How do indexes work?', '550e8400-e29b-41d4-a716-446655440001'),
(1, 'What is ACID in databases?', '550e8400-e29b-41d4-a716-446655440002'),
(1, 'What are database constraints?', '550e8400-e29b-41d4-a716-446655440003'),
(1, 'Explain the concept of a primary key.', '550e8400-e29b-41d4-a716-446655440004'),
(1, 'What is a foreign key?', '550e8400-e29b-41d4-a716-446655440005'),
(1, 'What is the difference between a unique key and a primary key?', '550e8400-e29b-41d4-a716-446655440006'),
(1, 'What is a transaction?', '550e8400-e29b-41d4-a716-446655440007'),
(1, 'What is the difference between DELETE and TRUNCATE?', '550e8400-e29b-41d4-a716-446655440008'),
(1, 'Explain the concept of a join in SQL.', '550e8400-e29b-41d4-a716-446655440009'),
(1, 'What is an inner join?', '550e8400-e29b-41d4-a716-446655440010'),
(1, 'What is an outer join?', '550e8400-e29b-41d4-a716-446655440011'),
(1, 'What is the difference between clustered and non-clustered indexes?', '550e8400-e29b-41d4-a716-446655440012'),
(1, 'What is a stored procedure?', '550e8400-e29b-41d4-a716-446655440013'),
(1, 'What are triggers in databases?', '550e8400-e29b-41d4-a716-446655440014'),
(1, 'What is a view in SQL?', '550e8400-e29b-41d4-a716-446655440015'),
(1, 'What is indexing in databases?', '550e8400-e29b-41d4-a716-446655440016'),
(1, 'What are the different types of database relationships?', '550e8400-e29b-41d4-a716-446655440017'),
(1, 'What is data redundancy?', '550e8400-e29b-41d4-a716-446655440018'),
(1, 'What is a NoSQL database?', '550e8400-e29b-41d4-a716-446655440019'),
(1, 'What is the difference between a database and a data warehouse?', '550e8400-e29b-41d4-a716-446655440005'),
(1, 'What is denormalization and why is it used?', '550e8400-e29b-41d4-a716-446655440006'),
(1, 'Explain the differences between SQL and NoSQL databases.', '550e8400-e29b-41d4-a716-446655440007'),
(1, 'What is a schema in a database?', '550e8400-e29b-41d4-a716-446655440008'),
(1, 'What is the purpose of database indexing?', '550e8400-e29b-41d4-a716-446655440009');

-- Insert Answers for "Database Systems"
INSERT INTO answers (question_id, content, user_uuid) VALUES
(1, 'Normalization reduces redundancy and improves data integrity.', '550e8400-e29b-41d4-a716-446655440020'),
(1, 'It organizes data into tables to minimize duplication.', '550e8400-e29b-41d4-a716-446655440021'),
(1, 'Normalization involves decomposing a table into smaller ones.', '550e8400-e29b-41d4-a716-446655440022'),
(1, 'It ensures data dependencies make sense.', '550e8400-e29b-41d4-a716-446655440023'),
(1, 'It is used to eliminate update, delete, and insert anomalies.', '550e8400-e29b-41d4-a716-446655440024'),
(1, 'Normalization is based on functional dependencies.', '550e8400-e29b-41d4-a716-446655440025'),
(1, 'It improves database scalability and maintainability.', '550e8400-e29b-41d4-a716-446655440026'),
(1, 'It minimizes the chances of inconsistent data.', '550e8400-e29b-41d4-a716-446655440027'),
(1, 'Normalization ensures each piece of data is stored only once.', '550e8400-e29b-41d4-a716-446655440028'),
(1, 'It involves applying normal forms like 1NF, 2NF, and 3NF.', '550e8400-e29b-41d4-a716-446655440029'),
(1, 'Normalization avoids redundancy by splitting tables.', '550e8400-e29b-41d4-a716-446655440030'),
(1, 'It enhances query performance by organizing data logically.', '550e8400-e29b-41d4-a716-446655440031'),
(1, 'It makes complex data structures easier to understand.', '550e8400-e29b-41d4-a716-446655440032'),
(1, 'Normalization simplifies database design.', '550e8400-e29b-41d4-a716-446655440033'),
(1, 'It eliminates duplicate rows and columns.', '550e8400-e29b-41d4-a716-446655440034'),
(1, 'The goal is to achieve data consistency.', '550e8400-e29b-41d4-a716-446655440035'),
(1, 'It reduces storage space by removing redundant data.', '550e8400-e29b-41d4-a716-446655440036'),
(1, 'Normalization improves data security by logical segmentation.', '550e8400-e29b-41d4-a716-446655440037'),
(1, 'It is essential for designing relational databases.', '550e8400-e29b-41d4-a716-446655440038'),
(1, 'Normalization is a systematic way to refine table design.', '550e8400-e29b-41d4-a716-446655440039'),
(1, 'Normalization ensures logical organization of data to avoid redundancy.', '550e8400-e29b-41d4-a716-446655440040'),
(1, 'It divides large tables into smaller ones linked by relationships.', '550e8400-e29b-41d4-a716-446655440041'),
(1, 'Normalization prevents anomalies in database operations.', '550e8400-e29b-41d4-a716-446655440042'),
(1, 'It helps maintain data integrity and consistency.', '550e8400-e29b-41d4-a716-446655440043'),
(1, 'By applying normal forms, it ensures efficient database design.', '550e8400-e29b-41d4-a716-446655440044'),

(2, 'Indexes improve the speed of data retrieval operations.', '550e8400-e29b-41d4-a716-446655440061'),
(2, 'They work by creating a data structure that allows for fast searching.', '550e8400-e29b-41d4-a716-446655440062'),
(2, 'Indexes can be created on one or more columns of a table.', '550e8400-e29b-41d4-a716-446655440063'),
(2, 'They reduce the amount of data that needs to be scanned.', '550e8400-e29b-41d4-a716-446655440064'),
(2, 'Indexes are similar to the index of a book.', '550e8400-e29b-41d4-a716-446655440065'),
(2, 'They help in quickly locating the data without scanning the entire table.', '550e8400-e29b-41d4-a716-446655440066'),
(2, 'Indexes can be unique or non-unique.', '550e8400-e29b-41d4-a716-446655440067'),
(2, 'Unique indexes ensure that no two rows have the same value.', '550e8400-e29b-41d4-a716-446655440068'),
(2, 'Non-unique indexes allow duplicate values.', '550e8400-e29b-41d4-a716-446655440069'),
(2, 'Indexes can be created using the CREATE INDEX statement.', '550e8400-e29b-41d4-a716-446655440070'),
(2, 'They can be dropped using the DROP INDEX statement.', '550e8400-e29b-41d4-a716-446655440071'),
(2, 'Indexes can be clustered or non-clustered.', '550e8400-e29b-41d4-a716-446655440072'),
(2, 'Clustered indexes determine the physical order of data in a table.', '550e8400-e29b-41d4-a716-446655440073'),
(2, 'Non-clustered indexes do not alter the physical order of data.', '550e8400-e29b-41d4-a716-446655440074'),
(2, 'Indexes can be created on primary keys and foreign keys.', '550e8400-e29b-41d4-a716-446655440075'),
(2, 'They can also be created on other columns to improve query performance.', '550e8400-e29b-41d4-a716-446655440076'),
(2, 'Indexes consume additional disk space.', '550e8400-e29b-41d4-a716-446655440077'),
(2, 'They can slow down write operations like INSERT, UPDATE, and DELETE.', '550e8400-e29b-41d4-a716-446655440078'),
(2, 'Proper indexing strategy is crucial for database performance.', '550e8400-e29b-41d4-a716-446655440079'),
(2, 'Indexes can be created automatically by the database system.', '550e8400-e29b-41d4-a716-446655440080'),
(2, 'They can also be created manually by the database administrator.', '550e8400-e29b-41d4-a716-446655440081'),
(2, 'Indexes can be single-column or multi-column.', '550e8400-e29b-41d4-a716-446655440082'),
(2, 'Multi-column indexes are also known as composite indexes.', '550e8400-e29b-41d4-a716-446655440083'),
(2, 'Indexes can be used to enforce uniqueness in a column.', '550e8400-e29b-41d4-a716-446655440084'),
(2, 'They can also be used to speed up sorting and filtering operations.', '550e8400-e29b-41d4-a716-446655440085');

-- Insert Upvotes for Questions
INSERT INTO question_upvotes (question_id, user_uuid) VALUES
(1, '550e8400-e29b-41d4-a716-446655440045'), -- Upvote for "What is normalization?"
(1, '550e8400-e29b-41d4-a716-446655440046'), 
(1, '550e8400-e29b-41d4-a716-446655440047'), 
(2, '550e8400-e29b-41d4-a716-446655440048'), -- Upvote for "How do indexes work?"
(2, '550e8400-e29b-41d4-a716-446655440049'), 
(3, '550e8400-e29b-41d4-a716-446655440050'), -- Upvote for "What is ACID in databases?"
(4, '550e8400-e29b-41d4-a716-446655440051'), -- Upvote for "What are database constraints?"
(5, '550e8400-e29b-41d4-a716-446655440052'); -- Upvote for "Explain the concept of a primary key."

-- Insert Upvotes for Answers
INSERT INTO answer_upvotes (answer_id, user_uuid) VALUES
(1, '550e8400-e29b-41d4-a716-446655440053'), -- Upvote for Answer 1
(1, '550e8400-e29b-41d4-a716-446655440054'), 
(2, '550e8400-e29b-41d4-a716-446655440055'), -- Upvote for Answer 2
(2, '550e8400-e29b-41d4-a716-446655440056'), 
(3, '550e8400-e29b-41d4-a716-446655440057'), -- Upvote for Answer 3
(4, '550e8400-e29b-41d4-a716-446655440058'), -- Upvote for Answer 4
(5, '550e8400-e29b-41d4-a716-446655440059'), -- Upvote for Answer 5
(6, '550e8400-e29b-41d4-a716-446655440060'); -- Upvote for Answer 6
