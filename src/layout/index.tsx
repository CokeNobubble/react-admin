import React, { ReactElement, useState, FC } from 'react';

import { Layout } from 'antd';
import SideBar from '@/layout/SideBar';
import MyHeader from '@/layout/MyHeader';
import MyContent from '@/layout/MyContent';

const MyLayout: FC = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  return (
      <Layout style={ { height: '100%' } }>
        <SideBar collapsed={ collapsed }/>
        <Layout>
          <MyHeader setCollapsed={ setCollapsed } collapsed={ collapsed }/>
          <MyContent/>
        </Layout>
      </Layout>
  );
};

export default MyLayout;
