import { useState } from "react";

function useToggleState(initialValue = false) {
  const [state, setState] = useState(initialValue);

  const toggle = () => {
    setState(!state);
  };

  // return [state, toggle];
  return [state, toggle] as const;
}

export default useToggleState;
