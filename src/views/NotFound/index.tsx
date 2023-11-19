import { FC, ReactElement } from "react";
import { Button } from "antd";
import { NavigateFunction, useNavigate } from "react-router-dom";

const NotFound: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const toHome = (): void => navigate("/");

  return (
    <div className="wh-full flex justify-center items-center">
      <div className="flex flex-col gap-30px justify-center">
        <h2 className="text-center">抱歉!找不到页面了</h2>
        <img
          src="src/assets/images/404.png"
          alt=""
          className="w-500px h-500px"
        />
        <Button size="large" onClick={toHome} type="primary">
          去首页
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
