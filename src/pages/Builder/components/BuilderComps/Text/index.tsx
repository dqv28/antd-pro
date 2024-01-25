import { Block } from '@/services/ant-design-pro/api';
import { useState } from 'react';

import './Text.css';

type Props = {
  item: Block;
  [key: string]: any;
};

const Text = ({ item, ...props }: Props) => {
  const [change, setChange] = useState(false);
  const {
    options: { text },
  } = item;

  return (
    <>
      {change ? (
        <input type="text" defaultValue={text} className="text-input" />
      ) : (
        <div onDoubleClick={() => setChange(true)} className="div-input">
          {text}
        </div>
      )}
    </>
  );
};

export default Text;
