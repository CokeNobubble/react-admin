import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { SET_THEME_COLOR, SET_THEME_MODE } from "@/store/contant";
import type { Color } from "antd/es/color-picker";
import { IState } from "@/interface";
import { ReactElement, FC, useEffect } from "react";
import { Divider, ColorPicker, theme } from "antd";
import SwitchMode from "@/components/SwitchMode";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
type Props = {
  title: String;
  onClose: Function;
};

const Setting: FC<Props> = ({ title, onClose }): ReactElement => {
  const dispatch = useDispatch();
  const color = useSelector((state: IState) => state.theme.themeColor);

  const changeThemeColor = (val: Color) => {
    console.log(val);
    dispatch({ type: SET_THEME_COLOR, data: `#${val.toHex()}` });
  };

  const sideBarMode = useSelector(
    (state: IState) => state.sidebarMode.sidebarMode
  );

  const toggleThemeMode = (val: boolean) => {
    if (val) {
      dispatch({ type: SET_THEME_MODE, data: theme.defaultAlgorithm });
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      dispatch({ type: SET_THEME_MODE, data: theme.darkAlgorithm });
      document.documentElement.className = "dark";
      localStorage.setItem("theme", "dark");
    }
  };

  const toggleSidebarMode = (e: RadioChangeEvent) => {
    dispatch({ type: e.target.value, data: e.target.value });
    console.log(e.target.value);
  };

  useEffect(() => {
    const mode = document.documentElement.getAttribute("class");
    if (mode === "dark") {
      dispatch({ type: SET_THEME_MODE, data: theme.darkAlgorithm });
    } else {
      dispatch({ type: SET_THEME_MODE, data: theme.defaultAlgorithm });
    }
  }, [document.documentElement.getAttribute("class")]);

  return (
    <div>
      <div className="border-#eee b-b-1px flex items-center p-x-20px p-y-8px">
        <CloseOutlined onClick={() => onClose()} rev="true" />
        <h3 className="ml-8px">{title}</h3>
      </div>
      <div className="p-20px">
        <div className="flex items-center justify-between">
          <h4>主题切换</h4>
          <SwitchMode></SwitchMode>
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <h4>主题颜色</h4>
          <ColorPicker value={color} onChange={changeThemeColor} />
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <h4>SideBar模式</h4>
          <Radio.Group
            onChange={toggleSidebarMode}
            defaultValue={sideBarMode || "vertical"}
          >
            <Radio.Button value="vertical">垂直</Radio.Button>
            <Radio.Button value="horizontal">水平</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default Setting;
