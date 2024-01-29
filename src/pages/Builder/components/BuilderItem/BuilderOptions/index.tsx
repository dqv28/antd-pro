import { CaretRightOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React, { Key, useState } from 'react';

const style: React.CSSProperties = {
  // background: '#1a73e8',
  color: '#fff',
  fontWeight: 600,
  padding: '6px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
};

const colStyle: React.CSSProperties = {
  background: '#1a73e81a',
  border: '1px solid #1a73e8',
};

type Props = {};

const BuilderOptions = (props: Props) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([0]);
  const [activeNum, setActiveNum] = useState<number>(2);

  const data = [
    {
      title: 'Block Options',
      description: (
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <div
              style={{
                padding: '10px 8px',
                borderRadius: 6,
                ...(activeNum === 1 && colStyle),
              }}
            >
              <div
                style={{
                  background: activeNum === 1 ? '#1a73e8' : '#9f9f9f',
                  ...style,
                }}
              >
                1/1
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                padding: '10px 8px',
                borderRadius: 6,
                ...(activeNum === 2 && colStyle),
              }}
            >
              <Row gutter={4}>
                <Col span={12}>
                  <div
                    style={{
                      background: activeNum === 2 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/2
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      background: activeNum === 2 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/2
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                padding: '10px 8px',
                borderRadius: 6,
                ...(activeNum === 3 && colStyle),
              }}
            >
              <Row gutter={4}>
                <Col span={8}>
                  <div
                    style={{
                      background: activeNum === 3 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/3
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    style={{
                      background: activeNum === 3 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/3
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    style={{
                      background: activeNum === 3 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/3
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                padding: '10px 8px',
                borderRadius: 6,
                ...(activeNum === 4 && colStyle),
              }}
            >
              <Row gutter={4}>
                <Col span={6}>
                  <div
                    style={{
                      background: activeNum === 4 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/4
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    style={{
                      background: activeNum === 4 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/4
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    style={{
                      background: activeNum === 4 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/4
                  </div>
                </Col>
                <Col span={6}>
                  <div
                    style={{
                      background: activeNum === 4 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/4
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                padding: '10px 8px',
                borderRadius: 6,
                ...(activeNum === 5 && colStyle),
              }}
            >
              <Row gutter={4}>
                <Col span={8}>
                  <div
                    style={{
                      background: activeNum === 5 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/3
                  </div>
                </Col>
                <Col span={16}>
                  <div
                    style={{
                      background: activeNum === 5 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    2/3
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                padding: '10px 8px',
                borderRadius: 6,
                ...(activeNum === 6 && colStyle),
              }}
            >
              <Row gutter={4}>
                <Col span={16}>
                  <div
                    style={{
                      background: activeNum === 6 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    2/3
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    style={{
                      background: activeNum === 6 ? '#1a73e8' : '#9f9f9f',
                      ...style,
                    }}
                  >
                    1/3
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Advanced Options',
      description: 'Advanced Options',
    },
    {
      title: 'Page fields',
      description: 'Page fields',
    },
  ];

  return (
    <ProList
      rowKey="id"
      dataSource={data}
      metas={{
        title: {
          dataIndex: 'title',
          render: (dom) => <h3>{dom}</h3>,
        },
        description: {
          dataIndex: 'description',
        },
      }}
      expandable={{
        expandIcon: () => <CaretRightOutlined style={{ color: '#e2e5e6' }} />,
        expandedRowKeys,
        onExpandedRowsChange: setExpandedRowKeys,
      }}
      cardProps={{
        bodyStyle: {
          padding: 0,
        },
      }}
      onItem={() => ({
        style: {
          padding: '12px 0',
        },
        className: 'list-item',
      })}
    />
  );
};

export default BuilderOptions;
