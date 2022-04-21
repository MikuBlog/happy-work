import alfy from "alfy";
import { resolve } from "path";
import { download, outputFile } from '../../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../../utils/file.js';
const dir = './src/assets/bing';
async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.arg)));
  results.forEach((val, index) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + index}.png`), val.data);
  })
}

async function everyDayBing() {
  const list = [{
    title: '每日bing图',
    subtitle: '回车跳转下载',
    arg: 'https://api.kdcc.cn/img/',
  }]
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
}

everyDayBing()