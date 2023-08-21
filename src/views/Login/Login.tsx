import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { SET_USERINFO, LOGIN } from '@/store/contant';
import { Login_Reg_Data } from '@/server/user/type';
import { getCaptchaApi, getUserinfoApi, loginApi, registerApi } from '@/server/user';
import { useNavigate } from 'react-router-dom';


const Login: FC = (): ReactElement => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const divRef = useRef<HTMLDivElement>(null)
  // false为登录
  const [flag, setFlag] = useState<boolean>(false)
  useEffect(() => {
    getCaptcha().then()
  }, [])
  // login
  const handleLogin = async (data: Login_Reg_Data) => {
    if (flag) {
      // 注册
      try {
        const res = await registerApi(data)
        console.log(res)
        message.success(res.data)
      } catch (e) {
        console.log(e)
      }
    } else {
      //登录
      try {
        const res = await loginApi(data)
        console.log(res);
        dispatch({ type: LOGIN, data: res.data.token })
        // 先去请求用户信息
        // getUserinfoApi().then(res => {
        //   console.log(res)
        //   dispatch({ type: SET_USERINFO, data: res.data })
        // })
        navigateTo('/home')
      } catch (e) {
        console.log(e)
      }
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 获取验证码
  const getCaptcha = async () => {
    const res = await getCaptchaApi({ width: 200, height: 50 })
    divRef!.current!.innerHTML = res.data
  }

  return (
      <div className="w100% h100% flex justify-center items-center bg-#1e2030">
        <div className="w400px h400px b-rd-30px flex justify-center flex-col items-center bg-#fff">
          <div className="w100% text-right mb-10px">
            <Button onClick={ () => setFlag((flag) => !flag) } className="mr-70px"
                    type="primary">{ flag ? '去登录' : '去注册' }</Button>
          </div>
          <Form
              name="basic"
              labelCol={ { span: 8 } }
              wrapperCol={ { span: 16 } }
              style={ { maxWidth: 600 } }
              onFinish={ handleLogin }
              onFinishFailed={ onFinishFailed }
              autoComplete="off"
          >
            <Form.Item
                label="用户名"
                name="username"
                rules={ [{ required: true, message: '请输入用户名!' }] }
            >
              <Input/>
            </Form.Item>
            <Form.Item
                label="密码"
                name="password"
                rules={ [{ required: true, message: '请输入密码!' }] }
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item
                label="验证码"
                name="captcha"
                rules={ [{ required: true, message: '请输入验证码!' }] }
            >
              <Input/>
            </Form.Item>
            <div onClick={ () => getCaptcha() } ref={ divRef } className="w100% h50px text-right mb-10px"></div>
            <Form.Item wrapperCol={ { offset: 8, span: 16 } }>
              <Button type="primary" htmlType="submit">
                { flag ? '注册' : '登录' }
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
  )
}

export default Login
