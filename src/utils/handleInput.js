// 判断输入是否带有空格
export function hasPrefixBlank(input) {
  return !input.replace(/^\\\s+/, '')
}

// 删除所有html标签
export function delHtmlTag(str) {
  return str.replace(/<[^>]+>/g,"");
}