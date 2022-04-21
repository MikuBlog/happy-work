import alfy from "alfy";

alfy.output([{
  title: `直接访问：${alfy.input}`,
  subtitle: `选择此项回车直接打开浏览器访问`,
  arg: alfy.input
}, {
  title: `继续搜索：${alfy.input}`,
  subtitle: `选择此项回车将继续以此为关键词搜索`,
  arg: `继续搜索:${alfy.input}`
}])