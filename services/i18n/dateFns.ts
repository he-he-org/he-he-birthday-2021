import { Locale } from "date-fns";
import { enUS, es, ru } from "date-fns/locale";
import { useRouter } from "next/router";

export function useDateFnsLocale(): Locale {
  const { locale } = useRouter();
  switch (locale) {
    case "ru":
      return ru;
    case "en":
      return enUS;
    case "es":
      return es;
  }
  throw new Error(`Unknown language: ${locale}`);
}
