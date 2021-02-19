import { languages } from "@hapi/accept";

export const LANGUAGES = ["en", "ru", "es"];

export type Languages = typeof LANGUAGES[number];
