import { useReducer, useEffect } from "react";

export default function useLocalStorageReducer<T, U>(
  key: string,
  defaultValue: T,
  reducer: (state: T, action: U) => T
) {
  const [state, dispatch] = useReducer(reducer, defaultValue, () => {
    try {
      const initialValue = localStorage.getItem(key);
      return initialValue ? (JSON.parse(initialValue) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch] as const;
}
