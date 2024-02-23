import { type Params, getArticleDetail } from '@/services/ant-design-pro/api';
import { ProDescriptions } from '@ant-design/pro-components';
import { useParams } from 'umi';

const columns = [
  {
    title: 'Image',
    dataIndex: 'image_url',
    valueType: 'image',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title_contains',
    valueType: 'text',
  },
  {
    title: 'News site',
    dataIndex: 'news_site',
    key: 'news_site',
    valueType: 'text',
  },
  {
    title: 'Published',
    dataIndex: 'published_at',
    valueType: 'dateTime',
  },
  {
    title: 'Summary',
    dataIndex: 'summary',
    valueType: 'text',
  },
];

const ArticleDetail = () => {
  const params: Params = useParams();

  return (
    <ProDescriptions
      title="Article Detail"
      columns={columns}
      column={2}
      style={{
        backgroundColor: '#fff',
        padding: '16px 20px',
      }}
      request={async () => {
        const data = await getArticleDetail({ id: +params.id });

        return {
          data,
        };
      }}
    />
  );
};

export default ArticleDetail;
