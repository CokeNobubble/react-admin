import React, { FC, ReactElement, useRef } from 'react';
import { Button, Layout, theme, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

interface Props {
  setCollapsed: Function,
  collapsed: boolean
}

const MyHeader: FC<Props> = ({ setCollapsed, collapsed }): ReactElement => {
  const { token: { colorBgContainer } } = theme.useToken();
  const uploadIpt = useRef(null)



  return (
      <Header className="flex items-center justify0-center pr-20px pl-0" style={ { background: colorBgContainer } }>
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
