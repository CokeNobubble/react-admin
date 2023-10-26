import { FC, ReactElement } from "react";
import { ColorPicker, Switch, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { SET_THEME_COLOR, SET_THEME_MODE } from "@/store/contant";
import type { Color } from "antd/es/color-picker";
import { IState } from "@/interface";

const Setting: FC = (): ReactElement => {
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

  return (
    <div className="flex items-center gap-20px">
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        onChange={toggleThemeMode}
        defaultChecked
      />
      <ColorPicker value={color} onChange={changeThemeColor} />
    </div>
  );
};

export default Setting;
