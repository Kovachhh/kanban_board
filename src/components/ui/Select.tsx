import { ChangeEvent } from "react";

import { BoardType } from "@/types/types";

const Select = ({
  name,
  value,
  required,
  disabled,
  fullWidth,
  onChange,
  options,
}: {
  name: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: BoardType[];
}) => {
  return (
    <select
      name={name}
      disabled={disabled}
      value={value}
      required={required}
      onChange={onChange}
      className={`h-20 bg-transparent border-b text-2xl w-4/5 self-center focus:outline-none
      ${disabled && "opacity-50 cursor-default"}
      ${fullWidth && "w-full"}
      `}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  );
};

export default Select;
