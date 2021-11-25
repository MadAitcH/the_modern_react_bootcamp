import { useState } from "react";

function useToggleState(initialValue = false): [boolean, () => void] {
  const [state, setState] = useState(initialValue);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
}

export default useToggleState;
