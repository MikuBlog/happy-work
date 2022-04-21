import axios from "axios";
import alfy from "alfy";

function transform(value) {
  switch (value) {
    case 1:
      return '推荐';
    case 2:
      return '适量';
    case 3:
      return '少吃';
  }
}

if (!process.env.moyu_appid || !process.env.moyu_appsecret) {
  alfy.output([{
    title: '请先配置moyu_appid和moyu_appsecret',
  }])
} else {
  axios({
    url: `https://www.mxnzp.com/api/food_heat/food/search?keyword=${encodeURIComponent(alfy.input)}&page=1&app_id=${process.env.moyu_appid}&app_secret=${process.env.moyu_appsecret}`,
    method: "get",
  }).then(res => {
    const { code, data } = res.data;
    if (code && data.list.length) {
      alfy.output(data.list.map(val => ({
        title: val.name,
        subtitle: `卡路里：${val.calory}千卡/100g\t推荐指数：${transform(val.healthLevel)}`,
        arg: val.name,
      })))
    } else {
      alfy.output([{
        title: '暂无查询结果'
      }])
    }
  }).catch(err => {
    alfy.output([{
      title: '暂无查询结果'
    }])
  })
}
