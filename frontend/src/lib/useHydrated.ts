import { useEffect, useState } from "react";

/**
 * Returns true only after the component has mounted on the client. Use to guard
 * rendering of persisted (localStorage-backed) state and avoid hydration
 * mismatches between server and client markup.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
