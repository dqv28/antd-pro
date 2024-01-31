import { Button, Form, Image, Input, Space, Upload, UploadProps, message } from 'antd';

type Props = {};

const ImageOptions = (props: Props) => {
  return (
    <Form name="basic" layout="vertical" autoComplete="off">
      <Form.Item label="Image *">
        <Space size={12}>
          <Image
            width={80}
            style={{
              borderRadius: 6,
            }}
            src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a"
            placeholder={
              <Image
                preview={false}
                src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a"
                width={200}
              />
            }
          />
          <label htmlFor="upload">
            <Button type="text" size="large" style={{ color: '#66a8ff', fontWeight: 500 }}>
              Choose Photo
            </Button>
          </label>
          <input type="file" id="upload" hidden />
        </Space>
      </Form.Item>
      <Form.Item label="Alt text">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ImageOptions;
