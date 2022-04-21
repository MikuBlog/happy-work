import alfy from "alfy";
import axios from "axios";

axios({
  url: `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=35835,35106,31660,36012,36087,34584,36120,36074,35994,35984,35322,26350,36092,36062&wd=${encodeURIComponent(alfy.input)}&req=2&csor=3&pwd=b1&cb=jQuery11020551714521841596_1647683055289&_=1647683055292`,
  method: "get",
}).then(res => {
  const data = JSON.parse(res.data.match(/(\[.*\])/g));
  const list = data.map(item => ({
    title: item.q,
    arg: item.q,
  }));
  list.unshift({
    title: alfy.input,
    arg: alfy.input,
  })
  alfy.output(list)
}).catch(err => {
  alfy.output([{
    title: `${alfy.input}`,
    arg: `${alfy.input}`,
  }]);
});