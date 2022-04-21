import fs from 'fs-extra';
import axios from 'axios';
import { resolve } from 'path';

export function download(url) {
  return axios({
    url,
    method: 'get',
    responseType: 'arraybuffer',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36 Edg/100.0.1185.39'
    }
  })
}

export function outputFile(path, data) {
  fs.writeFileSync(resolve(path), data);
}