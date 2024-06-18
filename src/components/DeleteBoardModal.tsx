import toast from "react-hot-toast";

import Button from "./ui/Button";
import { BoardType } from "@/types/types";
import { MESSAGES } from "@/const/messages";

const DeleteBoardModal = ({
  title,
  onClose,
  action,
  board,
}: {
  title: string;
  onClose: (status: boolean) => void;
  action: (boardId: string) => void;
  board: BoardType,
}) => {

  const submitHandler = () => {
    toast.success(MESSAGES.BOARD_REMOVED);

    onClose(false);
  };

  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-gray-700 rounded-lg p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex justify-center">
          <form action={() => action(board.id)} onSubmit={submitHandler}>

            <div className="mt-5 flex justify-end gap-5">
              <Button text="Cancel" onClick={() => onClose(false)} />
              <Button confirmButton text="Confirm" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
