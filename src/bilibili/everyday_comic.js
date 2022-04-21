import alfy from "alfy";
import axios from "axios";
import { resolve } from "path";
import { download, outputFile } from '../utils/downloadfile.js';
import { clearDir, mkdir, getDirFile } from '../utils/file.js';
import cheerio from 'cheerio';
import moment from "moment";

const dir = './src/assets/bilibili';

async function downloadAllPicture(list) {
  const results = await Promise.all(list.map(val => download(val.square_cover)));
  results.forEach((val, ind) => {
    outputFile(resolve(`${dir}/${Date.now() + Math.random() + ind}.png`), val.data);
  })
}

function getTypeComic(type) {
  return axios({
    url: `https://api.bilibili.com/pgc/web/timeline?types=${type}&before=0&after=0`,
    mmethod: 'GET',
  })
}

async function getAllComic() {
  try {
    const results = await Promise.all([
      getTypeComic('1'),
      getTypeComic('4'),
    ]);
    mkdir(dir);
    clearDir(dir);
    const list = results.filter(res => !res.data.code).map(res => res.data.result[0].episodes).flat().sort((a, b) => a.pub_ts - b.pub_ts)
    const resp = await axios({
      url: 'http://dilidili.in/',
      method: 'get',
    })
    
    // 新增dilidili番剧来源
    const $ = cheerio.load(resp.data);
    const eles = $(`#con_dm_${moment().day()} li`).map(function (i, el) {
      return {
        title: $(this).text(),
        subtitle: '来源: dilidili.in',
        arg: `http://dilidili.in${$(this).find('a').attr('href')}`,
      };
    }).get();

    if (list.length) {
      await downloadAllPicture(list);
      const fileList = getDirFile(dir);
      alfy.output(list.map((val, ind) => ({
        title: `${val.title}`,
        subtitle: `${val.pub_index} ${val.pub_time} 来源: B站`,
        arg: `https://www.bilibili.com/bangumi/play/ss${val.season_id}`,
        icon: {
          path: resolve(`${dir}/${fileList[ind]}`),
        }
      })).concat(eles));
    } else {
      alfy.output([{
        title: `暂无查询结果`,
      }]);
    }
  } catch (err) {
    alfy.output([{
      title: `暂无查询结果`,
    }]);
  }
}

getAllComic();