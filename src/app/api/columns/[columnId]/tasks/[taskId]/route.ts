import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  const data = await req.json();
  const { name, description } = data;

  if (!name.trim()) {
    return NextResponse.json({ message: "Name is required" }, { status: 422 });
  }

  const taskExist = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });

  if (!taskExist) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      name,
      description,
    },
  });

  return NextResponse.json({ data: updatedTask });
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;

  const taskExist = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });

  if (!taskExist) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return NextResponse.json({ status: 200 });
}
