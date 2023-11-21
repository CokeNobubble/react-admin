import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { FC, ReactElement, useState } from "react";

const FullScreen: FC = (): ReactElement => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleScreen = (val: boolean) => {
    setIsFullScreen(val);
    if (val) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      {isFullScreen ? (
        <FullscreenExitOutlined
          onClick={() => toggleScreen(false)}
          rev="true"
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ) : (
        <FullscreenOutlined
          onClick={() => toggleScreen(true)}
          rev="true"
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      )}
    </>
  );
};

export default FullScreen;
