import alfy from "alfy";
import axios from "axios";

if (!process.env.moyu_appid || !process.env.moyu_appsecret) {
  alfy.output([{
    title: '请先配置moyu_appid和moyu_appsecret',
  }])
} else {
  axios({
    url: `http://www.tianqiapi.com/api?version=v9&appid=${process.env.weather_appid}&appsecret=${process.env.weather_appsecret}&city=${encodeURIComponent(alfy.input)}`,
    method: "get",
  }).then(res => {
    const { errcode, data, city } = res.data;
    if (!errcode) {
      alfy.output(data.map((val, ind) => ({
        title: `${city} ${val.date}(${ind === 0 ? '今天' : val.week}) ${val.tem2}℃~${val.tem1}℃`,
        subtitle: `${ind === 0 ? `当前温度：${val.tem}℃` : ''}${val.humidity ? `\t湿度：${val.humidity}\t` : ''}${val.wea_day !== val.wea_night ? `${val.wea_day}转${val.wea_night}` : val.wea_day}`,
        arg: `${city}：${val.date}`,
      })))
    } else if (errcode === 100) {
      alfy.output([{
        title: `调用次数过高，请稍后再试`,
      }]);
    }else {
      alfy.output([{
        title: `暂无查询结果`,
      }]);
    }
  }).catch(err => {
    alfy.output([{
      title: `暂无查询结果` + err,
    }]);
  });
}
