import alfy from "alfy";
import $axios from "../utils/txRequest.js";
import https from "https";
import { clearDir, mkdir, getDirFile, getEmptyJpeg } from '../utils/file.js';
import { download, outputFile } from '../utils/downloadfile.js';
import { resolve } from "path";

const dir = './src/assets/wx';

async function downloadAllPicture(list) {
  const results = await Promise.all(list.filter(val => val.img).map(val => download(val.img)));
  results.forEach((val, ind) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + ind}.png`), val.data);
  })
}

const transformRequest = [data => {
  let str = ""
  for (let key in data) {
    str += `${key}=${data[key]}&`
  }
  return str.replace(/&$/, '')
}];

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

try {
  const user = await $axios({
    url: "https://weixin.oa.com/itilwebmmtools/ajax/account_info/get_uin",
    method: "post",
    transformRequest,
    data: {
      search: alfy.input
    },
    httpsAgent,
  })

  if (user.data.length) {
    mkdir(dir);
    clearDir(dir);
    const userInfo = await $axios({
      url: 'https://weixin.oa.com/itilwebmmtools/ajax/account_info/get_user_info',
      method: 'post',
      transformRequest,
      data: {
        uin: user.data[0].uin,
      },
      httpsAgent,
    })
    const result = {
      ...userInfo.data,
      ...user.data[0],
    }
    await downloadAllPicture([{ img: `${result.headimg}/` }]);
    const icon = {
      icon: {
        path: resolve(`${dir}/${getDirFile(dir)[0]}`),
      }
    }
    alfy.output([{
      title: `${result.nickname}`,
      subtitle: '微信昵称',
      arg: `${result.nickname}`,
      ...icon
    }, {
      title: `${result.uin}`,
      subtitle: '微信uin',
      arg: `${result.uin}`,
      ...icon
    }, {
      title: `${result.alias}`,
      subtitle: '微信账号',
      arg: `${result.alias}`,
      ...icon
    }, {
      title: `${result.username}`,
      subtitle: '原账号信息',
      arg: `${result.username}`,
      ...icon
    }, {
      title: `${result.headimg}/`,
      subtitle: '微信头像',
      arg: `${result.headimg}/`,
      ...icon
    }, {
      title: `${result.bindmobile}`,
      subtitle: '绑定电话',
      arg: `${result.bindmobile}`,
      ...icon
    }, {
      title: `${Number(result.bindqq) || '暂无绑定'}`,
      subtitle: '绑定QQ',
      arg: `${Number(result.bindqq) || '暂无绑定'}`,
      ...icon
    }, {
      title: `${result.currentidc}`,
      subtitle: 'currentidc',
      arg: `${result.currentidc}`,
      ...icon
    }, {
      title: `${result.clientversion}`,
      subtitle: 'clientversion',
      arg: `${result.clientversion}`,
      ...icon
    }])
  } else {
    alfy.output([{
      title: '没有查询到该用户',
    }])
  }
} catch (e) {
  alfy.output([{
    title: e.errmsg,
    subtitle: e.errtips,
  }])
}