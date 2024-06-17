import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const boards = await prisma.board.findMany();

  return NextResponse.json({ data: boards });
}

export async function POST(
  req: Request,
  res: NextResponse
) {
  const data = await req.json();
  const { name } = data;

  if (!name.trim()) {
    return NextResponse.json({ message: "Name is required" }, { status: 422 });
  }

  const newBoard = await prisma.board.create({
    data: {
      name,
    },
  });

  await prisma.column.createMany({
    data: [
      {
        name: "To do",
        boardId: newBoard.id
      },
      {
        name: "In progress",
        boardId: newBoard.id
      },
      {
        name: "Done",
        boardId: newBoard.id
      }
    ]
  })

  const board = await prisma.board.findFirst({
    where: {
      id: newBoard.id,
    },
    include: {
      columns: true,
    },
  });


  return NextResponse.json({ data: board });
}
