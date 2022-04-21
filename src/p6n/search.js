import alfy from "alfy";

const items = [
  {
    keywords: 'modules',
    description: '查询模块部署流水'
  },
  {
    keywords: 'dockers',
    description: '查询容器流水'
  }
]

const matchItems = alfy.inputMatches(items, 'keywords').map(item => ({
  title: item.keywords,
  subtitle: item.description,
  arg: item.keywords,
}))

alfy.output(matchItems);