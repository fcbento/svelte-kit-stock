import { writable } from "svelte/store";
import { loginUrl } from '../api/api';
import { UserInfo } from '../utils/user-info';
import axios from 'axios';

export const userStore = writable([]);
const userInfo = new UserInfo();

export class User {

  async login(email: string, password: string) {
    return axios.post(loginUrl, { email, password })
      .then((res) => {
        if (res.status === 200) {
          userInfo.setToken(res.headers.authorization);
          userInfo.setInfo(res.data);
        }
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
}
