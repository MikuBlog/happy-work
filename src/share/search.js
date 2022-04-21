import alfy from "alfy";
import axios from "axios";

axios({
  url: `http://9.134.163.104/shares-bot/getShareData?keywords=${encodeURIComponent(alfy.input)}`,
  method: "get",
}).then(res => {
  const data = res.data.data;
  if (data.name) {
    alfy.output([
      {
        title: `${data.name}【${data.priceZdPercentUp ? `+${data.priceZdPercentUp}` : data.priceZdPercentDown}】`,
        subtitle: `当前股票价格：${data.priceUp ? data.priceUp : data.priceDown}  ${data.time}`,
        arg: data.link,
      }
    ])
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