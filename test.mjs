import md5 from "md5";
function url(word) {
  const isChinese = detectChinese(word);

  const from = isChinese ? "zh-CHS" : "auto";
  const to = isChinese ? "en" : "zh-CHS";
  const salt = Math.floor(Math.random() * 10000).toString();
  const sign = md5(`441c18a1a6f5ee86${word}${salt}KnmAqMh3SKvowjq9fm65JCVKUPLtiwI9`);

  const params = new URLSearchParams({
    q: word,
    from,
    to,
    appKey: '441c18a1a6f5ee86',
    salt,
    sign,
  });

  return "https://openapi.youdao.com/api?" + params.toString();
}

function detectChinese(word) {
  return /^[\u4e00-\u9fa5]+$/.test(word);
}

console.log(url('我是一段很长的'));
