import { FC, ReactElement, useEffect } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption

interface IProps {
  id?: string,
  className?: string,
  height: string,
  width: string
}

const BarGraph: FC<IProps> = (
    {
      id = 'barChart',
      width,
      height,
      className = ''
    }): ReactElement => {

  useEffect(() => {
    const chartDom = document.getElementById(id)
    const myChart = echarts.init(chartDom as HTMLElement);
    const option: EChartsOption = {
      grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['收入', '毛利润', '收入增长率', '利润增长率'],
        textStyle: {
          color: '#999',
        },
      },
      xAxis: [
        {
          type: 'category',
          data: ['浙江', '北京', '上海', '广东', '深圳'],
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: 10000,
          interval: 2000,
          axisLabel: {
            formatter: '{value} ',
          },
        },
        {
          type: 'value',
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: '{value}%',
          },
        },
      ],
      series: [
        {
          name: '收入',
          type: 'bar',
          data: [7000, 7100, 7200, 7300, 7400],
          barWidth: 20,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
        },
        {
          name: '毛利润',
          type: 'bar',
          data: [8000, 8200, 8400, 8600, 8800],
          barWidth: 20,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#25d73c' },
              { offset: 0.5, color: '#1bc23d' },
              { offset: 1, color: '#179e61' },
            ]),
          },
        },
        {
          name: '收入增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [60, 65, 70, 75, 80],
          itemStyle: {
            color: '#67C23A',
          },
        },
        {
          name: '利润增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [70, 75, 80, 85, 90],
          itemStyle: {
            color: '#409EFF',
          },
        },
      ],
    };
    option && myChart.setOption(option);

    window.onresize = () => {
      myChart.resize()
    }
  }, [])

  return (
      <div className="shadow-xl w100% p-20px">
        <h1>柱状图</h1>
        <div style={ { width, height } } id={ id } className={ className }></div>
      </div>
  )
}


export default BarGraph


// 柱状图
