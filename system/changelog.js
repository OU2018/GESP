/**
 * system/changelog.js — 更新历史（不含隐藏面板与测试功能）
 */
(function (global) {
  "use strict";

  /** 新版本写在数组最前 */
  const CHANGELOG = [
    {
      version: "1.10.19",
      date: "2026-08-17",
      title: "刷题主线强化与专注模式",
      items: [
        "首页「今日建议」：按打卡与正确率推荐题库，可一键开练或清错题",
        "结算突出本局薄弱/较稳知识点，弱化养成掉落文案",
        "设置「专注模式」：隐藏宠物/邮件等辅助入口",
        "略微降低练习掉蛋概率，减少为开蛋而刷的动机"
      ]
    },
    {
      version: "1.10.18",
      date: "2026-08-17",
      title: "模式面板清理",
      items: [
        "普通/竞速题库下拉去掉评测等特殊项，统一题库命名与顺序",
        "非 printf 题库隐藏无意义的「模式」按钮条",
        "特殊模式禁止从普通训练入口进入；更新页面标题与版本元信息"
      ]
    },
    {
      version: "1.10.17",
      date: "2026-08-17",
      title: "评测模式独立入口",
      items: [
        "评测模式从普通题库下拉移除，激活后才在首页显示独立入口",
        "评测不计入每日打卡与日常题库任务"
      ]
    },
    {
      version: "1.10.16",
      date: "2026-08-17",
      title: "唯一锦鲤与框架文档",
      items: [
        "循环锦鲤改为全局唯一 const：约1%出现、无闪光、升阶提升稀有度",
        "低阶偏弱、高阶收益与养成成本为数倍",
        "新增 docs/FRAMEWORK.md、docs/BANK_FORMAT.md"
      ]
    },
    {
      version: "1.10.15",
      date: "2026-08-17",
      title: "激活码与钱包进位",
      items: [
        "设置中可输入激活码解锁评测模式或兑换道具",
        "评测模式：固定题集，每次练习打乱顺序",
        "Byte/KB/MB 自动进位显示，避免过大的 B 数字",
        "选中宠物时粒子出现在对应卡片位置，并有阶数相关弹跳动画"
      ]
    },
    {
      version: "1.10.14",
      date: "2026-08-17",
      title: "姓名后缀与真题风格题库",
      items: [
        "修复链接姓名后缀识别（支持路径末段与 ?u=code，版本刷新时保留参数）",
        "新增「近年真题风格」客观题库，覆盖 2025–2026 公开考点题型"
      ]
    },
    {
      version: "1.10.13",
      date: "2026-08-17",
      title: "贡献致谢与反馈奖励",
      items: [
        "更新日志增加【贡献者】栏",
        "针对问题反馈准备了专属致谢邮件（按约定日期送达）"
      ],
      contributors: ["王子铄"]
    },
    {
      version: "1.10.12",
      date: "2026-08-16",
      title: "邮件存档与升阶属性",
      items: [
        "修复刷新后已读邮件变未读、附件可重复领取的问题",
        "修复宠物升阶后时间片/收获率反而下降的问题（闪光加成会保留）"
      ],
      contributors: ["王子铄"]
    },
    {
      version: "1.10.11",
      date: "2026-08-16",
      title: "挂机修复与防沉迷",
      items: [
        "修复切换宠物/分页导致挂机收益被重复累加的问题",
        "挂机领取按队伍最高品阶限制单次额度（bool 最高 100 Byte）",
        "宠物系统每日使用满 5 分钟后锁定操作与收益计算"
      ],
      contributors: ["王子铄"]
    },
    {
      version: "1.10.10",
      date: "2026-08-16",
      title: "闪光宠物强化",
      items: [
        "闪光宠属性与光效强化，首页与卡片更易区分",
        "全部宠物增加轻微呼吸动画"
      ]
    },
    {
      version: "1.10.9",
      date: "2026-08-16",
      title: "术语统一与更新日志",
      items: [
        "统一宠物品阶显示为类型名（bool / int / long long / double 等）",
        "新增「更新历史」次级面板"
      ]
    },
    {
      version: "1.10.8",
      date: "2026-08-16",
      title: "孵化交互与代码缩进",
      items: [
        "首次孵化过场不可跳过，之后可点击遮罩提前看结果",
        "题目代码区保留行首缩进"
      ]
    },
    {
      version: "1.10.7",
      date: "2026-08-16",
      title: "孵化遮罩优先级",
      items: [
        "孵化动画全屏遮罩置于最顶层"
      ]
    },
    {
      version: "1.10.6",
      date: "2026-08-16",
      title: "孵化过场动画",
      items: [
        "孵化流程：蛋弹跳 → 碎裂发光 → 宠物现身",
        "可按品阶区分光色与音效；设置中可关闭"
      ]
    },
    {
      version: "1.10.5",
      date: "2026-08-16",
      title: "词条页布局",
      items: [
        "修复词条页与主容器宽度不匹配导致的溢出",
        "进入词条时自动加宽主布局"
      ]
    },
    {
      version: "1.10.4",
      date: "2026-08-16",
      title: "音效与提示",
      items: [
        "按钮点击音效分类",
        "相同提示短时间合并，避免刷屏",
        "词条页向宽屏布局优化"
      ]
    },
    {
      version: "1.10.3",
      date: "2026-08-16",
      title: "词条扩充与成就修复",
      items: [
        "词条覆盖 GESP 1～3 级相关常识与考点",
        "修复成就页无法打开的问题"
      ]
    },
    {
      version: "1.10.2",
      date: "2026-08-16",
      title: "词条图鉴",
      items: [
        "新增计算机基础词条图鉴",
        "阅读达标可触发相关奖励邮件"
      ]
    },
    {
      version: "1.10.1",
      date: "2026-08-16",
      title: "挂机校准与剧情门槛",
      items: [
        "挂机/离线收益需消耗校准符；高质量练习可获得",
        "部分特殊邮件提高触发门槛，更贴合进度"
      ]
    },
    {
      version: "1.10.0",
      date: "2026-08-15",
      title: "历史主题与任务链",
      items: [
        "计算机史相关限时事件与任务道具",
        "多章先驱者主题任务（细节见邮件）",
        "少量隐藏进度邮件（不剧透）"
      ]
    },
    {
      version: "1.9.x",
      date: "2026-08-15",
      title: "邮件与经济",
      items: [
        "邮件系统、附件领取、任务道具交付",
        "Byte / KB / MB 分层货币与宠物增量玩法",
        "竞速模式、结算词条、版本检测刷新等"
      ]
    }
  ];

  function renderChangelogPage() {
    const host = document.getElementById("changelog-list");
    if (!host) return;
    host.innerHTML = CHANGELOG.map(e => {
      const contrib = (e.contributors && e.contributors.length)
        ? `<div class="changelog-contrib">【贡献者】${e.contributors.map(c => escapeHtml(c)).join("、")}</div>`
        : "";
      return `
      <article class="changelog-card">
        <header class="changelog-head">
          <span class="changelog-ver">v${escapeHtml(e.version)}</span>
          <span class="changelog-date">${escapeHtml(e.date || "")}</span>
        </header>
        <h3 class="changelog-title">${escapeHtml(e.title || "")}</h3>
        ${contrib}
        <ul class="changelog-items">
          ${(e.items || []).map(i => `<li>${escapeHtml(i)}</li>`).join("")}
        </ul>
      </article>`;
    }).join("");
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function openChangelogView() {
    if (typeof global.showView === "function") global.showView("changelog-view");
    renderChangelogPage();
  }

  global.CHANGELOG = CHANGELOG;
  global.renderChangelogPage = renderChangelogPage;
  global.openChangelogView = openChangelogView;
})(typeof window !== "undefined" ? window : globalThis);
