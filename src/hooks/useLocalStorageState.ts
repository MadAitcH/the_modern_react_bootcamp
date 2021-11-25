import { useState, useEffect } from "react";

export default function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const initialValue = localStorage.getItem(key);

      if (initialValue) {
        return JSON.parse(initialValue) as T;
      }

      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
}
