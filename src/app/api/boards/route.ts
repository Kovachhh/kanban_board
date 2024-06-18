import { NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";
import { VALIDATION } from "@/const/validation";

export async function GET() {
  const boards = await prisma.board.findMany();

  return NextResponse.json({ data: boards });
}

export async function POST(req: Request, res: NextResponse) {
  const data = await req.json();
  const { name } = data;

  if (!name.trim()) {
    return NextResponse.json(
      { message: VALIDATION.NAME_REQUIRED },
      { status: 422 }
    );
  }

  const newBoard = await prisma.board.create({
    data: {
      name,
    },
  });

  const defaultColumns = ["To do", "In progress", "Done"];

  await prisma.column.createMany({
    data: [
      ...defaultColumns.map((column) => ({
        name: column,
        boardId: newBoard.id,
      })),
    ],
  });

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
