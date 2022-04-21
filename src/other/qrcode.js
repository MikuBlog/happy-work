import alfy from "alfy";
import axios from "axios";
import { resolve } from "path";
import { download, outputFile } from '../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../utils/file.js';

const dir = './src/assets/temporary';

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
    url: `https://www.mxnzp.com/api/qrcode/create/single?content=${encodeURIComponent(alfy.input)}&size=500&type=0&app_id=${process.env.moyu_appid}&app_secret=${process.env.moyu_appsecret}`,
    method: 'get',
  }).then(async res => {
    const { code, data } = res.data;
    if (code) {
      mkdir(dir);
      clearDir(dir);
      await downloadAllPicture([{ arg: data.qrCodeUrl }]);
      const fileList = getDirFile(dir);
      if (code) {
        alfy.output([{
          title: data.qrCodeUrl,
          subtitle: data.content,
          arg: data.qrCodeUrl,
          icon: {
            path: resolve(`${dir}/${fileList[0]}`),
          }
        }])
      } else {
        alfy.output([{
          title: '暂无解析结果'
        }])
      }
    }
  }).catch(err => {
    alfy.output([{
      title: err.toString(),
    }])
  })
}
