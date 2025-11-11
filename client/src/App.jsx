import React, { useEffect, useState } from 'react';
import { fetchMembers, createMember, updateMember, deleteMember } from './api';

export default function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    year_of_study: '',
    role: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ year_of_study: '', role: '' });

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchMembers();
      setMembers(data);
    } catch (err) {
      console.error(err);
      setError('Could not load members – is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const created = await createMember(form);
      setMembers([...members, created]);
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        year_of_study: '',
        role: ''
      });
    } catch (err) {
      console.error(err);
      alert('Create failed – check your POST /api/members endpoint.');
    }
  }

  function startEdit(m) {
    setEditingId(m.member_id);
    setEditForm({
      year_of_study: m.year_of_study || '',
      role: m.role || ''
    });
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    if (!editingId) return;
    try {
      const updated = await updateMember(editingId, editForm);
      setMembers(members.map(m => m.member_id === updated.member_id ? updated : m));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Update failed – check your PUT /api/members/:id endpoint.');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this member?')) return;
    try {
      await deleteMember(id);
      setMembers(members.filter(m => m.member_id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed – check your DELETE /api/members/:id endpoint.');
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16, maxWidth: 900, margin: '0 auto' }}>
      <h1>CTC Members Backend Practice</h1>
      <p>Frontend is done. Your job: make the backend endpoints work.</p>

      {loading && <p>Loading members…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: 24 }}>
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Year</th>
              <th style={th}>Role</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.member_id}>
                <td style={td}>{m.first_name} {m.last_name}</td>
                <td style={td}>{m.email}</td>
                <td style={td}>{m.year_of_study}</td>
                <td style={td}>{m.role}</td>
                <td style={td}>
                  <button onClick={() => startEdit(m)} style={{ marginRight: 8 }}>Edit</button>
                  <button onClick={() => handleDelete(m.member_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Add Member (POST)</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        <input
          placeholder="First name"
          value={form.first_name}
          onChange={e => setForm({ ...form, first_name: e.target.value })}
        />
        <input
          placeholder="Last name"
          value={form.last_name}
          onChange={e => setForm({ ...form, last_name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Year (e.g. 3rd)"
          value={form.year_of_study}
          onChange={e => setForm({ ...form, year_of_study: e.target.value })}
        />
        <input
          placeholder="Role (e.g. Developer)"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Change Member (PUT)</h2>
      {editingId ? (
        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <input
            placeholder="New year (e.g. 4th)"
            value={editForm.year_of_study}
            onChange={e => setEditForm({ ...editForm, year_of_study: e.target.value })}
          />
          <input
            placeholder="New role (e.g. Tech Lead)"
            value={editForm.role}
            onChange={e => setEditForm({ ...editForm, role: e.target.value })}
          />
          <button type="submit">Save changes</button>
          <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
        </form>
      ) : (
        <p><i>Click "Edit" on a member above to start editing.</i></p>
      )}
    </div>
  );
}

const th = {
  border: '1px solid #ccc',
  padding: '6px 8px',
  background: '#f5f5f5',
  textAlign: 'left'
};

const td = {
  border: '1px solid #ccc',
  padding: '6px 8px'
};
