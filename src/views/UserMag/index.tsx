import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Table, Tag, Button, Input, InputRef, Popconfirm, Pagination, Modal, Form, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { exportExcelApi, getUserListApi, updateUserApi } from '@/server/userMag';
import React from 'react';
import { IPage } from '@/interface';
import { removeUserApi } from '@/server/user';
import type { PaginationProps } from 'antd';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import { IExportData } from '@/server/userMag/type';

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

const UserMag: FC = (): ReactElement => {
  const [tableData, setTableData] = useState<ITable[]>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm()
  const [id, setId] = useState<number>(0)
  const { TextArea } = Input
  const { Option } = Select;
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
      title: '描述',
      key: 'desc',
      dataIndex: 'desc',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
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
    total: 0,
  })
  const getUserList = async () => {
    const params = Object.assign(page, { keyword: '' })
    const res = await getUserListApi(params)
    console.log(res)
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
    const params = Object.assign({ keyword }, {
      size: 10,
      current: 1,
      total: 0
    })
    const res = await getUserListApi(params)
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
      const res = await updateUserApi(id, value)
      message.success(res.data)
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


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 导出excel
  const exportExcel = async () => {
    if (selectedRowKeys.length === 0) return message.warning('请选择导出行!')
    const res = await exportExcelApi({ ids: selectedRowKeys as number[] | [] })
    const uint8Array = new Uint8Array(res.data.data);
    // 将buffer转化为blob
    const blob = new Blob([uint8Array], { type: 'application/octet-stream' })
    const a: HTMLAnchorElement = document.createElement('a');
    const blobUrl: string = URL.createObjectURL(blob)
    a.href = blobUrl;
    a.download = '用户表.xlsx';
    a.click();
    window.URL.revokeObjectURL(blobUrl)
  }

  return (
      <>
        <div className="flex justify-between items-center mb-30px shadow p-20px">
          <div className="flex gap-20px items-center">
            {/*<Button type="primary" onClick={ handleAddUser }>新增</Button>*/ }
            <span>关键字</span>
            <Input className="w300px" onKeyDown={ handleSearchByDown } ref={ inputRef } placeholder="用户名/手机号"/>
            <Button type="primary" onClick={ () => handleSearch(inputRef.current!.input!.value) }>搜索</Button>
            <Button type="primary" onClick={ refreshTable }>刷新</Button>
          </div>
          <div className="flex gap-20px">
            <Button type="primary" onClick={ exportExcel }>导出</Button>
            {/*<Button type="primary" onClick={ exportExcel }>导出所有</Button>*/}
          </div>
        </div>
        <Table rowSelection={ rowSelection } size="small" pagination={ false } rowKey="id" bordered columns={ columns }
               dataSource={ tableData }/>
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
            <Form.Item
                label="描述"
                name="desc"
            >
              <TextArea rows={ 4 } placeholder="请输入内容" maxLength={ 6 }/>
            </Form.Item>
          </Form>
        </Modal>
      </>
  )
}


export default UserMag
