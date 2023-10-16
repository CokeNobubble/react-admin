import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, message, Select, Tooltip } from 'antd';
import { getMenuApi } from '@/server/route';
import { MenuData } from '@/server/route/type';
import { addMenuApi } from '@/server/route';
import { createFromIconfontCN } from '@ant-design/icons';
import { getIconsApi } from '@/server/icons';


export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4287455_edoyehb9x.js',
})

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  path: string
  title: string
  component: string
  pid: number
  permission: string[]
  icon: string
};

type IPermission = {
  label: string;
  value: string;
}

type IconOptions = {
  id: number;
  name: string
}
const RouteMag: FC = (): ReactElement => {

  const [parentRoutes, setParentRoutes] = useState<MenuData[]>([])
  const [permissions, setPermissions] = useState<IPermission[]>([])
  const [iconList, setIconList] = useState<IconOptions[]>([])
  const [active, setActive] = useState<number | null>(null)
  const [currentIcon, setCurrentIcon] = useState<string>('')
  const [inpVal, setInpVal] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)

  const getMenu = async () => {
    const res = await getMenuApi()
    const routes = res.data.map((item: MenuData) => {
      return {
        title: item.title,
        id: item.id,
        pid: item.pid,
      }
    })
    setParentRoutes(routes)
    const permissions = res.data[0].permission.map((item: string) => {
      return {
        label: item,
        value: item
      }
    })
    setPermissions(permissions)
  }


  const createRoute = async (values: FieldType) => {
    await addMenuApi(values)
    message.success('添加成功')
  };

  const getIcons = async () => {
    const res = await getIconsApi()
    setIconList(res.data)
  }

  // form表单实例
  const [form] = Form.useForm();

  const selectIcon = (item: IconOptions, index: number) => {
    setActive(index)
    setCurrentIcon(item.name)
    setInpVal(item.name)
    form.setFieldValue('icon', item.name)
    setVisible(false)
  }


  useEffect(() => {
    getMenu()
    getIcons()
  }, [])

  const inputBeforeIcon = useMemo(() => {
    return <span className="c-rose"><IconFont type={ 'icon-' + currentIcon }/></span>
  }, [currentIcon])


  const content = useMemo(() => {
    return (
        <ul className="flex flex-wrap gap-10px">
          {
            iconList.map((item: IconOptions, index: number) => <li
                    className={ `
                    c-black list-none  w-30px h-30px f-c-c hover:scale-120 
                    transition-all duration-300 cursor-pointer border-1 
                    border-dotted border-coolGray
                    ${ index === active ? 'border-red' : 'border-black' }` }
                    key={ item.name }
                    onClick={ () => selectIcon(item, index) }>
                  <IconFont type={ 'icon-' + item.name }/>
                </li>
            )
          }
        </ul>
    )
  }, [iconList, active])

  return (
      <div>
        <Form
            size="large"
            form={ form }
            name="basic"
            labelCol={ { span: 4 } }
            wrapperCol={ { span: 16 } }
            style={ { maxWidth: 600 } }
            onFinish={ createRoute }
            onFinishFailed={ onFinishFailed }
            autoComplete="off"
        >
          <Form.Item<FieldType>
              label="路由路径"
              name="path"
              rules={ [{ required: true, message: '请输入路由路径!' }] }
          >
            <Input placeholder="请输入路由路径"/>
          </Form.Item>

          <Form.Item<FieldType>
              label="路由标题"
              name="title"
              rules={ [{ required: true, message: '请输入路由标题!' }] }
          >
            <Input placeholder="请输入路由标题"/>
          </Form.Item>
          <Form.Item<FieldType>
              label="组件名"
              name="component"
              rules={ [{ required: true, message: '请输入组件名/必须以大写字母开头!' }] }
          >
            <Input placeholder="请输入组件名"/>
          </Form.Item>
          <Form.Item<FieldType>
              label="父级路由"
              name="pid"
              rules={ [{ required: true, message: '请选择父级路由!' }] }
          >
            <Select placeholder="请选择">
              { parentRoutes.map((item: MenuData) => {
                return <Select.Option key={ item.id } value={ item.id }>{ item.title }</Select.Option>
              }) }
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
              label="权限选择"
              name="permission"
              rules={ [{ required: true, message: '请选择该路由权限!' }] }
          >
            <Select
                mode="multiple"
                allowClear
                style={ { width: '100%' } }
                placeholder="请选择该路由权限"
                options={ permissions }
            />
          </Form.Item>
          <Form.Item<FieldType>
              label="图标"
              name="icon"
              rules={ [{ required: true, message: '请选择图标!' }] }
          >
            <Tooltip open={ visible } placement="bottomLeft" color="#fff" title={ content }>
              <Input
                  onClick={ () => setVisible(!visible) }
                  value={ inpVal }
                  addonBefore={ inputBeforeIcon }
                  className="w-400px"/>
            </Tooltip>
          </Form.Item>
          <Form.Item wrapperCol={ { offset: 4, span: 16 } }>
            <Button type="primary" htmlType="submit">
              生成路由
            </Button>
          </Form.Item>
        </Form>
      </div>
  )
}

export default RouteMag
