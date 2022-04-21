import axios from "axios";
import alfy from "alfy";

try {
  const resp = await axios({
    url: `https://api.iyk0.com/zj?msg=${encodeURIComponent(alfy.input)}`,
    method: 'get'
  })
  const { code, msg } = resp.data;
  if (code === 200) {
    alfy.output([{
      title: msg,
      subtitle: '转换结果',
      arg: msg,
    }])
  } else {
    alfy.output([{
      title: '转换失败',
    }])
  }
} catch(err) {
  alfy.output([{
    title: err.toString(),
  }])
}