import { ProList } from '@ant-design/pro-components';
import { Avatar, Button, Typography } from 'antd';
import styles from './MsgResult.less';
import { EllipsisOutlined } from '@ant-design/icons';

type Props = {};

const { Text } = Typography;

const mockListConversation = () => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Dev Comunity',
          image: 'https://ava-grp-talk.zadn.vn/d/3/0/6/6/360/3178fa4759ad4515238c47d8e27f4cc4.jpg',
          desc: 'Đn: @Dương Văn Hoàn Mình ở HCM nên chưa biết tình hình trên đó : v',
          isRead: true,
        },
        {
          id: '2',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: false,
        },
        {
          id: '3',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: true,
        },
        {
          id: '4',
          name: 'TechUI',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: 'Tuan Duc Tran: Nên tốt nhất là dùng Hackintosh quất mấy cái version MacOS Catalina',
          isRead: false,
        },
        {
          id: '5',
          name: 'Dev Comunity',
          image: 'https://ava-grp-talk.zadn.vn/d/3/0/6/6/360/3178fa4759ad4515238c47d8e27f4cc4.jpg',
          desc: 'Đn: @Dương Văn Hoàn Mình ở HCM nên chưa biết tình hình trên đó : v',
          isRead: true,
        },
        {
          id: '6',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: false,
        },
        {
          id: '7',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: true,
        },
        {
          id: '8',
          name: 'TechUI',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: 'Tuan Duc Tran: Nên tốt nhất là dùng Hackintosh quất mấy cái version MacOS Catalina',
          isRead: false,
        },
        {
          id: '9',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: true,
        },
        {
          id: '10',
          name: 'TechUI',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: 'Tuan Duc Tran: Nên tốt nhất là dùng Hackintosh quất mấy cái version MacOS Catalina',
          isRead: false,
        },
        {
          id: '11',
          name: 'Ant Design',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: '我是一条测试的描述',
          isRead: true,
        },
        {
          id: '12',
          name: 'TechUI',
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          desc: 'Tuan Duc Tran: Nên tốt nhất là dùng Hackintosh quất mấy cái version MacOS Catalina',
          isRead: false,
        },
      ]);
    }, 500);
  });
};

const MsgResult = (props: Props) => {
  return (
    <ProList<any>
      headerTitle={<span style={{ padding: '0 16px', color: '#7589a3' }}>Tin nhắn</span>}
      cardProps={{
        bodyStyle: {
          padding: 0,
        },
      }}
      onItem={() => ({
        className: styles.cns_item,
      })}
      request={async () => {
        const data = await mockListConversation();

        return {
          data,
        };
      }}
      metas={{
        title: {
          dataIndex: 'name',
          render: (_, record) => (
            <div className={styles.cns_title} style={{ lineHeight: '25px' }}>
              <Text
                ellipsis
                style={{
                  flex: 1,
                  fontWeight: 500,
                }}
              >
                {record.name}
              </Text>
              <Text
                children="38 phút"
                style={{ fontSize: 12, color: '#7589a3', fontWeight: 450 }}
                className={styles.cns_time}
              />
            </div>
          ),
        },
        avatar: {
          dataIndex: 'image',
          render: (_, record) => <Avatar src={record.image} size={50} />,
        },
        description: {
          dataIndex: 'desc',
          render: (_, record) => (
            <span className={styles.cns_desc_wrapper}>
              <Text
                ellipsis
                style={{
                  color: '#081c36',
                  flex: 1,
                }}
              >
                {record.desc}
              </Text>
            </span>
          ),
        },
      }}
    />
  );
};

export default MsgResult;
