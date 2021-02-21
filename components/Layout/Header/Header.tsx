import React, { ReactNode } from "react";
import cn from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";

import s from "./Header.module.scss";
import { Language, LANGUAGES } from "../../../services/i18n/constants";
import { MAIN_SITE_URL } from "../../../services/env";

const LANGUAGE_TITLES: { [key in Language]: string } = {
  en: "Eng",
  ru: "Рус",
  es: "Esp",
};

interface Props {}

export default function Header(props: Props) {
  const { locale } = useRouter();
  return (
    <div className={s.root}>
      <a href={MAIN_SITE_URL} className={s.backLink}>
        <img width={71} height={8} src="/header_arrow.svg" />
        <span>he-he.org</span>
      </a>
      <div className={s.line} />
      <div className={s.languages}>
        {LANGUAGES.map((l) => (
          <Link key={l} locale={l} href={"/"}>
            <a className={cn(s.language, l === locale && s.isActive)}>
              {LANGUAGE_TITLES[l] || l}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
