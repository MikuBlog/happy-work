import axios from "axios";
import alfy from "alfy";
import { resolve } from "path";
import { clearDir, mkdir, getDirFile } from '../utils/file.js';
import { download, outputFile } from '../utils/downloadfile.js';

const dir = './src/assets/temporary';

async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.img)));
  results.forEach((val, ind) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + ind}.png`), val.data);
  })
}

axios({
  url: `https://api.iyk0.com/ysxw/`,
  method: 'get',
}).then(async res => {
  const { code, data } = res.data;
  if (code === 200 && data.length) {
    mkdir(dir);
    clearDir(dir);
    const list = data.map(val => ({
      title: `${val.title} 【${val.focus_date}】`,
      subtitle: val.brief,
      arg: val.url,
      img: val.image,
    })).slice(0, 9);
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
    title: err.toString(),
  }])
})