import { FC, ReactElement, useEffect } from "react";
import * as echarts from "echarts";
import { useDebounceFn } from "ahooks";

type EChartsOption = echarts.EChartsOption;

interface IProps {
  id: string;
  className?: string;
  title: string;
}

const BarGraph: FC<IProps> = ({
  id = "barChart",
  className = "",
  title,
}): ReactElement => {
  let chart: echarts.ECharts;

  const handleResize = () => {
    chart.resize();
  };

  const { run } = useDebounceFn(handleResize, {
    wait: 100,
  });

  useEffect(() => {
    initChart();
    window.addEventListener("resize", run);
  }, [window.innerHeight, window.innerWidth]);

  const initChart = (): void => {
    const chartDom = document.getElementById(id);
    chart = echarts.init(chartDom as HTMLElement);
    const option: EChartsOption = {
      grid: {
        left: "2%",
        right: "2%",
        bottom: "10%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      legend: {
        x: "center",
        y: "bottom",
        data: ["收入", "毛利润", "收入增长率", "利润增长率"],
        textStyle: {
          color: "#999",
        },
      },
      xAxis: [
        {
          type: "category",
          data: ["浙江", "北京", "上海", "广东", "深圳"],
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          min: 0,
          max: 10000,
          interval: 2000,
          axisLabel: {
            formatter: "{value} ",
          },
        },
        {
          type: "value",
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: "{value}%",
          },
        },
      ],
      series: [
        {
          name: "收入",
          type: "bar",
          data: [7000, 7100, 7200, 7300, 7400],
          barWidth: 20,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
        },
        {
          name: "毛利润",
          type: "bar",
          data: [8000, 8200, 8400, 8600, 8800],
          barWidth: 20,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#25d73c" },
              { offset: 0.5, color: "#1bc23d" },
              { offset: 1, color: "#179e61" },
            ]),
          },
        },
        {
          name: "收入增长率",
          type: "line",
          yAxisIndex: 1,
          data: [60, 65, 70, 75, 80],
          itemStyle: {
            color: "#67C23A",
          },
        },
        {
          name: "利润增长率",
          type: "line",
          yAxisIndex: 1,
          data: [70, 75, 80, 85, 90],
          itemStyle: {
            color: "#409EFF",
          },
        },
      ],
    };
    option && chart.setOption(option);
  };

  return (
    <div className="shadow-xl p-20px flex-1 flex flex-col">
      <h1>{title}</h1>
      <div id={id} className={`${className} flex-1`}></div>
    </div>
  );
};

export default BarGraph;

// 柱状图
