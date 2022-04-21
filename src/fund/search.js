import alfy from "alfy";
import axios from "axios";

async function getFundDetail(input) {
  try {
    const res = await axios({
      url: `http://fundgz.1234567.com.cn/js/${encodeURIComponent(input)}.js?rt=1463558676006`,
      method: "get",
    });
    let data = undefined;
    if (res.data.indexOf("{") !== -1) {
      data = JSON.parse(res.data.match(/({.*})/g)[0]);
    }
    if (data) {
      return {
        title: `${data.name}【${data.gszzl > 0 ? `+${data.gszzl}` : data.gszzl}%】`,
        subtitle: `当前净值估算：${data.gsz}\t昨日单位净值：${data.dwjz}`,
        arg: data.fundcode,
      };
    }
  } catch(err) {
    return {
      title: `暂无查询结果`,
      msg: 'error',
    };
  }
}

async function getFundFilterList(input) {
  const res = await axios({
    url: `http://fund.eastmoney.com/js/fundcode_search.js`,
    method: "get",
  });
  const data = JSON.parse(res.data.match(/(\[.*\])/g));
  const filterList = data.filter(val => val[2].indexOf(input) !== -1 || val[0] === input)
  return Promise.all(filterList.map(val => getFundDetail(val[0])));
}

async function enter(input) {
  const results = (await getFundFilterList(input)).filter(val => val && !val.msg);
  if (results.length) {
    alfy.output(results)
  } else {
    alfy.output([
      {
        title: '查询无结果'
      }
    ])
  }
}

enter(alfy.input);