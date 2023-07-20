import { defineStore } from 'pinia';
import {
  USER_ID,
  APP_TOKEN,
  WEB_HTTP_AUTH_HEADER,
  APP_IM_TOKEN,
  APP_USER_SELECTED_AREA,
} from '@/constants';
import { Storage } from '@/utils/Storage';
import type { UserStoreType } from './types';

import UserService from '@/api/user';
// import UserService from '@/api/user';

const useUserStore = defineStore('user', {
  state: (): UserStoreType => ({
    userId: Storage.get(USER_ID, '') as string,
    token: Storage.get(APP_TOKEN, '') as string,
    tokenHeader: Storage.get(WEB_HTTP_AUTH_HEADER, 'Authorization-Hr'),
    userDetail: Storage.get('APP_USER_INFO', {}),
    imToken: Storage.get(APP_IM_TOKEN, ''),

    // 选中的区域，可能会有查询接口用到
    userSelectedArea: Storage.get(APP_USER_SELECTED_AREA, null),
  }),
  getters: {
    hasUserInfo: (state: UserStoreType): boolean => !!state.userDetail.mobile,
  },
  actions: {
    setToken(value: string | undefined) {
      Storage.set(APP_TOKEN, value);
      this.token = value!;
    },
    setTokenHeader(value: string | undefined) {
      Storage.set(WEB_HTTP_AUTH_HEADER, value);
      this.tokenHeader = value!;
    },
    setUserId(value: string | undefined) {
      Storage.set(USER_ID, value);
      this.userId = value!;
    },
    setImToken(value: string | undefined) {
      Storage.set(APP_IM_TOKEN, value);
      this.imToken = value!;
    },

    setUserInfo(info: any) {
      this.userDetail = info;
    },
    setUserSelectedArea(key: any) {
      Storage.set(APP_USER_SELECTED_AREA, key);
      this.userSelectedArea = key;
    },

    async appLogout() {
      await UserService.logout().catch(() => void 0);
      this.setToken('');
      this.setUserInfo(null);
      Storage.clear();
    },
  },
});

export { useUserStore };
