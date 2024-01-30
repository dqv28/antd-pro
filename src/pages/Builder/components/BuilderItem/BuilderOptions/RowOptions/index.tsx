import { Col, Row } from 'antd';
import React from 'react';

const style: React.CSSProperties = {
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
};

type Props = {
  activeNum: number;
  changeActiveNum: (num: number) => void;
};

const RowOptions = ({ activeNum, changeActiveNum }: Props) => {
  return (
    <Row gutter={[20, 20]}>
      <Col span={12}>
        <div
          onClick={() => changeActiveNum(1)}
          style={{
            padding: '10px 8px',
            border: `1px solid ${activeNum === 1 ? '#1a73e8' : 'transparent'} `,
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
          onClick={() => changeActiveNum(2)}
          style={{
            padding: '10px 8px',
            border: `1px solid ${activeNum === 2 ? '#1a73e8' : 'transparent'} `,
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
          onClick={() => changeActiveNum(3)}
          style={{
            padding: '10px 8px',
            border: `1px solid ${activeNum === 3 ? '#1a73e8' : 'transparent'} `,
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
          onClick={() => changeActiveNum(4)}
          style={{
            padding: '10px 8px',
            border: `1px solid ${activeNum === 4 ? '#1a73e8' : 'transparent'} `,
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
          onClick={() => changeActiveNum(5)}
          style={{
            padding: '10px 8px',
            border: `1px solid ${activeNum === 5 ? '#1a73e8' : 'transparent'} `,
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
          onClick={() => changeActiveNum(6)}
          style={{
            padding: '10px 8px',
            border: `1px solid ${activeNum === 6 ? '#1a73e8' : 'transparent'} `,
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
  );
};

export default RowOptions;
