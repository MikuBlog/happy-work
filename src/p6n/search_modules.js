import alfy from "alfy";
import axios from "axios";
axios({
  url: "http://wxunitest.oa.com/mockmanager/test-env/QueryPods",
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  data: {
    module: alfy.input,
    status: 6,
  },
}).then(res => {
  const { data: { rtn, pods } } = res;
  if (!rtn && pods.length) {
    return alfy.output(pods.map(val => ({
      title: `${val.hostName}${val.isTimeout ? `【已过期】`: `【${val.statusDesc}】`}`,
      subtitle: `创建人：${val.operator}\t更新时间：${val.updateTimeStr}`,
      arg: val.p6nURL,
    })));
  } else {
    alfy.output([{
      title: '无法查询到该模块测试环境的发布信息',
    }]);
  }
}).catch(err => {
  alfy.output([{
    title: '无法查询到该模块测试环境的发布信息',
  }]);
});