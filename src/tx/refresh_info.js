import alfy from "alfy";
import { refreshUserCookie } from "../utils/getOaticket.js";

await refreshUserCookie();
alfy.output([{
  title: '票据刷新成功！',
  subtitle: '刷新票据后，可以通过票据访问内网接口',
}])