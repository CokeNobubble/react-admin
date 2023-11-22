import { FC, ReactElement, useEffect, useMemo } from "react";
import { Avatar, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { IState } from "@/interface";
import access from "@/assets/icons/kehufangwen.svg";
import message from "@/assets/icons/xiaoxi.svg";
import money from "@/assets/icons/shijishouru.svg";
import older from "@/assets/icons/gouwuche.svg";
import SmallCard from "@/components/SmallCard";
import BarGraph from "@/components/chart/BarGraph";
import PieGraph from "@/components/chart/PieGraph";
import RadarGraph from "@/components/chart/RadarGraph";
import { IUserinfo } from "@/store/reducers/userinfo";

const Home: FC = (): ReactElement => {
  const userinfo: IUserinfo = useSelector(
    (state: IState) => state.userinfoReducer
  );
  const greet = useMemo(() => {
    const hour: number = new Date().getHours();
    if (hour >= 0 && hour < 6) {
      return "夜深了🌙";
    } else if (hour >= 6 && hour < 12) {
      return "上午好☀";
    } else if (hour >= 12 && hour < 18) {
      return "下午好☀";
    } else {
      return "晚午好🌙";
    }
  }, []);

  const url = useMemo(() => {
    return `http://localhost:3005/${userinfo.user_pic}`;
  }, [userinfo.user_pic]);

  useEffect(() => {
    document.title = "首页";
  });

  return (
    <div className="c-[var(--text-color)] flex gap-30px flex-col h-full  w-full">
      <Row>
        <Col span={24}>
          <div className="shadow-[var(--box-shadow-base)] p-20px flex items-center rounded-lg justify-between">
            <div className="flex items-center gap-10px">
              <Avatar src={url} size={55}></Avatar>
              <h1 className="ml-10px text-16px">Hi,{userinfo.nickname}</h1>
            </div>
            <h1>{greet}</h1>
            <h1>github</h1>
          </div>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <SmallCard count={9999} svgSrc={access} title="访问数" />
        <SmallCard count={9999} svgSrc={message} title="消息数" />
        <SmallCard count={9999} svgSrc={money} title="收入金额" />
        <SmallCard count={9999} svgSrc={older} title="订单数" />
      </Row>
      <Row className="flex flex-1" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col>
          <BarGraph height="400px" title="柱状图" id="BarGraph"></BarGraph>
        </Col>
        <Col>
          <PieGraph height="400px" title="饼图" id="PieGraph"></PieGraph>
        </Col>
        <Col>
          <RadarGraph
            height="400px"
            title="雷达图"
            id="RadarGraph"
          ></RadarGraph>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
