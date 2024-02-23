import React from 'react';
import { ProList } from '@ant-design/pro-components';
import styles from './index.less';
import { Avatar, Button, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { Text } = Typography;

const mockListConversation = () => {
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
        {
          id: '5',
          name: 'Dev Comunity',
          image: 'https://ava-grp-talk.zadn.vn/d/3/0/6/6/360/3178fa4759ad4515238c47d8e27f4cc4.jpg',
          desc: 'Đn: @Dương Văn Hoàn Mình ở HCM nên chưa biết tình hình trên đó : v',
          isRead: true,
        },
        {
          id: '6',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: false,
        },
        {
          id: '7',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: true,
        },
        {
          id: '8',
          name: 'TechUI',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: 'Tuan Duc Tran: Nên tốt nhất là dùng Hackintosh quất mấy cái version MacOS Catalina',
          isRead: false,
        },
        {
          id: '9',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: true,
        },
        {
          id: '10',
          name: 'TechUI',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: 'Tuan Duc Tran: Nên tốt nhất là dùng Hackintosh quất mấy cái version MacOS Catalina',
          isRead: false,
        },
        {
          id: '11',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: true,
        },
        {
          id: '12',
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

const ConversationList: React.FC<any> = ({ isUnRead }) => {
  return (
    <>
      <ProList<any>
        cardProps={{
          bodyStyle: {
            padding: 0,
          },
        }}
        onItem={() => ({
          className: styles.cns_item,
        })}
        request={async () => {
          let data;
          const res = await mockListConversation();

          if (!isUnRead) {
            data = res;
          }

          data = res.filter((cns: any) => cns.isRead !== isUnRead);

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
                  style={{ fontSize: 12, color: '#7589a3', fontWeight: 450 }}
                  className={styles.cns_time}
                >
                  38 phút
                </Text>
                <Button
                  size="small"
                  type="text"
                  icon={<EllipsisOutlined />}
                  className={styles.cns_more_btn}
                />
              </div>
            ),
          },
          avatar: {
            dataIndex: 'image',
            render: (_, record) => <Avatar src={record.image} size={50} />,
          },
          description: {
            dataIndex: 'desc',
            render: (_, record) => (
              <span className={styles.cns_desc_wrapper}>
                <Text
                  ellipsis
                  style={{
                    color: record.isRead ? '#7589a3' : '#081c36',
                    flex: 1,
                  }}
                >
                  {record.desc}
                </Text>
                <span className={styles.cns_desc_bagde}>{record.isRead || '5+'}</span>
              </span>
            ),
          },
        }}
      />
    </>
  );
};

export default ConversationList;
