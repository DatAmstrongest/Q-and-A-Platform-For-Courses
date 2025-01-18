-- Create tables
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    user_uuid TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    user_uuid TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE question_upvotes (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    user_uuid TEXT NOT NULL,
    UNIQUE(question_id, user_uuid)
);

CREATE TABLE answer_upvotes (
    id SERIAL PRIMARY KEY,
    answer_id INT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
    user_uuid TEXT NOT NULL,
    UNIQUE(answer_id, user_uuid)
);

-- Indexes for sorting by recency
CREATE INDEX idx_questions_recency ON questions((updated_at) DESC);
CREATE INDEX idx_answers_recency ON answers((updated_at) DESC);