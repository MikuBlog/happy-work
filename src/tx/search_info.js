import { getUserCookie } from "../utils/getOaticket.js";
import alfy from "alfy";

const userInfo = (await getUserCookie());

alfy.output([{
  title: userInfo.rtxname,
  subtitle: '当前用户rtxname',
  arg: userInfo.rtxname,
}, {
  title: '内网所有cookie',
  subtitle: userInfo.oaticket,
  arg: userInfo.oaticket,
}, ...userInfo.oaticket.split(';').map(item => {
  const [key, value] = item.split('=');
  return {
    title: key,
    subtitle: value,
    arg: `${key}=${value};`
  }
})])