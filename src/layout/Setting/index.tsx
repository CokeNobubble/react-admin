import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { SET_THEME_COLOR, SET_THEME_MODE } from "@/store/contant";
import type { Color } from "antd/es/color-picker";
import { IState } from "@/interface";

import { ReactElement, FC } from "react";
import { Switch, Divider, ColorPicker, theme } from "antd";

type Props = {
  title: String;
  onClose:Function
};

const Setting: FC<Props> = ({ title,onClose }): ReactElement => {
  const dispatch = useDispatch();
  const color = useSelector((state: IState) => state.theme.themeColor);

  const changeThemeColor = (val: Color) => {
    console.log(val);
    dispatch({ type: SET_THEME_COLOR, data: `#${val.toHex()}` });
  };

  const toggleThemeMode = (val: boolean) => {
    if (val) {
      dispatch({ type: SET_THEME_MODE, data: theme.defaultAlgorithm });
      // document.documentElement.style.color = "var(--light-font-color)";
      document.documentElement.className = "light";
    } else {
      dispatch({ type: SET_THEME_MODE, data: theme.darkAlgorithm });
      document.documentElement.className = "dark";
      // document.documentElement.style.color = "var(--light-font-color)";
      // document.documentElement.style.color = "#fff";
    }
  };
  return (
    <div>
      <div className="border-#eee b-b-1px flex items-center p-x-20px p-y-8px">
        <CloseOutlined onClick={() => onClose()} rev="true" />
        <h3 className="ml-8px">{title}</h3>
      </div>
      <div className="p-20px">
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
      </div>
    </div>
  );
};

export default Setting;
