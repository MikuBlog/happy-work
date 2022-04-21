import tinify from 'tinify'
import alfy from 'alfy'
import { isDir, readDir, mkdir } from '../utils/file.js'
import { resolve } from 'path'

tinify.key = process.env.tinify_key;

const path = alfy.input;

if (isDir(path)) {
  const compressDir = `${path}/compress`;
  mkdir(compressDir)
  readDir(path).forEach(file => {
    tinify.fromFile(`${path}/${file}`).toFile(`${compressDir}/${file}`)
  })
  alfy.output([{
    title: '压缩完毕',
    subtitle: '回车打开文件目录',
    arg: compressDir,
    icon: {
      path: resolve('./src/assets/normal/success.jpeg'),
    }
  }])
} else {
  const dir = path.match(/\/.*\//)[0];
  const compressDir = `${dir}/compress`;
  mkdir(compressDir)
  tinify.fromFile(path).toFile(`${compressDir}/${path.replace(dir, '')}`)
  alfy.output([{
    title: '压缩完毕',
    subtitle: '回车打开文件目录',
    arg: compressDir,
    icon: {
      path: resolve('./src/assets/normal/success.jpeg'),
    }
  }])
}
