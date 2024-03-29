// @ts-ignore
/* eslint-disable */
import { UniqueIdentifier } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/ ', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

export type Msg = {
  id: number;
  name: string;
  image: string;
  desc: string;
  mine?: boolean;
  emoji?: any;
  emoticon: number;
  emotId: number;
};

export async function listMsg(totalMsg: number): Promise<Msg[]> {
  const data = localStorage.getItem('Messages');
  let msg;

  if (data === null) {
    return [];
  }

  msg = JSON.parse(data).filter((_: any, index: number) => index < totalMsg);

  return msg;
}

export async function sendMsg(newCnsMsg: Msg): Promise<Msg> {
  const data = localStorage.getItem('Messages');

  if (data === null) {
    localStorage.setItem('Messages', JSON.stringify([newCnsMsg]));
    return newCnsMsg;
  }

  const oldCnsMsg = JSON.parse(data);
  localStorage.setItem('Messages', JSON.stringify([...oldCnsMsg, newCnsMsg]));

  return newCnsMsg;
}

export async function sendEmoticon(id: number, emotId: number) {
  const data = localStorage.getItem('Messages');

  if (!data) {
    return [];
  }

  const cnsMsg = JSON.parse(data);
  cnsMsg.map((msg: Msg) => {
    if (msg.id === id) {
      msg.emotId = emotId;

      if (msg.emoticon === 0) {
        msg.emoticon = 1;
      } else {
        msg.emoticon = msg.emoticon + 1;
      }
    }
  });

  localStorage.setItem('Messages', JSON.stringify([...cnsMsg]));

  return cnsMsg;
}

export async function resetEmoticon(id: number) {
  const data = localStorage.getItem('Messages');

  if (!data) {
    return [];
  }

  const cnsMsg = JSON.parse(data);
  cnsMsg.map((msg: Msg) => {
    if (msg.id === id) {
      msg.emoticon = 0;

      if (msg.emoticon === 0) {
        msg.emotId = 0;
      }
    }
  });

  localStorage.setItem('Messages', JSON.stringify([...cnsMsg]));

  return cnsMsg;
}

export type Article = {
  id: number;
  title: string;
  image_url: string;
  news_site: string;
  published_at: string;
  [key: string]: any;
};

export async function getArticleList(
  params: {
    limit: number;
    offset: number;
    [key: string]: any;
  },
  option?: { [key: string]: any },
) {
  return request<{
    count: number;
    results: Article[];
  }>(`https://api.spaceflightnewsapi.net/v4/articles/`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(option || {}),
  });
}

export type Params = {
  [key: string]: any;
};

export async function getArticleDetail(
  params: {
    id: number;
  },
  option?: { [key: string]: any },
) {
  return request<Article>(`https://api.spaceflightnewsapi.net/v4/articles/${params.id}`, {
    method: 'GET',
    ...(option || {}),
  });
}

export type ArticleE = {
  id: number | string;
  name: string;
};

export async function getEventList(
  params: {
    limit: number;
    offset: number;
  },
  option?: { [key: string]: any },
) {
  return request<{ results: ArticleE[] }>('https://ll.thespacedevs.com/2.2.0/event/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(option || {}),
  });
}

export async function getLaunchList(
  params: {
    limit: number;
    offset: number;
  },
  option?: { [key: string]: any },
) {
  return request<{ results: ArticleE[] }>('https://ll.thespacedevs.com/2.2.0/launch/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(option || {}),
  });
}

export type Menu = {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  children?: Menu[] | null;
};

//Page builder API
export interface CompList {
  id: number;
  icon: ReactNode;
  text: string;
  type: string;
}

interface Options {
  [key: string]: any;
}

export interface Block {
  id: UniqueIdentifier;
  type: string;
  options: Options;
  icon?: ReactNode;
  children: Block[];
}

export interface BuilderComp {
  page?: string;
  blocks: Block[];
}

export const getBuilderComp = () => {
  const str = localStorage.getItem('Builder');

  if (!str) {
    return {};
  }

  const builder: BuilderComp = JSON.parse(str);
  return builder;
};

export const addBuilderComp = (page: string, comp: Block) => {
  const str = localStorage.getItem('Builder');
  const data = str ? JSON.parse(str) : null;

  const builder: BuilderComp = {
    page,
    blocks: data ? [...data.blocks, comp] : [comp],
  };

  localStorage.setItem('Builder', JSON.stringify(builder));
  return comp;
};
