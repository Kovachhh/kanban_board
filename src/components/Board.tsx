"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { DropResult, DragDropContext } from "@hello-pangea/dnd";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import toast from "react-hot-toast";

import { BoardType, TaskType } from "@/types/types";
import Column from "./Column";
import Loader from "./ui/Loader";
import EditBoardModal from "./EditBoardModal";
import DeleteBoardModal from "./DeleteBoardModal";
import CreateBoardModal from "./CreateBoardModal";

interface BoardProps {
  boardId: string | null;
  boardName: string;
  createBoard: (data: { name: string }) => void;
  editBoard: (boardId: string, data: { name: string }) => void;
  deleteBoard: (boardId: string) => void;
}

const Board: React.FC<BoardProps> = ({
  boardId,
  boardName,
  createBoard,
  editBoard,
  deleteBoard,
}) => {
  const [board, setBoard] = useState<BoardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const columns = board?.columns || [];

  const openCreatingModal = () => {
    setIsCreating(true);
  };

  const closeCreatingModal = () => {
    setIsCreating(false);
  };

  const openEditingModal = () => {
    setIsEditing(true);
  };

  const closeEditingModal = () => {
    setIsEditing(false);
  };

  const openDeletingModal = () => {
    setIsRemoving(true);
  };

  const closeDeletingModal = () => {
    setIsRemoving(false);
  };

  const getBoard = async () => {
    try {
      const response = await axios.get(`/api/boards/${boardId}`);

      setBoard(response.data.data);
    } catch (error) {
      toast.error(String(error));
      setBoard(null);
    }
  };

  const createTask = async (
    columnId: string,
    data: { name: string; description: string }
  ) => {
    try {
      await axios.post(`/api/columns/${columnId}/tasks`, {
        name: data.name,
        description: data.description,
      });

      await getBoard();
    } catch (error) {
      toast.error(String(error));
    }
  };

  const editTask = async (
    columnId: string,
    taskId: string,
    data: { name: string; description: string }
  ) => {
    try {
      const response = await axios.put(
        `/api/columns/${columnId}/tasks/${taskId}`,
        {
          name: data.name,
          description: data.description,
        }
      );

      if (response.status === 200) {
        setBoard((prevBoard) => {
          if (!prevBoard) return prevBoard;

          const updatedColumns = prevBoard.columns.map((column) => {
            if (column.id === columnId) {
              const updatedTasks = column.tasks.map((task) => {
                if (task.id === taskId) {
                  return {
                    ...task,
                    name: data.name,
                    description: data.description,
                  };
                }
                return task;
              });
              return { ...column, tasks: updatedTasks };
            }
            return column;
          });

          return { ...prevBoard, columns: updatedColumns };
        });
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  const deleteTask = async (columnId: string, taskId: string) => {
    try {
      const response = await axios.delete(
        `/api/columns/${columnId}/tasks/${taskId}`
      );

      if (response.status === 200) {
        setBoard((prevBoard) => {
          if (!prevBoard) return prevBoard;

          const updatedColumns = prevBoard.columns.map((column) => {
            if (column.id === columnId) {
              const updatedTasks = column.tasks.filter(
                (task) => task.id !== taskId
              );
              return {
                ...column,
                tasks: updatedTasks,
              };
            }
            return column;
          });

          return {
            ...prevBoard,
            columns: updatedColumns,
          };
        });
      }
    } catch (error) {
      toast.error(String(error))
    }
  };

  const reorder = (list: TaskType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
  
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination) {
      return;
    }

    const srcCol = source.droppableId;
    const desCol = destination.droppableId;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const targetColumn = columns.findIndex(column => column.id === desCol)

    if (srcCol === desCol) {
      const updatedTasks = reorder(
        [...columns[targetColumn].tasks],
        source.index,
        destination.index
      );
      columns[targetColumn].tasks = updatedTasks;

      const task_ids = updatedTasks.map(task => task.id);

      try {
        axios.put(`/api/columns/${desCol}/order`, {
          task_ids
        });
      } catch (error) {
        toast.error(String(error));
      }

  
      setBoard((prevBoard) => {
        if (!prevBoard) return prevBoard;

        const updatedColumns = prevBoard.columns.map((column) => {
          if (column.id === desCol) {
            return {
              ...column,
              tasks: updatedTasks,
            };
          }
          return column;
        });

        return {
          ...prevBoard,
          columns: updatedColumns,
        };
      });

      return;
    }

    try {
      axios.put(`/api/tasks/${draggableId}`, {
        columnId: destination.droppableId,
      });
    } catch (error) {
      toast.error(String(error));
    }

    setBoard((prevBoard) => {
      if (!prevBoard) return prevBoard;

      const sourceColumnIndex = prevBoard.columns.findIndex(
        (column) => column.id === source.droppableId
      );
      const destinationColumnIndex = prevBoard.columns.findIndex(
        (column) => column.id === destination.droppableId
      );

      if (
        sourceColumnIndex === -1 ||
        destinationColumnIndex === -1 ||
        sourceColumnIndex === destinationColumnIndex
      ) {
        return prevBoard;
      }

      const taskToMove = prevBoard.columns[sourceColumnIndex].tasks.find(
        (task) => task.id === draggableId
      );
      if (!taskToMove) return prevBoard;

      const updatedSourceTasks = prevBoard.columns[
        sourceColumnIndex
      ].tasks.filter((task) => task.id !== draggableId);

      const updatedDestinationTasks = [
        ...prevBoard.columns[destinationColumnIndex].tasks,
        taskToMove,
      ];

      const updatedColumns = prevBoard.columns.map((column, index) => {
        if (index === sourceColumnIndex) {
          return { ...column, tasks: updatedSourceTasks };
        }
        if (index === destinationColumnIndex) {
          return { ...column, tasks: updatedDestinationTasks };
        }
        return column;
      });

      return { ...prevBoard, columns: updatedColumns };
    });
  };

  useEffect(() => {
    getBoard();

    setIsLoading(false);
  }, [boardId]);

  if (isLoading || !board) {
    return <Loader />;
  }

  if (!boardId) {
    return (
      <>
      <Loader text="Select and load a board"/>
      </>
    );
  }

  return (
    <div className="bg-gray-900 py-10 relative h-screen">
      <h1 className="font-bold text-center text-white mb-10 text-3xl flex gap-5 justify-center">
        {boardName}
        <span
          className="text-xs text-gray-400 mt-1 cursor-pointer"
          onClick={() => openCreatingModal()}
        >
          <AiOutlinePlusCircle size={28} />
        </span>
        <span
          className="text-xs text-gray-400 mt-1 cursor-pointer"
          onClick={() => openEditingModal()}
        >
          <AiOutlineEdit size={28} />
        </span>

        <span
          className="text-xs text-gray-400 mt-1 cursor-pointer"
          onClick={() => openDeletingModal()}
        >
          <AiOutlineDelete size={28} />
        </span>
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-3 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap10">
          {columns!.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.name}
              tasks={column.tasks}
              droppableId={column.id}
              createTask={createTask}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </DragDropContext>

      {isCreating && (
        <CreateBoardModal
          onClose={closeCreatingModal}
          title="Create a board"
          action={createBoard}
        />
      )}
      {isEditing && (
        <EditBoardModal
          onClose={closeEditingModal}
          title={`Edit the ${board.name} board`}
          action={editBoard}
          board={board!}
        />
      )}

      {isRemoving && (
        <DeleteBoardModal
          onClose={closeDeletingModal}
          title={`Are you sure you want to delete the ${board?.name} board?`}
          action={deleteBoard}
          board={board!}
        />
      )}
    </div>
  );
};

export default Board;
