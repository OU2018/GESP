/**
 * system/mail-data.js — 邮件 / 附件 / 任务道具 / 先驱者链 / 时空乱流编年
 *
 * 【时空乱流】
 * 部分邮件的「日期」会故意指向计算机史上的关键节点。
 * 用户在现实某天打开网页，会收到「被拉进某年」的乱流信——建立年代感。
 * 暗线：同盟在修补「第零错误」；有一个不愿具名的存在正从历史裂隙里回看你。
 *
 * 附件类型见系统说明；body 支持 {{name}} {{date}} {{level}}
 */
(function (global) {
  "use strict";

  const NEXT_EXAM_DATE = "2026-09-12";

  const QUEST_ITEMS = {
    // —— 先驱者 ——
    qi_turing_note: {
      id: "qi_turing_note", name: "纸带残片", emoji: "📜",
      desc: "边缘写着 0 与 1。像某种尚未被命名的机器会吃的语言。"
    },
    qi_turing_key: {
      id: "qi_turing_key", name: "恩尼格玛锈齿", emoji: "🔑",
      desc: "一枚对不上任何锁的齿。有人说它曾对上过一整场战争的密码。"
    },
    qi_shannon_bit: {
      id: "qi_shannon_bit", name: "比特硬币", emoji: "🪙",
      desc: "一面是 0，一面是 1。抛起来时，信息量恰好是一比特。"
    },
    qi_shannon_wire: {
      id: "qi_shannon_wire", name: "噪声铜线", emoji: "🔌",
      desc: "握住会听见沙沙声。信道再干净，也会有噪声。"
    },
    qi_von_draft: {
      id: "qi_von_draft", name: "结构草图", emoji: "📐",
      desc: "存储、运算、控制画在同一页。程序开始「住进」存储器。"
    },
    qi_von_core: {
      id: "qi_von_core", name: "存储核想象", emoji: "💠",
      desc: "不是实物，是概念。却重得像一整台 EDVAC 的影子。"
    },
    qi_alliance_seal: {
      id: "qi_alliance_seal", name: "同盟残印", emoji: "🕯️",
      desc: "零号观察者留下的标记。你读过上游的证明。"
    },

    // —— 时空乱流：器件与年代 ——
    qi_tube_1906: {
      id: "qi_tube_1906", name: "三极电子管残壳", emoji: "💡",
      desc: "1906 年附近的乱流碎片。真空里曾走着放大的电流——计算机的祖辈还在发光发热。"
    },
    qi_eniac_1946: {
      id: "qi_eniac_1946", name: "ENIAC 插件残片", emoji: "🖥️",
      desc: "1946。房间一样大的机器。重布线就像重写程序——那时软件还没有从硬件里分开。"
    },
    qi_transistor_1947: {
      id: "qi_transistor_1947", name: "点接触晶体管砂粒", emoji: "⚛️",
      desc: "1947 年贝尔实验室。沙子开始学会开关。电子管的王朝听见了裂响。"
    },
    qi_ic_1958: {
      id: "qi_ic_1958", name: "集成电路原胚", emoji: "🔲",
      desc: "1958。基尔比与诺伊斯的时代：电路开始长在同一片材料上。"
    },
    qi_arpanet_1969: {
      id: "qi_arpanet_1969", name: "阿帕网握手包", emoji: "🌐",
      desc: "1969。两个节点第一次把数据递出房间。网络还不是今天的样子，但是种子。"
    },
    qi_micro_1971: {
      id: "qi_micro_1971", name: "微处理器晶圆屑", emoji: "💿",
      desc: "1971。整台计算机的心，被收进指甲盖大的芯片。"
    },
    qi_pc_1981: {
      id: "qi_pc_1981", name: "个人计算机铭牌", emoji: "⌨️",
      desc: "1981。机器从机房走向桌面。后来有人在这上面第一次写出自己的 printf。"
    },
    qi_www_1991: {
      id: "qi_www_1991", name: "超文本锚点", emoji: "🔗",
      desc: "1991。蒂姆·伯纳斯-李让页面彼此相连。你此刻读到的字，也走在那条路上。"
    },
    qi_opensrc_1991: {
      id: "qi_opensrc_1991", name: "内核种子", emoji: "🌱",
      desc: "同样是 1991 附近：有人把操作系统的心拿出来分享。自由与许可，也是一种协议。"
    },

    // —— 暗线道具 ——
    qi_zero_glitch: {
      id: "qi_zero_glitch", name: "第零错误碎片", emoji: "🕳️",
      desc: "不属于任何年代的噪声。观察者拒绝解释它的来源，只说：别让它凑齐。"
    },
    qi_timeline_nail: {
      id: "qi_timeline_nail", name: "年轮钉", emoji: "📌",
      desc: "用来「钉住」一段被乱流搅动的历史。钉得越多，暗线越清晰。"
    },
    qi_observer_lens: {
      id: "qi_observer_lens", name: "观察者残片镜", emoji: "🪞",
      desc: "透过它看题面，会短暂看见另一年的教室——有人正在用穿孔卡片考试。"
    },
    qi_unnamed_sig: {
      id: "qi_unnamed_sig", name: "未命名签名", emoji: "✒️",
      desc: "没有署名的回信。笔迹像你的，又不是你的。暗线在此处分叉。"
    },
    qi_sync_permit: {
      id: "qi_sync_permit", name: "时序校准符", emoji: "⏳",
      desc: "稳定轨迹的证明。进程在时间缝里挂机收菜后，必须用它校准才能安全取回收益——乱流会吞掉未校准的 Byte。"
    },
    qi_codex_seed: {
      id: "qi_codex_seed", name: "档案芽孢", emoji: "🌱",
      desc: "阅读足够词条后生出的芽。进程幽灵说：读过的史，才会长成精灵的食粮。"
    },
    qi_codex_lantern: {
      id: "qi_codex_lantern", name: "采样灯碎片", emoji: "🏮",
      desc: "灰栈博士的采样用具残片。照得见定义，照不见捷径。"
    },
    qi_codex_permit: {
      id: "qi_codex_permit", name: "归档精灵许可", emoji: "✨",
      desc: "证明持有者系统读过 GESP 一级计算机基础词条。可触发更高阶精灵相关内容。"
    }
  };

  const MAIL_TEMPLATES = [
    // ========== 原有开场 ==========
    {
      id: "welcome_default",
      from: "零号观察者",
      title: "你已被记录在案",
      body: "{{name}}：\n\n不必惊慌。每一次提交都会留下轨迹。\n\n附上启动资金。Byte 是燃料，不是目的。\n\n另外提醒：若你某天收到落款年代错乱的信——那是「时空乱流」。读它，像读史，也像读警告。",
      once: true,
      triggers: { firstOpen: true },
      attachments: [
        { type: "byte", amount: 40 },
        { type: "item", itemId: "food", amount: 1 }
      ]
    },
    {
      id: "egg_guide",
      from: "进程幽灵",
      title: "关于那些「蛋」",
      body: "{{name}}，\n\n蛋是时间缝里漏下的碎片。高倍率时缝更宽。\n\n乱流来的时候，缝会亮一下——有时会掉出不该出现的器件。",
      once: true,
      triggers: { firstOpen: true },
      attachments: [
        { type: "egg", rarity: "N", amount: 1 },
        { type: "stamina", amount: 8 }
      ]
    },

    // ========== 先驱者链（保留）==========
    {
      id: "quest_turing_1",
      from: "灰栈博士",
      title: "先驱者档案·壹：图灵",
      body: "{{name}}：\n\n什么是「可计算」？图灵用纸带与读写头回答了它。\n\n附件：纸带残片。收好，后面要你交还。",
      once: true,
      triggers: { minLevel: 3, minSessions: 3 },
      attachments: [
        { type: "questItem", itemId: "qi_turing_note", amount: 1 },
        { type: "xp", amount: 30 }
      ]
    },
    {
      id: "quest_turing_2",
      from: "断点",
      title: "先驱者档案·壹·续：交还纸带",
      body: "{{name}}，\n\n把「纸带残片」交还。我们记一笔：你知道图灵不只是名字。",
      once: true,
      triggers: { minLevel: 3, requireDelivered: ["quest_turing_1"] },
      requireDelivery: [{ itemId: "qi_turing_note", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_turing_key", amount: 1 },
        { type: "egg", rarity: "R", amount: 1 },
        { type: "byte", amount: 60 }
      ],
      storyNote: "图灵机与可计算性。"
    },
    {
      id: "quest_shannon_1",
      from: "灰栈博士",
      title: "先驱者档案·贰：香农",
      body: "{{name}}：\n\n香农让信息可度量。比特、信道、噪声。\n\n附件：比特硬币。",
      once: true,
      triggers: { minLevel: 6, minSessions: 8, requireDelivered: ["quest_turing_2"] },
      attachments: [
        { type: "questItem", itemId: "qi_shannon_bit", amount: 1 },
        { type: "kb", amount: 1 }
      ]
    },
    {
      id: "quest_shannon_2",
      from: "进程幽灵",
      title: "先驱者档案·贰·续：噪声",
      body: "{{name}}，\n\n交还比特硬币。好的编码能扛住噪声——看解析，别只背答案。",
      once: true,
      triggers: { minLevel: 6, requireDelivered: ["quest_shannon_1"] },
      requireDelivery: [{ itemId: "qi_shannon_bit", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_shannon_wire", amount: 1 },
        { type: "egg", rarity: "R", amount: 1 },
        { type: "item", itemId: "exp_potion", amount: 1 }
      ],
      storyNote: "信息论与信道。"
    },
    {
      id: "quest_von_1",
      from: "零号观察者",
      title: "先驱者档案·叁：冯·诺依曼",
      body: "{{name}}，\n\n程序与数据住进同一片存储。你用的机器，仍是那张草图的后代。",
      once: true,
      triggers: { minLevel: 9, minSessions: 15, requireDelivered: ["quest_shannon_2"] },
      attachments: [
        { type: "questItem", itemId: "qi_von_draft", amount: 1 },
        { type: "xp", amount: 50 }
      ]
    },
    {
      id: "quest_von_2",
      from: "灰栈博士",
      title: "先驱者档案·叁·续：归档",
      body: "{{name}}：\n\n上交「结构草图」。计算、信息、体系结构，是同一条河的上游。",
      once: true,
      triggers: { minLevel: 9, requireDelivered: ["quest_von_1"] },
      requireDelivery: [{ itemId: "qi_von_draft", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_von_core", amount: 1 },
        { type: "questItem", itemId: "qi_alliance_seal", amount: 1 },
        { type: "egg", rarity: "SR", amount: 1 },
        { type: "mb", amount: 1 },
        { type: "byte", amount: 120 }
      ],
      storyNote: "存储程序与冯·诺依曼结构。"
    },
    {
      id: "quest_alliance_end",
      from: "零号观察者",
      title: "同盟残印：你读完了上游",
      body: "{{name}}，\n\n若仍持有同盟残印，交上来一次。我们会还你，并附一枚不该轻易得到的蛋。",
      once: true,
      triggers: { minLevel: 12, minSessions: 25, requireDelivered: ["quest_von_2"], minNails: 2 },
      requireDelivery: [{ itemId: "qi_alliance_seal", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_alliance_seal", amount: 1 },
        { type: "egg", rarity: "SSR", amount: 1 },
        { type: "xp", amount: 100 }
      ]
    },

    // ========== 时空乱流编年（用月日对应史实节点，每年可遇）==========
    {
      id: "turb_1906_tube",
      from: "灰栈博士",
      title: "【乱流】约 1906：真空里的放大",
      body: "{{name}}：\n\n乱流把你的会话拽到了二十世纪初。\n\n李·德·福雷斯特的三极电子管让信号可以放大。计算机还没诞生，但「控制电子」已经开始。机房在未来会很热——因为先辈真的在用发光的管子计算。\n\n附件：三极电子管残壳。\n\n（旁注：有人在管壁内侧刻了半个字，不像英文，也不像公式。）",
      once: true,
      triggers: { monthDay: "01-15" },
      attachments: [
        { type: "questItem", itemId: "qi_tube_1906", amount: 1 },
        { type: "xp", amount: 25 }
      ]
    },
    {
      id: "turb_1906_deliver",
      from: "断点",
      title: "【乱流】钉住电子管年代",
      body: "{{name}}，\n\n把「三极电子管残壳」交还。换一枚年轮钉。\n\n博士说：钉得住年代，才钉得住后面的故事。\n\n我只说：管子会烧，晶体管不会——但人照样会烧自己。",
      once: true,
      triggers: { monthDay: "01-16" },
      requireDelivery: [{ itemId: "qi_tube_1906", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_timeline_nail", amount: 1 },
        { type: "byte", amount: 40 },
        { type: "egg", rarity: "N", amount: 1 }
      ],
      storyNote: "电子管时代：放大、开关、高热与庞大体积。"
    },
    {
      id: "turb_1946_eniac",
      from: "零号观察者",
      title: "【乱流】1946：房间大小的程序",
      body: "{{name}}，\n\nENIAC。1946 年公开。重布线几乎等于重写程序。\n\n你现在改一行代码的代价，在那时可能是一屋子工程师的一下午。\n\n附件：ENIAC 插件残片。\n\n乱流记录里夹着一句不属于 1946 的话：「别让第零错误学会你的名字。」我没有写过这句话。",
      once: true,
      triggers: { monthDay: "02-14" },
      attachments: [
        { type: "questItem", itemId: "qi_eniac_1946", amount: 1 },
        { type: "xp", amount: 35 }
      ]
    },
    {
      id: "turb_1946_deliver",
      from: "灰栈博士",
      title: "【乱流】归档 ENIAC",
      body: "{{name}}：\n\n上交 ENIAC 残片。可保留第零错误碎片——求你别主动凑齐它。\n\n奖励是年轮钉与一点时间片。历史课到此，暗线另算。",
      once: true,
      triggers: { monthDay: "02-15" },
      requireDelivery: [{ itemId: "qi_eniac_1946", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_timeline_nail", amount: 1 },
        { type: "stamina", amount: 12 },
        { type: "egg", rarity: "R", amount: 1 }
      ],
      storyNote: "ENIAC 与「程序尚依附于布线」的年代。"
    },
    {
      id: "turb_1947_transistor",
      from: "进程幽灵",
      title: "【乱流】1947：沙子学会开关",
      body: "{{name}}，\n\n贝尔实验室。点接触晶体管。电子管的帝国听见裂响。\n\n体积、功耗、可靠性——全部改写。你口袋里的芯片，都是这粒沙子的后代。\n\n附件：晶体管砂粒。\n\n（Heap 里有人笑了一声。不是我。）",
      once: true,
      triggers: { monthDay: "12-23" },
      attachments: [
        { type: "questItem", itemId: "qi_transistor_1947", amount: 1 },
        { type: "byte", amount: 47 }
      ]
    },
    {
      id: "turb_1947_deliver",
      from: "断点",
      title: "【乱流】交还砂粒",
      body: "{{name}}，\n\n交还晶体管砂粒。换年轮钉。\n\n没有晶体管，就没有你现在刷的这堆题机。记仇一点，记恩一点，都行。",
      once: true,
      triggers: { monthDay: "12-24" },
      requireDelivery: [{ itemId: "qi_transistor_1947", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_timeline_nail", amount: 1 },
        { type: "kb", amount: 1 },
        { type: "egg", rarity: "R", amount: 1 }
      ],
      storyNote: "晶体管取代电子管的转折。"
    },
    {
      id: "turb_1958_ic",
      from: "灰栈博士",
      title: "【乱流】1958：电路长在同一片上",
      body: "{{name}}：\n\n集成电路。基尔比、诺伊斯。导线开始变成材料本身的结构。\n\n摩尔定律还没被写成标语，但密度已经在悄悄说话。\n\n附件：集成电路原胚。",
      once: true,
      triggers: { monthDay: "09-12" },
      attachments: [
        { type: "questItem", itemId: "qi_ic_1958", amount: 1 },
        { type: "xp", amount: 40 }
      ]
    },
    {
      id: "turb_1958_deliver",
      from: "零号观察者",
      title: "【乱流】钉住 1958",
      body: "{{name}}，\n\n上交原胚。注意：你的考试日也是 9 月 12 日——现实与乱流重叠时，轨迹会发烫。\n\n这不是迷信，是提醒：历史会在你身上重复它的节奏。",
      once: true,
      triggers: { monthDay: "09-13" },
      requireDelivery: [{ itemId: "qi_ic_1958", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_timeline_nail", amount: 1 },
        { type: "questItem", itemId: "qi_observer_lens", amount: 1 },
        { type: "egg", rarity: "R", amount: 1 }
      ],
      storyNote: "集成电路：微型化的真正开始。"
    },
    {
      id: "turb_1969_arpa",
      from: "进程幽灵",
      title: "【乱流】1969：第一次握手",
      body: "{{name}}，\n\nARPANET。数据包离开机房，去敲另一扇门。\n\n网络还不是互联网，但「连接」已经不再只是电缆的同义词。\n\n附件：阿帕网握手包。",
      once: true,
      triggers: { monthDay: "10-29" },
      attachments: [
        { type: "questItem", itemId: "qi_arpanet_1969", amount: 1 },
        { type: "byte", amount: 55 }
      ]
    },
    {
      id: "turb_1969_deliver",
      from: "断点",
      title: "【乱流】交还握手",
      body: "{{name}}，\n\n交还握手包。你每次把题交到服务器上，都是某种后代仪式。",
      once: true,
      triggers: { monthDay: "10-30" },
      requireDelivery: [{ itemId: "qi_arpanet_1969", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_timeline_nail", amount: 1 },
        { type: "egg", rarity: "N", amount: 1 },
        { type: "xp", amount: 45 }
      ],
      storyNote: "分组交换网络的黎明。"
    },
    {
      id: "turb_1971_micro",
      from: "灰栈博士",
      title: "【乱流】1971：心被装进芯片",
      body: "{{name}}：\n\n微处理器。计算的心，变成可量产的元件。\n\n附件：微处理器晶圆屑。",
      once: true,
      triggers: { monthDay: "11-15" },
      attachments: [
        { type: "questItem", itemId: "qi_micro_1971", amount: 1 },
        { type: "kb", amount: 1 }
      ]
    },
    {
      id: "turb_1971_deliver",
      from: "零号观察者",
      title: "【乱流】归档 1971",
      body: "{{name}}，\n\n上交晶圆屑。暗线进度：年轮钉越多，未命名者越安静——或越近。我无法区分。",
      once: true,
      triggers: { monthDay: "11-16" },
      requireDelivery: [{ itemId: "qi_micro_1971", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_timeline_nail", amount: 1 },
        { type: "egg", rarity: "R", amount: 1 }
      ],
      storyNote: "微处理器与个人计算的前夜。"
    },
    {
      id: "turb_1981_pc",
      from: "断点",
      title: "【乱流】1981：机器上桌",
      body: "{{name}}，\n\n个人计算机走进办公室与家庭。有人在这上面第一次看见闪烁的光标。\n\n附件：个人计算机铭牌。\n\n你将来的第一行 printf，其实在这一年就埋了引线。",
      once: true,
      triggers: { monthDay: "08-12" },
      attachments: [
        { type: "questItem", itemId: "qi_pc_1981", amount: 1 },
        { type: "byte", amount: 81 }
      ]
    },
    {
      id: "turb_1981_deliver",
      from: "进程幽灵",
      title: "【乱流】交还铭牌",
      body: "{{name}}，\n\n交还铭牌。桌面时代开始后，bug 也平民化了——恭喜。",
      once: true,
      triggers: { monthDay: "08-13" },
      requireDelivery: [{ itemId: "qi_pc_1981", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_timeline_nail", amount: 1 },
        { type: "egg", rarity: "R", amount: 1 },
        { type: "item", itemId: "food", amount: 2 }
      ],
      storyNote: "PC 革命：计算进入日常。"
    },
    {
      id: "turb_1991_www",
      from: "零号观察者",
      title: "【乱流】1991：页与页相连",
      body: "{{name}}，\n\n万维网。超文本。你读这封信的方式，本身就是那次发明的回声。\n\n附件：超文本锚点。\n\n同年代还有内核被分享的故事——自由有时是一种协议。",
      once: true,
      triggers: { monthDay: "08-06" },
      attachments: [
        { type: "questItem", itemId: "qi_www_1991", amount: 1 },
        { type: "questItem", itemId: "qi_opensrc_1991", amount: 1 },
        { type: "xp", amount: 50 }
      ]
    },
    {
      id: "turb_1991_deliver",
      from: "灰栈博士",
      title: "【乱流】钉住 1991",
      body: "{{name}}：\n\n请上交「超文本锚点」（内核种子可自留）。\n\n网络与开源让知识的传播加速度再次跃迁——包括你正在用的训练材料。",
      once: true,
      triggers: { monthDay: "08-07" },
      requireDelivery: [{ itemId: "qi_www_1991", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_timeline_nail", amount: 1 },
        { type: "egg", rarity: "SR", amount: 1 },
        { type: "kb", amount: 2 }
      ],
      storyNote: "WWW 与开放协作的年代。"
    },

    // ========== 暗线推进 ==========
    {
      id: "dark_line_1",
      from: "零号观察者",
      title: "【暗线】关于「第零错误」",
      body: "{{name}}，\n\n你已经在乱流里钉过年轮，也留下过足够长的练习轨迹。现在才能谈「第零错误」。\n\n它不像电子管，也不像晶体管。它不属于年表。同盟建立的初衷之一，是把这种噪声从考生轨迹里剥走——我们并未完全成功。\n\n附件：观察者残片镜。副作用是可能看见错位的教室。那不是奖励。",
      once: true,
      triggers: {
        minLevel: 10,
        minSessions: 20,
        minNails: 2,
        requireQuestItems: [{ itemId: "qi_timeline_nail", amount: 2 }]
      },
      attachments: [
        { type: "questItem", itemId: "qi_observer_lens", amount: 1 },
        { type: "xp", amount: 40 }
      ]
    },
    {
      id: "dark_line_2",
      from: "未命名",
      title: "【暗线】未署名回信",
      body: "{{name}}：\n\n他们叫我噪声。我只是比你们更早把「错误」写成了可执行的东西。\n\n你能读到这封信，是因为观察者的镜已经在你手里，且你的轨迹足够长——短的曲线我看不清，也不感兴趣。\n\n年轮钉越多，我越清楚你在哪一年。这不是威胁，是共时。\n\n签名请收好。你会需要否认它。",
      once: true,
      triggers: {
        minLevel: 14,
        minSessions: 35,
        minNails: 4,
        requireDelivered: ["dark_line_1"],
        requireQuestItems: [{ itemId: "qi_observer_lens", amount: 1 }]
      },
      attachments: [
        { type: "questItem", itemId: "qi_unnamed_sig", amount: 1 },
        { type: "questItem", itemId: "qi_zero_glitch", amount: 1 }
      ]
    },
    {
      id: "dark_line_3",
      from: "灰栈博士",
      title: "【暗线】抽样冲突",
      body: "{{name}}：\n\n仪器在你的等级附近出现双峰：一峰是正常学习曲线，另一峰像有人在用你的名义提交。\n\n仅当你已接触未命名签名、并仍保持相当练习量时，同盟才允许你选择「上交隔离」。\n\n也可留下。有些真相需要噪声才能听见——但噪声会记仇。",
      once: true,
      triggers: {
        minLevel: 16,
        minSessions: 45,
        requireDelivered: ["dark_line_2"],
        requireQuestItems: [{ itemId: "qi_unnamed_sig", amount: 1 }]
      },
      requireDelivery: [{ itemId: "qi_unnamed_sig", amount: 1 }],
      afterDeliverAttachments: [
        { type: "questItem", itemId: "qi_timeline_nail", amount: 2 },
        { type: "egg", rarity: "SR", amount: 1 },
        { type: "mb", amount: 1 },
        { type: "xp", amount: 120 }
      ],
      storyNote: "暗线：轨迹镜像；选择隔离或与噪声共处。"
    },
    {
      id: "dark_line_4",
      from: "零号观察者",
      title: "【暗线】暂不完结",
      body: "{{name}}，\n\n年轮钉、残片镜、错误碎片——你若已走到这里，会明白：计算机史不是直线，是一群人在噪声里把信号做大。\n\n第零错误仍在年表外。同盟继续观察你的曲线。考试仍是 2026-09-12。历史不会替你答题。\n\n此信无附件。有些进度只能用读过的东西衡量。",
      once: true,
      triggers: {
        minLevel: 18,
        minSessions: 60,
        minNails: 6,
        requireDelivered: ["dark_line_3"]
      },
      attachments: []
    },

    // ========== 生日 / 节日 / 等级 / 考试（精简保留）==========
    {
      id: "bday_lubozheng",
      from: "断点",
      title: "今天，栈上多了一层",
      body: "{{name}}，\n\n生日快乐。愿编译干净一点。",
      once: true,
      triggers: { userNames: ["卢柏铮"], monthDay: "08-20" },
      attachments: [
        { type: "egg", rarity: "R", amount: 1 },
        { type: "byte", amount: 88 }
      ]
    },
    {
      id: "bday_caixiaojing",
      from: "灰栈博士",
      title: "关于「成长」的生日备忘",
      body: "{{name}}：\n\n生日快乐。正确率是数据，不是运气。",
      once: true,
      triggers: { userNames: ["蔡小婧"], monthDay: "03-15" },
      attachments: [
        { type: "kb", amount: 1 },
        { type: "item", itemId: "food", amount: 2 }
      ]
    },
    {
      id: "activate_thanks",
      from: "断点",
      title: "激活回执",
      body: "{{name}}，\n\n激活码已登记。有些门只对念对口令的人打开。",
      once: true,
      triggers: { minLevel: 99 },
      attachments: [{ type: "byte", amount: 64 }]
    },
    {
      id: "feedback_wangzishuo",
      from: "断点",
      title: "关于一次认真的反馈",
      body: "{{name}}，\n\n你指出的挂机收益异常、邮件存档与升阶属性问题，已经修进正式版本。\n\n有人愿意把异常说清楚，系统才会更稳。这不是客套——是工程事实。\n\n附件：时序校准符 ×3，以及一枚 double 蛋。8 月 18 日这份回执才生效；若你提前看到预告，等到那天再打开邮箱即可。\n\n继续刷题。继续找茬。",
      once: true,
      triggers: { userNames: ["王子铄"], monthDay: "08-18" },
      attachments: [
        { type: "questItem", itemId: "qi_sync_permit", amount: 3 },
        { type: "egg", rarity: "SSR", amount: 1 }
      ]
    },
    {
      id: "festival_newyear",
      from: "零号观察者",
      title: "新的采样年",
      body: "{{name}}，\n\n比昨天更稳一点，就够了。",
      once: true,
      triggers: { monthDay: "01-01" },
      attachments: [{ type: "byte", amount: 50 }]
    },
    {
      id: "festival_spring",
      from: "断点",
      title: "过年也别把脑子格式化",
      body: "{{name}}，\n\n每天一组题，胜过节后后悔。",
      once: true,
      triggers: { monthDay: "01-28" },
      attachments: [{ type: "stamina", amount: 15 }]
    },
    {
      id: "festival_children",
      from: "进程幽灵",
      title: "六一：允许你玩一下",
      body: "{{name}}，\n\n反馈让大脑知道这样做是对的。",
      once: true,
      triggers: { monthDay: "06-01" },
      attachments: [{ type: "egg", rarity: "N", amount: 1 }]
    },
    {
      id: "festival_teachers",
      from: "灰栈博士",
      title: "有人把知识传给了你",
      body: "{{name}}：\n\n用一局干净的正确率代替口号。",
      once: true,
      triggers: { monthDay: "09-10" },
      attachments: [{ type: "xp", amount: 40 }]
    },
    {
      id: "festival_national",
      from: "零号观察者",
      title: "长假与短记忆",
      body: "{{name}}，\n\n每天留一点练习。",
      once: true,
      triggers: { monthDay: "10-01" },
      attachments: [{ type: "byte", amount: 30 }]
    },
    {
      id: "festival_christmas",
      from: "进程幽灵",
      title: "Heap 里的冬夜",
      body: "{{name}}，\n\n圣诞快乐。",
      once: true,
      triggers: { monthDay: "12-25" },
      attachments: [{ type: "egg", rarity: "N", amount: 1 }, { type: "stamina", amount: 10 }]
    },
    {
      id: "level_5_mail",
      from: "灰栈博士",
      title: "采样达标：Lv.5",
      body: "{{name}}，第 {{level}} 级。可以去碰竞速。暗线也在附近醒来。",
      once: true,
      triggers: { minLevel: 5 },
      attachments: [{ type: "byte", amount: 50 }, { type: "item", itemId: "food", amount: 1 }]
    },
    {
      id: "level_10_mail",
      from: "断点",
      title: "Lv.10：别飘",
      body: "{{name}}，\n\n去翻错题本。",
      once: true,
      triggers: { minLevel: 10 },
      attachments: [{ type: "egg", rarity: "R", amount: 1 }, { type: "kb", amount: 1 }]
    },
    {
      id: "level_20_mail",
      from: "零号观察者",
      title: "Lv.20 的注视",
      body: "{{name}}，\n\n五星竞速，适合现在的你。",
      once: true,
      triggers: { minLevel: 20 },
      attachments: [{ type: "egg", rarity: "SR", amount: 1 }, { type: "mb", amount: 1 }]
    },
    {
      id: "monday_cheer",
      from: "断点",
      title: "周一：重新挂载",
      body: "{{name}}，\n\n先打卡，再追正确率。",
      once: false,
      triggers: { weekday: 1, weekly: true },
      attachments: [{ type: "stamina", amount: 5 }]
    },
    {
      id: "friday_cheer",
      from: "进程幽灵",
      title: "周五：记得收菜",
      body: "{{name}}，\n\n探索结束就去领取。",
      once: false,
      triggers: { weekday: 5, weekly: true },
      attachments: [{ type: "byte", amount: 15 }]
    },
    {
      id: "first_perfect",
      from: "零号观察者",
      title: "零 Warning",
      body: "{{name}}，\n\n全对。绿色很少见。",
      once: true,
      triggers: { minLevel: 99 },
      attachments: [{ type: "egg", rarity: "R", amount: 1 }, { type: "xp", amount: 40 }]
    },
    {
      id: "exam_20260912_4w",
      from: "灰栈博士",
      title: "倒计时 28 天：开始收敛",
      body: "{{name}}：\n\nGESP：2026-09-12。四周。收敛，勿发散。",
      once: true,
      triggers: { date: "2026-08-15" },
      attachments: [{ type: "byte", amount: 80 }, { type: "item", itemId: "food", amount: 2 }]
    },
    {
      id: "exam_20260912_3w",
      from: "断点",
      title: "倒计时 21 天：检查漏洞",
      body: "{{name}}，\n\n三周。把错题本翻薄。",
      once: true,
      triggers: { date: "2026-08-22" },
      attachments: [{ type: "xp", amount: 60 }, { type: "stamina", amount: 12 }]
    },
    {
      id: "exam_20260912_2w",
      from: "零号观察者",
      title: "倒计时 14 天：进入注视区间",
      body: "{{name}}，\n\n两周。每周至少一次竞速。",
      once: true,
      triggers: { date: "2026-08-29" },
      attachments: [{ type: "egg", rarity: "R", amount: 1 }, { type: "kb", amount: 1 }]
    },
    {
      id: "exam_20260912_1w",
      from: "断点",
      title: "倒计时 7 天：收手与手感",
      body: "{{name}}，\n\n最后一周。别开新坑。",
      once: true,
      triggers: { date: "2026-09-05" },
      attachments: [{ type: "byte", amount: 100 }, { type: "item", itemId: "super_food", amount: 1 }]
    },
    {
      id: "exam_20260912_day",
      from: "零号观察者",
      title: "今日：2026-09-12",
      body: "{{name}}，\n\n正常发挥。历史不会替你答题。",
      once: true,
      triggers: { date: "2026-09-12" },
      attachments: [{ type: "xp", amount: 80 }, { type: "stamina", amount: 20 }]
    },

    // ========== 词条图鉴 → 特殊精灵任务 ==========
    {
      id: "codex_spirit_seed",
      from: "进程幽灵",
      title: "【词条】档案芽孢",
      body: "{{name}}，\n\n你已经认真读过若干基础词条。知识不是装饰——它在 Heap 里发芽。\n\n附件是一枚「档案芽孢」相关的精炼蛋：更吃「读过史」的人。去孵化看看。\n\n继续阅读。12 条、20 条时我还会写信。",
      once: true,
      triggers: { minLevel: 99 },
      attachments: [
        { type: "egg", rarity: "R", amount: 1 },
        { type: "xp", amount: 30 },
        { type: "questItem", itemId: "qi_codex_seed", amount: 1 }
      ]
    },
    {
      id: "codex_spirit_lantern",
      from: "灰栈博士",
      title: "【词条】采样灯",
      body: "{{name}}：\n\n12 条词条。你对「比特、结构、网络」已有骨架印象。\n\n附件：采样灯碎片（任务道具）与一枚稀有蛋。灯不照路，只照定义——下次乱流来时，读过的人更不容易被噪声带偏。",
      once: true,
      triggers: { minLevel: 99 },
      attachments: [
        { type: "egg", rarity: "SR", amount: 1 },
        { type: "questItem", itemId: "qi_codex_lantern", amount: 1 },
        { type: "kb", amount: 1 }
      ]
    },
    {
      id: "codex_spirit_archive",
      from: "零号观察者",
      title: "【词条】归档精灵许可",
      body: "{{name}}，\n\n20 条。你把 GESP 一级计算机基础的主干部件在脑中点过一遍。\n\n现在允许你接触「归档精灵」相关任务：上交芽孢与采样灯，换取更接近传说的孵化材料。\n\n这不是买，是确认你读过。",
      once: true,
      triggers: { minLevel: 99 },
      requireDelivery: [
        { itemId: "qi_codex_seed", amount: 1 },
        { itemId: "qi_codex_lantern", amount: 1 }
      ],
      afterDeliverAttachments: [
        { type: "egg", rarity: "SR", amount: 1 },
        { type: "egg", rarity: "R", amount: 1 },
        { type: "questItem", itemId: "qi_codex_permit", amount: 1 },
        { type: "xp", amount: 80 }
      ],
      storyNote: "词条阅读达成：获得归档精灵许可。"
    },
    {
      id: "codex_spirit_legend",
      from: "零号观察者",
      title: "【词条】全图鉴·精灵回响",
      body: "{{name}}，\n\n全部词条已读。同盟将一枚传说级蛋编入你的轨迹——它偏好「把常识读完」的人。\n\n硬件、软件、网络、数制、历史：考试会抽问，生活会复用。你已经完成了一次主动的归档。",
      once: true,
      triggers: { minLevel: 99 },
      attachments: [
        { type: "egg", rarity: "SSR", amount: 1 },
        { type: "mb", amount: 1 },
        { type: "xp", amount: 120 }
      ]
    },
    {
      id: "exam_cheer",
      from: "灰栈博士",
      title: "一份不算温柔的备忘",
      body: "{{name}}：\n\n避免熬夜、只刷熟悉题、不看解析。",
      once: true,
      triggers: { monthDay: "06-15" },
      attachments: [{ type: "byte", amount: 40 }]
    }
  ];

  global.MAIL_DATA = {
    MAIL_TEMPLATES,
    QUEST_ITEMS,
    NEXT_EXAM_DATE,
    LORE: {
      observers: ["零号观察者", "灰栈博士", "断点", "进程幽灵", "未命名"],
      exam: NEXT_EXAM_DATE,
      questChain: ["quest_turing_1", "quest_turing_2", "quest_shannon_1", "quest_shannon_2", "quest_von_1", "quest_von_2", "quest_alliance_end"],
      turbulence: [
        "turb_1906_tube", "turb_1946_eniac", "turb_1947_transistor", "turb_1958_ic",
        "turb_1969_arpa", "turb_1971_micro", "turb_1981_pc", "turb_1991_www"
      ],
      darkLine: ["dark_line_1", "dark_line_2", "dark_line_3", "dark_line_4"],
      summary: "时空乱流用史实月日投递器件残骸；暗线围绕第零错误与未命名者逐步推进。"
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
