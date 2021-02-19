import Prismic from "@prismicio/client";
import { Document } from "@prismicio/client/types/documents";
import { Languages } from "../services/i18n/constants.ts";
import { Language } from "@prismicio/client/types/ResolvedApi";
import { PRISMIC_URL } from "../services/env.ts";

const apiPromise = Prismic.getApi(PRISMIC_URL, {});

export interface PrismicDocument<T> extends Document {
  data: T;
}

export type PrismicDate = string;

export interface PrismicTextItem<Type> {
  type:
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "heading6"
    | "paragraph";
  text: string;
  spans: unknown[];
}

export type PrismicTitle = PrismicTextItem<
  "heading1" | "heading2" | "heading3" | "heading4" | "heading5" | "heading6"
>[];

const LANG_TO_LOCALE: { [key in Language]: string } = {
  en: "en-us",
  es: "es-es",
  ru: "ru",
};

export type PrismicRichText = PrismicTextItem<"paragraph">[];

export interface ApiTimelineBlock {
  title: PrismicTitle;
  body: PrismicRichText;
  when: PrismicDate;
}

export async function getTimelineBlocks(
  language: Languages
): Promise<PrismicDocument<ApiTimelineBlock>[]> {
  const api = await apiPromise;

  const response = await api.query(
    Prismic.Predicates.at("document.type", "timeline-block"),
    { lang: LANG_TO_LOCALE[language] }
  );
  return response.results;
}
