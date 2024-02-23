import {
  type Article,
  getArticleList,
  getEventList,
  getLaunchList,
} from '@/services/ant-design-pro/api';
import {
  type ActionType,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProList,
  QueryFilter,
} from '@ant-design/pro-components';
import { useInfiniteScroll } from 'ahooks';
import { Skeleton } from 'antd';
import { useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type FormFilter = {
  title_contains?: string;
  event?: number;
  launch?: string;
  published_at_gte?: string;
  published_at_lte?: string;
};

const ArticleList = () => {
  const actionRef = useRef<ActionType>();
  const [formFilter, setFormFilter] = useState<FormFilter>();

  const handleChangeInput = async (formData: any & { time?: string[] }) => {
    try {
      setFormFilter({
        published_at_gte: formData.time ? formData.time[0] : '',
        published_at_lte: formData.time ? formData.time[1] : '',
        ...formData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: articles,
    loadMore,
    noMore,
  } = useInfiniteScroll<{
    count: number;
    list: Article[];
  }>(
    async (currentData) => {
      console.log(formFilter);
      const res = await getArticleList({
        limit: 10,
        offset: currentData !== undefined ? currentData.list.length : 0,
        ...formFilter,
      });

      return {
        count: res.count,
        list: res.results,
      };
    },
    {
      reloadDeps: [formFilter],
      isNoMore: (data) => data !== undefined && data.list.length >= data.count,
    },
  );

  return (
    <>
      <QueryFilter layout="horizontal" onFinish={handleChangeInput} syncToUrl>
        <ProFormText name="title_contains" placeholder="Search for..." />
        <ProFormSelect
          request={async () => {
            const res = await getEventList({ limit: 10, offset: 0 });

            return res.results;
          }}
          fieldProps={{
            fieldNames: {
              label: 'name',
              value: 'id',
            },
          }}
          width="md"
          name="event"
          placeholder="Please choose event"
        />
        <ProFormSelect
          request={async () => {
            const res = await getLaunchList({ limit: 10, offset: 0 });

            return res.results;
          }}
          fieldProps={{
            fieldNames: {
              label: 'name',
              value: 'id',
            },
          }}
          width="md"
          name="launch"
          placeholder="Please choose launch"
        />
        <ProFormDateRangePicker width="md" name="time" placeholder={['from', 'to']} />
      </QueryFilter>
      <InfiniteScroll
        dataLength={articles ? articles.list.length : 0}
        next={loadMore}
        hasMore={!noMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active style={{ marginTop: 8 }} />}
        endMessage={''}
        scrollThreshold={0.99}
      >
        {articles && (
          <ProList<Article>
            rowKey="id"
            headerTitle="Article List"
            actionRef={actionRef}
            dataSource={articles.list}
            metas={{
              title: {
                dataIndex: 'title',
              },
              avatar: {
                dataIndex: 'image_url',
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
