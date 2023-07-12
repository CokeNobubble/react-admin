import React, { ReactElement, useState, FC, useEffect } from 'react';

import { Layout } from 'antd';
import SiderBar from '@/layout/SiderBar';
import Header from '@/layout/Header';
import MyContent from '@/layout/Content'

const MyLayout: FC = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <Layout style={ { height: '100%' } }>
        <SiderBar collapsed={ collapsed }/>
        <Layout>
          <Header setCollapsed={ setCollapsed } collapsed={ collapsed }/>
          <MyContent/>
        </Layout>
      </Layout>
  );
};

export default MyLayout;
