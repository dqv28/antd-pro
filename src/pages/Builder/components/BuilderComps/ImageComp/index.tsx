import { Block } from '@/services/ant-design-pro/api';

import './Image.css';

type Props = {
  item: Block;
  [key: string]: any;
};
const Image = ({ item, ...props }: Props) => {
  const {
    options: { imageUrl, alt },
  } = item;

  return (
    <div
      className={!imageUrl || !alt ? 'img' : ''}
      style={{
        backgroundImage: `url(${
          !imageUrl
            ? 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a'
            : imageUrl
        })`,
        marginTop: 16,
      }}
    ></div>
  );
};

export default Image;
