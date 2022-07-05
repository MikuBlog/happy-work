# alfred 工作流

- 安装并导入：

```
npm i @xuanzai/happy-work -g
```
或
```
yarn global add @xuanzai/happy-work
```

> 这里建议使用 node 16 以上进行安装。如果还未装node，请直接安装[nvm](https://github.com/nvm-sh/nvm)，再安装node即可~

- 出现下图红框所示则表示工作流安装成功！

![](https://bot.xuanzai.top/assets/40365ee51bda217d4c547acabd9fca36-1647839735614.png)

<br/>

# 已有功能

## 提效类功能

1. 指定目录打开终端

关键词：terminal + 目录名

2. 在此处打开终端

关键词：terminal here

快捷键：Option + T

> 取最顶层访答窗口打开终端，如果没有则默认在桌面打开终端

3. 创建文件

关键词：cf + 文件名

> 取最顶层访答窗口打开终端，如果没有则默认在桌面创建文件

4. 指定目录打开vscode

关键词：vscode + 目录名

5. 在此处打开vscode

关键词：code

快捷键：Option + C

> 取最顶层访答窗口打开终端，如果没有则默认将`desktop`作为目录打开

6. 永久删除文件

关键词：delete + 文件 / 目录名

> 效果为：rm -rf，请谨慎使用

7. 杀掉进程【已废弃】

关键词：kill + 进程名

> 效果为 kill -15 xxx || kill -9 xxxx

> 请使用第三方工作流，体验更佳：https://github.com/ngreenstein/alfred-process-killer

8. 复制文件路径

关键词：filepath + 文件 / 目录名

9. 复制当前目录路径

关键词：dirpath here

快捷键：Option + P

> 取最顶层访答窗口复制路径

10. 浏览器历史记录

关键词：history + 历史记录关键词

11. 浏览器历史连接

关键词：url + 链接

12. 重命名目录下的所有文件

关键词：rename + 目录名

> 执行此命令后，将会在该目录下生成一个`rename_dir`目录，里面存放所有被重命名的文件

13. 一键打开浏览器隐私模式

快捷键：Option + I

> 仅兼容`chrome`与`Edge`

14. 一键打开浏览器阅读模式

快捷键：Option + R

> 仅支持`Edge`

15. 编码

关键词：

- md5 + 字符串
- base64 + 字符串
- encode + 字符串
- decode + 字符串

16. 时间

关键词：time + (YYYY-MM-dd) / 时间戳

> 默认展示当天

17. 字节转换

关键词：byte + 数字

18. 百度百科

关键词：bk / 百科 + 关键词

19. 将下载窗口索引至第一个finder窗口

热键：ctrl + d

20. 在访答中打开路径输入框

热键：ctrl + f

<br/>

## 休闲类功能

1. 基金查询

关键词：jj + 基金代号 / 基金名称

2. 天气查询

关键词：wd / tq + 城市名

3. 热搜榜单

关键词：rs / 热搜

> 提供知乎、百度、央视热搜榜单

4. 每日番剧

关键词：每日番剧 / mrfj

> 提供B站与dilidili源番剧信息

5. bilibili视频解析

关键词：bt + bilibili视频链接

6. 疫情查询

关键词：yq / 疫情 + 关键词

7. 每日bing图

关键词：bing

8. 微信读书查询

关键词：weread + 书名

9. 汇率计算

关键词：price + 币种

> 默认展示全部汇率

10. 万年历

关键词：calendar + 日期

> 默认展示今天

11. 美女图

关键词：mv / 美女

12. 二次元

关键词：ecy / 二次元

13. 垃圾分类

关键词：垃圾分类 + 物品名称

14. 食物卡路里

关键词：food + 食物名称

15. 渣男语录

关键词：zn + 关键词筛选

16. 微博搜索

关键词：wb + 关键词筛选

# 主题

【白昼主题】
https://www.alfredapp.com/extras/theme/E2Il27hRTn/

![](https://bot.xuanzai.top/assets/569cadab600f525af4f5c84991f2bc0c-1648368303017.png)

【暗黑主题】
https://www.alfredapp.com/extras/theme/hbdfskPOgc/

![](https://bot.xuanzai.top/assets/64bf36375753f6982144aa8673535300-1648368303159.png)

<br/>

# 友情推荐

> 【有道云翻译】 https://github.com/wensonsmith/YoudaoTranslator
