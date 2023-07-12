import { FC, ReactElement, useEffect } from 'react';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

interface IProps {
  id?: string,
  className?: string,
  height: string,
  width: string
}

const RadarGraph: FC<IProps> = (
    {
      id = 'radarChart',
      className = '',
      width,
      height
    }): ReactElement => {

  useEffect(() => {
    const chartDom = document.getElementById(id)
    const myChart = echarts.init(chartDom as HTMLElement);
    const option: EChartsOption = {
      grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['预定数量', '下单数量', '发货数量'],
        textStyle: {
          color: '#999'
        }
      },
      radar: {
        // shape: 'circle',
        radius: '60%',
        indicator: [
          { name: '家用电器' },
          { name: '服装箱包' },
          { name: '运动户外' },
          { name: '手机数码' },
          { name: '汽车用品' },
          { name: '家具厨具' }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          itemStyle: {
            borderRadius: 6,
            color: function (params: any) {
              //自定义颜色
              const colorList = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'];
              return colorList[params.dataIndex];
            }
          },
          data: [
            {
              value: [400, 400, 400, 400, 400, 400],
              name: '预定数量'
            },
            {
              value: [300, 300, 300, 300, 300, 300],
              name: '下单数量'
            },
            {
              value: [200, 200, 200, 200, 200, 200],
              name: '发货数量'
            }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
    window.onresize = () => {
      myChart.resize()
    }
  }, [])

  return (
      <div className="shadow-xl w100% p-20px">
        <h1>雷达图</h1>
        <div style={ { width, height } } id={ id } className={ className }></div>
      </div>
  )
}

export default RadarGraph
