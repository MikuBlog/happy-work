import alfy from "alfy";
import $axios from "../utils/txRequest.js";
import { delHtmlTag } from "../utils/handleInput.js";

$axios({
  url: 'https://km.woa.com/gkm/api/question/index?limit=30&agent=pc&token=',
  method: 'get'
}).then(res => {
  const { code, data: { list } } = res;
  if (!code) {
    alfy.output(list.map(val => ({
      title: val.title,
      subtitle: `${val.created} ${delHtmlTag(val.content)}`,
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