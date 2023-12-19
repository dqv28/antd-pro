import { getArticleList } from '@/services/ant-design-pro/api';
import { ProList } from '@ant-design/pro-components';

const ArticleList = () => {
  return (
    <div>
      <ProList<any>
        rowKey="id"
        headerTitle="Article List"
        request={async () => {
          const data: any = await getArticleList();
          console.log(data);

          return {
            data: data.results,
          };
        }}
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
    </div>
  );
};

export default ArticleList;
