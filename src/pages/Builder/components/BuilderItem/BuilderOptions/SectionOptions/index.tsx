import { Form, Input } from 'antd';

type Props = {};

const SectionOptions = (props: Props) => {
  return (
    <Form name="basic" layout="vertical" autoComplete="off">
      <Form.Item label="Max inner width">
        <Input value={1200} />
      </Form.Item>
      <Form.Item label="Link URL">
        <Input placeholder="e.g. https://www.google.com" />
      </Form.Item>
    </Form>
  );
};

export default SectionOptions;
