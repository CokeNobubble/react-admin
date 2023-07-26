import { FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { Table, Tag, Button, Input, InputRef, Popconfirm, Pagination, Modal, Form, Select, message } from 'antd';

const { Option } = Select;
import type { ColumnsType } from 'antd/es/table';
import { getUserListApi, searchUserApi, updateUserApi } from '@/server/userMag';
import React from 'react';
import { IPage } from '@/interface';
import { removeUserApi } from '@/server/user';
import type { PaginationProps } from 'antd';

interface ITable {
  username: string,
  nickname: string,
  sex: string,
  phone: string,
  id: number,
}

interface Iid {
  id: number
}

const UserManage: FC = (): ReactElement => {
  const [tableData, setTableData] = useState<ITable[]>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm()
  const [id, setId] = useState<number>()

  const columns: ColumnsType<ITable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (_, record) => (<Tag color={ record.sex === '男' ? 'blue' : 'red' }>{ record.sex }</Tag>)
    },
    {
      title: '手机号',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
          <>
            <Button type="link" onClick={ () => handleEditRow(record) }>编辑</Button>
            <Popconfirm
                title="删除"
                description="你确定要删除吗?"
                onConfirm={ () => handleRemoveRow(record) }
                okText="是"
                cancelText="否"
            >
              <Button danger type="link">删除</Button>
            </Popconfirm>
          </>
      )
    },
  ];

  const [page, setPage] = useState<IPage>({
    size: 10,
    current: 1,
    total: 0
  })
  const getUserList = async () => {
    const res = await getUserListApi(page)
    setTableData(res.data.list)
    setPage(res.data.page)
  }

  const handleEditRow = (record: ITable) => {
    // todo
    setId(record.id)
    form.setFieldsValue(record)
    setIsModalOpen(true)
  }
  const handleRemoveRow = async (record: ITable) => {
    try {
      await removeUserApi({ id: record.id })
      getUserList()
    } catch (e) {
    }
  }


  const inputRef = useRef<InputRef>(null)
  const handleSearch = async (keyword: string) => {
    if (!keyword) return message.warning('请输入内容!')
    const params = Object.assign({ keyword }, {
      size: 10,
      current: 1,
      total: 0
    })
    const res = await searchUserApi(params)
    setTableData(res.data.list)
    setPage(res.data.page)
  }

  // 刷新表格
  const refreshTable = () => {
    getUserList()
  }

  const handleSearchByDown = (e: any) => {
    if (e.keyCode === 13) {
      handleSearch(e.target.value)
    }
  }

  useEffect(() => {
    getUserList()
  }, [page.size, page.current])

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current: number, size: number) => {
    setPage((prevState: IPage) => {
      return { ...prevState, size }
    })
  }

  const handleQuery: PaginationProps['onChange'] = (current: number) => {
    setPage((prevState: IPage) => {
      return { ...prevState, current }
    })
  }

  // 新增用户
  // const handleAddUser = () => {
  //   // todo
  //   setIsModalOpen(true)
  // }

  const handleConfirm = () => {
    form.validateFields().then(async (value) => {
      const params = Object.assign(value, { id })
      console.log(params)
      const res = await updateUserApi(params)
      message.success(res.msg)
      getUserList()
      handleCancel()
    }).catch(err => {
      console.log(err)
    })

  }
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  const onFinish = () => () => {

  }

  const onFinishFailed = () => () => {

  }

  return (
      <>
        <div className="flex gap-20px items-center mb-30px shadow p-20px">
          {/*<Button type="primary" onClick={ handleAddUser }>新增</Button>*/ }
          <span>关键字</span>
          <Input className="w300px" onKeyDown={ handleSearchByDown } ref={ inputRef } placeholder="用户名/手机号"/>
          <Button type="primary" onClick={ () => handleSearch(inputRef.current!.input!.value) }>搜索</Button>
          <Button type="primary" onClick={ refreshTable }>刷新</Button>
        </div>
        <Table size="small" pagination={ false } rowKey="id" bordered columns={ columns } dataSource={ tableData }/>
        <div className="mt-10px text-right">
          <Pagination
              showSizeChanger
              onShowSizeChange={ onShowSizeChange }
              defaultCurrent={ page.current }
              total={ page.total }
              showTotal={ (total) => `共 ${ total } 条` }
              current={ page.current }
              onChange={ handleQuery }
          />
        </div>
        <Modal title="编辑" open={ isModalOpen } onOk={ handleConfirm } onCancel={ handleCancel }>
          <Form
              name="basic"
              labelCol={ { span: 6 } }
              wrapperCol={ { span: 15 } }
              style={ { maxWidth: 600 } }
              onFinish={ onFinish }
              onFinishFailed={ onFinishFailed }
              autoComplete="off"
              form={ form }
          >
            <Form.Item
                label="用户昵称"
                name="nickname"
                rules={ [{ required: true, message: '请输入昵称' }] }
            >
              <Input/>
            </Form.Item>
            <Form.Item
                label="性别"
                name="sex"
                rules={ [{ required: true, message: '请输入性别' }] }
            >
              <Select
                  placeholder="请选择性别"
                  allowClear
              >
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            </Form.Item>
            <Form.Item
                label="手机号"
                name="phone"
                rules={ [{ required: true, message: '请输入手机号' }] }
            >
              <Input/>
            </Form.Item>
          </Form>
        </Modal>
      </>
  )
}


export default UserManage
