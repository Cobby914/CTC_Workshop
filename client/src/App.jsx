import React, { useEffect, useState } from 'react';
import { fetchMembers, updateMember } from './api';

export default function App() {
  const [members, setMembers] = useState([]);
  useEffect(() => { fetchMembers().then(setMembers); }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h1>Members</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead><tr><th>Name</th><th>Role</th></tr></thead>
        <tbody>
          {members.map(m => (
            <tr key={m.member_id}>
              <td>{m.first_name} {m.last_name}</td>
              <td>{m.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}