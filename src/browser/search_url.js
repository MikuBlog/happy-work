import alfy from 'alfy'
import { resolve } from 'path'
import { getAllHistory } from 'node-browser-history';

function getIconFile(type) {
  switch (type) {
    case 'Google Chrome':
      return resolve('./src/assets/browser/chrome.jpeg')
    case 'Microsoft Edge':
      return resolve('./src/assets/browser/edge.jpeg')
    case 'Mozilla Firefox':
      return resolve('./src/assets/browser/firefox.png')
    case 'Torch':
      return resolve('./src/assets/browser/torch.png')
    case 'Opera':
      return resolve('./src/assets/browser/opera.png')
    case 'SeaMonkey':
      return resolve('./src/assets/browser/seamonkey.png')
    case 'Vivaldi':
      return resolve('./src/assets/browser/vivaldi.png')
    case 'Safari':
      return resolve('./src/assets/browser/safari.png')
    case 'maxthon':
      return resolve('./src/assets/browser/maxthon.png')
    case 'brave':
      return resolve('./src/assets/browser/brave.png')
    case 'AVAST Browser':
      return resolve('./src/assets/browser/avast.png')
  }
}

getAllHistory(process.env.url_minutes).then(history => {
  const list = history.flat().sort((a, b) => new Date(b.utc_time).getTime() - new Date(a.utc_time).getTime()).map(val => ({
    title: val.url,
    subtitle: val.title,
    arg: val.url,
    icon: {
      path: getIconFile(val.browser),
    }
  }));
  // 筛选数据并排序
  const matchItems = alfy.inputMatches(list, 'arg').sort((a, b) => a.arg.indexOf(alfy.input) - b.arg.indexOf(alfy.input)).sort((a, b) => a.arg.length - b.arg.length)
  // 数组对象去重
  const filterItems = [...matchItems.reduce((pre, next) => {
    if (!pre.has(next.arg)) {
      pre.set(next.arg, next);
    }
    return pre;
  }, new Map()).values()]
  if (filterItems.length) {
    alfy.output(filterItems)
  } else {
    alfy.output([{
      title: alfy.input,
      subtitle: '没有找到相关网址，回车访问该地址',
      arg: alfy.input
    }])
  }
})