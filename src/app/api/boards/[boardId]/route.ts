import { NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(
  req: Request,
  { params }: { params: { boardId: string } },
) {
  const { boardId } = params;

  const board = await prisma.board.findFirst({
    where: {
      id: boardId
    },
    include: {
      columns: {
        include: {
          tasks: {
            orderBy: { position: 'asc' },
          }
        }
      }
    },
  });

  if (!board) {
    return NextResponse.json(
      { message: "Board is not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: board });
}

export async function PUT(
  req: Request,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;
  const data = await req.json();
  const { name } = data;

  if (!name.trim()) {
    return NextResponse.json({ message: "Name is required" }, { status: 422 });
  }

  const boardExist = await prisma.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!boardExist) {
    return NextResponse.json({ message: "Board not found" }, { status: 404 });
  }

  const updatedBoard = await prisma.board.update({
    where: {
      id: boardId,
    },
    data: {
      name,
    },
  });

  return NextResponse.json({ data: updatedBoard });
}

export async function DELETE(
  req: Request,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;

  const boardExist = await prisma.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!boardExist) {
    return NextResponse.json({ message: "Board not found" }, { status: 404 });
  }

  await prisma.board.delete({
    where: {
      id: boardId,
    },
  });

  return NextResponse.json({ status: 200 });
}
