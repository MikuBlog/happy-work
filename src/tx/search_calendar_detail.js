import alfy from "alfy";
import $axios from "../utils/txRequest.js";

const [year, month] = alfy.input.replace(/\s+/g, '').split("-");

$axios({
  url: `http://hr.oa.com/hrportal/api/calendar/event/month?_=${Date.now()}}`,
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    year,
    month
  }
}).then(res => {
  if (res.success) {
    const list = res.data;
    if (list.length) {
      alfy.output(list.map(val => ({
        title: val.events.join(' | '),
        subtitle: `时间：${val.eventDate}`
      })))
    } else {
      alfy.output([{
        title: '该月暂无事件',
      }])
    }
  } else {
    alfy.output([{
      title: '该月暂无事件',
    }])
  }
}).catch(e => {
  alfy.output([{
    title: e.errmsg,
    subtitle: e.errtips,
  }])
})