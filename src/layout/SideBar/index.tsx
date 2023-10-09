import React, { FC, ReactElement, useMemo } from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { ReactSVG } from "react-svg";
import sideBar from "./index.module.css";
import reactIcon from "@/assets/icons/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TAG } from "@/store/contant";
import { IState } from "@/interface";
import { ITag } from "@/store/reducers/crumbs";

const { Sider } = Layout;

interface IProps {
  collapsed: boolean;
}

export interface IRouteConfig {
  key: string;
  icon: ReactElement;
  label: string;
  children?: IRouteConfig[];
  isClose?: boolean;
}

interface MenuItem {
  key: string;
  keyPath: string[];
}

const SideBar: FC<IProps> = ({ collapsed }): ReactElement => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const tags = useSelector((state: IState) => state.crumbs.tags);
  const activeTag = useSelector((state: IState) => state.crumbs.activeTag);
  const currentPath = useMemo(() => location.pathname.slice(1), [location]);

  const routeConfig: IRouteConfig[] = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "首页",
    },
    {
      key: "sysMag",
      icon: <SettingOutlined />,
      label: "系统设置",
      children: [
        {
          key: "userMag",
          icon: <UserOutlined />,
          label: "用户管理",
        },
      ],
    },
    {
      key: "dataCenter",
      icon: <UserOutlined />,
      label: "数据中心",
    },

    {
      key: "personInfo",
      icon: <VideoCameraOutlined />,
      label: "个人信息",
    },
  ];

  const patchTag = (tag: ITag, key: string): void => {
    if (tag) tag.isClose = true;
    const findTag = tags.find((item: ITag) => item.key === key);
    let newTags = [...tags];
    let atvTag = { ...activeTag };
    if (!findTag) {
      newTags = [...newTags, tag as ITag];
    }
    atvTag = tag as ITag;
    dispatch({ type: ADD_TAG, data: { activeTag: atvTag, tags: newTags } });
    navigateTo(key);
  };

  const clickMenuItem = ({ key, keyPath }: MenuItem): void => {
    console.log(key, keyPath, "keyPath");
    // 遍历数组 先找到第一级路由 如果第一级有
    if (keyPath.length === 1) {
      const tag = routeConfig.find((item: IRouteConfig) => item.key === key);
      patchTag(tag as ITag, key);
    } else {
      handleMulMenu(key, keyPath, routeConfig);
    }
  };

  const handleMulMenu = (
    key: string,
    keyPath: string[],
    routes: IRouteConfig[]
  ): void => {
    const kp = keyPath;
    const tag = routes.find(
      (item: IRouteConfig) => item.key === keyPath[kp.length - 1]
    );
    const findTag =
      tag?.children && tag?.children.find((item) => item.key === key);

    if (!findTag) {
      // 如果不在这一层 继续递归查找
      kp.pop();
      return handleMulMenu(key, kp, tag?.children as IRouteConfig[]);
    }
    // 在这一层
    patchTag(findTag as ITag, findTag.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className={
          collapsed
            ? "p-20px text-center"
            : "flex bg-#000 p-20px justify-between"
        }
      >
        <ReactSVG src={reactIcon} className={sideBar.wrapper}></ReactSVG>
        {collapsed ? (
          ""
        ) : (
          <h1 className="c-#fff text-14px">React-Antd-Admin</h1>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentPath]}
        onClick={clickMenuItem}
        items={routeConfig}
      />
    </Sider>
  );
};

export default SideBar;
