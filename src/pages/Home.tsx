"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Board from "@/components/Board";
import Navbar from "@/components/Navbar";
import { BoardType } from "@/types/types";

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardIdParam = searchParams.get("board") || "";

  const [boards, setBoards] = useState<BoardType[] | []>([]);

  const currentBoardName =
    boards.find((board) => board.id === boardIdParam)?.name || "";

  const updateSearchParams = (boardId: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("board", boardId);

    router.push(
      `${window.location.pathname}?${currentParams.toString()}`,
      undefined
    );
  };

  const getBoards = async () => {
    try {
      const response = await axios.get(`/api/boards`);

      setBoards(response.data.data);
    } catch (error) {
      toast.error(String(error));
    }
  };

  const createBoard = async (data: { name: string }) => {
    try {
      await axios.post(`/api/boards`, {
        name: data.name,
      });

      getBoards();
    } catch (error) {
      toast.error(String(error));
    }
  };

  const editBoard = async (boardId: string, data: { name: string }) => {
    try {
      await axios.put(`/api/boards/${boardId}`, {
        name: data.name,
      });
    } catch (error) {
      toast.error(String(error));
    }

    const updatedBoards = boards!.map((board) => {
      if (board.id === boardId) {
        return {
          ...board,
          name: data.name,
        };
      }

      return board;
    });

    setBoards(updatedBoards);
  };

  const deleteBoard = async (boardId: string) => {
    try {
      await axios.delete(`/api/boards/${boardId}`);
    } catch (error) {
      toast.error(String(error));
    }

    const updatedBoards = boards!.filter((board) => board.id !== boardId);

    setBoards(updatedBoards);

    updateSearchParams("null");
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      <Toaster />
      <Navbar
        value={boardIdParam}
        updateParams={updateSearchParams}
        boards={boards}
      />
      <Board
        boardId={boardIdParam}
        boardName={currentBoardName}
        createBoard={createBoard}
        editBoard={editBoard}
        deleteBoard={deleteBoard}
      />
    </>
  );
};

export default Home;
