import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Table, Tag, Button, Input, InputRef } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getUserListApi } from '@/server/userMag';
import React from 'react';

interface ITable {
  username: string,
  nickname: string,
  sex: string,
  phone: string,
  id: number,
}

const UserManage: FC = (): ReactElement => {

  const [tableData, setTableData] = useState<ITable[]>()
  const columns: ColumnsType<ITable> = [
    {
      title: '序号',
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
            <Button type="link" danger onClick={ () => handleRemoveRow(record) }>删除</Button>
          </>
      )
    },
  ];

  useEffect(() => {
    getUserList()
  }, [])

  const getUserList = async () => {
    const res = await getUserListApi()
    setTableData(res.data)
  }

  const handleEditRow = (record: ITable) => {
    // todo
    console.log(record)
  }
  const handleRemoveRow = (record: ITable) => {
    // todo
    console.log(record)
  }

  const inputRef = useRef<InputRef>(null)
  const handleSearch = () => {
    // todo
    const value = inputRef.current!.input!.value
  }

  return (
      <>
        <div className="flex gap-20px items-center mb-30px shadow p-20px">
          <span>关键字</span>
          <Input className="w300px" ref={ inputRef } placeholder="用户名/手机号"/>
          <Button type="primary" onClick={ handleSearch }>搜索</Button>
        </div>
        <Table pagination={ false } rowKey="id" bordered columns={ columns } dataSource={ tableData }/>
      </>
  )
}


export default UserManage
