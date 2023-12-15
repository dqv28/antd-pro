import {
  DownOutlined,
  EllipsisOutlined,
  MessageOutlined,
  SearchOutlined,
  TagFilled,
  UserAddOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { ProCard, ProFormText } from '@ant-design/pro-components';
import { Avatar, Badge, Button, Dropdown, Input, Tabs, Typography } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState } from 'react';
import ConversationList from '../ConversationList';

import styles from './index.less';
import SearchResult from './MenuComp/SearchResult';
import MsgResult from './MenuComp/MsgResult/MsgResult';

type Props = {
  search?: boolean;
  searchMsgInput?: string;
};

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

const moreItems: MenuProps['items'] = [
  {
    label: 'Đánh dấu đã đọc',
    key: '0',
  },
  {
    label: 'Gửi tin đồng thời',
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Trở lại giao diện cơ bản',
    key: '3',
  },
];

const { Title, Text } = Typography;

const Menu: React.FC<any> = (props: Props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [hasChange, setHasChange] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <ProCard direction="row" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
      <ProCard
        colSpan={4}
        style={{
          height: '100%',
        }}
        bodyStyle={{
          padding: '32px 0 0',
          backgroundColor: '#0091ff',
          textAlign: 'center',
        }}
      >
        <Avatar
          src="https://s120-ava-talk.zadn.vn/d/0/b/b/1/120/5d93addd978b671bc667e34b6fe8dc8b.jpg"
          alt="avatar"
          size={45}
          className={styles.menu__avatar}
        />

        <Button
          className={styles.menu__item}
          icon={
            <Badge
              count="5+"
              size="small"
              style={{
                backgroundColor: '#c31818',
                padding: '0 4px',
                borderColor: '#c31818',
              }}
            >
              <MessageOutlined
                style={{
                  color: '#fff',
                  fontSize: 25,
                }}
              />
            </Badge>
          }
        />
      </ProCard>
      <ProCard
        className={styles.chat}
        bodyStyle={{
          padding: 0,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsFocus(false);
        }}
      >
        {props.search ? (
          <div style={{ padding: '20px 0' }}>
            <Title level={5} children="Kết quả tìm kiếm" style={{ padding: '0 16px' }} />
            <Text
              children={
                props.searchMsgInput
                  ? 'Danh sách kết quả phù hợp trong hội thoại'
                  : 'Nhập nội dung cần tìm trong hội thoại'
              }
              style={{ padding: '0 16px', width: '100%' }}
            />

            {props.searchMsgInput ? (
              <div
                style={{
                  height: 640,
                  overflow: 'auto',
                  marginTop: 16,
                }}
              >
                <MsgResult />
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 60,
                }}
              >
                <img
                  width={160}
                  style={{
                    height: 'auto',
                  }}
                  src="https://chat.zalo.me/assets/search-empty.a19dba60677c95d6539d26d2dc363e4e.png"
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={styles.chat__action} onClick={(e) => e.stopPropagation()}>
              <div
                onClick={() => {
                  setHasChange(true);
                  setIsFocus(true);
                }}
                style={{
                  height: 30,
                  flex: 1,
                }}
              >
                <ProFormText
                  placeholder="Tìm kiếm"
                  className={styles.chat__search}
                  fieldProps={{
                    prefix: <SearchOutlined />,
                    onChange: (e) => setSearchInput(e.target.value),
                    value: searchInput,
                    bordered: false,
                    style: {
                      backgroundColor: isFocus ? '#fff' : '#eaedf0',
                      border: isFocus ? '1px solid #0068ff' : '',
                      width: '100%',
                      borderRadius: '6px',
                    },
                  }}
                />
              </div>
              {hasChange ? (
                <Button
                  className={styles.chat_btn}
                  onClick={() => {
                    setHasChange(false);
                    setIsFocus(false);
                    setSearchInput('');
                  }}
                >
                  Đóng
                </Button>
              ) : (
                <>
                  <Button className={styles.chat_btn} icon={<UserAddOutlined />} title="Thêm bạn" />
                  <Button
                    className={styles.chat_btn}
                    icon={<UsergroupAddOutlined />}
                    title="Tạo nhóm chat"
                  />
                </>
              )}
            </div>

            {hasChange ? (
              searchInput ? (
                <SearchResult />
              ) : (
                <div>
                  <ProCard
                    title="Tìm gần đây"
                    style={{
                      padding: '0 16px',
                    }}
                    headStyle={{
                      padding: 0,
                    }}
                    bodyStyle={{
                      padding: '24px 0',
                    }}
                    actions={[
                      <div
                        style={{
                          float: 'left',
                        }}
                      >
                        <h4
                          style={{
                            textAlign: 'left',
                            marginBottom: 14,
                          }}
                        >
                          Lọc tin nhắn
                        </h4>
                        <Button className={styles.filterSearch_btn}>Nhắc bạn</Button>
                        <Button
                          style={{
                            marginLeft: 8,
                          }}
                          className={styles.filterSearch_btn}
                        >
                          Biểu cảm
                        </Button>
                      </div>,
                    ]}
                  >
                    Không có tìm kiếm nào gần đây
                  </ProCard>
                </div>
              )
            ) : (
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
                  tabBarExtraContent={
                    <>
                      <Dropdown menu={{ items }} trigger={['click']}>
                        <Button
                          size="small"
                          shape="round"
                          style={{
                            padding: '0 6px',
                          }}
                          children={
                            <span>
                              Phân loại
                              <DownOutlined style={{ marginLeft: 6 }} />
                            </span>
                          }
                          className={styles.type_btn}
                        />
                      </Dropdown>
                      <Dropdown
                        menu={{
                          items: moreItems,
                        }}
                        trigger={['click']}
                      >
                        <Button
                          size="small"
                          shape="circle"
                          style={{
                            padding: 4,
                            marginLeft: 4,
                          }}
                          icon={<EllipsisOutlined />}
                          className={styles.more_btn}
                        />
                      </Dropdown>
                    </>
                  }
                >
                  <Tabs.TabPane
                    tab="Tất cả"
                    key="1"
                    style={{
                      height: '600px',
                      overflow: 'auto',
                    }}
                  >
                    <ConversationList />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Chưa đọc" key="2">
                    <ConversationList isUnRead />
                  </Tabs.TabPane>
                </Tabs>
              </>
            )}
          </>
        )}
      </ProCard>
    </ProCard>
  );
};

export default Menu;
