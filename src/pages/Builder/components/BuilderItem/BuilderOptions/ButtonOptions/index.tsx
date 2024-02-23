import { Form, Input } from 'antd';

const ButtonOptions = () => {
  return (
    <Form name="basic" layout="vertical" autoComplete="off">
      <Form.Item label="Text">
        <Input defaultValue="Click me!" />
      </Form.Item>
      <Form.Item label="Link">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ButtonOptions;
