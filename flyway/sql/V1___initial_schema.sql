-- Create tables
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    user_uuid UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_upvote_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    user_uuid UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_upvote_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE question_upvotes (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    user_id INT NOT NULL,
    UNIQUE(question_id, user_id)
);

CREATE TABLE answer_upvotes (
    id SERIAL PRIMARY KEY,
    answer_id INT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
    user_id INT NOT NULL,
    UNIQUE(answer_id, user_id)
);

-- Indexes for sorting by recency
CREATE INDEX idx_questions_recency ON questions((GREATEST(created_at, last_upvote_at)) DESC);
CREATE INDEX idx_answers_recency ON answers((GREATEST(created_at, last_upvote_at)) DESC);