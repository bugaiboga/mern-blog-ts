import React from "react";

interface IInputProps {
  type?: string;
  name: string;
  placeholder?: string;
  error?: string | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  value?: string;
}

const Input = ({
  type = "text",
  name,
  placeholder,
  error,
  variant = "default",
  handleChange,
  inputRef,
  value,
}: IInputProps) => {
  return (
    <input
      onChange={handleChange}
      className={`input ${error === name ? "error" : ""} ${variant}`}
      type={type}
      placeholder={placeholder}
      name={name}
      ref={inputRef}
      value={value}
    />
  );
};

export default Input;
