import { Button, Dropdown, MenuProps, Space, Typography } from 'antd';
import {
  CaretDownOutlined,
  ClockCircleOutlined,
  DownOutlined,
  EllipsisOutlined,
  ExclamationOutlined,
  IdcardOutlined,
  MessageOutlined,
  PaperClipOutlined,
  PictureOutlined,
  SearchOutlined,
  SmileOutlined,
  TagFilled,
} from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import ConversationContentList from './ConversationContentList';

import styles from './index.less';

type Props = {
  search: boolean;
  onClick: () => void;
  onChange: (inputStr: any) => string;
};

const { Title, Text } = Typography;

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

const ConversationContent: React.FC<any> = (props: Props) => {
  return (
    <div className={styles.cns_view}>
      <div className={styles.cns_topic}>
        {props.search ? (
          <>
            <div className={styles.cns_msg_search}>
              <ProFormText
                placeholder="Tìm tin nhắn"
                style={{
                  marginBottom: 0,
                }}
                fieldProps={{
                  bordered: false,
                  prefix: <SearchOutlined />,
                  style: {
                    backgroundColor: '#eaedf0',
                    borderRadius: 16,
                  },
                  onChange: (e) => props.onChange(e.target.value),
                }}
              />
              <Button
                type="text"
                shape="round"
                children="Đóng"
                className={styles.cns_search_btn}
                onClick={props.onClick}
              />
            </div>

            <div style={{ marginTop: 12 }}>
              <Text children="Lọc theo:" />
              <Dropdown menu={{ items }} trigger={['click']}>
                <Button
                  children="Người gửi"
                  icon={<DownOutlined />}
                  type="text"
                  className={styles.cns_filter_btn}
                  shape="round"
                  size="small"
                />
              </Dropdown>
              <Dropdown menu={{ items }} trigger={['click']}>
                <Button
                  children="Người gửi"
                  icon={<DownOutlined />}
                  type="text"
                  className={styles.cns_filter_btn}
                  shape="round"
                  size="small"
                />
              </Dropdown>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                  Tuan Duc Tran: Link: Mọi người join vào nhóm chat này nhé!
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
        )}
      </div>
      <div className={styles.cns_content}>
        <ConversationContentList />
      </div>
      <div className={styles.cns_toolbars}>
        <Space>
          <Button
            size="large"
            className={styles.cns_toolbars_btn}
            type="text"
            icon={<SmileOutlined />}
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
            icon={<PaperClipOutlined />}
            title="Đính kèm file"
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
            icon={<ExclamationOutlined />}
            title="Tin nhắn ưu tiên"
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
