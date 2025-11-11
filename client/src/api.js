const BASE_URL = 'http://localhost:4000/api';

export async function fetchMembers() {
  const res = await fetch(`${BASE_URL}/members`);
  return res.json();
}

// 🧠 Student practice area
export async function updateMember(id, updates) {
  throw new Error('updateMember() not implemented yet – students must write this.');
}