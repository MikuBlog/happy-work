import axios from 'axios';
import alfy from 'alfy';
import moment from 'moment';
import { hasPrefixBlank } from '../utils/handleInput.js'

function transferInput(input) {
  if ('当前时间'.includes(input) || 'now'.includes(input) || hasPrefixBlank(input)) {
    return Date.now();
  }
  return input;
}

if (!process.env.moyu_appid || !process.env.moyu_appsecret) {
  alfy.output([{
    title: '请先配置moyu_appid和moyu_appsecret',
  }])
} else {
  axios({
    url: `https://www.mxnzp.com/api/holiday/single/${moment(transferInput(alfy.input)).format('YYYYMMDD')}?ignoreHoliday=false&app_id=${process.env.moyu_appid}&app_secret=${process.env.moyu_appsecret}`,
    method: 'get',
  }).then(res => {
    const { code, data } = res.data;
    const timeList = []
    if (code) {
      timeList.push({
        title: data.date,
        subtitle: '活动',
        arg: data.date,
      })
      timeList.push({
        title: data.weekDay,
        subtitle: '星期',
        arg: data.weekDay,
      })
      timeList.push({
        title: data.typeDes,
        subtitle: '活动',
        arg: data.typeDes,
      })
      timeList.push({
        title: data.yearTips,
        subtitle: '年号',
        arg: data.yearTips,
      })
      timeList.push({
        title: data.chineseZodiac,
        subtitle: '生肖',
        arg: data.chineseZodiac,
      })
      timeList.push({
        title: data.lunarCalendar,
        subtitle: '农历日期',
        arg: data.lunarCalendar,
      })
      timeList.push({
        title: data.constellation,
        subtitle: '星座',
        arg: data.constellation,
      })
      timeList.push({
        title: data.suit,
        subtitle: '宜',
        arg: data.suit,
      })
      timeList.push({
        title: data.avoid,
        subtitle: '忌',
        arg: data.avoid,
      })
      alfy.output(timeList);
    } else {
      alfy.output([{
        title: '暂无查询结果',
      }])
    }
  }).catch(err => {
    alfy.output([{
      title: err.toString(),
    }])
  })
}
