import alfy from "alfy";
import axios from "axios";
axios({
  url: "http://wxunitest.oa.com/mockmanager/docker-oper/QueryDockerPodsForRC",
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
}).then(res => {
  const { data: { rtn, dockerPods } } = res;
  const items = dockerPods.filter((val) => val.hostname.indexOf(alfy.input) !== -1)
  if (!rtn && items.length) {
    return alfy.output(items.map(val => ({
      title: `hostname: ${val.hostname}`,
      subtitle: `module: ${val.module} ${val.inner_ip}:${val.port}`,
      arg: `module: ${val.module} ${val.inner_ip}:${val.port}`,
    })));
  } else {
    alfy.output([{
      title: '无法查询到该容器信息',
    }]);
  }
}).catch(err => {
  alfy.output([{
    title: '无法查询到该容器信息',
  }]);
});