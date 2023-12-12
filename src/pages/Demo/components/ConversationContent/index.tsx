import { Button, Space, Typography } from 'antd';
import {
  CaretDownOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  IdcardOutlined,
  MessageOutlined,
  PictureOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import styles from './index.less';
import ConversationList from '../ConversationList';

const { Title, Text } = Typography;

const ConversationContent: React.FC = () => {
  return (
    <div className={styles.cns_view}>
      <div className={styles.cns_topic}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <MessageOutlined
            style={{
              color: '#005ae0',
              fontSize: 20,
            }}
          />

          <div className={styles.cns_topic_msg}>
            <Title
              children="Tin nhắn"
              level={5}
              style={{ fontSize: 13, fontWeight: 600, marginBottom: 0 }}
            />
            <Text ellipsis style={{ fontSize: 13 }}>
              Tuan Duc Tran: Link: Mọi người join vào nhóm chat này nhé! Có item nào hay mình sẽ
              share trong đó.
            </Text>
          </div>
        </div>

        <div className={styles.cns_topic_action}>
          <Button className={styles.cns_topic_more} icon={<EllipsisOutlined />} type="text" />
          <Button
            type="text"
            style={{
              border: '1px solid #0068ff',
              color: '#0068ff',
              padding: '0 16px',
              marginLeft: 12,
            }}
          >
            <span>2 ghim khác</span>
            <CaretDownOutlined />
          </Button>
        </div>
      </div>
      <div className={styles.cns_content}>
        <ConversationList />
        <ConversationList />
      </div>
      <div className={styles.cns_toolbars}>
        <Space>
          <Button
            size="large"
            className={styles.cns_toolbars_btn}
            type="text"
            icon={<UsergroupAddOutlined />}
            title="Thêm bạn vào nhóm"
          />
          <Button
            size="large"
            className={styles.cns_toolbars_btn}
            type="text"
            icon={<PictureOutlined />}
            title="Gửi hình ảnh"
          />
          <Button
            size="large"
            className={styles.cns_toolbars_btn}
            type="text"
            icon={<IdcardOutlined />}
            title="Gửi danh thiếp"
          />
          <Button
            size="large"
            className={styles.cns_toolbars_btn}
            type="text"
            icon={<ClockCircleOutlined />}
            title="Tạo nhắc hẹn"
          />
          <Button
            size="large"
            className={styles.cns_toolbars_btn}
            type="text"
            icon={<EllipsisOutlined />}
            title="Tùy chọn thêm"
          />
        </Space>
      </div>
    </div>
  );
};

export default ConversationContent;
