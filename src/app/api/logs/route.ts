import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = String(body?.title ?? "").trim();
    const content = String(body?.content ?? "").trim();

    if (!title || !content) {
      return NextResponse.json(
        { error: "title and content required" },
        { status: 400 }
      );
    }

    const log = await prisma.log.create({
      data: { title, content },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");

    return NextResponse.json({ id: log.id });
  } catch {
    return NextResponse.json({ error: "failed to create log" }, { status: 500 });
  }
}
