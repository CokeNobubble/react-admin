import { FC, ReactElement, useEffect } from "react";
import * as echarts from "echarts";
import { useDebounceFn } from "ahooks";

type EChartsOption = echarts.EChartsOption;

interface IProps {
  id: string;
  className?: string;
  title: string;
  height: string;
}

const PeiGraph: FC<IProps> = ({
  id = "pieChart",
  className = "",
  title,
  height,
}): ReactElement => {
  const handleResize = () => {
    const chartDom = document.getElementById(id);
    const chart = echarts.init(chartDom as HTMLElement);
    chart.resize();
  };

  const { run } = useDebounceFn(handleResize, {
    wait: 0,
  });

  useEffect(() => {
    initChart();
    window.addEventListener("resize", run);
    return () => {
      window.removeEventListener("resize", run);
    };
  }, [window.innerHeight, window.innerWidth]);

  const initChart = () => {
    const chartDom = document.getElementById(id);
    const chart = echarts.init(chartDom as HTMLElement);
    let option: EChartsOption = {
      grid: {
        left: "2%",
        right: "2%",
        bottom: "10%",
        containLabel: true,
      },
      legend: {
        top: "bottom",
        textStyle: {
          color: "#999",
        },
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 130],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 1,
            color: function (params: any) {
              //自定义颜色
              const colorList = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
              return colorList[params.dataIndex];
            },
          },
          data: [
            { value: 26, name: "家用电器" },
            { value: 27, name: "户外运动" },
            { value: 24, name: "汽车用品" },
            { value: 23, name: "手机数码" },
          ],
        },
      ],
    };
    option && chart.setOption(option);
  };
  return (
    <div className="shadow-[var(--box-shadow-base)] p-20px  w-500px flex flex-col">
      <h1>{title}</h1>
      <div
        style={{ height, width: "100%" }}
        id={id}
        className={`${className}`}
      ></div>
    </div>
  );
};

export default PeiGraph;

// 柱状图
