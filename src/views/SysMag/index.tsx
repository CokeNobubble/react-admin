import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

const SysMag: FC = (): ReactElement => {
  return (
      <Outlet></Outlet>
  )
}

export default SysMag
