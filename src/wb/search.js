import alfy from "alfy";
import axios from "axios";
import { resolve } from "path";
import { download, outputFile } from '../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../utils/file.js';
// 临时文件存储路径
const dir = './src/assets/temporary';
const encodeInput = encodeURIComponent(alfy.input);

async function downloadAllPicture(list) {
  const results = await Promise.all(list.filter(val => val.image).map(val => download(val.image)));
  results.forEach((val, index) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + index}.png`), val.data);
  })
}

axios({
  url: `https://s.weibo.com/ajax/topsuggest.php?key=${encodeInput}&_k=1656995883380&_t=1&outjson=1&uid=7576001481`,
  method: 'get',
}).then(async res => {
  const { user, querys } = res.data;
  const list = [];
  if (user && Array.isArray(user) && user.length) {
    list.push(...user.map(val => ({
      title: `${val.u_name}${val.verified_reason ? `【${val.verified_reason}】` : ''}`,
      subtitle: `${val.verified ? '·认证· ' : ''}${val.description}`,
      arg: `https://weibo.com/u/${val.u_id}`,
      image: val.u_pic,
    })));
  }
  if (querys && Array.isArray(querys) && querys.length) {
    list.push(...querys.map(val => ({
      title: `${val.key}`,
      subtitle: '回车搜索',
      arg: `https://s.weibo.com/weibo?q=${val.key}`,
    })));
  }
  if (list.length) {
    mkdir(dir);
    clearDir(dir);
    await downloadAllPicture(list);
    const fileList = getDirFile(dir);
    alfy.output(list.map((val, ind) => ({
      ...val,
      icon: {
        path: fileList[ind]
        ? resolve(`${dir}/${fileList[ind]}`)
        : '',
      }
    })))
  } else {
    alfy.output([{
      title: alfy.input,
      subtitle: '回车搜索',
      arg: `https://s.weibo.com/weibo?q=${alfy.input}`,
    }])
  }
}).catch(err => {
  alfy.output([{
    title: err.stack,
  }])
})

// axios({
//   url: `https://s.weibo.com/ajax/topsuggest.php?key=${encodeInput}&_k=1656995883380&_t=1&outjson=1&uid=7576001481`,
//   method: 'get',
// }).then(res => {
//   const { code, name, content } = res.data
//   console.log(res.data);
//   // if (code === 200) {
//   //   alfy.output([{
//   //     title: content,
//   //     subtitle: name,
//   //     // arg: `https://hanyu.baidu.com/zici/s?wd=${encodeInput}&query=${encodeInput}`,
//   //     arg: `https://baike.baidu.com/item/${encodeInput}`
//   //   }])
//   // } else {
//   //   alfy.output([{
//   //     title: '没有找到相关结果',
//   //     subtitle: '回车前往百度搜索',
//   //     arg: `https://www.baidu.com/s?wd=${encodeInput}`,
//   //   }])
//   // }
// }).catch(err => {
//   alfy.output([{
//     title: err.toString(),
//   }])
// })