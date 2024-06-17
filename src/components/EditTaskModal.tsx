import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";

import Input from "./ui/Input";
import Button from "./ui/Button";
import { TaskType } from "@/types/types";

const EditTaskModal = ({
  title,
  onClose,
  action,
  task,
  columnId,
}: {
  title: string;
  onClose: () => void;
  action: (
    columnId: string,
    taskId: string,
    data: { name: string; description: string }
  ) => void;
  task: TaskType;
  columnId: string;
}) => {
  const [name, setName] = useState<string>(task.name);
  const [description, setDescription] = useState<string>(
    task.description || ""
  );

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const submitHandler = () => {
    toast.success("Task is updated successfully");

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
          <form
            action={() => action(columnId, task.id, { name, description })}
            onSubmit={submitHandler}
          >
            <Input
              type="text"
              name="name"
              placeholder="Enter a name"
              fullWidth
              value={name}
              required
              onChange={handleName}
            />

            <Input
              type="text"
              name="description"
              placeholder="Enter a description"
              fullWidth
              value={description}
              onChange={handleDescription}
            />

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

export default EditTaskModal;
