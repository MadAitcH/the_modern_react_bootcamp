import { useState, ChangeEvent } from "react";

function useInputState(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [value, handleChange, reset] as const;
}

export default useInputState;
