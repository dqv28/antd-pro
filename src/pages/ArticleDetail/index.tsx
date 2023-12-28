import { Params, getArticleDetail } from '@/services/ant-design-pro/api';
import { ProDescriptions } from '@ant-design/pro-components';
import { useParams } from 'umi';

const ArticleDetail = () => {
  const params: Params = useParams();

  return (
    <ProDescriptions
      title="Article Detail"
      style={{
        backgroundColor: '#fff',
        padding: '16px 20px',
      }}
      column={2}
      request={async () => {
        const data = await getArticleDetail({ id: +params.id });

        return {
          data,
        };
      }}
      columns={[
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
      ]}
    />
  );
};

export default ArticleDetail;
