import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { columnId: string } }
) {
  const { columnId } = params;
  const data = await req.json();
  const { task_ids } = data;

  if (!task_ids) {
    return NextResponse.json(
      { message: "Task_ids is required" },
      { status: 422 }
    );
  }

  const columnExist = await prisma.column.findFirst({
    where: {
      id: columnId,
    },
  });

  if (!columnExist) {
    return NextResponse.json({ message: "Column not found" }, { status: 404 });
  }

  const updatePromises = task_ids.map((taskId: string, index: number) => {
    return prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        position: index + 1,
      },
    });
  });

  await Promise.all(updatePromises);

  const updatedTasks = await prisma.task.findMany({
    where: {
      columnId,
    },
    orderBy: {
      position: "asc",
    },
  });

  return NextResponse.json({ data: updatedTasks });
}
