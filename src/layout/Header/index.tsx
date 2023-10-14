import React, { FC, ReactElement, useMemo } from 'react';
import { Button, Layout, theme, Avatar, message, Upload } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { getUserinfoApi } from '@/server/user';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/interface';
import { SET_USERINFO } from '@/store/contant';
import Setting from '@/layout/Setting';
import { useNavigate } from 'react-router-dom';
import type { UploadProps } from 'antd';
import { getToken } from '@/utils/auth';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import style from './index.module.scss';
import Crumbs from '../Crumbs';
import { RcFile } from 'antd/es/upload';

const { Header } = Layout;

interface Props {
  setCollapsed: Function;
  collapsed: boolean;
}

const MyHeader: FC<Props> = ({ setCollapsed, collapsed }): ReactElement => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user_pic = useSelector(
      (state: IState) => state.userinfoReducer.user_pic
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const props: UploadProps = {
    name: 'file',
    action: 'http://localhost:3005/user/uploadAvatar',
    headers: {
      authorization: `Bearer ${ getToken() }`,
    },
    beforeUpload: (file: RcFile) => {
      console.log(file);
      const isPNG: boolean = file.type === 'image/png';
      console.log(isPNG);
      if (!isPNG) {
        message.error(`请选择图片格式文件`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`上传成功`);
        const res = await getUserinfoApi();
        console.log(res, '🚀');
        dispatch({ type: SET_USERINFO, data: res.data });
      } else if (info.file.status === 'error') {
        message.error(`${ info.file.name } file upload failed.`);
      }
    },
  };

  const items: MenuProps['items'] = [
    {
      label: (
          <div className={ style.upload }>
            <Upload { ...props }>
              <span>上传头像</span>
            </Upload>
          </div>
      ),
      key: '1',
    },
    {
      label: <span onClick={ () => navigate('/home') }>首页</span>,
      key: '2',
    },
    {
      label: (
          <span
              onClick={ () => {
                localStorage.clear();
                location.reload()
                // navigate('/login');
              } }
          >
          退出
        </span>
      ),
      key: '3',
    },
  ];

  let url: string = useMemo(() => {
    return `http://localhost:3005/${ user_pic }`;
  }, [user_pic]);

  return (
      <Header
          className="flex items-center justify-between pr-20px pl-0"
          style={ { background: colorBgContainer } }
      >
        <div className="flex gap-10px">
          <Button
              type="text"
              icon={ collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }
              onClick={ () => setCollapsed(!collapsed) }
              style={ {
                fontSize: '16px',
                width: 64,
                height: 64,
              } }
          />
          <Crumbs></Crumbs>
        </div>
        <div className="flex items-center gap-20px">
          <Setting></Setting>
          <Avatar
              className="cursor-pointer"
              shape="square"
              src={ url }
              size={ 55 }
          ></Avatar>
          <Dropdown menu={ { items } } trigger={ ['click'] }>
            <a onClick={ (e) => e.preventDefault() }>
              <Space>
                <DownOutlined/>
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
  );
};

export default MyHeader;
