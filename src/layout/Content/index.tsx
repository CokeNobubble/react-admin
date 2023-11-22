import React, { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import css from "./index.module.css";

const { Content } = Layout;
const MyContent: FC = (): ReactElement => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  return (
    <Content
      className={`bg-[var(--bg-color)] ${css.content}`}
      style={{
        padding: 16,
        minHeight: 280,
      }}
    >
      {/* 路由出口 */}
      <Outlet />
    </Content>
  );
};

export default MyContent;
