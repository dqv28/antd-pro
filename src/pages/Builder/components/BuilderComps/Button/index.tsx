import { Block } from '@/services/ant-design-pro/api';
import { Button } from 'antd';

type Props = {
  item: Block;
};

const ButtonComp = ({ item }: Props) => {
  const {
    options: { text },
  } = item;

  return (
    <Button
      size="large"
      type="text"
      style={{ backgroundColor: '#333', color: '#fff', marginTop: 16 }}
      block
    >
      {text}
    </Button>
  );
};

export default ButtonComp;
