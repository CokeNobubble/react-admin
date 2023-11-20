import {
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Form,
  Input,
  message,
  Select,
  Tooltip,
  Pagination,
  Space,
  Tag,
} from "antd";
import { getMenuApi } from "@/server/route";
import { MenuData } from "@/server/route/type";
import { addMenuApi } from "@/server/route";
import { createFromIconfontCN } from "@ant-design/icons";
import { getIconsApi } from "@/server/icons";
import { Table, Popconfirm } from "antd";
import {
  getAllRoutesApi,
  updateRouteApi,
  removeRouteApi,
} from "@/server/route";
import { IPage } from "@/interface";
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import GModel from "@/components/GModel";

export const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4285346_5v3p9vvzs1c.js",
});



type FieldType = {
  path: string;
  title: string;
  component: string;
  pid: number;
  permission: string[];
  icon: string;
};

type IPermission = {
  label: string;
  value: string;
};

type IconOptions = {
  id: number;
  name: string;
};

export interface DataType {
  key: string;
  dataIndex: string;
  title: string;
}

export type ITable = {
  id: number;
  component: string;
  path: string;
  title: string;
  icon: string;
  permission: string[];
};

const RouteMag: FC = (): ReactElement => {
  const [parentRoutes, setParentRoutes] = useState<MenuData[]>([]);
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [iconList, setIconList] = useState<IconOptions[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [currentIcon, setCurrentIcon] = useState<string>("");
  const [inpVal, setInpVal] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [page, setPage] = useState<IPage>({
    size: 10,
    current: 1,
    total: 0,
  });

  const columns: ColumnsType<ITable> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "组件名",
      dataIndex: "component",
      key: "component",
      render: (text) => <Tag color="success">{text}</Tag>,
    },
    {
      title: "路由路径",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "路由标题",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "路由图标",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "权限",
      dataIndex: "permission",
      key: "permission",
      render: (per: string[]) =>
        per.map((item) => (
          <Tag key={item} color="#108ee9">
            {item}
          </Tag>
        )),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => openModal("编辑路由", record)} type="link">
            编辑
          </Button>
          <Popconfirm
            title="删除"
            description="你确定要删除吗?"
            onConfirm={() => handleRemoveRow(record)}
            okText="是"
            cancelText="否"
          >
            <Button danger type="link">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  const onFinishFailed = (errorInfo: any) => {
    setModalVisible(true);
    console.log("Failed:", errorInfo);
  };

  const getMenu = async () => {
    const res = await getMenuApi();
    const routes = res.data.map((item: MenuData) => {
      return {
        title: item.title,
        id: item.id,
        pid: item.pid,
      };
    });
    setParentRoutes(routes);
    const permissions = res.data[0].permission.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });
    setPermissions(permissions);
  };

  const onFinish = async (value: FieldType) => {
    if (title === "新增路由") {
      await createRoute(value);
    } else {
      // 编辑路由
      await updateRoute(value);
    }
    await getAllRoutes();
  };

  const createRoute = async (values: FieldType) => {
    await addMenuApi(values);
    message.success("添加成功");
  };

  const [id, setId] = useState<number>(0);
  const updateRoute = async (values: FieldType) => {
    const params = Object.assign(values, { id });
    await updateRouteApi(params);
    message.success("修改成功");
  };

  const getIcons = async () => {
    const res = await getIconsApi();
    setIconList(res.data);
  };

  // form表单实例
  const [form] = Form.useForm();

  const selectIcon = (item: IconOptions, index: number) => {
    setActive(index);
    setCurrentIcon(item.name);
    setInpVal(item.name);
    form.setFieldValue("icon", item.name);
    setVisible(false);
  };

  useEffect(() => {
    getMenu();
    getIcons();
  }, []);

  const inputBeforeIcon = useMemo(() => {
    return (
      <span className="c-rose">
        <IconFont type={"icon-" + currentIcon} />
      </span>
    );
  }, [currentIcon]);

  const content = useMemo(() => {
    return (
      <ul className="flex flex-wrap gap-10px">
        {iconList.map((item: IconOptions, index: number) => (
          <li
            className={`
                    c-black list-none  w-30px h-30px f-c-c hover:scale-120 
                    transition-all duration-300 cursor-pointer border-1 
                    border-dotted border-coolGray
                    ${index === active ? "border-red" : "border-black"}`}
            key={item.name}
            onClick={() => selectIcon(item, index)}
          >
            <IconFont type={"icon-" + item.name} />
          </li>
        ))}
      </ul>
    );
  }, [iconList, active]);

  const [tableData, setTableData] = useState<ITable[]>([]);

  const getAllRoutes = async () => {
    const res = await getAllRoutesApi(page);
    setTableData(res.data.list);
    setPage(res.data.page);
  };

  useEffect(() => {
    getAllRoutes();
  }, [page.size, page.current]);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current: number,
    size: number
  ) => {
    setPage((prevState: IPage) => {
      return { ...prevState, size };
    });
  };

  const handleQuery: PaginationProps["onChange"] = (current: number) => {
    setPage((prevState: IPage) => {
      return { ...prevState, current };
    });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = (title: string, row?: ITable) => {
    setTitle(title);
    setModalVisible(true);
    console.log(row, "row");
    if (row) {
      form.setFieldsValue(row);
      setInpVal(row!.icon);
      setCurrentIcon(row!.icon);
      setId(row!.id);
    }
  };

  // 关闭Modal重置所有状态
  const resetStatus = () => {
    form.resetFields();
    setInpVal("");
    setCurrentIcon("");
  };

  const closeModal = (modelVisible: boolean) => setModalVisible(modelVisible);
  const handleEditRow = (value: any) => {
    console.log(value);
  };

  const formSubmit = () => {
    form.submit();
  };

  // 删除路由
  const handleRemoveRow = async (record: ITable) => {
    console.log(record, "record");
    try {
      await removeRouteApi({ id: record.id });
      getAllRoutes();
    } catch (e) { }
  };

  const modalSlot = useMemo(() => {
    return (
      <Form
        size="large"
        form={form}
        name="edit"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="路由路径"
          name="path"
          rules={[{ required: true, message: "请输入路由路径!" }]}
        >
          <Input placeholder="请输入路由路径" />
        </Form.Item>

        <Form.Item<FieldType>
          label="路由标题"
          name="title"
          rules={[{ required: true, message: "请输入路由标题!" }]}
        >
          <Input placeholder="请输入路由标题" />
        </Form.Item>
        <Form.Item<FieldType>
          label="组件名"
          name="component"
          rules={[
            { required: true, message: "请输入组件名/必须以大写字母开头!" },
          ]}
        >
          <Input placeholder="请输入组件名" />
        </Form.Item>
        <Form.Item<FieldType>
          label="父级路由"
          name="pid"
          rules={[{ required: true, message: "请选择父级路由!" }]}
        >
          <Select placeholder="请选择">
            {parentRoutes.map((item: MenuData) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="权限选择"
          name="permission"
          rules={[{ required: true, message: "请选择该路由权限!" }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="请选择该路由权限"
            options={permissions}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="图标"
          name="icon"
          rules={[{ required: true, message: "请选择图标!" }]}
        >
          <Tooltip
            open={visible}
            placement="bottomLeft"
            color="#fff"
            title={content}
          >
            <Input
              onClick={() => setVisible(!visible)}
              value={inpVal}
              addonBefore={inputBeforeIcon}
              className="w-400px"
            />
          </Tooltip>
        </Form.Item>
      </Form>
    );
  }, [parentRoutes, permissions, visible, currentIcon, inpVal]);

  return (
    <div>
      <Button
        className="mb-10px"
        type="primary"
        onClick={() => openModal("新增路由")}
      >
        新增路由
      </Button>
      <Table
        bordered
        columns={columns}
        pagination={false}
        dataSource={tableData}
        rowKey="id"
      />
      <Pagination
        className="mt-20px text-right"
        showQuickJumper
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={page.current}
        total={page.total}
        showTotal={(total) => `共 ${total} 条`}
        current={page.current}
        onChange={handleQuery}
      />
      <GModel
        slot={modalSlot}
        modalVisible={modalVisible}
        closeModal={closeModal}
        resetStatus={resetStatus}
        title={title}
        okText="确定"
        cancelText="关闭"
        confirm={formSubmit}
      ></GModel>
    </div>
  );
};

export default RouteMag;
