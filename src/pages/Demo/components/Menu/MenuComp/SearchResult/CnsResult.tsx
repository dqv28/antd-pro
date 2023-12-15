import React from 'react';
import { ProList } from '@ant-design/pro-components';
import styles from './index.less';
import { Avatar, Button, Typography } from 'antd';

const { Text, Title } = Typography;

const mockListConversationResult = () => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Dev Comunity',
          image: 'https://ava-grp-talk.zadn.vn/d/3/0/6/6/360/3178fa4759ad4515238c47d8e27f4cc4.jpg',
          isRead: true,
        },
        {
          id: '2',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          isRead: false,
        },
        {
          id: '3',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          isRead: true,
        },
        {
          id: '4',
          name: 'TechUI',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          isRead: false,
        },
        {
          id: '5',
          name: 'Dev Comunity',
          image: 'https://ava-grp-talk.zadn.vn/d/3/0/6/6/360/3178fa4759ad4515238c47d8e27f4cc4.jpg',
          isRead: true,
        },
        {
          id: '6',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          isRead: false,
        },
      ]);
    }, 500);
  });
};

const mockListMessageResult = () => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Dev Comunity',
          image: 'https://ava-grp-talk.zadn.vn/d/3/0/6/6/360/3178fa4759ad4515238c47d8e27f4cc4.jpg',
          desc: 'Đn: @Dương Văn Hoàn Mình ở HCM nên chưa biết tình hình trên đó : v',
          isRead: true,
        },
        {
          id: '2',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: false,
        },
        {
          id: '3',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: true,
        },
        {
          id: '4',
          name: 'TechUI',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: 'Tuan Duc Tran: Nên tốt nhất là dùng Hackintosh quất mấy cái version MacOS Catalina',
          isRead: false,
        },
      ]);
    }, 500);
  });
};

type Props = {
  isConversation: boolean;
  isMsg: boolean;
};

const CnsResult: React.FC<any> = (props: Props) => {
  return (
    <>
      {props.isMsg || (
        <div
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            paddingBottom: 12,
          }}
        >
          <ProList<any>
            headerTitle={
              <Title
                children="Trò chuyện (158)"
                style={{ padding: '0 16px', marginBottom: 0 }}
                level={5}
              />
            }
            cardProps={{
              bodyStyle: {
                padding: 0,
              },
            }}
            onItem={() => ({
              className: styles.cns_item,
            })}
            className={styles.cns_head_title}
            rowKey="id"
            request={async () => {
              const data = await mockListConversationResult();

              return {
                data,
              };
            }}
            metas={{
              title: {
                dataIndex: 'name',
                render: (_, record) => (
                  <Text
                    ellipsis
                    style={{
                      flex: 1,
                      lineHeight: '50px',
                      fontSize: 16,
                      fontWeight: 450,
                    }}
                  >
                    {record.name}
                  </Text>
                ),
              },
              avatar: {
                dataIndex: 'image',
                render: (_, record) => <Avatar src={record.image} size={44} />,
              },
            }}
          />
          <div style={{ padding: '0 16px', marginTop: 12 }}>
            <Button
              children="Xem tất cả cuộc trò chuyện"
              type="text"
              className={styles.see_all_btn}
            />
          </div>
        </div>
      )}

      {props.isConversation || (
        <div>
          <ProList<any>
            className={styles.cns_head_title}
            headerTitle={
              <Title
                children="Tin nhắn (10)"
                style={{
                  padding: '0 16px',
                  marginBottom: 0,
                }}
                level={5}
              />
            }
            cardProps={{
              bodyStyle: {
                padding: 0,
                width: '100%',
              },
              headStyle: {
                borderTop: '1px solid #333',
              },
            }}
            onItem={() => ({
              className: styles.cns_item,
              style: {
                padding: '12px 16px',
              },
            })}
            rowKey="id"
            request={async () => {
              const data = await mockListMessageResult();

              return {
                data,
              };
            }}
            metas={{
              title: {
                dataIndex: 'name',
                render: (_, record) => (
                  <div className={styles.cns_title} style={{ lineHeight: '25px' }}>
                    <Text
                      ellipsis
                      style={{
                        flex: 1,
                        fontWeight: record.isRead ? 450 : 600,
                      }}
                    >
                      {record.name}
                    </Text>
                    <Text
                      children="38 phút"
                      style={{ fontSize: 12, color: '#7589a3', fontWeight: 450 }}
                    />
                  </div>
                ),
              },
              avatar: {
                dataIndex: 'image',
                render: (_, record) => <Avatar src={record.image} size={44} />,
              },
              description: {
                dataIndex: 'desc',
                render: (_, record) => (
                  <Text
                    ellipsis
                    style={{
                      color: '#7589a3',
                      flex: 1,
                    }}
                  >
                    {record.desc}
                  </Text>
                ),
              },
            }}
          />
          <div style={{ padding: '0 16px', marginTop: 12 }}>
            <Button children="Xem tất cả tin nhắn" type="text" className={styles.see_all_btn} />
          </div>
        </div>
      )}
    </>
  );
};

export default CnsResult;
