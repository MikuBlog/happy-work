import alfy from "alfy";
import axios from "axios";
import { resolve } from "path";
import { download, outputFile } from '../../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../../utils/file.js';
import { randomArr } from '../../utils/array.js';

const dir = './src/assets/temporary';
async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.arg)));
  results.forEach((val, index) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + index}.png`), val.data);
  })
}

const links = ['https://api.oick.cn/random/api.php?type=pc', 'https://api.iyk0.com/ecy/api.php']

// 随机二次元
const erciyuans = await Promise.all(new Array(9).fill(0).map(val => axios({
  url: randomArr(links),
  method: 'get'
})))


axios({
  url: `https://www.mxnzp.com/api/image/girl/list/random?app_id=${process.env.moyu_appid}&app_secret=${process.env.moyu_appsecret}`,
  method: 'get',
}).then(async res => {
  const { data } = res.data;
  const list = erciyuans.map(val => ({
    title: val.request.res.responseUrl,
    subtitle: '回车访问链接',
    arg: val.request.res.responseUrl,
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
}).catch(err => {
  alfy.output([{
    title: err.stack,
  }])
})
