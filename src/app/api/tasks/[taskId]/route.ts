import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  const body = await req.json();
  const { taskId } = params;
  const { columnId } = body;

  const lastTask = await prisma.task.findFirst({
    where: { columnId },
    orderBy: { position: 'desc' },
  });

  const position = lastTask ? lastTask.position! + 1 : 1;

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      columnId,
      position
    },
  });

  return NextResponse.json({ data: updatedTask });
}
