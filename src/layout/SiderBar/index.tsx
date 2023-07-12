import React, { FC, ReactElement } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import sideBar from './index.module.css'
import reactIcon from '@/assets/icons/react.svg'

const { Sider } = Layout;

interface IProps {
  collapsed: boolean
}

const SideBar: FC<IProps> = ({ collapsed }): ReactElement => {
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
        <div className={ collapsed ? 'p-20px text-center' : 'flex bg-#000 p-20px justify-between' }>
          <ReactSVG src={ reactIcon } className={ sideBar.wrapper }></ReactSVG>
          { collapsed ? <></> : <h1 className="c-#fff text-14px">React-Antd-Admin</h1> }
        </div>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={ ['home'] }
            onClick={ ({ key }) => {
              navigateTo(key)
            } }
            items={ routeConfig }
        />
      </Sider>
  )
}

export default SideBar
