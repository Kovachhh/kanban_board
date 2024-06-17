import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

import Input from "./ui/Input";
import Button from "./ui/Button";

const CreateBoardModal = ({
  title,
  onClose,
  action,
}: {
  title: string;
  onClose: () => void;
  action: (data: { name: string }) => void;
}) => {
  const [name, setName] = useState<string>("");

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const submitHandler = () => {
    toast.success("New board is created successfully");

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
          <form action={() => action({ name })} onSubmit={submitHandler}>
            <Input
              type="text"
              name="name"
              placeholder="Enter a name"
              fullWidth
              required
              onChange={(e) => handleName(e)}
              value={name}
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

export default CreateBoardModal;
