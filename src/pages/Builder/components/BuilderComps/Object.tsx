import Text from './Text';
import Button from './Button';
import Image from './ImageComp';
import Row from './Row';
import Box from './Box';
import Section from './Section';
import { Block } from '@/services/ant-design-pro/api';
import { UniqueIdentifier } from '@dnd-kit/core';

export const childObj = {
  Text,
  Button,
  Image,
  Row,
  Box,
  Section,
};

export const renderColChild = (
  child: Block,
  isBelow?: boolean | null,
  overId?: UniqueIdentifier,
) => {
  const Child = childObj[child.type];

  return <Child item={child} />;
};

export const includesChild = (child: Block[], overId: UniqueIdentifier): boolean => {
  if (!child || !overId || typeof overId === 'number') {
    return false;
  }

  for (const childItem of child) {
    if (childItem.id === overId) {
      return true;
    } else {
      if (childItem.children) {
        includesChild(childItem.children, overId);
      } else {
        return false;
      }
    }
  }

  return true;
};
