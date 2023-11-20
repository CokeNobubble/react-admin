import { FC, ReactElement } from "react";
import { Button } from "antd";

const Index: FC = (): ReactElement => {
  const handleClick = () => {
    console.log(123);
  };
  return (
    <div>
      <Button onClick={handleClick}>123</Button>
    </div>
  );
};

export default Index;
