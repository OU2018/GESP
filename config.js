/**
 * 用户 / 机构配置文件
 * 修改后刷新页面即可生效
 *
 * ⚠️ 非常重要：studentMap（链接后缀→姓名）由老师维护，
 * 任何版本更新、代码生成、自动合并时【禁止清空或覆盖为短列表】。
 * 只允许在原有键上追加，不得删除已有学生映射。
 */
window.GESP_CONFIG = {
  // 网页版本号（页脚与隐藏菜单显示）
  version: "1.10.28",

  // 默认显示名（无链接后缀、未在设置里改过时使用）
  userName: "同学",

  // 机构名称（可选）
  orgName: "",

  // 宠物祝福概率 0~1
  petBlessChance: 0.45,

  // 默认题库
  defaultBank: "printf-scanf",

  // 每日题库打卡
  dailyCheckin: {
    baseQuota: 20,
    highAcc: 0.90,
    highQuota: 12,
    midAcc: 0.75,
    midQuota: 16,
    lowAcc: 0.60,
    lowQuota: 28,
    veryLowAcc: 0.40,
    veryLowQuota: 35,
    minSamples: 3
  },

  /**
   * 【极重要】链接后缀 → 姓名
   * 访问：https://用户名.github.io/仓库名/sjy  → 识别为 苏婧瑜
   * 更新项目时务必保留并合并本表，禁止重置。
   */
  studentMap: {
    cxj: "蔡小婧",
    lbz: "卢柏铮",
    wzs: "王子铄",
    wjh: "吴锦航",
    zy: "张亿",
    czh: "陈子涵",
    kcy: "柯承烨",
    gck: "龚传楷",
    yyt: "余雨桐",
    wtc: "吴天辰",
    cbh: "崔博昊",
    jzy: "江郑延",
    lzy: "兰贞烨",
    lyh: "刘羽昊",
    ljh: "林济恒",
    lbc: "林柏辰",
    lyq: "林易秋",
    lyx: "卢熠轩",
    dzq: "丁子骞",
    zyh: "庄越皓",
    had: "黄安东",
    khw: "康黄雯",
    yxj: "叶祥骏",
    fyz: "傅逸州",
    sjy: "苏婧瑜",
    zgf: "郑高菲",
    clx: "陈李洵",
    admin: "admin"
  }
};
