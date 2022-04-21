import alfy from "alfy";
import axios from "axios";

axios({
  url: `https://s.search.bilibili.com/main/suggest?term=${encodeURIComponent(alfy.input)}`,
  method: 'GET'
}).then(res => {
  if (res.data['0']) {
    const list = Object.keys(res.data).reduce((pre, next) => {
      pre.push(res.data[next])
      return pre
    }, []).map(val => ({
      title: val.term,
      arg: `https://search.bilibili.com/all?keyword=${val.value}`,
    }))
    alfy.output(list)
  } else {
    alfy.output([{
      title: alfy.input,
      arg: `https://search.bilibili.com/all?keyword=${alfy.input}`,
    }])
  }
}).catch(err => {
  alfy.output([{
    title: alfy.input,
    arg: `https://search.bilibili.com/all?keyword=${alfy.input}`,
  }])
})