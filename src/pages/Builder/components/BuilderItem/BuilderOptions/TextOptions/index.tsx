import { Form } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextOptions = () => {
  return (
    <Form name="basic" layout="vertical" autoComplete="off">
      <Form.Item label="Text *">
        <ReactQuill theme="snow" />
      </Form.Item>
    </Form>
  );
};

export default TextOptions;
