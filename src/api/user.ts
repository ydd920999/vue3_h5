/**
 * 所有跟用户相关的接口
 */

import { ApiResponse, HttpListResp } from '@/@types/http';
import axios from './axios';

/**
 * @interface loginParams -登录参数
 * @property {string} code -验证码
 * @property {string} username -用户名
 * @property {string} password -用户密码
 * @property {string} mobile -手机号
 */
interface LoginParams {
  code: string;
  username: string;
  password: string;
  mobile: string;
}

/**
 * 用户相关接口
 */
class UserService {
  // 注册登录
  static login<T = any>(data: any) {
    return axios<ApiResponse<T>>({
      url: '/seeker-web/v1/login',
      method: 'post',
      data,
    });
  }
  // 用户登出
  static logout<T = any>() {
    return axios<ApiResponse<T>>({
      url: '/seeker-web/v1/logout',
      method: 'post',
    });
  }
  // 获取图片验证码
  static getImageCode<T = any>(data?: any) {
    return axios<ApiResponse<T>>({
      url: '/seeker-web/v1/getImageCode',
      method: 'get',
      data,
    });
  }
  // 获取短信验证码
  static getMobileCode<T = any>(data: any) {
    return axios<ApiResponse<T>>({
      url: '/seeker-web/v1/getMobileCode',
      method: 'post',
      data,
    });
  }
}

export default UserService;
