import Text from './Text';
import Button from './Button';
import Image from './ImageComp';
import Row from './Row';
import Box from './Box';
import Section from './Section';
import type { Block } from '@/services/ant-design-pro/api';

export const childObj = {
  Text,
  Button,
  Image,
  Row,
  Box,
  Section,
};

type Props = {
  item: Block;
  isBelow?: boolean | null;
  overItem?: Block;
  [key: string]: any;
};

export const renderColChild = (child: Block, isBelow?: boolean | null, overItem?: Block) => {
  const Child: React.FC<Props> = childObj[child.type];

  return <Child item={child} isBelow={isBelow} overItem={overItem} />;
};

export const includesChild = (item: Block, child: Block[], overItem?: Block): boolean => {
  let isChild: boolean = false;
  if (child.length <= 0 || !overItem || typeof overItem === 'number') {
    return false;
  }

  if (overItem.type === 'no-builder') {
    isChild = false;
  } else {
    for (const childItem of child) {
      if (childItem.id === overItem.id) {
        isChild = true;
      } else {
        includesChild(item, childItem.children, overItem);
      }
    }
  }

  return isChild;
};
