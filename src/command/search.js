import alfy from "alfy";
const common = [
  {
    label: '端口占用',
    description: 'netstat -anp | grep <端口号>',
    command: 'netstat -anp | grep ',
  },
  {
    label: '查看端口进程',
    description: 'lsof -i:<端口号>',
    command: 'lsof -i:',
  },
  {
    label: '杀死该进程端口',
    description: 'kill -9 <进程号>',
    command: 'kill -9 ',
  },
  {
    label: '构建镜像',
    description: 'docker build <目录路径> -t <镜像名称>',
    command: 'docker build . -t ',
  },
  {
    label: '通过buildkit构建镜像',
    description: 'DOCKER_BUILDKIT=1 docker build <目录路径> -t <镜像名称> --no-cache',
    command: 'DOCKER_BUILDKIT=1 docker build . -t imageName --no-cache',
  },
  {
    label: '运行镜像',
    description: 'docker run -p <端口号>:<目标端口号> -d <镜像名称>',
    command: 'docker run -p 8080:8080 -d imageName',
  },
  {
    label: '进入容器内部',
    description: 'docker exec -it <容器id> /bin/bash',
    command: 'docker exec -it <容器id> /bin/bash',
  },
  {
    label: '删除所有停止的容器',
    description: 'docker container prune',
    command: 'docker container prune',
  },
  {
    label: '查找文件',
    description: 'find 路径 -type f -name + 文件名(可用通配符)',
    command: 'find / -type f -name ',
  },
  {
    label: '查看所有进程',
    description: 'ps aux',
    command: 'ps aux',
  },
  {
    label: 'vim 删除一行命令',
    description: 'dd',
    command: 'dd',
  },
  {
    label: 'vim 从光标开始删除到末尾命令',
    description: 'dG',
    command: 'dG',
  },
  {
    label: 'vim 替换文本',
    description: '%s/{匹配的内容}/{替换的内容}/g g(表示全局替换)',
    command: '%s/{匹配的内容}/{替换的内容}/g',
  },
  {
    label: '监听文件输出内容',
    description: 'tail -f <文件路径>',
    command: 'tail -f ',
  },
  {
    label: '查看文件重复行',
    description: 'sort <文件名> | uniq -c',
    command: 'sort <文件名> | uniq -c',
  },
  {
    label: '比较两个文件',
    description: 'diff -u <文件名> <文件名>',
    command: 'diff -u <文件名> <文件名>',
  },
  {
    label: 'npm 查看包版本',
    description: 'npm view <包名> versions',
    command: 'npm view <包名> versions',
  },
  {
    label: 'npm 发布预览版本',
    description: 'npm version prepatch --preid alpha',
    command: 'npm version prepatch --preid alpha',
  },
  {
    label: 'npm 发布beta版本',
    description: 'npm version prepatch --preid beta',
    command: 'npm version prepatch --preid beta',
  },
  {
    label: 'npm 查看全局安装包路径',
    description: 'npm list -g --depth 0',
    command: 'npm list -g --depth 0',
  },
]
// 数组转换
function transformList(sourceList) {
  const list = []
  sourceList.forEach(item => {
    list.push({
      title: item.label,
      subtitle: item.description,
      arg: item.command,
    })
  })
  return list
}
const matchItems = alfy.inputMatches(common, 'label');
matchItems.length
  ? alfy.output(transformList(matchItems))
  : alfy.output(
    transformList(common)
  )