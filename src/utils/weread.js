import crypto from "crypto";

export function generateBookKey(bookId) {
  let str = crypto.createHash("md5").update(bookId).digest('hex');
  let strSub = str.substr(0, 3);
  let fa = function (id) {
    if (/^\d*$/['test'](id)) {
      for (var len = id['length'], c = [], a = 0; a < len; a += 9) {
        var b = id['slice'](a, Math.min(a + 9, len));
        c['push'](parseInt(b)['toString'](16));
      }
      return ['3', c];
    }
    for (var d = '', i = 0; i < id['length']; i++) {
      d += id['charCodeAt'](i)['toString'](16);
    }
    return ['4', [d]];

  }(bookId);

  strSub += fa[0],
    strSub += 2 + str['substr'](str['length'] - 2, 2);
  for (var m = fa[1], j = 0; j < m.length; j++) {
    var n = m[j].length.toString(16);
    1 === n['length'] && (n = '0' + n),
      strSub += n,
      strSub += m[j],
      j < m['length'] - 1 && (strSub += 'g');
  }
  return strSub.length < 20 && (strSub += str.substr(0, 20 - strSub.length)),
    strSub += crypto.createHash("md5").update(strSub).digest('hex').substr(0, 3);;
}