import alfy from "alfy";
import axios from "axios";
import moment from "moment";
const [city, date] = alfy.input.split("：");

if (!process.env.moyu_appid || !process.env.moyu_appsecret) {
  alfy.output([{
    title: '请先配置moyu_appid和moyu_appsecret',
  }])
} else {
  axios({
    url: `http://www.tianqiapi.com/api?version=v9&appid=${process.env.weather_appid}&appsecret=${process.env.weather_appsecret}&city=${encodeURIComponent(city)}`,
    method: "get",
  }).then(res => {
    const { errcode, data, city } = res.data;
    if (!errcode) {
      alfy.output(
        data.find(val => val.date === date).hours.map((val) => ({
          title: `${city} ${val.hours} ${val.tem}℃`,
          hours: val.hours.replace('时', '').trim(),
          subtitle: `${val.wea}\t${val.win}${val.win_speed}`,
          arg: "",
        })).filter(val => {
          if (moment().format('YYYY-MM-DD') === date) {
            return moment().hours() <= Number(val.hours)
          } else {
            return true;
          }
        })
      )
    } else {
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
