import React, { useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import styles from './index.less';
import { Avatar, Typography } from 'antd';

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
        },
        {
          id: '2',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
        },
        {
          id: '3',
          name: '蚂蚁金服体验科技',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
        },
        {
          id: '4',
          name: 'TechUI',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
        },
      ]);
    }, 500);
  });
};

const ConversationList: React.FC = ({ children }) => {

  return (
    <ProList<any>
      cardProps={{
        bodyStyle: {
          padding: 0,
        },
      }}
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
          render: (_: any, record: any) => (
            <div
              style={{
                fontWeight: children ? 600 : 450,
                display: 'flex
                
              }}
            >
              <Text
                ellipsis
                style={{
                  width: '100%',
                  flex: 1,
                }}
              >
                {record.name}
              </Text>
              <span
                style={{
                  fontSize: 12,
                }}
              >
                38 phút
              </span>
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
            <div className={styles.cns_desc_wrapper}>
              <span
                className={styles.cns_desc}
                style={{
                  color: children ? '#081c36' : '#7589a3',
                }}
              >
                <Text
                  style={{
                    width: '200px',
                    flex: 1,
                  }}
                  ellipsis
                >
                  {record.desc}
                </Text>
              </span>
              {children && <span className={styles.cns_desc_bagde}>5+</span>}
            </div>
          ),
        },
        // subTitle: {
        //   render: () => {
        //     return <span>38 phút</span>;
        //   },
        // },
      }}
    />
  );
};

export default ConversationList;
