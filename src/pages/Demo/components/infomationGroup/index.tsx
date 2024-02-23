import {
  BellOutlined,
  PushpinOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Space, Typography } from 'antd';
import React from 'react';

import styles from './index.less';

const { Title } = Typography;

const items = [
  {
    key: 'sub 1',
    label: <Title level={5}>Thành viên nhóm</Title>,
    children: [
      {
        key: 1,
        icon: <UsergroupAddOutlined />,
        label: '999 thành viên',
      },
    ],
  },
];

const InfomationGroup: React.FC = () => {
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          maxHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <Avatar
          size={50}
          src="https://ava-grp-talk.zadn.vn/2/7/4/b/2/360/a8e4edcbf5d655b3080b2d5ad6c1dccd.jpg"
        />

        <Title level={4} style={{ padding: '8px 0' }}>
          Cơm trưa
        </Title>
      </div>

      <Space style={{ width: '100%', padding: '0 16px' }}>
        <div className={styles.group_action}>
          <BellOutlined className={styles.group_action_icon} />
          <span className={styles.group_action_text}>Tắt thông báo</span>
        </div>
        <div className={styles.group_action}>
          <PushpinOutlined className={styles.group_action_icon} />
          <span className={styles.group_action_text}>Ghim hội thoại</span>
        </div>
        <div className={styles.group_action}>
          <UsergroupAddOutlined className={styles.group_action_icon} />
          <span className={styles.group_action_text}>Thêm thành viên</span>
        </div>
        <div className={styles.group_action}>
          <SettingOutlined className={styles.group_action_icon} />
          <span className={styles.group_action_text}>Quản lý nhóm</span>
        </div>
      </Space>

      <Menu mode="inline" className={styles.group_menu} items={items} defaultOpenKeys={['sub 1']} />
    </>
  );
};

export default InfomationGroup;
