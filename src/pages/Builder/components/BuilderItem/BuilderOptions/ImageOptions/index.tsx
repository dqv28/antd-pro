import { Form, Input, Upload } from 'antd';

type Props = {};

const ImageOptions = (props: Props) => {
  return (
    <Form name="basic" layout="vertical" autoComplete="off">
      <Form.Item label="Image *">
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a"
            alt="avatar"
            style={{ width: '100%' }}
          />
        </Upload>
      </Form.Item>
      <Form.Item label="Alt text">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ImageOptions;
