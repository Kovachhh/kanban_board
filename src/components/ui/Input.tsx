import { ChangeEvent } from "react";

const Input = ({
  name,
  type,
  placeholder,
  value,
  required,
  disabled,
  fullWidth,
  onChange,
}: {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <input
      name={name}
      type={type}
      disabled={disabled}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      className={`h-20 bg-transparent border-b text-2xl w-4/5 self-center focus:outline-none focus:bg-transparent placeholder-gray-400
      ${disabled && "opacity-50 cursor-default"}
      ${fullWidth && "w-full"}
      `}
    />
  );
};

export default Input;
