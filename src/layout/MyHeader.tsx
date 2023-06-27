import React, { FC, ReactElement } from 'react';
import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;
interface Props {
  setCollapsed: Function,
  collapsed: boolean
}

const MyHeader: FC<Props> = ({ setCollapsed, collapsed }): ReactElement => {
  const { token: { colorBgContainer } } = theme.useToken();
  return (
      <Header style={ { padding: 0, background: colorBgContainer } }>
        <Button
            type="text"
            icon={ collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }
            onClick={ () => setCollapsed(!collapsed) }
            style={ {
              fontSize: '16px',
              width: 64,
              height: 64,
            } }
        />
      </Header>
  )
}

export default MyHeader
