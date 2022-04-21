import alfy from "alfy";
import $axios from "../utils/txRequest.js";

$axios({
  url: 'https://km.woa.com/gkm/api/question/main?limit=30&token=',
  method: 'get'
}).then(res => {
  const { code, data: { list } } = res;
  if (!code) {
    alfy.output(list.map(val => ({
      title: val.title,
      subtitle: `阅读数：${val.read_count} ${val.best_answer.id ? val.best_answer.content_text : ''}`,
      arg: val.id,
    })))
  } else {
    alfy.output([{
      title: '请求失败，请重试',
    }])
  }
}).catch(e => {
  alfy.output([{
    title: e.errmsg,
    subtitle: e.errtips,
  }])
})