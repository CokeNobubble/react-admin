import React, { FC, ReactElement } from "react";
import { Button, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/interface";
import { ITag } from "@/store/reducers/crumbs";
import { CLICK_TAG, ClOSE_TAG } from "@/store/contant";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

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
    <div className="bg-#fff p-5px b-1px border-#eee ">
      <div className="flex w100% gap-6px">
        {tags.map((item: ITag) => {
          return (
            <Button
              className="border-1px border-#d9d9d9 pr-5px pl-5px flex items-center"
              type={item.key === activeTag.key ? "primary" : "default"}
              style={{ cursor: "pointer", fontSize: "12px" }}
              key={item.label}
              size="small"
              onClick={() => handleClickTag(item)}
            >
              <span>{item.label}</span>
              {item.isClose ? (
                <CloseOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseTag(item);
                  }}
                  rev="true"
                />
              ) : null}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Crumbs;
