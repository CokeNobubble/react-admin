import { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/interface';

const Home: FC = (): ReactElement => {
  const count = useSelector((state: IState) => state.count)
  const dispatch = useDispatch()


  const add = () => {
    dispatch({ type: 'add', data: 1 })
  }

  return (
      <>
        <div>首页</div>
        <h1>count:{ count }</h1>
        <button onClick={ add }>加法</button>
        <button onClick={ () => dispatch({ type: 'reduce', data: 1 }) }>减法</button>
      </>
  )
}

export default Home
