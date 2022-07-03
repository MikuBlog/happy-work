import axios from 'axios';
import alfy from 'alfy';
// import { delHtmlTag } from "../utils/handleInput.js";

const encodeInput = encodeURIComponent(alfy.input);

axios({
  url: `https://api.iyk0.com/bk/?msg=${encodeInput}`,
  method: 'get',
}).then(res => {
  const { code, name, content } = res.data
  if (code === 200) {
    alfy.output([{
      title: content,
      subtitle: name,
      // arg: `https://hanyu.baidu.com/zici/s?wd=${encodeInput}&query=${encodeInput}`,
      arg: `https://baike.baidu.com/item/${encodeInput}`
    }])
  } else {
    alfy.output([{
      title: '没有找到相关结果',
      subtitle: '回车前往百度搜索',
      arg: `https://www.baidu.com/s?wd=${encodeInput}`,
    }])
  }
}).catch(err => {
  alfy.output([{
    title: err.toString(),
  }])
})