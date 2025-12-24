"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewLogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setSaving(false);

    if (!res.ok) {
      setError("Failed to save. Please try again.");
      return;
    }

    const data = (await res.json()) as { id: number };
    router.push(`/logs/${data.id}`);
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">New Entry</p>
          <h1 className="page-title">Create Log</h1>
          <p className="page-subtitle">
            Save a short update to see client and server flow.
          </p>
        </div>
        <div className="toolbar">
          <Link className="btn ghost" href="/">
            Back
          </Link>
        </div>
      </header>

      <section className="panel">
        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What did you learn today?"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Notes, problems, and next steps..."
              required
            />
          </div>
          <div className="toolbar">
            <button className="btn primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save log"}
            </button>
            <Link className="btn ghost" href="/dashboard">
              View dashboard
            </Link>
          </div>
        </form>
        {error ? <p className="note error">{error}</p> : null}
      </section>
    </main>
  );
}
