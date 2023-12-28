export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/demo',
    name: 'Post ',
    icon: 'smile',
    component: './Demo',
  },
  {
    path: '/article-list',
    name: 'Article',
    icon: 'smile',
    component: './ArticleList',
  },
  {
    path: '/article-table',
    name: 'Article table',
    icon: 'table',
    component: './ArticleTable',
  },
  {
    path: '/article-detail/:id',
    component: './ArticleDetail',
  },
  {
    path: '/article-form',
    name: 'Article form',
    icon: 'table',
    component: './ArticleForm',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    // redirect: '/welcome',
  },
  {
    component: './404',
  },
];
