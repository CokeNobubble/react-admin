// 处理窗口变化图表重新渲染

import { useDebounceFn } from "ahooks";
import * as echarts from "echarts";

function useResizeChart(id: string) {
  const handleResize = () => {
    const chartDom = document.getElementById(id);
    const myChart = echarts.init(chartDom as HTMLElement);
    myChart.resize();
  };

  const { run: chartResize } = useDebounceFn(handleResize, {
    wait: 100,
  });

  return {
    chartResize,
  };
}

export { useResizeChart };
