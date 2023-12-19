import { getArticleList } from '@/services/ant-design-pro/api';
import { ProList } from '@ant-design/pro-components';
import { Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const ArticleList = () => {
  const [data, setData] = useState<any>([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(10);
  const actionRef: any = useRef();

  useEffect(() => {
    const fetchAPI = async () => {
      await getArticleList({ limit, offset: 0 }).then((res: any) => {
        setData(res.results);
      });
    };

    fetchAPI();
  }, []);

  const loadMoreData = () => {
    setOffset((prevOffset: number) => prevOffset + 10);

    const fetchAPI = async () => {
      await getArticleList({ limit, offset }).then((res: any) => {
        setData([...data, ...res.results]);
      });
    };

    fetchAPI();
  };

  return (
    <>
      <InfiniteScroll
        dataLength={data && data.length}
        next={loadMoreData}
        hasMore={data && data.length < 100}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage=""
        scrollThreshold={0.99}
      >
        {data && (
          <ProList<any>
            rowKey="id"
            headerTitle="Article List"
            actionRef={actionRef}
            dataSource={data}
            metas={{
              title: {
                dataIndex: 'title',
              },
              avatar: {
                dataIndex: 'image_url',
                editable: false,
              },
              description: {
                dataIndex: 'summary',
              },
            }}
          />
        )}
      </InfiniteScroll>
    </>
  );
};

export default ArticleList;
