import { FC, ReactElement, useEffect } from "react";
import { getDeptListApi } from "@/server/dept";

const DepartmentMag: FC = (): ReactElement => {
  const getDeptList = async () => {
    const res = await getDeptListApi();
    console.log(res, "部门列表");
  };

  useEffect(() => {
    getDeptList();
  }, []);

  return (
    <div className="flex gap-20px" id="content">
      <div className="bg-blue w-200px h-200px"></div>
      <div className="bg-blue w-200px h-200px"></div>
      <div className="bg-blue w-200px h-200px"></div>
      <div className="bg-blue w-200px h-200px"></div>
    </div>
  );
};

export default DepartmentMag;
