CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL CHECK (length(trim(title)) > 0),
  done BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO tasks (title, done)
SELECT 'Learn JavaScript', FALSE WHERE NOT EXISTS (SELECT 1 FROM tasks);
INSERT INTO tasks (title, done)
SELECT 'Learn Express', FALSE WHERE (SELECT COUNT(*) FROM tasks) = 1;
INSERT INTO tasks (title, done)
SELECT 'Build a REST API', FALSE WHERE (SELECT COUNT(*) FROM tasks) = 2;
