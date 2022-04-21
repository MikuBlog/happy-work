import axios from 'axios';
import cheerio from 'cheerio';

const resp = await axios({
  url: 'http://dilidili.in/',
  method: 'get',
})

const $ = cheerio.load(resp.data);
const eles = $('#dm_ul_2 > li').map(function (i, el) {
  return {
    title: $(this).text(),
    link: `http://dilidili.in${$(this).find('a').attr('href')}`,
  };
}).get();

// // console.log(eles);

// const storageArr = new Array(Math.ceil(eles.length / limitArr)).fill([]);
// let index = -1;

// eles.forEach((val, ind) => {
//   if (ind % 10 === 0) {
//     ++ index;
//   }
//   storageArr[index].push(val);
// })

// const images = [];

// for (let i = 0; i < storageArr.length; i ++) {
//   images.push(await Promise.all(storageArr[i].map(val => axios({
//     url: val.link,
//     method: 'get',
//   }))));
//   break;
// }

// console.log(images)

// console.log(images)

// axios({
//   url: 'http://dilidili.in/acg/3736/',
//   method: 'get'
// }).then(res => {
//   console.log(res.data)
// })