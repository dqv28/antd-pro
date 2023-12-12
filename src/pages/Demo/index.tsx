import { ProCard, ProList } from '@ant-design/pro-components';
import React, { useState } from 'react';
import type { Key } from 'react';
import Menu from './components/Menu';
import ConversationContent from './components/ConversationContent';
import Footer from './components/ConversationContent/ConversationLayout/Footer';

import styles from './index.less';
import { Avatar, Button, Image, Input, Modal, Space, Tag } from 'antd';
import {
  UsergroupAddOutlined,
  SearchOutlined,
  VideoCameraOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import Header from './components/ConversationContent/ConversationLayout/Header';

const defaultData = [
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'ádasdsa',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    id: '5',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'ádasdsa',
  },
  {
    id: '6',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    id: '7',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    id: '8',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    id: '9',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'ádasdsa',
  },
  {
    id: '10',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    id: '11',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    id: '12',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
];

type DataItem = (typeof defaultData)[number];

const Demo: React.FC = () => {
  const [hasChange, setHasChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState(false);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

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
        <Menu search={search} />
      </ProCard>
      <ProCard
        className={styles.pro_card_content}
        headerBordered
        title={<Header />}
        bordered
        actions={[<Footer />]}
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
              onClick={() => {
                setSearch(!search);
              }}
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
        bodyStyle={{
          position: 'relative',
          opacity: 0.85,
          padding: 0,
        }}
        headStyle={{
          padding: 16,
        }}
      >
        <img
          src="https://ava-grp-talk.zadn.vn/2/7/4/b/2/360/a8e4edcbf5d655b3080b2d5ad6c1dccd.jpg"
          className={styles.cns_background}
        />
        <ConversationContent />
      </ProCard>

      <ProCard colSpan={0} bordered>
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

        <ProList<DataItem>
          rowKey="id"
          headerTitle="Trò chuyện gần đây"
          dataSource={defaultData}
          metas={{
            title: {
              dataIndex: 'name',
              render: (_, record) => <span>{record.name}</span>,
            },
            avatar: {
              dataIndex: 'image',
              render: (_, record) => <Avatar src={record.image} size={40} />,
            },
            desc: {
              dataIndex: 'desc',
            },
          }}
          cardProps={{
            className: styles.modal_body,
            bodyStyle: {
              padding: 0,
            },
            headStyle: {
              backgroundColor: 'red',
            },
          }}
          onItem={() => ({
            className: styles.modal_item,
          })}
          // rowSelection={{
          //   alwaysShowAlert: undefined,
          // }}
        />
      </Modal>
    </ProCard>
  );
};

export default Demo;
