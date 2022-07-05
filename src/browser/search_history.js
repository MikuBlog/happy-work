import alfy from 'alfy'
import { resolve } from 'path'
import moment from 'moment'
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

getAllHistory(process.env.history_minutes).then(history => {
  // 扁平化数组
  const list = history.flat().map(val => ({
    title: val.title,
    time: val.utc_time,
    subtitle: `${val.browser} ${moment(val.utc_time).add(8, 'H').format('YYYY-MM-DD HH:mm:ss')}`,
    arg: val.url,
    icon: {
      path: getIconFile(val.browser),
    }
  }));
  // 筛选匹配数据
  const matchItems = list.filter(val => val.title ? val.title.includes(alfy.input) : false);
  // 数据去重
  const filterItems = [...matchItems.reduce((pre, next) => {
    if (!pre.has(next.title)) {
      pre.set(next.title, next);
    }
    return pre;
  }, new Map()).values()]
  // 按照最新时间排序
  const sortList = filterItems.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  if (sortList.length) {
    alfy.output(filterItems)
  } else {
    alfy.output([{
      title: alfy.input,
      subtitle: '没有找到该浏览器历史记录',
    }])
  }
})