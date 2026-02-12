"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ContactsApp() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", details: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadContacts() {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/contacts`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load contacts");
      const data = await response.json();
      setContacts(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.phone) {
      setError("Name and phone are required");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || "Unable to save contact");
      }

      setForm({ name: "", phone: "", details: "" });
      setError("");
      await loadContacts();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container">
      <h1>Contacts Manager</h1>
      <p>Save name, phone number and details into MySQL.</p>

      <form onSubmit={handleSubmit} className="card form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
        />
        <textarea
          placeholder="Details"
          rows={4}
          value={form.details}
          onChange={(e) => setForm((current) => ({ ...current, details: e.target.value }))}
        />
        <button type="submit">Save Contact</button>
      </form>

      {error && <p className="error">{error}</p>}

      <section className="card">
        <h2>Saved Contacts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : contacts.length === 0 ? (
          <p>No contacts yet.</p>
        ) : (
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <strong>{contact.name}</strong> — {contact.phone}
                {contact.details ? <p>{contact.details}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
