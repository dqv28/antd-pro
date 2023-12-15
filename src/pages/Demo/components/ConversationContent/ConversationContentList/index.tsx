import { Avatar, Tag, Typography } from 'antd';
import React, { useState } from 'react';

import styles from './index.less';
import { ProList } from '@ant-design/pro-components';
import { Msg, listMsg } from '@/services/ant-design-pro/api';

type Props = {};

const { Text, Paragraph } = Typography;

const ConversationContentList: React.FC = (props: Props) => {
  return (
    <>
      <ProList<Msg>
        request={async () => {
          const data = await listMsg();

          return {
            data,
          };
        }}
        renderItem={(msg) => (
          <Paragraph
            style={{ fontSize: 15, marginBottom: 0, color: '#081c36' }}
            children={msg.desc}
          />
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
