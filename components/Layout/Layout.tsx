import { ReactNode } from "react";

import s from "./Layout.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Credentials from "./Credentials/Credentials";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  return (
    <>
      <div className={s.content}>
        <Header />
        {children}
        <Footer />
      </div>
      <Credentials />
    </>
  );
}
