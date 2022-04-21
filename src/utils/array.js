export function randomArr (array) {
  let i, j, t;
  // 通过遍历数组,随机调换数组元素
  for (i = array.length; i; i--) {
    j = Math.floor(Math.random() * i);
    t = array[i - 1];
    array[i - 1] = array[j];
    array[j] = t;
  }
  return array[0];
};