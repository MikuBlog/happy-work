import axios from "axios";
import alfy from "alfy";

try {
  const resp = await axios({
    url: `https://api.iyk0.com/yq/?msg=${encodeURIComponent(alfy.input)}`,
    method: 'get'
  })
  const { code, 查询地区, 目前确诊, 死亡人数, 治愈人数, 新增确诊, 现存确诊, 现存无症状, time } = resp.data;
  if (code === 200) {
    alfy.output([{
      title: `${查询地区} 新增确诊:${新增确诊} 现存确诊:${现存确诊} 现存无症状:${现存无症状}`,
      subtitle: `更新时间:${time} 目前确诊:${目前确诊} 治愈人数:${治愈人数} 死亡人数:${死亡人数}`,
      arg: `${alfy.input}疫情`,
    }])
  } else {
    alfy.output([{
      title: '查找失败，请输入正确的城市名',
    }])
  }
} catch(err) {
  alfy.output([{
    title: err.toString(),
  }])
}