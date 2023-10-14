import { SET_ROUTES } from '@/store/contant';
import { RouterBody } from '@/router';
import { MyIcon } from '@/layout/SideBar';
import React from 'react';
import { IRouteConfig } from '@/layout/SideBar';

type IAction = {
  type: string,
  data: RouterBody[]
}


export type IPermissionState = {
  menuList: IRouteConfig[]
}

let initState: IPermissionState = {
  menuList: []
}

function handleMenuList(data: RouterBody[]) {
  let menuList: IRouteConfig[] = data.map((item: RouterBody) => {
    let menu: IRouteConfig = {
      key: item.path,
      label: item.meta?.title as string,
      icon: <MyIcon type={ 'icon-' + item.meta?.icon }/>,
    }

    if (item.children) {
      menu.children = handleMenuList(item.children)
    }
    return menu
  })
  return menuList
}

export default (state = initState, action: IAction) => {
  const { type, data } = action
  switch (type) {
    case SET_ROUTES:
      const menuList = handleMenuList(data[0].children as RouterBody[])
      return { ...state, menuList }
    default:
      return state
  }
}

