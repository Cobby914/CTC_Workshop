import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// TODO 1: GET /api/members - select all members
app.get('/api/members', async (req, res) => {
  try {
    // 1. Run a SELECT query on "Simple_Members".members
    // 2. Return rows as JSON: res.json(result.rows)
    // Hint:
    // const result = await pool.query(`
    //   SELECT member_id, first_name, last_name, pronouns,
    //          email, phone_number, year_of_study, role
    //   FROM "Simple_Members".members
    //   ORDER BY last_name, first_name
    // `);
    res.status(501).json({ error: 'Not implemented yet' });
  } catch (err) {
    console.error('GET /api/members error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TODO 2: POST /api/members - add a new member
app.post('/api/members', async (req, res) => {
  try {
    // 1. Extract fields from req.body
    // 2. INSERT INTO "Simple_Members".members (...)
    // 3. RETURNING *;
    // 4. res.json(result.rows[0]);
    res.status(501).json({ error: 'Not implemented yet' });
  } catch (err) {
    console.error('POST /api/members error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TODO 3: PUT /api/members/:id - change a member
app.put('/api/members/:id', async (req, res) => {
  try {
    // 1. const { id } = req.params;
    // 2. const { year_of_study, role, first_name, last_name, pronouns, phone_number } = req.body;
    // 3. UPDATE the row
    //    e.g. using COALESCE($1, column_name)
    // 4. res.json(updatedRow);
    res.status(501).json({ error: 'Not implemented yet' });
  } catch (err) {
    console.error('PUT /api/members/:id error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TODO 4: DELETE /api/members/:id - remove a member
app.delete('/api/members/:id', async (req, res) => {
  try {
    // 1. const { id } = req.params;
    // 2. DELETE FROM "Simple_Members".members WHERE member_id = $1
    // 3. Optionally RETURNING * to send back the deleted row
    res.status(501).json({ error: 'Not implemented yet' });
  } catch (err) {
    console.error('DELETE /api/members/:id error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
