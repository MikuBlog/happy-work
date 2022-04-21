import alfy from "alfy";
import axios from "axios";

axios({
  url: `http://fundgz.1234567.com.cn/js/${alfy.input}.js?rt=1463558676006`,
  method: "get",
}).then(res => {
  const data = JSON.parse(res.data.match(/({.*})/g)[0]);
  if (data) {
    alfy.output([{
      title: `${data.name}【${data.gszzl > 0 ? `+${data.gszzl}` : data.gszzl}%】`,
      subtitle: `当前净值估算：${data.gsz}\t昨日单位净值：${data.dwjz}`,
      arg: data.fundcode,
    }])
  } else {
    alfy.output([{
      title: `暂无查询结果`,
    }]);
  }
}).catch(res => {
  alfy.output([{
    title: `暂无查询结果`,
  }]);
});
