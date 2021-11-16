import { useReducer, useEffect } from "react";

export default function usePersistedReducer(key, reducer, inititalState) {
  const [state, setState] = useReducer(reducer, inititalState, () => {
    const storageValue = localStorage.getItem(key);

    if (storageValue === null) {
      return inititalState;
    }

    return JSON.parse(storageValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}
