import React, { FC, ReactElement } from 'react';
import { Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/interface';
import { ITag } from '@/store/reducers/crumbs';
import { CLICK_TAG, ClOSE_TAG } from '@/store/contant';
import { useNavigate } from 'react-router-dom';

const Crumbs: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = useSelector((state: IState) => state.crumbs.tags);
  const activeTag = useSelector((state: IState) => state.crumbs.activeTag);
  // 关闭tag
  const handleCloseTag = (tag: ITag) => {
    const closeTagIndex = tags.findIndex((item: ITag) => item.key === tag.key);
    let newTags = [...tags];
    let atvTag = { ...activeTag };
    if (tag.key === activeTag.key) {
      atvTag = newTags[closeTagIndex - 1];
    }
    newTags.splice(closeTagIndex, 1);
    dispatch({ type: ClOSE_TAG, data: { activeTag: atvTag, tags: newTags } });
    navigate(atvTag.path);
  };

  // 点击tag
  const handleClickTag = (item: ITag) => {
    dispatch({ type: CLICK_TAG, data: { activeTag: { ...item } } });
    navigate(item.path);
  };

  return (
      <div>
        { tags.map((item: ITag) => {
          return (
              <Tag
                  style={ { cursor: 'pointer', fontSize: '14px' } }
                  onClick={ () => handleClickTag(item) }
                  onClose={ (e) => {
                    e.preventDefault();
                    handleCloseTag(item);
                  } }
                  closable={ item.isClose }
                  key={ item.label }
                  color={ item.key === activeTag.key ? '#2db7f5' : 'processing' }
              >
                { item.label }
                { item.isClose }
              </Tag>
          );
        }) }
      </div>
  );
};

export default Crumbs;
