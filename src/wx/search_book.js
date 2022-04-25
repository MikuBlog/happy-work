import alfy from "alfy";
import axios from "axios";
import { generateBookKey } from '../utils/weread.js';
import { download, outputFile } from '../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../utils/file.js';
import { resolve } from "path";

const dir = './src/assets/weread';

async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.icon)));
  results.forEach((val, ind) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + ind}.png`), val.data);
  })
}

axios({
  url: `https://weread.qq.com/web/search/global?keyword=${encodeURIComponent(alfy.input)}&maxIdx=0&fragmentSize=120&count=20`,
  method: 'GET'
}).then(async res => {
  mkdir(dir);
  clearDir(dir);
  const list = res.data.books.map(val => ({
    title: `${val.bookInfo.title}【${val.bookInfo.publisher ? `${val.bookInfo.publisher}-` : ''}${val.bookInfo.author}】`,
    subtitle: val.bookInfo.intro,
    icon: val.bookInfo.cover,
    arg: `https://weread.qq.com/web/reader/${generateBookKey(val.bookInfo.bookId)}`,
  }))
  await downloadAllPicture(list);
  const fileList = getDirFile(dir);
  if (list.length) {
    const outputList = list.map(((val, ind) => ({
      ...val,
      icon: {
        path: resolve(`${dir}/${fileList[ind]}`),
      }
    })))
    alfy.output(outputList)
  } else {
    alfy.output([{
      title: '暂无搜索结果',
    }])
  }
}).catch(err => {
  alfy.output([{
    title: '暂无搜索结果',
  }])
})