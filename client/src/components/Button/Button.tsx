import React from "react";

interface IButtonProps {
  children: string;
  variant?: string;
  onClick?: () => void;
}

const Button = ({ variant = "text", onClick, children }: IButtonProps) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
