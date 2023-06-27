import React, { FC, ReactElement, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Sider } = Layout;

interface Props {
  collapsed: boolean
}

const SideBar: FC<Props> = ({ collapsed }): ReactElement => {
  const navigateTo = useNavigate()
  const routeConfig = [
    {
      key: 'home',
      icon: <UserOutlined/>,
      label: '首页',
    },
    {
      key: 'dataCenter',
      icon: <UserOutlined/>,
      label: '数据中心',
    },
    {
      key: 'personInfo',
      icon: <VideoCameraOutlined/>,
      label: '个人信息',
    },
  ]
  return (
      <Sider trigger={ null } collapsible collapsed={ collapsed }>
        <div className="demo-logo-vertical"/>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={ [''] }
            onClick={ ({ key }) => {
              navigateTo(key)
            } }
            items={ routeConfig }
        />
      </Sider>
  )
}

export default SideBar
