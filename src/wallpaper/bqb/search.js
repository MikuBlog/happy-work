import alfy from "alfy";
import axios from "axios";
import { resolve } from "path";
import { download, outputFile } from '../../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../../utils/file.js';

const dir = './src/assets/bqb';
async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.arg)));
  results.forEach((val, index) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + index}.png`), val.data);
  })
}

axios({
  url: `https://api.iyk0.com/sbqb/?msg=${encodeURIComponent(alfy.input)}`,
  method: 'get',
}).then(async res => {
  const { code, data_img } = res.data;
  if (code === 200) {
    const list = data_img.map((val, ind) => ({
      title: val.describe,
      subtitle: '回车跳转下载',
      arg: val.img,
    })).slice(0, 15);
    mkdir(dir);
    clearDir(dir);
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
      title: `暂无查询结果`,
    }])
  }
}).catch(err => {
  alfy.output([{
    title: err.toString(),
  }])
})