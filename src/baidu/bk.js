import axios from 'axios';
import alfy from 'alfy';
import { delHtmlTag } from "../utils/handleInput.js";

axios({
  url: `https://api.iyk0.com/bk/?msg=${encodeURIComponent(alfy.input)}`,
  method: 'get',
}).then(res => {
  const { code, name, content } = res.data
  if (code === 200) {
    alfy.output([{
      title: content,
      subtitle: name,
      arg: content,
    }])
  } else {
    alfy.output([{
      title: '没有找到相关结果',
    }])
  }
}).catch(err => {
  alfy.output([{
    title: err.toString(),
  }])
})