import React, { FC, ReactElement, useEffect, useMemo } from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import sideBar from "./index.module.css";
import reactIcon from "@/assets/icons/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TAG } from "@/store/contant";
import { IState } from "@/interface";
import { ITag } from "@/store/reducers/crumbs";
import { createFromIconfontCN } from "@ant-design/icons";

const { Sider } = Layout;
export const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4287455_ogpr51szo7b.js", // 在 iconfont.cn 上生成
});

interface IProps {
  collapsed: boolean;
}

export interface IRouteConfig {
  key: string;
  icon: ReactElement;
  label: string;
  children?: IRouteConfig[];
  isClose?: boolean;
  path?: string;
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
  const currentPath = useMemo(() => {
    const path = location.pathname.split("/");
    return path[path.length - 1];
  }, [location.pathname]);
  const menuList = useSelector((state: IState) => state.permission.menuList);
  /**
   * 处理Tag
   * @param tag  当前点击菜单对象
   * @param path  跳转路径
   */
  const patchTag = (tag: ITag, path: string): void => {
    console.log(path, "pth");
    localStorage.setItem("currentPath", path);
    document.title = tag.label;
    if (tag) {
      tag.isClose = true;
      tag.path = path;
    }
    // 在当前面包屑数组中找当前点击的左侧菜单项
    const findTag = tags.find((item: ITag) => item.key === tag.key);
    let newTags = [...tags];
    let atvTag = { ...activeTag };
    if (!findTag) {
      // 如果没有找到当前点击的左侧菜单的tag 就新增
      newTags = [...newTags, tag as ITag];
    }
    // 如果找到就把当前这个tag设置为激活项
    atvTag = tag as ITag;
    dispatch({ type: ADD_TAG, data: { activeTag: atvTag, tags: newTags } });
    navigateTo(path);
  };

  const clickMenuItem = ({ key, keyPath }: MenuItem): void => {
    // 遍历数组 先找到第一级路由 如果第一级有
    if (keyPath.length === 1) {
      const tag = menuList.find((item) => item.key === key);
      patchTag(tag as ITag, key);
    } else {
      handleMulMenu(key, keyPath, menuList);
    }
  };

  const handleMulMenu = (
    key: string,
    keyPath: string[],
    routes: IRouteConfig[]
  ): void => {
    const paths = JSON.parse(JSON.stringify(keyPath));
    paths.reverse();
    const path = "/" + paths.join("/");
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
    // patchTag(findTag as ITag, findTag.key);
    patchTag(findTag as ITag, path);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className={
          collapsed
            ? "p-20px text-center"
            : "flex bg-[var(--bg-color-overlay)] p-20px justify-between"
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
        items={menuList}
      />
    </Sider>
  );
};

export default SideBar;
