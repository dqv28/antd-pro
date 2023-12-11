import { ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';
import Menu from './components/Menu';
import ConversationContent from './components/ConversationContent';
import Footer from './components/ConversationContent/ConversationLayout/Footer';

import styles from './index.less';
import { Button, Input, Modal, Space } from 'antd';
import {
  UsergroupAddOutlined,
  SearchOutlined,
  VideoCameraOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import Header from './components/ConversationContent/ConversationLayout/Header';

const Demo: React.FC = () => {
  const [hasChange, setHasChange] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <ProCard
      direction="row"
      bodyStyle={{
        padding: '0',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <ProCard direction="row" colSpan={7} bodyStyle={{ padding: '0' }} bordered>
        <Menu />
      </ProCard>
      <ProCard
        className={styles.pro_card_content}
        headerBordered
        title={<Header />}
        bordered
        actions={[<Footer />]}
        style={{ height: '100vh', flex: 1 }}
        extra={
          <Space>
            <Button
              className={styles.head_action}
              type="text"
              icon={<UsergroupAddOutlined />}
              title="Thêm bạn vào nhóm"
              onClick={showModal}
            />
            <Button
              className={styles.head_action}
              type="text"
              icon={<SearchOutlined />}
              title="Tìm kiếm tin nhắn"
            />
            <Button
              className={styles.head_action}
              type="text"
              icon={<VideoCameraOutlined />}
              title="Cuộc gọi video"
            />
            <Button
              className={styles.head_action}
              type="text"
              icon={<TabletOutlined />}
              onClick={() => setHasChange(!hasChange)}
              title="Thông tin hôi thoại"
            />
          </Space>
        }
      >
        <ConversationContent />
      </ProCard>

      <ProCard colSpan={hasChange ? 0 : 5} bordered>
        colSpan-6
      </ProCard>

      <Modal
        title="Thêm thành viên"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Xác nhận"
        cancelText="Hủy"
        centered
        cancelButtonProps={{
          className: styles.cancel_btn,
          type: 'text',
        }}
        style={{
          padding: '16px 24px',
        }}
        bodyStyle={{
          padding: '16px 24px',
        }}
      >
        <Input
          size="middle"
          placeholder="Nhập tên, số điện thoại, hoặc danh sách số điện thoại"
          prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, .5)' }} />}
          style={{
            borderRadius: 20,
          }}
        />

        <Space size={[6, 12]} className={styles.type_list}>
          {new Array(20).fill(null).map((_, index) => (
            <Button key={index} type="text" className={styles.type_btn} size="small">
              Tất cả
            </Button>
          ))}
        </Space>
      </Modal>
    </ProCard>
  );
};

export default Demo;
