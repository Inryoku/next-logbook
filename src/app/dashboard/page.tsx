import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const total = await prisma.log.count();

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const today = await prisma.log.count({
    where: { createdAt: { gte: start } },
  });

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Simple stats pulled directly from the server.
          </p>
        </div>
        <div className="toolbar">
          <Link className="btn ghost" href="/">
            Back
          </Link>
          <Link className="btn primary" href="/logs/new">
            New Log
          </Link>
        </div>
      </header>

      <section className="panel">
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total logs</p>
            <p className="stat-value">{total}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Logs today</p>
            <p className="stat-value">{today}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
