import { writable } from "svelte/store";
import { loginUrl } from '../api/api';
import { Utils } from '../utils/utils';
import axios from 'axios';

export const userStore = writable([]);

export class User {
  
  private utils = new Utils();

  async login(email: string, password: string) {
    return axios.post(loginUrl, { email, password })
      .then((res) => {
        if (res.status === 200) {
          this.utils.setToken(res.headers.authorization);
          this.utils.setInfo(res.data);
        }
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
}
