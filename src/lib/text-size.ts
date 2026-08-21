import { useCallback, useEffect, useState } from "react";

export const TEXT_SIZES = [
  { key: "normal", label: "A", title: "Normal", px: 16 },
  { key: "besar", label: "A+", title: "Besar", px: 18 },
  { key: "sangat-besar", label: "A++", title: "Sangat besar", px: 20 },
] as const;

export type TextSizeKey = (typeof TEXT_SIZES)[number]["key"];

const STORAGE_KEY = "lavin-text-size";

function apply(key: TextSizeKey) {
  const found = TEXT_SIZES.find((s) => s.key === key) ?? TEXT_SIZES[0];
  document.documentElement.style.setProperty("--app-font-size", `${found.px}px`);
}

export function useTextSize() {
  const [size, setSize] = useState<TextSizeKey>("normal");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as TextSizeKey | null;
    if (stored && TEXT_SIZES.some((s) => s.key === stored)) {
      setSize(stored);
      apply(stored);
    }
  }, []);

  const change = useCallback((key: TextSizeKey) => {
    setSize(key);
    apply(key);
    window.localStorage.setItem(STORAGE_KEY, key);
  }, []);

  return { size, setSize: change };
}
