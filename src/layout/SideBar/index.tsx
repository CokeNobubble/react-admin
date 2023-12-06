import { FC, ReactElement, useMemo } from "react";
import { Layout, Menu, Avatar, Dropdown, Space, Upload, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import sideBar from "./index.module.scss";
import reactIcon from "@/assets/icons/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TAG, HORIZONTAL } from "@/store/contant";
import { IState } from "@/interface";
import { ITag } from "@/store/reducers/crumbs";
import { createFromIconfontCN, DownOutlined } from "@ant-design/icons";
import FullScreen from "@/components/FullScreen";
import type { MenuProps } from "antd";

import { getUserinfoApi } from "@/server/user";
import { SET_USERINFO } from "@/store/contant";
import type { UploadProps } from "antd";
import { getToken } from "@/utils/auth";
import style from "./index.module.scss";
import { RcFile } from "antd/es/upload";
import { isImage } from "@/utils/toolFunc";

const { Sider } = Layout;
export const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4287455_ogpr51szo7b.js", // 在 iconfont.cn 上生成
});

interface IProps {
  collapsed: boolean;
  width: number;
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

const SideBar: FC<IProps> = ({ collapsed, width }): ReactElement => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const tags = useSelector((state: IState) => state.crumbs.tags);
  const activeTag = useSelector((state: IState) => state.crumbs.activeTag);
  const currentPath = useMemo(() => {
    const path = location.pathname.split("/");
    return path[path.length - 1];
  }, [location.pathname]);
  const user_pic = useSelector(
    (state: IState) => state.userinfoReducer.user_pic
  );
  let url: string = useMemo(() => {
    return `http://localhost:3005/${user_pic}`;
  }, [user_pic]);

  const sidebarMode = useSelector(
    (state: IState) => state.sidebarMode.sidebarMode
  );

  const navigate = useNavigate();

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

  const props: UploadProps = {
    name: "file",
    action: "http://localhost:3005/user/uploadAvatar",
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
    beforeUpload: (file: RcFile) => {
      if (!isImage(file)) {
        message.error(`请选择图片格式文件`);
      }
      return isImage(file) || Upload.LIST_IGNORE;
    },
    async onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`上传成功`);
        const res = await getUserinfoApi();
        dispatch({ type: SET_USERINFO, data: res.data });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className={style.upload}>
          <Upload {...props}>
            <span>上传头像</span>
          </Upload>
        </div>
      ),
      key: "1",
    },
    {
      label: <span onClick={() => navigate("/home")}>首页</span>,
      key: "2",
    },
    {
      label: (
        <span
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          退出
        </span>
      ),
      key: "3",
    },
  ];

  return (
    <>
      {sidebarMode === HORIZONTAL ? (
        <div className="flex justify-between bg-[var(--menuBg)] h-50px align-center p-x-20px">
          <div className="flex items-center gap-10px">
            <ReactSVG src={reactIcon} className={sideBar.wrapper}></ReactSVG>
            {collapsed ? (
              ""
            ) : (
              <h1 className="c-#fff text-14px">React-Antd-Admin</h1>
            )}
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultOpenKeys={[currentPath]}
            selectedKeys={[currentPath]}
            onClick={clickMenuItem}
            items={menuList}
          />
          <div className="flex items-center gap-20px c-[var(--menuText)]">
            <FullScreen></FullScreen>
            <Avatar
              className="cursor-pointer"
              shape="square"
              src={url}
              size={40}
            ></Avatar>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <DownOutlined rev="true" />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      ) : (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            className={
              collapsed
                ? "p-20px text-center"
                : "flex bg-[var(--bg-color-overlay)] p-15px justify-between"
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
            defaultOpenKeys={[currentPath]}
            selectedKeys={[currentPath]}
            onClick={clickMenuItem}
            items={menuList}
          />
        </Sider>
      )}
    </>
  );
};

export default SideBar;
