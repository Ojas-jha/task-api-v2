const pool = require("../db");

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function getAllTasks(req, res, next) {
  try {
    const result = await pool.query(
      "SELECT id, title, done, created_at, updated_at FROM tasks ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) { next(error); }
}

async function getTaskById(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid task id" });

    const result = await pool.query(
      "SELECT id, title, done, created_at, updated_at FROM tasks WHERE id = $1", [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: `Task ${id} not found` });

    res.json(result.rows[0]);
  } catch (error) { next(error); }
}

async function createTask(req, res, next) {
  try {
    const { title } = req.body;
    if (typeof title !== "string" || title.trim() === "")
      return res.status(400).json({ error: "title is required and cannot be empty" });

    const result = await pool.query(
      `INSERT INTO tasks (title, done) VALUES ($1, FALSE)
       RETURNING id, title, done, created_at, updated_at`, [title.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { next(error); }
}

async function updateTask(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid task id" });

    const { title, done } = req.body;
    if (title === undefined && done === undefined)
      return res.status(400).json({ error: "Provide title and/or done" });
    if (title !== undefined && (typeof title !== "string" || title.trim() === ""))
      return res.status(400).json({ error: "title must be a non-empty string" });
    if (done !== undefined && typeof done !== "boolean")
      return res.status(400).json({ error: "done must be a boolean" });

    let result;
    if (title !== undefined && done !== undefined) {
      result = await pool.query(
        `UPDATE tasks SET title=$1, done=$2, updated_at=NOW() WHERE id=$3
         RETURNING id,title,done,created_at,updated_at`, [title.trim(), done, id]);
    } else if (title !== undefined) {
      result = await pool.query(
        `UPDATE tasks SET title=$1, updated_at=NOW() WHERE id=$2
         RETURNING id,title,done,created_at,updated_at`, [title.trim(), id]);
    } else {
      result = await pool.query(
        `UPDATE tasks SET done=$1, updated_at=NOW() WHERE id=$2
         RETURNING id,title,done,created_at,updated_at`, [done, id]);
    }

    if (result.rowCount === 0)
      return res.status(404).json({ error: `Task ${id} not found` });

    res.json(result.rows[0]);
  } catch (error) { next(error); }
}

async function deleteTask(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid task id" });

    const result = await pool.query("DELETE FROM tasks WHERE id=$1 RETURNING id", [id]);
    if (result.rowCount === 0)
      return res.status(404).json({ error: `Task ${id} not found` });

    res.status(204).send();
  } catch (error) { next(error); }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
