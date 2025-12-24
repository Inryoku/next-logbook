import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    notFound();
  }

  const log = await prisma.log.findUnique({ where: { id } });
  if (!log) {
    notFound();
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Log Detail</p>
          <h1 className="page-title">Entry</h1>
          <p className="page-subtitle">Full log content with live server render.</p>
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

      <article className="panel">
        <div className="detail-meta">
          <span className="tag">Log #{log.id}</span>
          <span>{log.createdAt.toLocaleString()}</span>
        </div>
        <h2 className="detail-title">{log.title}</h2>
        <p className="detail-content">{log.content}</p>
      </article>
    </main>
  );
}
