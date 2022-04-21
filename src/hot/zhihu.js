import axios from "axios";
import alfy from "alfy";
import { resolve } from "path";
import { clearDir, mkdir, getDirFile, getEmptyJpeg } from '../utils/file.js';
import { download, outputFile } from '../utils/downloadfile.js';

const dir = './src/assets/zhhot';

async function downloadAllPicture(list) {
  const results = await Promise.all(list.filter(val => val.img).map(val => download(val.img)));
  results.forEach((val, ind) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + ind}.png`), val.data);
  })
}

axios({
  url: `https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true`,
  method: 'get',
}).then(async res => {
  const { data } = res.data;
  if (data.length) {
    mkdir(dir);
    clearDir(dir);
    const list = data.map(val => ({
      title: val.target.title,
      subtitle: val.target.excerpt,
      arg: val.target.id,
      img: val.children[0].thumbnail,
    })).slice(0, 9);
    await downloadAllPicture(list);
    const fileList = getDirFile(dir);
    let emptyNum = 0;
    alfy.output(list.map((val, ind) => ({
      ...val,
      icon: {
        path: val.img
        ? resolve(`${dir}/${fileList[ind - emptyNum]}`)
        : (++ emptyNum, getEmptyJpeg())
      }
    })))
  } else {
    alfy.output([{
      title: '暂无数据',
    }])
  }
}).catch(err => {
  alfy.output([{
    title: '请求失败，请重试' + err.toString(),
  }])
})