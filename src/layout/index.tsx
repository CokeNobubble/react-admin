import {
  ReactElement,
  useState,
  FC,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import SideBar from "@/layout/SideBar";
import MyHeader from "@/layout/Header";
import MyContent from "@/layout/Content";
import Crumbs from "./Crumbs";
import RightPanel from "@/components/RightPanel";
import Setting from "./Setting";

const { Content, Header, Footer } = Layout;
import { Breadcrumb, Menu, theme } from "antd";
import { useSelector } from "react-redux";
import { IState } from "@/interface";
import { HORIZONTAL } from "@/store/contant";

const MyLayout: FC = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const rightPanelRef = useRef<HTMLElement | null>(null);
  const onClose = useCallback(() => {
    rightPanelRef.current?.click();
  }, []);
  useEffect(() => {
    // 访问根路由 重定向到首页
    navigate("/home");
  }, []);

  const sidebarMode = useSelector(
    (state: IState) => state.sidebarMode.sidebarMode
  );

  return (
    <Layout style={{ height: "100%" }}>
      <SideBar collapsed={collapsed} width={0} />
      <Layout>
        {sidebarMode === HORIZONTAL ? (
          ""
        ) : (
          <MyHeader setCollapsed={setCollapsed} collapsed={collapsed} />
        )}
        <Crumbs></Crumbs>
        <MyContent />
      </Layout>
      <RightPanel
        ref={rightPanelRef}
        slot={<Setting onClose={onClose} title="全局设置" />}
      />
    </Layout>
  );
};

export default MyLayout;
