import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/members', async (req, res) => {
  const result = await pool.query('SELECT * FROM "Simple_Members".members ORDER BY last_name');
  res.json(result.rows);
});

app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const { year_of_study, role } = req.body;
  const result = await pool.query(
    `UPDATE "Simple_Members".members SET year_of_study = COALESCE($1, year_of_study), role = COALESCE($2, role) WHERE member_id = $3 RETURNING *`,
    [year_of_study ?? null, role ?? null, id]
  );
  res.json(result.rows[0]);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));