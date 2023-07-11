import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Layout, theme, Avatar, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { getUserinfoApi, updateAvatar } from '@/server/user';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { IState } from '@/interface';
import { SET_USERINFO } from '@/store/contant';

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
        <Avatar src={ url } onClick={ avatarClick } size={ 40 }>USER</Avatar>
        <input className="hidden" ref={ uploadIpt } onChange={ handleChange } type="file"/>
      </Header>
  )
}

export default MyHeader
