import { Form } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {};

const TextOptions = (props: Props) => {
  return (
    <Form name="basic" layout="vertical" autoComplete="off">
      <Form.Item label="Text *">
        <ReactQuill theme="snow" />
      </Form.Item>
    </Form>
  );
};

export default TextOptions;
