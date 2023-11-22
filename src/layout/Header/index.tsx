import { FC, ReactElement, useMemo } from "react";
import { Button, Layout, theme, Avatar, message, Upload } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { getUserinfoApi } from "@/server/user";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/interface";
import { SET_USERINFO } from "@/store/contant";
import { useNavigate } from "react-router-dom";
import type { UploadProps } from "antd";
import { getToken } from "@/utils/auth";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import style from "./index.module.scss";
import { RcFile } from "antd/es/upload";
import { isImage } from "@/utils/toolFunc";
import FullScreen from "@/components/FullScreen";

interface Props {
  setCollapsed: Function;
  collapsed: boolean;
}

const { Header } = Layout;

const MyHeader: FC<Props> = ({ setCollapsed, collapsed }): ReactElement => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const user_pic = useSelector(
    (state: IState) => state.userinfoReducer.user_pic
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            location.reload();
            // navigate('/login');
          }}
        >
          退出
        </span>
      ),
      key: "3",
    },
  ];

  let url: string = useMemo(() => {
    return `http://localhost:3005/${user_pic}`;
  }, [user_pic]);

  return (
    <Header className="flex items-center justify-between pr-20px pl-0 h-50px bg-[var(--bg-color)]">
      <div className="flex gap-10px">
        <Button
          className="c-[var(--text-color)]"
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined rev="true" />
            ) : (
              <MenuFoldOutlined rev="true" />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        {/* <Crumbs></Crumbs> */}
      </div>
      <div className="flex items-center gap-20px">
        {/*<Setting></Setting>*/}
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
    </Header>
  );
};

export default MyHeader;
