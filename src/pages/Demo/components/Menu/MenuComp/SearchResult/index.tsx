import { Tabs } from 'antd';
import React from 'react';
import CnsResult from './CnsResult';

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
          <CnsResult />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Trò chuyện"
          key="2"
          style={{
            height: 600,
            overflow: 'auto',
          }}
        >
          <CnsResult isConversation />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Tin nhắn"
          key="3"
          style={{
            height: 600,
            overflow: 'auto',
          }}
        >
          <CnsResult isMsg />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default SearchResult;
