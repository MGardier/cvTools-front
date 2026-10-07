import { useState, useCallback } from "react";

/**
 * Incremental counter used to force a remount of a child component via its `key` prop.
 * Useful for uncontrolled components (autocomplete, date picker, rich editor) whose
 * internal state must be reset from the parent without exposing imperative refs.
 */
export const useResetKey = (): readonly [number, () => void] => {
  const [resetKey, setResetKey] = useState(0);
  const bumpResetKey = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);
  return [resetKey, bumpResetKey];
};
