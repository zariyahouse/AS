const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const j = async (res) => {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Request failed");
  }
  return res.json();
};

export const submitRsvp = (name, guest_count) =>
  fetch(`${API}/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, guest_count }),
  }).then(j);

export const getRsvps = (password) =>
  fetch(`${API}/rsvp`, { headers: { "X-Admin-Password": password } }).then(j);

export const getBlessings = () => fetch(`${API}/guestbook`).then(j);

export const submitBlessing = (name, message) =>
  fetch(`${API}/guestbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  }).then(j);

export const adminLogin = (password) =>
  fetch(`${API}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  }).then(j);

export const updateBlessing = (id, payload, password) =>
  fetch(`${API}/guestbook/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Admin-Password": password },
    body: JSON.stringify(payload),
  }).then(j);

export const deleteBlessing = (id, password) =>
  fetch(`${API}/guestbook/${id}`, {
    method: "DELETE",
    headers: { "X-Admin-Password": password },
  }).then(j);
