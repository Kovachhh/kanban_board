"use client";

import { ChangeEvent, useState } from "react";

import Button from "./ui/Button";
import Select from "./ui/Select";
import { BoardType } from "@/types/types";

type NavbarProps = {
  value: string;
  updateParams: (boardId: string) => void;
  boards: BoardType[];
};

const Navbar: React.FC<NavbarProps> = ({ value, updateParams, boards }) => {
  const [boardId, setBoardId] = useState(value);

  const handleBoardId = (event: ChangeEvent<HTMLSelectElement>) => {
    setBoardId(event.target.value);
  }

  return (
    <div className="bg-gray-900 py-10 relative flex items-center justify-center text-white gap-10 mx-auto w-[90%]">
      <Select
        name="Search"
        value={boardId}
        onChange={handleBoardId}
        options={boards}
      />
      <Button onClick={() => updateParams(boardId)} text="Load" />
    </div>
  );
};

export default Navbar;

<div className="grid md:grid-cols-3 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap10">

</div>
