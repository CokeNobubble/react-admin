// 该组件用于处理网页标题

import { FC, ReactElement, useEffect } from "react";

type RouteProps = {
  children: React.ReactNode;
  title: string;
};
const WebTitle: FC<RouteProps> = (props): ReactElement => {
  useEffect(() => {
    document.title = props.title;
  });
  console.log(props);
  return <>{props.children}</>;
};

export default WebTitle;
