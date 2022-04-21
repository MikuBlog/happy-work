import alfy from "alfy";
import $axios from "../utils/txRequest.js";
import { delHtmlTag } from "../utils/handleInput.js";

$axios({
  url: `https://iwiki.woa.com/tencent/api/search/isearch?limit=20&offset=0&query=${encodeURIComponent(alfy.input)}`,
  method: 'get'
}).then(res => {
  alfy.output(res.contents.map(val => ({
    title: delHtmlTag(val.title),
    subtitle: `【${val.author}】${delHtmlTag(val.fragment)}`,
    arg: val.href,
  })))
}).catch(e => {
  alfy.output([{
    title: e.errmsg,
    subtitle: e.errtips,
  }])
})