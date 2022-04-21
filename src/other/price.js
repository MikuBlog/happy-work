import axios from "axios";
import alfy from "alfy";

if (!process.env.moyu_appid || !process.env.moyu_appsecret) {
  alfy.output([{
    title: '请先配置moyu_appid和moyu_appsecret',
  }])
} else {
  axios({
    url: `https://www.mxnzp.com/api/exchange_rate/list?app_id=${process.env.moyu_appid}&app_secret=${process.env.moyu_appsecret}`,
    method: "get",
  }).then(res => {
    const { code, data } = res.data;
    if (code) {
      const list = data.map(val => ({
        title: `${val.name}【${val.price}】`,
        subtitle: val.nameDesc,
      }));
      const matchItems = alfy.inputMatches(list, 'subtitle')
      if (matchItems.length) {
        alfy.output(matchItems)
      } else {
        alfy.output(list)
      }
    } else {
      alfy.output([{
        title: '暂无查询结果'
      }])
    }
  }).catch(err => {
    alfy.output([{
      title: err.toString(),
    }])
  })
}
