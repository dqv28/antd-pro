import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Typography } from 'antd';
import React from 'react';
import { TagFilled, TagOutlined, UserOutlined } from '@ant-design/icons';

import styles from './Layut.less';

const { Title } = Typography;
const items: MenuProps['items'] = [
  {
    label: 'Khách hàng',
    key: '1',
    icon: <TagFilled style={{ color: 'rgb(217, 27, 27)' }} />,
  },
  {
    label: 'Gia đình',
    key: '2',
    icon: <TagFilled style={{ color: 'rgb(243, 27, 200)' }} />,
  },
  {
    label: 'Công việc',
    key: '3',
    icon: <TagFilled style={{ color: 'rgb(255, 105, 5)' }} />,
  },
  {
    label: 'Bạn bè',
    key: '4',
    icon: <TagFilled style={{ color: 'rgb(250, 192, 0)' }} />,
  },
  {
    label: 'Trả lời sau',
    key: '5',
    icon: <TagFilled style={{ color: 'rgb(75, 195, 119)' }} />,
  },
  {
    label: 'Đồng nghiệp',
    key: '6',
    icon: <TagFilled style={{ color: 'rgb(0, 104, 255)' }} />,
  },
  {
    type: 'divider',
  },
  {
    label: 'Quản lý thẻ phân loại',
    key: '10',
  },
];

const Header: React.FC = () => {
  return (
    <>
      <Avatar
        src="https://ava-grp-talk.zadn.vn/2/7/4/b/2/360/a8e4edcbf5d655b3080b2d5ad6c1dccd.jpg"
        size={50}
      />
      <div className={styles.title}>
        <Title level={4} style={{ marginBottom: 0 }}>
          Cơm trưa
        </Title>

        <div className={styles.sub_title}>
          <Button
            type="text"
            title="9 thành viên"
            icon={<UserOutlined style={{ fontSize: 16 }} />}
            className={styles.subtitle_groupmember}
          >
            <span style={{ marginLeft: 4 }}>9 thành viên</span>
          </Button>

          <Dropdown menu={{ items }} trigger={['click']}>
            <TagOutlined title="Phân loại" className={styles.type_icon} />
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
