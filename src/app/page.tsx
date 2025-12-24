import Link from "next/link";
import type { CSSProperties } from "react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function Home() {
  const logs = await prisma.log.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Learning Log</p>
          <h1 className="page-title">Logbook</h1>
          <p className="page-subtitle">
            Track your Next.js journey with quick daily notes.
          </p>
        </div>
        <div className="toolbar">
          <Link className="btn ghost" href="/dashboard">
            Dashboard
          </Link>
          <Link className="btn primary" href="/logs/new">
            New Log
          </Link>
        </div>
      </header>

      <section className="panel">
        <h2 className="section-title">Recent logs</h2>
        {logs.length === 0 ? (
          <p className="empty-state">No logs yet. Create the first one.</p>
        ) : (
          <ul className="log-list">
            {logs.map((log, index) => {
              const preview =
                log.content.length > 140
                  ? `${log.content.slice(0, 140)}...`
                  : log.content;
              const delay = `${index * 80}ms`;

              return (
                <li
                  key={log.id}
                  className="log-item"
                  style={{ "--delay": delay } as CSSProperties}
                >
                  <Link className="log-card" href={`/logs/${log.id}`}>
                    <div className="log-card-header">
                      <h3 className="log-title">{log.title}</h3>
                      <span className="log-date">
                        {log.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="log-preview">{preview}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
