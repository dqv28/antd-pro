import { AtIcon, MsgIcon } from '@/components/Icons';
import { LikeOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React, { useState } from 'react';

import styles from './Layut.less';
import { sendMsg } from '@/services/ant-design-pro/api';

const Footer: React.FC = () => {
  const [mesg, setMesg] = useState<any>('');
  const handleSendMsg = async () => {
    await sendMsg({
      id: '1',
      name: 'Ant Design',
      image:
        'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      desc: !mesg.startsWith('@') ? mesg : mesg.slice(1),
      mine: !mesg.startsWith('@'),
    });
    setMesg('');
  };

  return (
    <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <Input
        className={styles.cns_input_msg}
        placeholder="Nhập @, tin nhắn tới  Nhóm"
        value={mesg}
        onChange={(e) => setMesg(e.target.value)}
        onKeyUp={(e: any) => {
          if (e && e.key === 'Enter') {
            handleSendMsg();
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
          icon={<LikeOutlined />}
          title="Gửi nhanh biểu tượng cảm xúc"
        />
      </div>
    </Space.Compact>
  );
};

export default Footer;
