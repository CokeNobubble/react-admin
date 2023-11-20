import { FC, ReactElement, useState } from "react";
import { ColorPicker, Switch, theme } from "antd";
import { Button, Divider, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckOutlined,
  CloseOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { SET_THEME_COLOR, SET_THEME_MODE } from "@/store/contant";
import type { Color } from "antd/es/color-picker";
import { IState } from "@/interface";

const MyDrawer: FC = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const [btnPosition, setBtnPosition] = useState("right-0");
  const dispatch = useDispatch();
  const color = useSelector((state: IState) => state.theme.themeColor);

  const changeThemeColor = (val: Color) => {
    console.log(val);
    dispatch({ type: SET_THEME_COLOR, data: `#${val.toHex()}` });
  };

  const toggleThemeMode = (val: boolean) => {
    if (val) {
      dispatch({ type: SET_THEME_MODE, data: theme.defaultAlgorithm });
      document.documentElement.style.color = "#333";
    } else {
      dispatch({ type: SET_THEME_MODE, data: theme.darkAlgorithm });
      document.documentElement.style.color = "#fff";
    }
  };

  const showDrawer = () => {
    setBtnPosition(() => {
      if (open) {
        return "right-0";
      } else {
        return "right-378px";
      }
    });
    setOpen((prev) => !prev);
  };

  const onClose = () => {
    setBtnPosition("right-0");
    setOpen(false);
  };
  // <CloseOutlined />
  return (
    <div>
      <Button
        className={`z-9999 fixed top-200px  ${btnPosition}`}
        type="primary"
        icon={
          open ? <CloseOutlined rev="true" /> : <SettingOutlined rev="true" />
        }
        onClick={showDrawer}
      />
      <Drawer title="全局配置" placement="right" onClose={onClose} open={open}>
        <div className="flex items-center justify-between">
          <h4>主题切换</h4>
          <Switch
            checkedChildren={<CheckOutlined rev="true" />}
            unCheckedChildren={<CloseOutlined rev="true" />}
            onChange={toggleThemeMode}
            defaultChecked
          />
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <h4>主题颜色</h4>
          <ColorPicker value={color} onChange={changeThemeColor} />
        </div>
      </Drawer>
    </div>
  );
};
export default MyDrawer;
