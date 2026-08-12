// Admin.jsx — password-gated moderation for RSVPs & blessings (plain & functional).
import React, { useEffect, useState } from "react";
import { adminLogin, getRsvps, getBlessings, updateBlessing, deleteBlessing } from "../lib/api";

export default function Admin() {
  const [pwd, setPwd] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [rsvps, setRsvps] = useState([]);
  const [blessings, setBlessings] = useState([]);
  const [editing, setEditing] = useState({}); // id -> {name, message}

  const loadAll = async (password) => {
    const [r, b] = await Promise.all([getRsvps(password), getBlessings()]);
    setRsvps(r); setBlessings(b);
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await adminLogin(pwd);
      await loadAll(pwd);
      setAuthed(true);
    } catch (err) { setError(err.message || "Login failed"); }
  };

  const saveEdit = async (id) => {
    const payload = editing[id];
    const updated = await updateBlessing(id, payload, pwd);
    setBlessings((bs) => bs.map((b) => (b.id === id ? updated : b)));
    setEditing((e) => { const n = { ...e }; delete n[id]; return n; });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this blessing?")) return;
    await deleteBlessing(id, pwd);
    setBlessings((bs) => bs.filter((b) => b.id !== id));
  };

  const totalGuests = rsvps.reduce((s, r) => s + (r.guest_count || 0), 0);

  if (!authed) {
    return (
      <div style={styles.center}>
        <form onSubmit={login} style={styles.loginCard} data-testid="admin-login-form">
          <h1 style={styles.h1}>Wedding Admin</h1>
          <input data-testid="admin-password" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}
            placeholder="Admin password" style={styles.input} />
          <button data-testid="admin-login-btn" type="submit" style={styles.btn}>Enter</button>
          {error && <p style={{ color: "#b00", marginTop: 10 }} data-testid="admin-error">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <h1 style={styles.h1}>Abel &amp; Merlyn — Admin</h1>

      <section style={styles.section}>
        <h2 style={styles.h2}>RSVPs ({rsvps.length}) · Total guests: {totalGuests}</h2>
        <table style={styles.table} data-testid="admin-rsvp-table">
          <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>Guests</th><th style={styles.th}>When</th></tr></thead>
          <tbody>
            {rsvps.map((r) => (
              <tr key={r.id}><td style={styles.td}>{r.name}</td><td style={styles.td}>{r.guest_count}</td>
                <td style={styles.td}>{new Date(r.created_at).toLocaleString()}</td></tr>
            ))}
            {rsvps.length === 0 && <tr><td style={styles.td} colSpan={3}>No RSVPs yet.</td></tr>}
          </tbody>
        </table>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Blessings ({blessings.length})</h2>
        {blessings.map((b) => {
          const ed = editing[b.id];
          return (
            <div key={b.id} style={styles.card} data-testid={`admin-blessing-${b.id}`}>
              {ed ? (
                <>
                  <input value={ed.name} onChange={(e) => setEditing((s) => ({ ...s, [b.id]: { ...ed, name: e.target.value } }))} style={styles.input} />
                  <textarea value={ed.message} onChange={(e) => setEditing((s) => ({ ...s, [b.id]: { ...ed, message: e.target.value } }))} style={{ ...styles.input, minHeight: 70 }} />
                  <div>
                    <button style={styles.btn} onClick={() => saveEdit(b.id)} data-testid={`admin-save-${b.id}`}>Save</button>
                    <button style={styles.btnGhost} onClick={() => setEditing((s) => { const n = { ...s }; delete n[b.id]; return n; })}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <strong>{b.name}</strong>
                  <p style={{ margin: "6px 0", color: "#333" }}>{b.message}</p>
                  <small style={{ color: "#888" }}>{new Date(b.created_at).toLocaleString()}</small>
                  <div style={{ marginTop: 8 }}>
                    <button style={styles.btnGhost} onClick={() => setEditing((s) => ({ ...s, [b.id]: { name: b.name, message: b.message } }))} data-testid={`admin-edit-${b.id}`}>Edit</button>
                    <button style={styles.btnDanger} onClick={() => remove(b.id)} data-testid={`admin-delete-${b.id}`}>Delete</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
        {blessings.length === 0 && <p>No blessings yet.</p>}
      </section>
    </div>
  );
}

const styles = {
  center: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f1ea" },
  loginCard: { background: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 10px 40px rgba(0,0,0,0.1)", width: 320 },
  wrap: { maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "system-ui, sans-serif", color: "#222" },
  section: { marginTop: 32 },
  h1: { fontSize: 24, marginBottom: 16 },
  h2: { fontSize: 18, marginBottom: 12, borderBottom: "1px solid #ddd", paddingBottom: 6 },
  input: { width: "100%", padding: "10px 12px", margin: "6px 0", border: "1px solid #ccc", borderRadius: 6, boxSizing: "border-box" },
  btn: { background: "#B8860B", color: "#fff", border: "none", padding: "9px 16px", borderRadius: 6, cursor: "pointer", marginRight: 8 },
  btnGhost: { background: "#eee", color: "#333", border: "none", padding: "9px 16px", borderRadius: 6, cursor: "pointer", marginRight: 8 },
  btnDanger: { background: "#b23", color: "#fff", border: "none", padding: "9px 16px", borderRadius: 6, cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff" },
  th: { textAlign: "left", padding: 10, borderBottom: "2px solid #ddd", fontSize: 13 },
  td: { padding: 10, borderBottom: "1px solid #eee", fontSize: 14 },
  card: { background: "#fff", padding: 16, borderRadius: 8, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
};
