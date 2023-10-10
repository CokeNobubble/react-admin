import { ReactElement, useState, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import SideBar from "@/layout/SideBar";
import Header from "@/layout/Header";
import MyContent from "@/layout/Content";

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
        <MyContent />
      </Layout>
    </Layout>
  );
};

export default MyLayout;
