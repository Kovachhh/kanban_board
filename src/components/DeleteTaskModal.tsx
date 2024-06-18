import toast from "react-hot-toast";

import Button from "./ui/Button";
import { TaskType } from "@/types/types";
import { MESSAGES } from "@/const/messages";

const DeleteTaskModal = ({
  title,
  onClose,
  action,
  task,
  columnId,
}: {
  title: string;
  onClose: (status: boolean, task: TaskType | null) => void;
  action: (columnId: string, taskId: string) => void;
  task: TaskType,
  columnId: string,
}) => {

  const submitHandler = () => {
    toast.success(MESSAGES.TASK_REMOVED);

    onClose(false, null);
  };

  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
      onClick={() => onClose(false, null)}
    >
      <div
        className="bg-gray-700 rounded-lg p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex justify-center">
          <form action={() => action(columnId, task.id)} onSubmit={submitHandler}>

            <div className="mt-5 flex justify-end gap-5">
              <Button text="Cancel" onClick={() => onClose(false, null)} />
              <Button confirmButton text="Confirm" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
