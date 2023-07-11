import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.css'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { HashRouter } from 'react-router-dom'
// 引入redux
import { Provider } from 'react-redux';
import store from '@/store';
// 引入uno.css
import 'uno.css';
import AuthRoute from '@/components/auth/Permission';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ConfigProvider locale={ zhCN }>
      <HashRouter>
        <Provider store={ store }>
          <AuthRoute>
            <App/>
          </AuthRoute>
        </Provider>
      </HashRouter>
    </ConfigProvider>
)
