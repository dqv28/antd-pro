import {
  Article,
  getArticleList,
  getEventList,
  getLaunchList,
} from '@/services/ant-design-pro/api';
import { ProTable } from '@ant-design/pro-components';
import { Link } from 'umi';

const ArticleTable = () => {
  return (
    <>
      <ProTable<Article & any>
        headerTitle="Article table"
        request={async (params) => {
          const res = await getArticleList({
            limit: params.pageSize ?? 10,
            offset:
              params.pageSize && params.current && params.current > 1
                ? params.pageSize * (params.current - 1)
                : 0,
            published_at_gte: params.date ? params.date[0] : '',
            published_at_lte: params.date ? params.date[1] : '',
            ...params,
          });

          return {
            data: res.results,
            total: res.count,
          };
        }}
        form={{
          syncToUrl: (value, _type = 'set') => ({
            q: value.title_contains,
            date_from: value.date ? value.date[0] : '',
            date_to: value.date ? value.date[1] : '',
          }),
        }}
        rowKey="key"
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title_contains',
            valueType: 'text',
            copyable: true,
            ellipsis: true,
            sorter: {
              compare: (a, b) => a.id - b.id,
            },
          },
          {
            title: 'Image',
            dataIndex: 'image_url',
            valueType: 'image',
            hideInSearch: true,
            width: 80,
          },
          {
            title: 'News site',
            dataIndex: 'news_site',
            key: 'news_site',
            valueType: 'text',
            hideInSearch: true,
          },
          {
            title: 'Published',
            dataIndex: 'published_at',
            valueType: 'dateTime',
            hideInSearch: true,
          },
          {
            title: 'Event',
            key: 'event',
            valueType: 'select',
            request: async () => {
              const event = await getEventList({ limit: 10, offset: 0 });

              return event.results;
            },
            fieldProps: {
              fieldNames: {
                label: 'name',
                value: 'id',
              },
            },
            hideInTable: true,
          },
          {
            title: 'Launch',
            key: 'launch',
            valueType: 'select',
            request: async () => {
              const launch = await getLaunchList({ limit: 10, offset: 0 });

              return launch.results;
            },
            fieldProps: {
              fieldNames: {
                label: 'name',
                value: 'id',
              },
            },
            hideInTable: true,
          },
          {
            title: 'Date',
            key: 'date',
            valueType: 'dateRange',
            hideInTable: true,
          },
          {
            title: 'Action',
            valueType: 'option',
            key: 'option',
            render: (_, record) => (
              <>
                <Link to={`/article-detail/${record.id}`}>Xem</Link>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default ArticleTable;
