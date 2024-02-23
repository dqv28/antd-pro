import { Avatar, Button, Skeleton, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { ProCard, ProList } from '@ant-design/pro-components';
import { type Msg, listMsg, resetEmoticon, sendEmoticon } from '@/services/ant-design-pro/api';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './index.less';
import { CloseOutlined, LikeOutlined } from '@ant-design/icons';
import {
  EllipsisIcon,
  HeartIcon,
  PandaIcon,
  QuoteIcon,
  ShareIcon,
  SquareCheckIcon,
} from '@/components/Icons';

type Props = {
  cnsMessage: string;
};

const emojis = [
  {
    id: 1,
    icon: <PandaIcon style={{ color: '#eb2926', fontSize: 16, lineHeight: '24px' }} />,
  },
  {
    id: 2,
    icon: <HeartIcon style={{ color: '#eb2926', fontSize: 16, lineHeight: '24px' }} />,
  },
];

const ConversationContentList: React.FC<any> = (props: Props) => {
  const [msgData, setMsgData] = useState<Msg[]>([]);
  const [totalMsg, setTotalMsg] = useState(10);
  const [heartIcon, setHeartIcon] = useState(false);
  const actionRef: any = useRef();
  const cnsRef: any = useRef(null);

  useEffect(() => {
    actionRef?.current?.reload();
  }, [heartIcon, props.cnsMessage, totalMsg]);

  useEffect(() => {
    cnsRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [props.cnsMessage]);

  const loadMoreData = () => {
    setTotalMsg((prevTotal: number) => prevTotal + 5);
    const fetchMsgApi = async () => {
      await listMsg(totalMsg).then((res: any) => {
        setMsgData([...msgData, res]);
      });
    };
    fetchMsgApi();
  };

  const sendEmot = ({ id, emotId }: any) => {
    const emoticon = async () => {
      await sendEmoticon(id, emotId).then(() => {
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
        hasMore={msgData.length < totalMsg}
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
          renderItem={(msg: Msg) => {
            return (
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
                  bodyStyle={{ padding: '4px 12px 12px', fontSize: 15, color: '#081c36' }}
                  headStyle={{ padding: '0 12px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {msg.desc} {(msg.emoji && <PandaIcon style={{ fontSize: 30 }} />) || ''}
                    <span style={{ fontSize: 12, color: '#476285', marginTop: 8 }}>21:44</span>
                    {msg.emoticon > 0 ? (
                      <Button
                        size="small"
                        type="text"
                        className={styles.heart_icon}
                        icon={emojis.map(
                          (emojiList: any) => emojiList.id === msg.emotId && emojiList.icon,
                        )}
                      >
                        <span style={{ marginLeft: 2, fontSize: 14 }}>{msg.emoticon}</span>
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        shape="circle"
                        type="text"
                        className={styles.like_icon}
                        icon={<LikeOutlined />}
                        onClick={() => {
                          sendEmot({ id: msg.id, emotId: 1 });
                        }}
                      />
                    )}
                    <Space className={styles.emoji_group}>
                      {emojis
                        .sort((a, b) => b.id - a.id)
                        .map((emoji: any) => (
                          <Button
                            key={emoji.id}
                            className={styles.emoji_item}
                            onClick={() => {
                              sendEmot({ id: msg.id, emotId: emoji.id });
                            }}
                            type="text"
                            size="small"
                          >
                            {emoji.icon}
                          </Button>
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
                </ProCard>
                <div
                  className={styles.msg_btn_group_wrapper}
                  style={{
                    display: 'flex',
                    alignItems: 'end',
                  }}
                >
                  <Space className={styles.msg_btn_group}>
                    <Button className={styles.msg_action} type="text" size="small">
                      <QuoteIcon className={styles.msg_icon} />
                    </Button>
                    <Button className={styles.msg_action} type="text" size="small">
                      <ShareIcon className={styles.msg_icon} />
                    </Button>
                    <Button className={styles.msg_action} type="text" size="small">
                      <SquareCheckIcon className={styles.msg_icon} />
                    </Button>
                    <Button className={styles.msg_action} type="text" size="small">
                      <EllipsisIcon className={styles.msg_icon} />
                    </Button>
                  </Space>
                </div>
              </div>
            );
          }}
          cardProps={{
            bodyStyle: {
              padding: 0,
            },
            style: {
              backgroundColor: 'transparent',
            },
          }}
          footer={<div ref={cnsRef} />}
        />
      </InfiniteScroll>
    </>
  );
};

export default ConversationContentList;
