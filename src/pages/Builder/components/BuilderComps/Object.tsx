import Text from './Text';
import Button from './Button';
import Image from './ImageComp';
import Row from './Row';
import Box from './Box';
import Section from './Section';
import { Block } from '@/services/ant-design-pro/api';

export const childObj = {
  Text,
  Button,
  Image,
  Row,
  Box,
  Section,
};

export const renderColChild = (child: Block) => {
  const Child = childObj[child.type];

  return <Child item={child} />;
};
