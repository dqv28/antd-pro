import { Avatar, Button, Skeleton, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { ProCard, ProList } from '@ant-design/pro-components';
import { Msg, listMsg, resetEmoticon, sendEmoticon } from '@/services/ant-design-pro/api';

import styles from './index.less';
import { CloseOutlined, LikeOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  EllipsisIcon,
  HeartIcon,
  PandaIcon,
  QuoteIcon,
  ShareIcon,
  SquareCheckIcon,
} from '@/components/Icons';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  cnsMessage: string;
};

const emojis = [
  {
    id: 1,
    icon: <HeartIcon style={{ color: '#eb2926', fontSize: 16, lineHeight: '24px' }} />,
  },
];

const ConversationContentList: React.FC<any> = (props: Props) => {
  const [msgData, setMsgData] = useState<any>([]);
  const [totalMsg, setTotalMsg] = useState(10);
  const [heartIcon, setHeartIcon] = useState(false);
  const actionRef: any = useRef();

  useEffect(() => {
    actionRef?.current?.reload();
  }, [heartIcon || props.cnsMessage || totalMsg]);

  const loadMoreData = () => {
    setTotalMsg((prevTotal: number) => prevTotal + 5);
    const fetchMsgApi = async () => {
      await listMsg(totalMsg).then((res: any) => {
        setMsgData([...msgData, res]);
      });
    };
    fetchMsgApi();
  };

  const sendEmot = (id: number) => {
    const emoticon = async () => {
      await sendEmoticon(id).then(() => {
        setHeartIcon(!heartIcon);
      });
    };

    emoticon();
  };

  const resetEmot = (id: number) => {
    const reset = async () => {
      await resetEmoticon(id).then(() => {
        setHeartIcon(!heartIcon);
      });
    };

    reset();
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className={styles.content_date}>23:17 Hôm qua</span>
      </div>

      <InfiniteScroll
        dataLength={msgData.length}
        next={loadMoreData}
        hasMore={totalMsg < 21}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage=""
        scrollableTarget="scrollableDiv"
        scrollThreshold={0.99}
      >
        <ProList<Msg>
          request={async () => {
            const data = await listMsg(totalMsg);

            return {
              data,
            };
          }}
          actionRef={actionRef}
          renderItem={(msg: Msg) => (
            <div
              className={styles.msg_list_item}
              style={{
                display: 'flex',
                justifyContent: msg.mine ? '' : 'normal',
                flexDirection: msg.mine ? 'row-reverse' : 'row',
              }}
            >
              {!msg.mine && (
                <Avatar src={msg.image} size={44} style={{ border: '1px solid #fff' }} />
              )}
              <ProCard
                className={styles.content_item}
                title={!msg.mine && msg.name}
                bordered
                style={{ backgroundColor: msg.mine ? '#e5efff' : '#fff' }}
                children={
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {msg.desc} {(msg.emoji && <PandaIcon style={{ fontSize: 30 }} />) || ''}
                    <span style={{ fontSize: 12, color: '#476285', marginTop: 8 }}>21:44</span>
                    {msg.emoticon > 0 ? (
                      <Button
                        size="small"
                        type="text"
                        className={styles.heart_icon}
                        icon={<HeartIcon style={{ color: '#eb2926', fontSize: 14 }} />}
                        children={
                          <span style={{ marginLeft: 1, fontSize: 14 }}>{msg.emoticon}</span>
                        }
                      />
                    ) : (
                      <Button
                        size="small"
                        shape="circle"
                        type="text"
                        className={styles.like_icon}
                        icon={<LikeOutlined />}
                      />
                    )}
                    <Space className={styles.emoji_group}>
                      {emojis.map((emoji: any) => (
                        <Button
                          className={styles.emoji_item}
                          onClick={() => {
                            sendEmot(msg.id);
                          }}
                          type="text"
                          size="small"
                          children={emoji.icon}
                        />
                      ))}

                      {msg.emoticon > 0 && (
                        <Button
                          className={styles.emoji_item}
                          onClick={() => {
                            resetEmot(msg.id);
                          }}
                          type="text"
                          size="small"
                          icon={<CloseOutlined />}
                        />
                      )}
                    </Space>
                  </div>
                }
                bodyStyle={{ padding: '4px 12px 12px', fontSize: 15, color: '#081c36' }}
                headStyle={{ padding: '0 12px' }}
              />
              <div
                className={styles.msg_btn_group_wrapper}
                style={{
                  display: 'flex',
                  alignItems: 'end',
                }}
              >
                <Space className={styles.msg_btn_group}>
                  <Button
                    className={styles.msg_action}
                    type="text"
                    size="small"
                    children={<QuoteIcon className={styles.msg_icon} />}
                  />
                  <Button
                    className={styles.msg_action}
                    type="text"
                    size="small"
                    children={<ShareIcon className={styles.msg_icon} />}
                  />
                  <Button
                    className={styles.msg_action}
                    type="text"
                    size="small"
                    children={<SquareCheckIcon className={styles.msg_icon} />}
                  />
                  <Button
                    className={styles.msg_action}
                    type="text"
                    size="small"
                    children={<EllipsisIcon className={styles.msg_icon} />}
                  />
                </Space>
              </div>
            </div>
          )}
          cardProps={{
            bodyStyle: {
              padding: 0,
            },
            style: {
              backgroundColor: 'transparent',
            },
          }}
        />
      </InfiniteScroll>
    </>
  );
};

export default ConversationContentList;
