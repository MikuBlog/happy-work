import axios from "axios";
import alfy from "alfy";
import { resolve } from "path";
import { download, outputFile } from '../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../utils/file.js';

const dir = './src/assets/bilibili';

async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.arg)));
  results.forEach((val, index) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + index}.png`), val.data);
  })
}

if (!process.env.moyu_appid || !process.env.moyu_appsecret) {
  alfy.output([{
    title: '请先配置moyu_appid和moyu_appsecret',
  }])
} else {
  axios({
    url: `https://www.mxnzp.com/api/bilibili/video?url=${Buffer.from(alfy.input).toString('base64')}&app_id=${process.env.moyu_appid}&app_secret=${process.env.moyu_appsecret}`,
    method: "get",
  }).then(async res => {
    const { code, data } = res.data;
    mkdir(dir);
    clearDir(dir);
    await downloadAllPicture([{arg: data.cover}]);
    const fileList = getDirFile(dir);
    if (code) {
      alfy.output([{
        title: data.title,
        subtitle: data.desc || '暂无简介',
        arg: data.list[0].url,
        icon: {
          path: resolve(`${dir}/${fileList[0]}`),
        }
      }])
    } else {
      alfy.output([{
        title: '暂无解析结果'
      }])
    }
  }).catch(err => {
    alfy.output([{
      title: err.toString(),
    }])
  })
}
