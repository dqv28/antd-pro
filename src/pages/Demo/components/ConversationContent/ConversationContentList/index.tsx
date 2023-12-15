import { Avatar, Button, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { ProCard, ProList } from '@ant-design/pro-components';
import { Msg, listMsg, sendMsg } from '@/services/ant-design-pro/api';

import styles from './index.less';
import { LikeOutlined } from '@ant-design/icons';
import { EllipsisIcon, QuoteIcon, ShareIcon, SquareCheckIcon } from '@/components/Icons';

type Props = {};

const ConversationContentList: React.FC = (props: Props) => {
  const [msg, setMsg] = useState<any>(() => {
    const data = localStorage.getItem('Messages');

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  });

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className={styles.content_date}>23:17 Hôm qua</span>
      </div>

      {/* <Button onClick={handleSendMsg}>Send</Button> */}

      <ProList<Msg>
        request={async () => {
          const data = await listMsg();

          return {
            data,
          };
        }}
        renderItem={(msg: Msg) => (
          <>
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
                    {msg.desc}
                    <span style={{ fontSize: 12, color: '#476285', marginTop: 8 }}>21:44</span>
                    <Button
                      size="small"
                      shape="circle"
                      type="text"
                      className={styles.like_icon}
                      icon={<LikeOutlined />}
                    />
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
          </>
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
    </>
  );
};

export default ConversationContentList;
