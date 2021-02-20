import Prismic from "@prismicio/client";
import { Document } from "@prismicio/client/types/documents";
import { Language } from "../services/i18n/constants";
import { PRISMIC_URL } from "../services/env";

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

export type PrismicRichText = PrismicTextItem<"paragraph">[];

export interface PrismicImage {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string | null;
  copyright: string | null;
  url: string;
}

export interface ApiTimelineBlock {
  title: PrismicTitle;
  body: PrismicRichText;
  date: PrismicDate;
  image: PrismicImage;
  small_title_image: PrismicImage;
  author_name: PrismicTitle;
  author_details: PrismicTitle;
}

export interface ApiIntro {
  title: PrismicTitle;
  body_1: PrismicRichText;
  body_2: PrismicRichText;
  donate_button: PrismicRichText;
}

const LANG_TO_LOCALE = {
  en: "en-us",
  es: "es-es",
  ru: "ru",
};

export async function getIntroBlock(
  language: Language
): Promise<PrismicDocument<ApiIntro>> {
  const api = await apiPromise;

  return await api.getSingle("intro", { lang: LANG_TO_LOCALE[language] });
}

export async function getTimelineBlocks(
  language: Language
): Promise<PrismicDocument<ApiTimelineBlock>[]> {
  const api = await apiPromise;

  const response = await api.query(
    Prismic.Predicates.at("document.type", "timeline-block"),
    { lang: LANG_TO_LOCALE[language], orderings: "[my.timeline-block.date]" }
  );
  return response.results;
}
