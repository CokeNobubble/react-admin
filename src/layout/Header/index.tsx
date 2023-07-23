import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Layout, theme, Avatar, message, Dropdown } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons';
import { getUserinfoApi, updateAvatar } from '@/server/user';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/interface';
import { SET_USERINFO } from '@/store/contant';
import Setting from '@/layout/Setting';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

interface Props {
  setCollapsed: Function,
  collapsed: boolean
}

const MyHeader: FC<Props> = ({ setCollapsed, collapsed }): ReactElement => {
  const { token: { colorBgContainer } } = theme.useToken();
  const uploadIpt = useRef(null)
  const user_pic = useSelector((state: IState) => state.userinfoReducer.user_pic)
  const [url, setUrl] = useState<string>(user_pic)
  const [flag, setFlag] = useState<boolean>(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      label: <span onClick={ () => navigate('/home') }>首页</span>,
      key: '1'
    },
    {
      label: <span onClick={ () => {
        localStorage.clear()
        navigate('/login')
      } }>退出</span>,
      key: '2'
    }
  ];

  // 退出登录
  const logout = (e) => {
    console.log('1')
    // localStorage.clear()
    // location.reload()
  }
  const avatarClick = () => {
    const ipt = uploadIpt.current! as HTMLInputElement
    ipt.click()
  }

  useEffect(() => {
    if (flag) {
      console.log('初次渲染')
      setFlag(false)
    } else {
      updateAvatar({ user_pic: url }).then(async (res) => {
        const resp = await getUserinfoApi()
        dispatch({ type: SET_USERINFO, data: resp.data })
        message.success('更新头像成功!')
      })
    }
  }, [url])

  const handleChange = async () => {
    // @ts-ignore
    const file = uploadIpt.current!.files[0]
    if (file.type !== 'image/jpeg') return message.warning('请选择图片文件!')
    const reader = new FileReader()
    reader.onload = (e) => {
      setUrl(() => e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
      <Header className="flex items-center justify-between pr-20px pl-0" style={ { background: colorBgContainer } }>
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
        <div className="flex items-center gap-20px">
          <Setting></Setting>
          <Avatar className="cursor-pointer" shape="square" src={ url } onClick={ avatarClick } size={ 55 }></Avatar>
          <Dropdown menu={ { items } } trigger={ ['click'] }>
            <a onClick={ (e) => e.preventDefault() }>
              <DownOutlined/>
            </a>
          </Dropdown>
        </div>
        <input className="hidden" ref={ uploadIpt } onChange={ handleChange } type="file"/>
      </Header>
  )
}

export default MyHeader
