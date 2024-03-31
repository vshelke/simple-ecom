import React, { useEffect, useState } from "react";
import { Input, InputProps } from "./ui/input";
import { useRouter } from "next/router";

export interface IDebouncedInput extends InputProps {}

const DebouncedInput: React.FC<IDebouncedInput> = ({ ...props }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!inputValue) return;
      router.push(`/search?q=${inputValue}`);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <Input
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

DebouncedInput.defaultProps = {};

export default DebouncedInput;
