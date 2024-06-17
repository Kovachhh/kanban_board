import toast from "react-hot-toast";

import Button from "./ui/Button";
import { TaskType } from "@/types/types";

const DeleteTaskModal = ({
  title,
  onClose,
  action,
  task,
  columnId,
}: {
  title: string;
  onClose: () => void;
  action: (columnId: string, taskId: string) => void;
  task: TaskType,
  columnId: string,
}) => {

  const submitHandler = () => {
    toast.success("Task is removed successfully");

    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-700 rounded-lg p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex justify-center">
          <form action={() => action(columnId, task.id)} onSubmit={submitHandler}>

            <div className="mt-5 flex justify-end gap-5">
              <Button text="Cancel" onClick={onClose} />
              <Button confirmButton text="Confirm" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
