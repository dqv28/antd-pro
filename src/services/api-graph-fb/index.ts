import { request } from 'umi'
import variables from './variables'

export const getAccessCode = async (location: any, options?: { [key: string]: any }) => {
    return request(`${variables.apiURL}/oauth/access_token?`, {
      method: 'GET',
      params: {
        client_id: variables.appId,
        redirect_uri: variables.redirectUri,
        client_secret: variables.appSecret,
        code: location.query.code
      },
      ...(options || {})
    })
}

export const getCurrentUser = async (accessCode: any, options?: { [key: string]: any }) => {
  return request(`${variables.apiURL}/me`, {
    method: 'GET',
    params: {
      access_token: accessCode.access_token 
    },
    ...(options || {})
  })
}

export const getPosts = async (accessCode: any, options?: { [key: string]: any }) => {
  return request<{
    data2: any[],
    paging: any
  }>(`${variables.apiURL}/me/likes?fields=name,category,username&`, {
    method: 'GET',
    params: {
      access_token: accessCode.access_token
    },
    ...(options || {})
  })
}