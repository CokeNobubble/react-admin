import { FC, ReactElement } from 'react';
import { Col } from 'antd';
import { ReactSVG } from 'react-svg';
import home from '@/views/Home/index.module.css';

interface IProps {
  svgSrc: string,
  colSpan?: number,
  title: string,
  count: number
}

const SmallCard: FC<IProps> = ({ svgSrc,
      colSpan = 6,
      title,
      count
}): ReactElement => {

  return (
      <Col className="gutter-row" span={ colSpan }>
        <div className="shadow-lg p-20px flex rounded-lg justify-between">
          <ReactSVG className={ home.wrapper } src={ svgSrc }/>
          <div className="c-#606297">
            <h1>{ title }</h1>
            <h1>{ count }</h1>
          </div>
        </div>
      </Col>
  )
}


export default SmallCard
