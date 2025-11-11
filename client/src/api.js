const BASE_URL = 'http://localhost:4000/api';

export async function fetchMembers() {
  const res = await fetch(`${BASE_URL}/members`);
  if (!res.ok) throw new Error('Failed to fetch members');
  return res.json();
}

export async function createMember(member) {
  const res = await fetch(`${BASE_URL}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member)
  });
  if (!res.ok) throw new Error('Failed to create member');
  return res.json();
}

export async function updateMember(id, updates) {
  const res = await fetch(`${BASE_URL}/members/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update member');
  return res.json();
}

export async function deleteMember(id) {
  const res = await fetch(`${BASE_URL}/members/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete member');
  return res.json().catch(() => ({}));
}
