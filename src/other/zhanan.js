import axios from "axios";
import alfy from "alfy";

axios({
  url: `https://api.lovelive.tools/api/SweetNothings/9999999/Serialization/Json`,
  method: "get",
}).then(res => {
  const { code, returnObj } = res.data;
  if (code === 200) {
    const filterList = returnObj.filter(val => alfy.input.trim()
      ? val.includes(alfy.input)
      : true).map(val => ({
        title: val,
        subtitle: '回车复制',
        arg: val,
      }))
    if (filterList.length) {
      alfy.output(filterList)
    } else {
      alfy.output([{
        title: '暂无查询结果'
      }])
    }
  } else {
    alfy.output([{
      title: '暂无查询结果'
    }])
  }
}).catch(err => {
  alfy.output([{
    title: err.toString(),
  }]);
})
