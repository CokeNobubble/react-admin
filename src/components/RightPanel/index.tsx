import {
  FC, forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "antd";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";

type Props = {
  slot: ReactNode;
  top: String;
};

const RightPanel: FC<Props> = forwardRef(({ slot, top = "200" },ref): ReactElement => {
  const [show, setShow] = useState(false);
  const rightPanel = useRef<HTMLDivElement | null>(null);
  const [panelPos, setPanelPos] = useState("right--300px");
  function insertBody() {
    const app = document.querySelector("#app");
    app?.appendChild(rightPanel.current as HTMLDivElement);
  }

  const togglePanel = () => {
    if (show) {
      setPanelPos("right--300px");
    } else {
      setPanelPos("right-0");
    }
    // console.log(show, "show");
    setShow((prev) => !prev);
  };

  const closePanel = () => {
    togglePanel();
  };

  useEffect(() => {
    insertBody();
    return () => rightPanel.current?.remove();
  }, []);

  return (
    <div ref={rightPanel} className="duration-300">
      <div
        onClick={closePanel}
        className="z-99 opacity-20 fixed bg-#000 top-0 left-0 wh-full"
        style={{ display: show ? "block" : "none" }}
      ></div>
      <div
        className={`z-999 fixed top-0 max-w-300px wh-full bg-#fff duration-300 ${panelPos}`}
      >
        <Button
          onClick={togglePanel}
          className={`absolute z-999 left--32px top-${top}px`}
          ref={ref}
          type="primary"
          icon={
            show ? <CloseOutlined rev="true" /> : <SettingOutlined rev="true" />
          }
        ></Button>
        <div>{slot}</div>
      </div>
    </div>
  );
})

export default RightPanel;
