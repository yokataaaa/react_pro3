import { createContext, useContext, useState } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ defaultValue, children }) {
  const [locale, setLocale] = useState(defaultValue);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const { locale } = useContext(LocaleContext);
  if (!locale) return;

  return locale;
}

export function useSetLocale() {
  const { setLocale } = useContext(LocaleContext);
  if (!setLocale) return;

  return setLocale;
}
