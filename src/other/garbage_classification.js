import axios from "axios";
import alfy from "alfy";

if (!process.env.moyu_appid || !process.env.moyu_appsecret) {
  alfy.output([{
    title: '请先配置moyu_appid和moyu_appsecret',
  }])
} else {
  axios({
    url: `https://www.mxnzp.com/api/rubbish/type?name=${encodeURIComponent(alfy.input)}&app_id=${process.env.moyu_appid}&app_secret=${process.env.moyu_appsecret}`,
    method: "get",
  }).then(res => {
    const { code, data } = res.data;
    if (code) {
      const aim = data.aim
        ? [{
          title: data.aim.goodsName,
          subtitle: data.aim.goodsType,
          arg: data.goodsName,
        }]
        : [];
      alfy.output(aim.concat(data.recommendList.map(val => ({
        title: val.goodsName,
        subtitle: val.goodsType,
        arg: val.goodsName,
      }))))
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
