import { exec } from 'child_process'
import alfy from 'alfy'

// 删除相同 且 processId相近的进程
function filterItem(list, input) {
  let startInd = 0;
  for(; startInd < list.length; startInd++) {
    if (list[startInd].title === input && list[startInd].subtitle - 1 == list[startInd + 1].subtitle) {
      break;
    }
  }
  list.splice(startInd, startInd + 2);
  return list;
}

exec('ps aux', function (err, stdout, stderr) {
  if (err) {
    return console.error(err)
  }
  const list = stdout.split('\n').map(val => {
    const items = val.split(/[ ]+/);
    return {
      title: items[items.length - 1],
      subtitle: items[1],
      arg: items[1]
    }
  });
  const matchItems = filterItem(alfy.inputMatches(list, 'title').sort((a, b) => b.subtitle - a.subtitle), alfy.input);
  if (matchItems.length) {
    alfy.output(matchItems)
  } else {
    alfy.output([{
      title: '找不到该进程'
    }])
  }
})