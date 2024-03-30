import React, { useEffect, useState } from "react";
import { Input, InputProps } from "./ui/input";
import { useRouter } from "next/router";

export interface IDebouncedInput extends InputProps {}

const DebouncedInput: React.FC<IDebouncedInput> = ({ ...props }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push(`/search?q=${inputValue}`);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, router]);

  return <Input value={inputValue} onChange={handleInputChange} {...props} />;
};

DebouncedInput.defaultProps = {}

export default DebouncedInput