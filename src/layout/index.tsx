import { ReactElement, useState, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import SideBar from "@/layout/SideBar";
import Header from "@/layout/Header";
import MyContent from "@/layout/Content";
import MyDrawer from "@/layout/MyDrawer";
import Crumbs from "./Crumbs";
import RightPanel from "@/components/RightPanel";
import Setting from "./Setting";

const MyLayout: FC = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // 访问根路由 重定向到首页
    navigate("/home");
  }, []);

  return (
    <Layout style={{ height: "100%" }}>
      <SideBar collapsed={collapsed} />
      <Layout>
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Crumbs></Crumbs>
        <MyContent />
      </Layout>
      <RightPanel top="200" slot={<Setting title="全局设置" />}></RightPanel>
    </Layout>
  );
};

export default MyLayout;
