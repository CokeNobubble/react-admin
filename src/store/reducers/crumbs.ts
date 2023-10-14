import { IAction } from '@/interface';
import { ADD_TAG, ClOSE_TAG, CLICK_TAG } from '../contant';

export type ITag = {
  key: string;
  label: string;
  isClose: boolean;
  path: string
};

export type ICrumbs = {
  activeTag: ITag;
  tags: ITag[];
};

let initState: ICrumbs = {
  tags: [{
    key: 'home',
    label: '首页',
    isClose: false,
    path: '/home'
  }],
  activeTag: { key: 'home', label: '首页', isClose: false, path: '/home' },
};
export default (state = initState, action: IAction<ICrumbs>) => {
  const { type, data } = action;
  switch (type) {
    case ADD_TAG:
    case ClOSE_TAG:
      return { ...state, activeTag: data.activeTag, tags: data.tags };
    case CLICK_TAG:
      return { ...state, activeTag: data.activeTag };
    default:
      return state;
  }
};
