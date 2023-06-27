import React, { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';

const { Content } = Layout;
const MyContent: FC = (): ReactElement => {
  const { token: { colorBgContainer } } = theme.useToken();
  return (
      <Content
          style={ {
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          } }
      >
        {/* 路由出口 */ }
        <Outlet/>
      </Content>
  )
}

export default MyContent
