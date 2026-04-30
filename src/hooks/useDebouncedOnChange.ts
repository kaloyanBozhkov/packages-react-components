import { useCallback, useRef } from 'react';

export const useDebouncedOnChange = <T>(onChange: (value: T) => void, debounceDelay = 50) => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedOnChange = useCallback(
    (newValue: T) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceDelay);
    },
    [onChange, debounceDelay]
  );
  return debouncedOnChange;
};
