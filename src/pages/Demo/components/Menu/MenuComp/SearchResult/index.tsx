import { Avatar, Button, Tabs, Typography } from 'antd';
import React from 'react';
import Result from './Result';

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
      ]);
    }, 500);
  });
};

const SearchResult: React.FC = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        style={{
          width: '100%',
        }}
        tabBarStyle={{
          padding: '0 16px',
          marginBottom: 0,
        }}
      >
        <Tabs.TabPane
          tab="Tất cả"
          key="1"
          style={{
            height: 600,
            overflow: 'auto',
          }}
        >
          <Result />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Trò chuyện"
          key="2"
          style={{
            height: 600,
            overflow: 'auto',
          }}
        >
          <Result isUnRead />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default SearchResult;
