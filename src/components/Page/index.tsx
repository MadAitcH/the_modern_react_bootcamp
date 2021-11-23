import "./Page.css";

import { FC } from "react";

const Page: FC = ({ children }) => {
  return <section className="page">{children}</section>;
};

export default Page;
