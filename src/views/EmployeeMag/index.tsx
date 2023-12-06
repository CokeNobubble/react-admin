import React, { ReactElement, useEffect, useState } from "react";

const Employee: React.FC = (): ReactElement => {
  const [data, setData] = useState<number[]>([]);
  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      setData((data) => [...data, i]);
    }
  }, []);
  return (
    <>
      {data.map((item: any) => {
        return <div key={item}>{item}</div>;
      })}
    </>
  );
};
export default Employee;
