import { Form, Input } from 'antd';

type Props = {};

const BoxOpttions = (props: Props) => {
  return (
    <Form name="basic" layout="vertical" autoComplete="off">
      <Form.Item label="Link URL">
        <Input placeholder="e.g. https://www.google.com" />
      </Form.Item>
    </Form>
  );
};

export default BoxOpttions;
