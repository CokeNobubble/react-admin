import { useDispatch, useSelector } from "react-redux";
import { SET_THEME_MODE } from "@/store/contant";
import { ReactElement, FC, useEffect } from "react";
import { Switch, theme } from "antd";
import { ReactSVG } from "react-svg";
import sun from "@/assets/icons/sun.svg";
import moon from "@/assets/icons/moon.svg";
import { IState } from "@/interface";
const SwitchMode: FC = (): ReactElement => {
  const checked = useSelector((state: IState) => state.themeMode.checked);
  const dispatch = useDispatch();
  const toggleThemeMode = (val: boolean) => {
    if (val) {
      dispatch({
        type: SET_THEME_MODE,
        data: { mode: theme.defaultAlgorithm, checked: val },
      });
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      dispatch({
        type: SET_THEME_MODE,
        data: { mode: theme.darkAlgorithm, checked: val },
      });
      document.documentElement.className = "dark";
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const mode = document.documentElement.getAttribute("class");
    if (mode === "dark") {
      dispatch({
        type: SET_THEME_MODE,
        data: { mode: theme.darkAlgorithm, checked: false },
      });
    } else {
      dispatch({
        type: SET_THEME_MODE,
        data: { mode: theme.defaultAlgorithm, checked: true },
      });
    }
  }, [checked]);

  return (
    <Switch
      checked={checked}
      checkedChildren={
        <ReactSVG
          src={sun}
          beforeInjection={(svg) => {
            svg.setAttribute(
              "style",
              "width: 16px; height: 16px;margin-top:3px"
            );
          }}
        ></ReactSVG>
      }
      unCheckedChildren={
        <ReactSVG
          src={moon}
          beforeInjection={(svg) => {
            svg.setAttribute(
              "style",
              "width: 16px; height: 16px;margin-top:2px"
            );
          }}
        ></ReactSVG>
      }
      onChange={toggleThemeMode}
      defaultChecked
    />
  );
};

export default SwitchMode;
