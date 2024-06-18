"use client";

import { useState } from "react";

import Button from "./ui/Button";
import { BoardType } from "@/types/types";
import BoardSelect from "./BoardSelect";

type NavbarProps = {
  currentBoardId: string;
  updateParams: (boardId: string) => void;
  boards: BoardType[];
};

const Navbar: React.FC<NavbarProps> = ({ currentBoardId, updateParams, boards }) => {
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(currentBoardId);

  const handleBoardChange = (boardId: string | null) => {
    setSelectedBoardId(boardId);
  };

  return (
    <div className="bg-gray-900 py-10 relative flex items-center justify-center text-white gap-10 mx-auto w-[90%]">
      <BoardSelect
        boards={boards}
        selectedBoardId={selectedBoardId}
        onChange={handleBoardChange}
      />
      <Button onClick={() => updateParams(selectedBoardId!)} text="Load" />
    </div>
  );
};

export default Navbar;

<div className="grid md:grid-cols-3 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap10">

</div>
