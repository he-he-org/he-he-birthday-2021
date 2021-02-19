import { ReactNode } from "react";

import s from "./Layout.module.scss";
import Header from "../Header/Header";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  return (
    <div className={s.root}>
      <div className={s.content}>
        <Header />
        {children}
      </div>
    </div>
  );
}
