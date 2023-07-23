import { combineReducers } from 'redux';

import userReducer from './user'
import userinfoReducer from '@/store/reducers/userinfo';
import count from '@/store/reducers/count';
import theme from './theme'

export default combineReducers({
  userReducer,
  userinfoReducer,
  count,
  theme
})
