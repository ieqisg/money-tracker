// hooks/useTouched.ts

import { useState } from "react";

export function useTouched<T extends Record<string, boolean>>(
  initialState: T,
) {
  const [touched, setTouched] = useState(initialState);

  const touch = (field: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const resetTouched = () => {
    setTouched(initialState);
  };

  return {
    touched,
    touch,
    resetTouched,
  };
}
