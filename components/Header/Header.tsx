import React, { ReactNode } from "react";
import cn from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";

import s from "./Header.module.scss";
import { LANGUAGES } from "../../services/i18n/constants.ts";
import { MAIN_SITE_URL } from "../../services/env.ts";

interface Props {}

export default function Header(props: Props) {
  const { locale } = useRouter();
  return (
    <div className={s.root}>
      <a href={MAIN_SITE_URL}>he-he.org</a>
      <div className={s.languages}>
        {LANGUAGES.map((l) => (
          <Link key={l} locale={l} href={"/"}>
            <a className={cn(s.language, l === locale && s.isActive)}>{l}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
