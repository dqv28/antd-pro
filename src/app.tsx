import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { getAccessCode, getCurrentUser } from '@/services/api-graph-fb';
import variables from '@/services/api-graph-fb/variables';

// const isDev = process.env.NODE_ENV === 'development';
const signInWithFbUri = `https://www.facebook.com/v18.0/dialog/oauth?` + new URLSearchParams({
  client_id: variables.appId,
  redirect_uri: variables.redirectUri,
  state: 'login'
});

const loginPath = `/user/login`; 

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

const { location }: any = history

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  accessCode?: any;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push('/')
      window.location.href = signInWithFbUri
    }
    return undefined;
  };

  if (!location.query.code) {
    if (!location.query.error) {
      const currentUser = await fetchUserInfo();
      return {
        fetchUserInfo,
        currentUser,
        settings: defaultSettings,
      };
      
    }

    history.push(loginPath)

  }
  
  const accessCode = await getAccessCode(location)
  const currentUser = await getCurrentUser(accessCode)

  return {
    accessCode,
    currentUser,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {

  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: '',
    },
    menuHeaderRender: undefined,
    
    childrenRender: (children: any, props: { location: { pathname: string | string[]; }; }) => {
      if (!initialState?.currentUser) {
        return;
      }
      
      if (initialState?.loading) return <PageLoading />;

      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
