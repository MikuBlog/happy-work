import axios from 'axios'
import { getUserCookie, refreshUserCookie } from "./getOaticket.js";

export default async function $axios(options) {
  const userInfo = await getUserCookie();
  let headers = {
    Cookie: `${userInfo.oaticket}; TCOA_TICKET=${userInfo.oaticket.split(";").find(val => val.includes('RIO_TCOA_TICKET_HTTPS')).replace('RIO_TCOA_TICKET_HTTPS=tof:', '')}`,
  }
  options.headers
  && (
    headers = {
      ...options.headers,
      Cookie: `${headers.Cookie}${options.headers.Cookie || ''}`
    }
  );
  try {
    const res = await axios({
      ...options,
      headers,
    })
    if (typeof res.data === 'string' && res.data.includes('OA登录')) {
      refreshUserCookie();
      return Promise.reject({
        errcode: '401',
        errmsg: '员工票据已过期，已自动为你更新票据',
        errtips: '请重试该功能',
      })
    }
    return Promise.resolve(res.data);
  } catch(err) {
    return Promise.reject({
      errcode: '500',
      errmsg: err.toString(),
      errtips: new Error(err).stack,
    });
  }
}