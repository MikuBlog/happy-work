import axios from 'axios';
import alfy from 'alfy';
import { delHtmlTag } from "../utils/handleInput.js";

axios({
  url: `https://hanyu.baidu.com/s?wd=${encodeURIComponent(alfy.input)}&from=zici`,
  method: 'get',
}).then(res => {
  const list = delHtmlTag(res.data).split("\n").filter(val => val.trim()).map(val => val.trim());
  const baseInd = list.indexOf('基本释义');
  const detailInd = list.indexOf('详细释义');
  const bkInd = list.indexOf('百科释义');
  const outputList = []
  if (baseInd !== -1) {
    outputList.push({
      title: '基本释义',
      subtitle: list[baseInd + 2 + (detailInd !== -1 ? 1 : 0)],
      arg: list[baseInd + 2 + (detailInd !== -1 ? 1 : 0)],
    })
  }
  if (bkInd !== -1) {
    outputList.push({
      title: '百科释义',
      subtitle: list[bkInd + 2],
      arg: list[bkInd + 2],
    })
  }
  if (outputList.length) {
    alfy.output(outputList);
  } else {
    alfy.output([{
      title: '没有找到相关结果',
    }])
  }
})