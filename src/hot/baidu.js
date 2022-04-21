import axios from "axios";
import alfy from "alfy";
import { resolve } from "path";
import { clearDir, mkdir, getDirFile } from '../utils/file.js';
import { download, outputFile } from '../utils/downloadfile.js';

const dir = './src/assets/bdhot';

async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.img)));
  results.forEach((val, ind) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + ind}.png`), val.data);
  })
}

axios({
  url: `https://api.geekzwzs.cn/resou?sum=9`,
  method: 'get',
}).then(async res => {
  const { retcode, data } = res.data;
  if (retcode === 200 && data[0].value.length) {
    mkdir(dir);
    clearDir(dir);
    const list = data[0].value.map(val => ({
      title: val.wordQuery,
      subtitle: val.desc,
      arg: val.rawUrl,
      img: val.img,
    }))
    await downloadAllPicture(list);
    const fileList = getDirFile(dir);
    alfy.output(list.map((val, ind) => ({
      ...val,
      icon: {
        path: resolve(`${dir}/${fileList[ind]}`),
      }
    })))
  } else {
    alfy.output([{
      title: '暂无数据',
    }])
  }
}).catch(err => {
  alfy.output([{
    title: '请求失败，请重试',
  }])
})