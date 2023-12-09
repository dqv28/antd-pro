import { DownOutlined, MessageOutlined, SmallDashOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Button, Dropdown, Input, Space, Tabs } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState } from 'react';
import ConversationList from '../ConversationList';

import styles from './index.less';

const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const Menu: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [hasChange, setHasChange] = useState(false);

  return (
    <ProCard direction="row" colSpan={7} bodyStyle={{ padding: '0' }} bordered>
      <ProCard
        colSpan={4}
        bodyStyle={{
          padding: '32px 0 0',
          backgroundColor: '#0091ff',
          height: '100vh',
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
            <MessageOutlined
              style={{
                color: '#fff',
                fontSize: 25,
              }}
            />
          }
        ></Button>
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
        <div className={styles.chat__action} onClick={(e) => e.stopPropagation()}>
          <Input
            placeholder="Tìm kiếm"
            className={styles.chat__search}
            bordered={false}
            prefix={<i className="fa-solid fa-magnifying-glass"></i>}
            onClick={(e) => {
              setHasChange(true);
              setIsFocus(true);
            }}
            style={{
              backgroundColor: isFocus ? '#fff' : '#eaedf0',
              border: isFocus ? '1px solid #0068ff' : '',
            }}
          />
          {hasChange ? (
            <Button
              className={styles.chat_btn}
              onClick={() => {
                setHasChange(false);
                setIsFocus(false);
              }}
            >
              Đóng
            </Button>
          ) : (
            <>
              <Button
                className={styles.chat_btn}
                icon={<i className="fa-solid fa-user-plus"></i>}
              />
              <Button
                className={styles.chat_btn}
                icon={<i className="fa-solid fa-user-plus"></i>}
              />
            </>
          )}
        </div>

        {hasChange ? (
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
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
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
                  height: 500,
                  overflow: 'auto',
                }}
              >
                <ConversationList />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Chưa đọc" key="2">
                <ConversationList children />
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <Dropdown
                    // menu={{ items }}
                    overlay={<h1>a</h1>}
                    trigger={['click']}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Click me
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                }
              />
              {/* <Tabs.TabPane
                tab={<Button size="small" shape="circle" icon={<SmallDashOutlined />} />}
              /> */}
            </Tabs>
          </div>
        )}
      </ProCard>
    </ProCard>
  );
};

export default Menu;
