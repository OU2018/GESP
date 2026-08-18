/**
 * system/pet-data.js — 宠物图鉴 / 地图 / 商店 / 台词（与逻辑分离）
 */
(function (global) {
  "use strict";

  const GACHA_BYTE_COST = 80; // 抽卡消耗 Byte
  const GACHA_XP_COST = 80; // 兼容旧名
  const GACHA_RATES = [
    { rarity: "N", weight: 55 },
    { rarity: "R", weight: 30 },
    { rarity: "SR", weight: 12 },
    { rarity: "SSR", weight: 3 }
  ];
  /**
   * 统一品阶术语（教学向 · 对齐类型提升直觉）：
   *   N  = bool      （最低）
   *   R  = int
   *   SR = long long （float 为 SR 闪光）
   *   SSR= double    （最高）
   *   char = N 闪光（与 bool 同级）
   * 代码里仍用 N/R/SR/SSR 作为 key，界面一律显示类型名。
   */
  const RARITY_LABEL = {
    N:   { name: "bool",      color: "#94a3b8", typeHint: "1 字节级 · 逻辑型 · 最低", rank: 1 },
    R:   { name: "int",       color: "#60a5fa", typeHint: "整型 · 常用", rank: 2 },
    SR:  { name: "long long", color: "#c084fc", typeHint: "宽整型 · 更高", rank: 3 },
    SSR: { name: "double",    color: "#fbbf24", typeHint: "浮点转换优先 · 最高", rank: 4 }
  };
  /**
   * 闪光/变异：同稀有度池，但属性与特效更强
   * staminaMul / harvestMul 在创建实例时叠乘
   */
  const SHINY_LABEL = {
    char: {
      base: "N", name: "char", color: "#38bdf8", glow: "#7dd3fc",
      tag: "✨闪光", typeHint: "与 bool 同级 · 字符变异 · 属性+15%",
      staminaMul: 1.15, harvestMul: 1.12, sparkle: "cyan"
    },
    float: {
      base: "SR", name: "float", color: "#e879f9", glow: "#f0abfc",
      tag: "✨闪光", typeHint: "long long 档变异 · 单精度 · 属性+18%",
      staminaMul: 1.18, harvestMul: 1.16, sparkle: "magenta"
    }
  };

  /** 仓库基础容量；每次扩容消耗 */
  const WAREHOUSE = {
    baseCap: 8,
    maxCap: 24,
    expandCost: function (cap) { return 60 + (cap - 8) * 40; }, // Byte
  };

  const PET_SPECIES = [
    { id: "bug", rarity: "N", stages: [{ emoji: "🐛", name: "调试小虫", desc: "常见伙伴" }], baseStamina: 30, harvest: 0.35,
      lines: ["又有 bug 了吗？我来爬一圈～", "分号……分号在哪里？", "小小的我，也能找错。"] },
    { id: "char", rarity: "N", shiny: "char", stages: [{ emoji: "🔤", name: "字符精灵", desc: "bool 级闪光变异" }, { emoji: "🅰️", name: "ASCII 精灵", desc: "char 闪光进化" }], baseStamina: 33, harvest: 0.38,
      lines: ["我是 char，和 bool 同级却会闪光。", "一个字符，一段故事。", "ASCII 在我心里。"] },
    { id: "seed", rarity: "N", stages: [{ emoji: "🌱", name: "语法种子", desc: "会发芽" }, { emoji: "🌿", name: "语法幼苗", desc: "逻辑叶" }], baseStamina: 28, harvest: 0.34,
      lines: ["浇一点经验，我就长高一点。", "语法树，从我发芽。", "别忘了初始化哦。"] },
    { id: "byte", rarity: "N", stages: [{ emoji: "🐹", name: "字节鼠", desc: "8个bit" }], baseStamina: 30, harvest: 0.35,
      lines: ["吱！我有整整 8 个 bit！", "1KB 有好多我这样的。", "存不下就换 long long～"] },
    { id: "crumb", rarity: "N", stages: [{ emoji: "🦊", name: "面包屑狐", desc: "找分号" }], baseStamina: 31, harvest: 0.37,
      lines: ["漏掉的分号，我闻得见。", "嘻嘻，又抓到一个笔误。", "狐狸最擅长找细节。"] },
    { id: "owl", rarity: "R", stages: [{ emoji: "🦉", name: "编译猫头鹰", desc: "看报错" }, { emoji: "🦉", name: "睿智猫头鹰", desc: "读警告" }], baseStamina: 45, harvest: 0.48,
      lines: ["警告信息，也值得一读。", "夜里编译，白天通过。", "报错行号，在第几行？"] },
    { id: "cat", rarity: "R", stages: [{ emoji: "🐱", name: "终端猫", desc: "踩键盘" }, { emoji: "😺", name: "调试猫", desc: "正确输入" }], baseStamina: 44, harvest: 0.47,
      lines: ["喵，这键盘手感不错。", "scanf 要记得加 & 哦。", "踩出 AC，才是好猫。"] },
    /**
     * 循环锦鲤 — 全局唯一 const 进程
     * - 无闪光个体；trait: const
     * - 孵化约 1%（且全账号仅一只）
     * - 升阶后展示稀有度提升：bool → int → long long → double
     * - 低阶属性弱于同阶普通宠，高阶数倍收益；喂养/升级成本数倍
     */
    { id: "fish", rarity: "N", unique: true, trait: "const", noShiny: true,
      hatchChance: 0.01,
      feedCostMul: 3,
      stageCostMul: 4,
      /* 各阶有效稀有度标签与属性倍率（相对 base） */
      stageRarity: ["N", "R", "SR", "SSR"],
      stageStatMul: [0.55, 0.9, 1.8, 3.2],
      stages: [
        { emoji: "🐟", name: "循环锦鲤·幼", desc: "const · 初阶弱于常宠 · 唯一" },
        { emoji: "🐠", name: "循环锦鲤·成", desc: "const · 开始追平常宠" },
        { emoji: "🐡", name: "循环锦鲤·灵", desc: "const · 收益数倍起步" },
        { emoji: "🐲", name: "循环锦鲤·神", desc: "const · 全局唯一 · 顶格" }
      ],
      baseStamina: 22, harvest: 0.22,
      lines: [
        "我是 const，全池只能有一只我。",
        "for 循环转一圈，稀有度才往上跳。",
        "低阶很弱，高阶很贵，也很强。",
        "没有闪光形态——我自己就是例外。"
      ]
    },
    { id: "float", rarity: "SR", shiny: "float", stages: [{ emoji: "💠", name: "浮点碎片", desc: "SR 闪光 · float" }, { emoji: "💎", name: "单精度结晶", desc: "精度约 6～7 位" }, { emoji: "🔮", name: "float 幻灵", desc: "接近 double 却更轻" }], baseStamina: 64, harvest: 0.62,
      lines: ["我是 float，SR 的闪光形态。", "单精度，也有自己的星光。", "再进一步，就是 double。"] },
    { id: "rabbit", rarity: "R", stages: [{ emoji: "🐰", name: "递归兔", desc: "想调用自己" }, { emoji: "🐇", name: "边界兔", desc: "有终止条件" }], baseStamina: 43, harvest: 0.46,
      lines: ["再跳一下……记得终止条件！", "递归很美，栈要小心。", "边界写好，兔兔安心。"] },
    { id: "bird", rarity: "SR", stages: [{ emoji: "🐣", name: "格式雏鸟", desc: "认识%d" }, { emoji: "🐦", name: "输出飞鸟", desc: "穿梭" }, { emoji: "🦅", name: "调试之鹰", desc: "找格式错" }], baseStamina: 60, harvest: 0.58,
      lines: ["格式对了，输出就对了。", "在花括号的缝隙里飞翔。", "锐利目光，专盯 % 与空格。"] },
    { id: "dragon", rarity: "SR", stages: [{ emoji: "🦎", name: "补零蜥蜴", desc: "%05d" }, { emoji: "🐊", name: "宽度鳄鱼", desc: "对齐" }, { emoji: "🐉", name: "编译巨龙", desc: "正确格式" }], baseStamina: 62, harvest: 0.60,
      lines: ["%05d，零要补齐。", "宽度与精度，尽在掌握。", "龙息扫过，编译通过！"] },
    { id: "wolf", rarity: "SR", stages: [{ emoji: "🐺", name: "逻辑幼狼", desc: "&& ||" }, { emoji: "🐺", name: "短路狼", desc: "省计算" }, { emoji: "🐺", name: "真值狼王", desc: "分支精准" }], baseStamina: 58, harvest: 0.57,
      lines: ["真与假，我分得很清。", "短路求值，不浪费一步。", "分支走位，如狼群围猎。"] },
    { id: "unicorn", rarity: "SSR", typeName: "double", stages: [{ emoji: "✨", name: "星尘精灵", desc: "转义星光" }, { emoji: "🦄", name: "算法独角兽", desc: "传说" }, { emoji: "🌟", name: "星轨独角兽", desc: "稳定" }, { emoji: "💫", name: "永恒独角兽", desc: "传说级" }], baseStamina: 80, harvest: 0.72,
      lines: ["星光指引正确的那一行。", "传说不是抽到的，是练成的。", "与你并肩，正确率如星轨。", "SSR 的骄傲：优雅且正确。"] },
    { id: "phoenix", rarity: "SSR", typeName: "double", stages: [{ emoji: "🔥", name: "火种雏凤", desc: "复燃" }, { emoji: "🐦", name: "重构之鸟", desc: "涅槃" }, { emoji: "🔥", name: "烈焰凤凰", desc: "满屏通过" }, { emoji: "🌈", name: "虹光凤凰", desc: "顶端" }], baseStamina: 85, harvest: 0.75,
      lines: ["从报错灰烬中再度起飞。", "重构一次，明亮一分。", "烈焰过后，代码新生。", "虹光之下，没有过不去的编译。"] }
  ];

  // 货币：Byte 日用 / KB 中级 / MB 高级（不自动换算，分层消费）
  const CURRENCY = {
    byte: { id: "byte", name: "Byte", color: "#86efac" },
    kb: { id: "kb", name: "KB", color: "#93c5fd" },
    mb: { id: "mb", name: "MB", color: "#fbbf24" }
  };

  const SHOP_ITEMS = [
    // Byte：最普通
    { id: "food", name: "逻辑饼干", emoji: "🍪", currency: "byte", price: 30, desc: "恢复 15 时间片", effect: "stamina", value: 15 },
    { id: "water", name: "冷却水", emoji: "💧", currency: "byte", price: 20, desc: "恢复 8 时间片", effect: "stamina", value: 8 },
    // KB：中级
    { id: "exp_potion", name: "经验药水", emoji: "🧪", currency: "kb", price: 3, desc: "成长 +20", effect: "petExp", value: 20 },
    { id: "super_food", name: "满分大餐", emoji: "🍱", currency: "kb", price: 5, desc: "时间片回满", effect: "staminaFull", value: 0 },
    { id: "incubator", name: "简易温床", emoji: "🛏️", currency: "kb", price: 8, desc: "孵化消耗时间片 -30%", effect: "hatchDiscount", value: 0.3 },
    // MB：高级
    { id: "rare_boost", name: "页表优化", emoji: "📜", currency: "mb", price: 1, desc: "下一次孵化高品阶权重提升", effect: "hatchBoost", value: 1 },
    { id: "mem_chip", name: "内存条", emoji: "🧠", currency: "mb", price: 2, desc: "Heap 容量 +2", effect: "expandHeap", value: 2 }
  ];

  /** 蛋品阶 → 孵化时各 rarity 权重 */
  const EGG_HATCH_RATES = {
    N:   [{rarity:"N",weight:70},{rarity:"R",weight:25},{rarity:"SR",weight:5},{rarity:"SSR",weight:0}],
    R:   [{rarity:"N",weight:25},{rarity:"R",weight:50},{rarity:"SR",weight:22},{rarity:"SSR",weight:3}],
    SR:  [{rarity:"N",weight:5},{rarity:"R",weight:25},{rarity:"SR",weight:50},{rarity:"SSR",weight:20}],
    SSR: [{rarity:"N",weight:0},{rarity:"R",weight:10},{rarity:"SR",weight:40},{rarity:"SSR",weight:50}]
  };
  const EGG_LABEL = {
    N:   { name: "bool 蛋", emoji: "🥚", color: "#94a3b8" },
    R:   { name: "int 蛋", emoji: "🥚", color: "#60a5fa" },
    SR:  { name: "long long 蛋", emoji: "🔮", color: "#c084fc" },
    SSR: { name: "double 蛋", emoji: "👑", color: "#fbbf24" }
  };
  /** 孵化消耗时间片（可被温床减免） */
  const HATCH_STAMINA = { N: 8, R: 14, SR: 22, SSR: 35 };


  const MAPS = [
    { id: "forest", name: "入门森林", emoji: "🌲", unlockXp: 0, durationMin: 3, eggChance: 0.55, eggTable:["N","N","N","R"], expItemChance: 0.3, xpPerHour: 6, staminaCost: 12, kbChance: 0.05 },
    { id: "lake", name: "循环之湖", emoji: "🌊", unlockXp: 300, durationMin: 8, eggChance: 0.6, eggTable:["N","R","R","SR"], expItemChance: 0.4, xpPerHour: 12, staminaCost: 18, kbChance: 0.12 },
    { id: "tower", name: "调试高塔", emoji: "🗼", unlockXp: 800, durationMin: 15, eggChance: 0.65, eggTable:["R","R","SR","SR"], expItemChance: 0.45, xpPerHour: 18, staminaCost: 24, kbChance: 0.2, mbChance: 0.03 },
    { id: "ruins", name: "算法遗迹", emoji: "🏛️", unlockXp: 1800, durationMin: 25, eggChance: 0.7, eggTable:["R","SR","SR","SSR"], expItemChance: 0.5, xpPerHour: 28, staminaCost: 32, kbChance: 0.28, mbChance: 0.08 }
  ];

  /** 品阶通用开场（会与物种台词组合） */
  const RARITY_PREFIX = {
    N: ["（bool 小声）", "true 一下：", "false 也没关系，"],
    R: ["int 声明：", "整型提升：", "注意溢出——"],
    SR: ["long long 提醒：", "宽整型说：", "位数够吗："],
    SSR: ["double 传讯：", "✨ 转换优先级最高：", "浮点之巅："]
  };

  const UI_LABELS = {
    pet: "进程实例",
    warehouse: "堆内存 Heap",
    gacha: "new 分配",
    shop: "包管理 apt",
    dispatch: "后台任务",
    release: "return 0",
    select: "绑定 main",
    ticket: "分配券",
    expand: "sbrk 扩容",
    stamina: "时间片",
    harvest: "I/O 成功率"
  };


  /** 永久升级（增量核心） */
  const UPGRADES = [
    { id: "idle_base", name: "后台守护进程", emoji: "📡", desc: "挂机 +0.35 Byte/分", max: 25, baseCost: 35, costGrow: 1.32, currency: "byte", effect: "idleFlat", value: 0.35 },
    { id: "idle_mult", name: "缓存加速", emoji: "⚡", desc: "挂机收益 ×1.07", max: 12, baseCost: 3, costGrow: 1.45, currency: "kb", effect: "idleMult", value: 0.07 },
    { id: "harvest_up", name: "I/O 优化", emoji: "💾", desc: "探索收获率 +3%", max: 12, baseCost: 2, costGrow: 1.4, currency: "kb", effect: "harvest", value: 0.03 },
    { id: "stamina_up", name: "时间片扩容", emoji: "🔋", desc: "全员最大时间片 +6", max: 10, baseCost: 45, costGrow: 1.36, currency: "byte", effect: "maxStamina", value: 6 },
    { id: "gacha_pity", name: "孵化优化", emoji: "🎲", desc: "孵化高品阶权重微升", max: 5, baseCost: 1, costGrow: 1.7, currency: "mb", effect: "ssrWeight", value: 1 },
    { id: "slot_eff", name: "多线程调度", emoji: "🧵", desc: "探索 XP +12%", max: 8, baseCost: 2, costGrow: 1.42, currency: "kb", effect: "dispatchXp", value: 0.12 },
    { id: "auto_tick", name: "cron 自动收菜", emoji: "⏰", desc: "打开页面额外结算 2 分钟挂机", max: 5, baseCost: 90, costGrow: 1.48, currency: "byte", effect: "autoClaimMin", value: 2 }
  ];

  /** 里程碑（一次性满足感） */
  const MILESTONES = [
    { id: "m_pets_3", name: "小进程池", need: "pets", n: 3, rewardBytes: 50, rewardXp: 30 },
    { id: "m_pets_8", name: "Heap 热闹了", need: "pets", n: 8, prizeBytes: 120, prizeXp: 60 },
    { id: "m_dispatch_5", name: "调度新手", need: "dispatchClaims", n: 5, prizeBytes: 80, prizeXp: 40 },
    { id: "m_dispatch_20", name: "运维熟练工", need: "dispatchClaims", n: 20, prizeBytes: 200, prizeXp: 100 },
    { id: "m_idle_100", name: "挂机一百", need: "lifetimeIdle", n: 100, prizeBytes: 100, prizeXp: 50 },
    { id: "m_idle_500", name: "挂机五百", need: "lifetimeIdle", n: 500, prizeBytes: 300, prizeXp: 150 },
    { id: "m_gacha_10", name: "malloc 十次", need: "gachaCount", n: 10, prizeBytes: 90, prizeXp: 40 },
    { id: "m_ssr_1", name: "第一只 double", need: "ssr", n: 1, prizeBytes: 150, prizeXp: 80 }
  ];

  global.PET_DATA = {
    CURRENCY,
    EGG_HATCH_RATES,
    EGG_LABEL,
    HATCH_STAMINA,
    UPGRADES,
    MILESTONES,

    UI_LABELS,
    GACHA_BYTE_COST,
    GACHA_XP_COST: GACHA_BYTE_COST,
    GACHA_RATES,
    RARITY_LABEL,
    SHINY_LABEL,
    WAREHOUSE,
    PET_SPECIES,
    SHOP_ITEMS,
    MAPS,
    RARITY_PREFIX
  };
})(typeof window !== "undefined" ? window : globalThis);
