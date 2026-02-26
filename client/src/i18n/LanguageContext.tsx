import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import en from "./en";
import es from "./es";

type Language = "en" | "es";

// Recursively widen const literal types so both en and es
// satisfy the same structural type while preserving shape.
type DeepStringify<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepStringify<U>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: DeepStringify<T[K]> }
      : T;

type Translations = DeepStringify<typeof en>;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const STORAGE_KEY = "nexair-language";

const translations: Record<Language, Translations> = { en, es };

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

function detectLanguageFromURL(pathname: string): Language | null {
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return "es";
  }
  return null;
}

function getStoredLanguage(): Language | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") {
      return stored;
    }
  } catch {
    // localStorage may be unavailable (SSR, privacy mode, etc.)
  }
  return null;
}

function storeLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  const [language, setLanguageState] = useState<Language>(() => {
    // Priority: URL > localStorage > default (en)
    const urlLang = detectLanguageFromURL(window.location.pathname);
    if (urlLang) return urlLang;

    const storedLang = getStoredLanguage();
    if (storedLang) return storedLang;

    return "en";
  });

  // Re-detect language whenever the route changes
  useEffect(() => {
    const urlLang = detectLanguageFromURL(location.pathname);
    if (urlLang && urlLang !== language) {
      setLanguageState(urlLang);
      storeLanguage(urlLang);
    }
  }, [location.pathname, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    storeLanguage(lang);
  };

  const t = useMemo(() => translations[language], [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t }),
    [language, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useTranslation must be used within a LanguageProvider. " +
        "Wrap your app (or the relevant subtree) with <LanguageProvider>."
    );
  }
  return context;
}

export type { Language, Translations };
export default LanguageContext;
