import puppeteer from 'puppeteer';
import { getJson, writeJson } from "./file.js";
import { timeout } from '../config/index.js';

const LOGIN_URL = 'https://passport.woa.com/modules/passport/signin.ashx?url=https%3A%2F%2Fdev.mmgame.woa.com%2F';

export async function getUserCookie() {
  const obj = getJson();
  const { oaticket_expires } = obj;
  // 如果存储的票据不存在亦或是过期了，则重新获取；否则直接引用缓存票据
  if (!oaticket_expires || (oaticket_expires && oaticket_expires < Date.now())) {
    return await refreshUserCookie();
  } else {
    const { oaticket, rtxname } = obj;
    return { oaticket, rtxname };
  }
};

export async function refreshUserCookie() {
  const obj = getJson();
  const browser = await puppeteer.launch({ devtools: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1580 });
  await page.goto(LOGIN_URL);
  await page.click('#btn_smartlogin');
  const browserContext = page.browserContext();
  await browserContext.waitForTarget(
    (target) => target.url().startsWith('https://dev.mmgame.woa.com'),
    {
      timeout: 20000,
    },
  );
  const mycookie = await page.cookies();

  const rtxname = await new Promise((resolve, reject) => {
    page.on('response', async (res) => {
      if (/ts:auth\/tauth\/info\.ashx/.test(res.request().url())) {
        const response = await res.text();
        const { EngName } = JSON.parse(response);
        resolve(EngName);
      }
    });
    setTimeout(() => {
      reject('get rtx name timeout!');
    }, 5000);
  });

  const effectiveCookies = ['RIO_TCOA_TICKET', 'RIO_TCOA_TICKET_HTTPS'];
  const cookieResult = [];
  const effectiveCookieResult = [];
  mycookie.forEach((e) => {
    if (effectiveCookies.includes(e.name)) {
      effectiveCookieResult.push(`${e.name}=${e.value}`);
    }
    cookieResult.push(`${e.name}=${e.value}`);
  });
  await browser.close();
  obj['oaticket_expires'] = Date.now() + timeout;
  obj['oaticket'] = cookieResult.join(";");
  obj['rtxname'] = rtxname;
  writeJson(obj);
  return { oaticket: obj['oaticket'], rtxname: obj['rtxname'] };
}

getUserCookie();