import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Table, Tag, Button, Input, InputRef, Popconfirm, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getUserListApi } from '@/server/userMag';
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

const UserManage: FC = (): ReactElement => {
  const [tableData, setTableData] = useState<ITable[]>()
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
    console.log(page, 'page')
    const res = await getUserListApi(page)
    setTableData(res.data.list)
    setPage(res.data.page)
  }

  const handleEditRow = (record: ITable) => {
    // todo
    console.log(record)
  }
  const handleRemoveRow = async (record: ITable) => {
    try {
      await removeUserApi({ id: record.id })
      getUserList()
    } catch (e) {
    }
  }


  const inputRef = useRef<InputRef>(null)
  const handleSearch = () => {
    // todo
    const value = inputRef.current!.input!.value
  }

  useEffect(() => {
    getUserList()
  }, [page.size, page.current])

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current: number, size: number) => {
    console.log(current, size)
    setPage((prevState: IPage) => {
      return { ...prevState, size }
    })
  }

  const handleQuery: PaginationProps['onChange'] = (current: number) => {
    setPage((prevState: IPage) => {
      return { ...prevState, current }
    })
  }

  return (
      <>
        <div className="flex gap-20px items-center mb-30px shadow p-20px">
          <span>关键字</span>
          <Input className="w300px" ref={ inputRef } placeholder="用户名/手机号"/>
          <Button type="primary" onClick={ handleSearch }>搜索</Button>
        </div>
        <Table pagination={ false } rowKey="id" bordered columns={ columns } dataSource={ tableData }/>
        <div className="mt-10px text-right">
          <Pagination
              showSizeChanger
              onShowSizeChange={ onShowSizeChange }
              defaultCurrent={ page.current }
              total={ page.total }
              current={ page.current }
              onChange={ handleQuery }
          />
        </div>
      </>
  )
}


export default UserManage
