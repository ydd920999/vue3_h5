import { ApiResponse } from '@/@types/http';
import axios from './axios';

class HomeService {
  // 首页轮播图接口
  static getBannerInformation<T = any>() {
    return axios<ApiResponse<T>>({
      url: '/seeker-web/v1/getBannerInformation',
      method: 'get',
    });
  }
  // 热招职位-更多
  static selectHrJobList<T = any>(params: any) {
    return axios<ApiResponse<T>>({
      url: '/seeker-web/v1/selectHrJobList',
      method: 'get',
      params,
    });
  }
  // 获取求职者匹配度最高的职位
  static async selectSeekerMatchResumeList<T = any>(params: any) {
    return axios<ApiResponse<T>>({
      url: `/seeker-web/v1/selectSeekerMatchResumeList`,
      method: 'get',
      params,
    });
  }
  // 职位详情
  static selectHrJobInfo<T = any>(params: any) {
    return axios<ApiResponse<T>>({
      url: `/seeker-web/v1/selectHrJobInfo`,
      method: 'get',
      params,
    });
  }
  // 投递简历
  static async seekerSendResume<T = any>(params: any) {
    return axios<ApiResponse<T>>({
      url: `/seeker-web/v1/seekerSendResume`,
      method: 'post',
      params,
    });
  }
  // 求职进展已投递数据
  static selectSeekerSendResumeList<T = any>(params: any) {
    return axios<ApiResponse<T>>({
      url: '/seeker-web/v1/selectSeekerSendResumeList',
      method: 'get',
      params,
    });
  }
}

export default HomeService;
