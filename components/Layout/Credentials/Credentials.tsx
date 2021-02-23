import React from "react";

import s from "./Credentials.module.scss";
import { MAIN_SITE_URL } from "../../../services/env";

const PEOPLE = [
  {
    name: "Karina Basharova",
    details: "founder and PR director of the project Health & Help",
    link: "https://www.instagram.com/karina.basharova/",
  },
  {
    name: "Alex Duplyakov",
    details: "illustrator",
    link: "https://www.behance.net/duplyakovdesign",
  },
  {
    name: "Nikolai Mavrenkov",
    details: "developer",
    link: "https://koluch.ru/",
  },
  {
    name: "Ale Abrosimova",
    details: "designer",
    link: "https://www.behance.net/kjarval",
  },
];

interface Props {}

export default function Credentials(props: Props) {
  return (
    <div className={s.root}>
      {PEOPLE.map((person, i) => (
        <a href={person.link} key={i} className={s.person} target="_blank">
          <b>{person.name}</b>
          <span>{person.details}</span>
        </a>
      ))}
    </div>
  );
}
