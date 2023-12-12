import React from 'react';
import { ProList } from '@ant-design/pro-components';
import styles from './index.less';
import { Avatar, Button, Typography } from 'antd';

const { Text, Title } = Typography;

const mockListConversation = () => {
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

type Props = {
  isUnRead: boolean;
};

const Result: React.FC<any> = (props: Props) => {
  return (
    <>
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
        rowKey="id"
        request={async () => {
          const data = await mockListConversation();

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
        <Button children="Xem tất cả cuộc trò chuyện" type="text" className={styles.see_all_btn} />
      </div>
    </>
  );
};

export default Result;
