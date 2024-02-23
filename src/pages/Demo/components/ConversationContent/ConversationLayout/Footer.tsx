import { AtIcon, MsgIcon, PandaIcon } from '@/components/Icons';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import styles from './Layut.less';
import { sendMsg } from '@/services/ant-design-pro/api';

type Props = {
  sendMsgInput: (msg: string) => void;
};

const Footer: React.FC<any> = (props: Props) => {
  const [mesg, setMesg] = useState<any>('');
  const [msgData, setMsgData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('Messages');

    if (!data) {
      return [];
    }

    setMsgData(JSON.parse(data));

    return JSON.parse(data);
  }, [mesg]);

  const handleSendMsg = async (emoji?: any) => {
    await sendMsg({
      id: msgData.length + 1,
      name: 'Ant Design',
      image:
        'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      desc: !mesg.startsWith('@') ? mesg : mesg.slice(1),
      mine: !mesg.startsWith('@'),
      emoji,
      emoticon: 0,
      emotId: 0,
    });
    setMesg('');
  };

  return (
    <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <Input
        className={styles.cns_input_msg}
        placeholder="Nhập @, tin nhắn tới  Nhóm"
        value={mesg}
        onChange={(e) => {
          setMesg(e.target.value);
        }}
        onKeyUp={(e: any) => {
          if (e && e.key === 'Enter') {
            handleSendMsg();
            props.sendMsgInput(e.target.value);
          }
        }}
      />
      <div style={{ minWidth: '20%' }}>
        <Button
          className={styles.cns_btn_msg}
          size="large"
          type="text"
          icon={<MsgIcon />}
          title="Chèn tin nhắn nhanh"
        />
        <Button
          className={styles.cns_btn_msg}
          size="large"
          type="text"
          icon={<SmileOutlined />}
          title="Biểu cảm"
        />
        <Button
          className={styles.cns_btn_msg}
          size="large"
          type="text"
          icon={<AtIcon />}
          title="Nhắc bạn"
        />
        <Button
          className={styles.cns_btn_msg}
          size="large"
          type="text"
          icon={<PandaIcon />}
          onClick={() => {
            handleSendMsg(true);
            props.sendMsgInput('Like');
            setMesg('');
          }}
          title="Gửi nhanh biểu tượng cảm xúc"
        />
      </div>
    </Space.Compact>
  );
};

export default Footer;
