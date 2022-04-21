import alfy from "alfy";
import axios from "axios";
import { resolve } from "path";
import { download, outputFile } from '../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../utils/file.js';
// 临时文件存储路径
const dir = './src/assets/temporary';
async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.picUrl)));
  results.forEach((val, index) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + index}.png`), val.data);
  })
}

axios({
  url: `https://api.iyk0.com/tbsp/?msg=${encodeURIComponent(alfy.input)}&n=&type=json`,
  method: 'get',
}).then(async res => {
  const { code, data } = res.data;
  if (code === 200) {
    const list = data.map(val => ({
      title: val.title,
      subtitle: `${val.Price} ${val.shopTitle}`,
      picUrl: val.pictUrl,
      arg: val.auctionUrl,
    })).slice(0, 9)
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
    title: err.stack,
  }])
})