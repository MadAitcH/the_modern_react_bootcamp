import { useState, ChangeEvent } from "react";

function useInputState(
  initialValue: string
): [
  string,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  () => void
] {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [value, handleChange, reset];
}

export default useInputState;
