import React, { ReactElement, useState, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { ConfigProvider, Layout } from 'antd';
import SideBar from '@/layout/SideBar';
import Header from '@/layout/Header';
import MyContent from '@/layout/Content'
import zhCN from 'antd/locale/zh_CN';
import { useSelector } from 'react-redux';
import { IState } from '@/interface';

const MyLayout: FC = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const { themeColor, themeMode } = useSelector((state: IState) => state.theme)
  useEffect(() => {
    // 访问根路由 重定向到首页
    navigate('/home')
  }, [])
  return (
      <ConfigProvider
          theme={ { token: { colorPrimary: themeColor }, algorithm: themeMode } }
          locale={ zhCN }>
        <Layout style={ { height: '100%' } }>
          <SideBar collapsed={ collapsed }/>
          <Layout>
            <Header setCollapsed={ setCollapsed } collapsed={ collapsed }/>
            <MyContent/>
          </Layout>
        </Layout>
      </ConfigProvider>

  );
};

export default MyLayout;
