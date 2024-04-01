import React, { useEffect, useState } from "react";
import { Input, InputProps } from "./ui/input";

export interface IDebouncedInput extends InputProps {
  cb?: (value: string) => void;
}

const DebouncedInput: React.FC<IDebouncedInput> = ({ cb, ...props }) => {
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
      cb && cb(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
