import { FC } from 'react';
import { useRoutes } from 'react-router-dom'
import routes from '@/router';

const App: FC = () => {
  // 路由出口
  return useRoutes(routes)
}

export default App
