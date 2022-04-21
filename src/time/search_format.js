import alfy from 'alfy'
import moment from 'moment'
import 'moment/locale/zh-cn.js'
import { hasPrefixBlank } from '../utils/handleInput.js'

moment.suppressDeprecationWarnings = true;

function transferType(time) {
  if (isNaN(time)) {
    return time;
  }
  return Number(time);
}

function transferInput(input) {
  if ('当前时间'.includes(input) || 'now'.includes(input) || hasPrefixBlank(input)) {
    return Date.now();
  }
  return input;
}

try {
  let time = transferInput(alfy.input);
  const timeList = []
  if (!isNaN(time) && String(time).length === 10) {
    timeList.push({
      title: moment(time * 1000).format('YYYY-MM-DD HH:mm:ss'),
      subtitle: '正常日期',
      arg: `moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')`,
    })
  } else {
    timeList.push({
      title: moment(transferType(time)).format('YYYY-MM-DD HH:mm:ss'),
      subtitle: '正常日期',
      arg: `moment(time).format('YYYY-MM-DD HH:mm:ss')`,
    })
  }
  timeList.push({
    title: moment(transferType(time)).unix(),
    subtitle: 'unix时间戳',
    arg: `moment(time).unix()`,
  })
  timeList.push({
    title: moment(transferType(time)).valueOf(),
    subtitle: '时间戳',
    arg: `moment(time).valueOf()`
  })
  timeList.push({
    title: moment(transferType(time)).calendar(),
    subtitle: '日历时间',
    arg: `moment(time).calendar()`
  })
  timeList.push({
    title: moment(transferType(time)).fromNow(),
    subtitle: '现在时间相对传入时间',
    arg: `moment(time).fromNow()`
  })
  timeList.push({
    title: moment(transferType(time)).toNow(),
    subtitle: '传入时间相对现在时间',
    arg: `moment(time).toNow()`
  })
  timeList.push({
    title: `${moment(transferType(time)).daysInMonth()}天`,
    subtitle: '当月总天数',
    arg: `moment(time).daysInMonth()`,
  })
  timeList.push({
    title: moment(transferType(time)).toString(),
    subtitle: '英文时间',
    arg: `moment(time).toString()`,
  })
  timeList.push({
    title: `${JSON.stringify(moment(transferType(time)).toArray())}`,
    subtitle: '数组格式',
    arg: `moment(time).toArray()`,
  })
  timeList.push({
    title: `${JSON.stringify(moment(transferType(time)).toObject())}`,
    subtitle: '对象格式',
    arg: `moment(time).toObject()`,
  })
  alfy.output(timeList)
} catch(err) {
  alfy.output([{
    title: alfy.input
  }])
}
