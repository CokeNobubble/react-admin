import { FC, ReactElement, useEffect, useState } from "react";
import { getDeptListApi, getDepartmentUserApi } from "@/server/dept";
import { Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import { IPage } from "@/interface";
import { log } from "console";

type DeptData = {
  children: DeptData[];
  id: number;
  name: string;
  pid: number;
};
const DepartmentMag: FC = (): ReactElement => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [page, setPage] = useState<IPage>({
    size: 10,
    current: 1,
    total: 0,
  });

  const getDeptList = async () => {
    const res = await getDeptListApi();
    const treeData = handleTreeData(res.data);
    setTreeData(treeData);
    console.log(treeData, "部门列表");
  };

  const handleTreeData = (data: DeptData[]) => {
    return data.map((item: DeptData) => {
      let data: DataNode = {
        title: item.name,
        key: item.id,
      };
      if (item.children) {
        data.children = handleTreeData(item.children);
      }
      return data;
    });
  };

  // 选择当前节点
  const selectNode = async (selectedKeys: number[]) => {
    // console.log(selectedKeys, e);
    if (selectedKeys.length > 0) {
      const res = await getDepartmentUserApi(
        Object.assign(page, { deptId: selectedKeys[0] })
      );
      console.log(res, "ressss");
    }
  };

  const onRightClick = (e, node) => {
    console.log(e, node);
  };

  useEffect(() => {
    getDeptList();
  }, []);

  return (
    <div>
      <Tree
        showLine
        onSelect={selectNode}
        defaultExpandAll
        defaultSelectedKeys={[1]}
        treeData={treeData}
      />
    </div>
  );
};

export default DepartmentMag;
