import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { columnId: string } },
  res: NextResponse
) {
  const { columnId } = params;
  const data = await req.json();
  const { name, description } = data;

  if (!name.trim()) {
    return NextResponse.json({ message: "Name is required" }, { status: 422 });
  }

  const lastTask = await prisma.task.findFirst({
    where: { columnId },
    orderBy: { position: 'desc' },
  });

  const position = lastTask ? lastTask.position! + 1 : 1;

  const newTask = await prisma.task.create({
    data: {
      name,
      description,
      column: { connect: { id: columnId } },
      position
    },
  });

  return NextResponse.json({ data: newTask });
}
