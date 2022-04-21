import alfy from "alfy";
const common = [
  {
    label: 'p6n',
    description: '部署系统',
    url: 'https://poseidon.oa.com/',
  },
  {
    label: 'iwiki',
    description: '腾讯公司内部文档',
    url: 'https://iwiki.woa.com/',
  },
  {
    label: '立知权限管理系统',
    description: '立知权限管理系统',
    url: 'https://mauth.weixin.oa.com/mauth/priv/?id=26',
  },
  {
    label: 'AC权限管理系统',
    description: 'AC权限管理系统',
    url: 'https://wego.weixin.oa.com/wego/weac/page/index#/user-system/list',
  },
  {
    label: '测试环境模块监控',
    description: '测试环境模块上线流水',
    url: 'http://wxunitest.oa.com/mockmanager/MainPage?panel=TEST-ENV-POD-MANAGER-PANEL',
  },
  {
    label: '微信测试号',
    description: '微信测试号',
    url: 'http://wxunitest.oa.com/mockmanager/MainPage?panel=TEST-ACCT-PANEL',
  },
  {
    label: 'cube',
    description: '服务日志管理系统',
    url: 'https://cube.weixin.oa.com/wego/wecubemonitorweb/biz/2350/logAnalysis/log?pieField=%5B%22group_key%22%5D&pieIndicator=%5B%22count%22%5D&lineGranularity=60&lineIndicator=%5B%22count%22%5D&lineField=%5B%5D&keys=%5B%5D&start_time=1647503244701&end_time=1647510444701&fields=%5B%22report_ip%22,%22time%22,%22group_key%22,%22label%22%5D',
  },
  {
    label: '建包平台',
    description: '专门用于圈定微信相关人群，用于各方业务进行人群投放的建包平台',
    url: 'http://growth.weixin.oa.com/mn/push/targeting',
  },
  {
    label: '七彩石',
    description: '敏感配置信息管理系统',
    url: 'http://rainbow.oa.com/console/',
  },
  {
    label: 'pass',
    description: '审批管理系统',
    url: 'https://wego.weixin.oa.com/wego/wedoc/read/wepass/blank',
  },
  {
    label: 'pass接口文档',
    description: '审批管理系统',
    url: 'https://wego.weixin.oa.com/wego/wedoc/read/wepass/blank',
  },
  {
    label: 'uin查询',
    description: '查询微信用户uin',
    url: 'https://weixin.oa.com/#/https://weixin.oa.com/itilwebmmtools/view/account_info',
  },
  {
    label: '微信运营门户',
    description: '各种微信服务运营',
    url: 'https://weixin.oa.com/',
  },
  {
    label: '会议室预约',
    description: '预约公司会议室',
    url: 'http://meeting.woa.com/book?type=2',
  },
  {
    label: 'mysql申请',
    description: '公司内mysql数据库申请',
    url: 'https://pay.weixin.oa.com/dbnew/table_new_submit',
  },
  {
    label: '微信账号',
    description: '预约公司会议室',
    url: 'http://meeting.woa.com/book?type=2',
  },
  {
    label: '8000',
    description: '8000软件服务平台',
    url: 'https://8000.woa.com/',
  },
  {
    label: 'crm',
    description: '短视频运营平台',
    url: 'http://findercrm.weixin.oa.com/',
  },
  {
    label: 'livecrm',
    description: '直播运营平台',
    url: 'https://finderlive.weixin.woa.com/',
  },
  {
    label: 'spaceX',
    description: '云函数开发平台',
    url: 'https://dev.mmgame.woa.com/#/storage/dev/list',
  },
  {
    label: 'spaceX文档',
    description: 'spaceX文档',
    url: 'https://spacex.woa.com/spacex/tutorial/faas.html#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C',
  },
  {
    label: 'spaceX脚手架',
    description: '测试环境模块上线流水',
    url: 'https://spacex.woa.com/tools/weadmin-cli.html#%E5%8D%87%E7%BA%A7',
  },
  {
    label: 'spaceX Mauth接入方案',
    description: 'spaceX Mauth接入方案',
    url: 'https://doc.weixin.qq.com/doc/w3_ALAABwaLACcSDSm0eZCQMCqna8vUM?scode=AJEAIQdfAAordrIKHwAPQAWAaDAAk',
  },
  {
    label: 'spaceX AC接入方案',
    description: 'spaceX AC接入方案',
    url: 'https://doc.weixin.qq.com/doc/w3_ALAABwaLACcsnRpslJEQEiEhWw0qW?scode=AJEAIQdfAAoqSACLAvAPQAWAaDAAk',
  },
  {
    label: '校招',
    description: '校招伯乐平台',
    url: 'http://campus.oa.com/center/bole/index',
  },
  {
    label: 'hr',
    description: 'HR门户',
    url: 'http://hr.oa.com/',
  },
  {
    label: '体验',
    description: '虚拟服务体验',
    url: 'https://tiyan.oa.com/',
  },
  {
    label: '测试环境数据库',
    description: '测试环境数据库',
    url: 'https://dbs.oa.com/#/login',
  },
  {
    label: '工蜂',
    description: '公司内部代码存储仓库',
    url: 'https://git.woa.com/',
  },
  {
    label: 'Orange-CI',
    description: 'Orange-CI工具文档',
    url: 'http://docs.orange-ci.oa.com/',
  },
  {
    label: 'npm包软件源服务',
    description: '腾讯npm包软件源服务',
    url: 'https://mirrors.tencent.com/#/private/npm',
  },
  {
    label: '企业微信机器人管理平台',
    description: '专门用于管理企业微信机器人',
    url: 'http://botadmin.xuanzai.top/bot-frame-saas/web/#/welcome',
  },
  {
    label: 'CDN临时文件存储',
    description: '专门用来存储临时文件，测试使用',
    url: 'http://assets.xuanzai.top/cdn-service/web/#/home',
  },
  {
    label: 'CDN图片上传',
    description: '专门用来存储正式环境图片',
    url: 'http://assets.fed.oa.com/#/',
  },
  {
    label: '流云',
    description: '流云自动化工作流平台',
    url: 'https://autoflow.woa.com/workflow/home',
  },
  {
    label: 'weui-desktop',
    description: 'weui-vue-desktop构建pc端网站',
    url: 'http://wedesign.oa.com/tool/weui/desktop/guide#%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97-guide--%E7%BB%84%E4%BB%B6%E6%80%BB%E8%A7%88-overview',
  },
  {
    label: '安卓红版',
    description: '安卓红版链接',
    url: 'https://weops.qq.com/rdm/android/FLAVOR_RED',
  },
  {
    label: 'IOS红版',
    description: 'IOS红版链接',
    url: 'https://weops.qq.com/rdm/ios/br',
  },
  {
    label: '安卓紫版',
    description: '安卓紫版链接',
    url: 'https://weops.qq.com/rdm/android/FLAVOR_PURPLE',
  },
  {
    label: 'IOS紫版',
    description: 'IOS紫版链接',
    url: 'https://weops.qq.com/rdm/ios/mipha',
  },
  {
    label: '协议查询',
    description: '后台编译机协议查询',
    url: 'http://mmtest.oa.com/codesearch/?defs=mmfindercrm&project=mmfindergateway',
  },
  {
    label: '物资采购',
    description: '物资采购',
    url: 'http://epo.oa.com/goodspr/Forms/SearchMati3.aspx',
  },
  {
    label: '物资采购登记',
    description: '物资采购登记',
    url: 'https://wego.weixin.oa.com/wego/wesecretaryhomeweb/page/cg_record',
  },
  {
    label: 'km',
    description: 'km论坛',
    url: 'http://km.oa.com/',
  },
  {
    label: '模块超时时间设定',
    description: '模块超时时间设定',
    url: 'https://weops.oa.com/#/https://weixin.oa.com/routesvr_page/setting',
  },
  {
    label: 'svrkit框架返回码',
    description: '模块超时时间设定',
    url: 'https://iwiki.woa.com/pages/viewpage.action?pageId=673533569',
  },
  {
    label: '抢福利（鹅民公社）',
    description: 'Q米福利兑换',
    url: 'http://flex.oa.com/',
  },
  {
    label: '域名申请',
    description: '公司内部域名申请',
    url: 'http://udns.woa.com/#/dashboard',
  },
  {
    label: 'mmdata 协议集',
    description: 'mmdata 协议集',
    url: 'https://mmdata.woa.com/index.html#/protocol_list?_k=akxwcz',
  },
  {
    label: 'mmdata 使用文档',
    description: 'mmdata 使用文档',
    url: 'https://git.woa.com/wxg-td/mmdata/blob/master/README.md',
  },
  {
    label: 'mmdata 快速查询上报数据',
    description: 'mmdata 快速查询上报数据',
    url: 'http://scv.woa.com/v_datareport/protocol_log_channels?app_id=-1',
  },
  {
    label: 'mmdata 平台数据上报测试查询',
    description: 'mmdata 平台数据上报测试查询',
    url: 'https://mmdata.woa.com/index.html#/logtest?_k=x22cv5',
  },
  {
    label: '目标看板（OKR）',
    description: '目标看板（OKR）',
    url: 'http://goal.oa.com/goal/MyOKR',
  },
  {
    label: '人才评估（绩效考核）',
    description: '人才评估（绩效考核）',
    url: 'http://tps.oa.com/assess/Index',
  },
  {
    label: '目标看板（OKR）',
    description: '目标看板（OKR）',
    url: 'http://goal.oa.com/goal/MyOKR',
  },
  {
    label: '系统故障分析',
    description: '系统故障分析',
    url: 'https://wego.weixin.oa.com/wego/wemodulechainweb/page?tpl=call#/',
  },
  {
    label: '答辩PPT汇总',
    description: '答辩PPT汇总',
    url: 'https://profession.woa.com/reply/blank-main/reply_reply-backend/reply-public-page',
  },
]
// 数组转换
function transformList(sourceList) {
  const list = []
  sourceList.forEach(item => {
    list.push({
      title: item.label,
      subtitle: item.description,
      arg: item.url,
    })
  })
  return list
}
const matchItems = alfy.inputMatches(common, 'label');
matchItems.length
  ? alfy.output(transformList(matchItems))
  : alfy.output(
    transformList(common)
  )