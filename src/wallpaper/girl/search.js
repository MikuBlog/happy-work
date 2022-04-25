import alfy from "alfy";
import axios from "axios";
import { resolve } from "path";
import { download, outputFile } from '../../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../../utils/file.js';
const dir = './src/assets/girl';
async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.arg)));
  results.forEach((val, index) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + index}.png`), val.data);
  })
}

async function toDo() {
  if (!process.env.moyu_appid || !process.env.moyu_appsecret) {
    alfy.output([{
      title: '请先配置moyu_appid和moyu_appsecret',
    }])
  } else {
    try {
      const sexys = await Promise.all(new Array(9).fill(0).map(val => axios({
        url: 'https://api.iyk0.com/mtyh/?return=json',
        method: 'get'
      })))
      const list = sexys.map(val => ({
        title: val.data.imgurl,
        subtitle: val.data.size,
        arg: val.data.imgurl,
      }))
      mkdir(dir);
      clearDir(dir);
      await downloadAllPicture(list);
      const fileList = getDirFile(dir);
      if (list.length) {
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
    } catch (err) {
      alfy.output([{
        title: err.toString(),
      }])
    }
  }
}

toDo();
