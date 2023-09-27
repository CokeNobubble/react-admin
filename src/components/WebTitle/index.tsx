// 该组件用于处理网页标题

import { FC, ReactElement, useEffect } from "react";

type RouteProps = {
  children: React.ReactNode;
  title: string;
};
const WebTitle: FC<RouteProps> = ({ children, title }): ReactElement => {
  useEffect(() => {
    document.title = title;
  });
  return <>{children}</>;
};

export default WebTitle;
