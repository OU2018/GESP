/**
 * system/pet.js — 宠物成长与进化
 * 依赖（运行时由 script.js 提供）：data, saveData, updateHome, getUserName, getConfig
 */
(function (global) {
  "use strict";

  /** 共同幼年期：前期升级较快 */
  const PET_COMMON = [
    { minXp: 0,   emoji: "🥚", name: "代码之蛋", title: "Lv.1 蛋",   desc: "一颗蕴藏逻辑的蛋，做题给它能量！" },
    { minXp: 40,  emoji: "🐣", name: "破壳雏鸟", title: "Lv.2 破壳", desc: "很快破壳！继续答题就会长大。" },
    { minXp: 100, emoji: "🐥", name: "格式幼鸟", title: "Lv.3 幼鸟", desc: "可以选进化路线啦！" },
  ];

  /** 三系分支：后期逐渐变慢 */
  const PET_PATHS = {
    bird: {
      id: "bird", name: "鸟系", icon: "🦅", unlockXp: 100,
      blurb: "飞鸟 → 老鹰，专注锐利输出",
      stages: [
        { minXp: 200, emoji: "🐦", name: "输出飞鸟", title: "Lv.4 飞鸟", desc: "在花括号与转义之间自由飞翔。" },
        { minXp: 420, emoji: "🦅", name: "调试之鹰", title: "Lv.5 雄鹰", desc: "鸟系最终形态：锐利发现格式错误。" },
      ]
    },
    dragon: {
      id: "dragon", name: "龙系", icon: "🐉", unlockXp: 100,
      blurb: "小蜥蜴 → 巨龙，掌控宽度与精度",
      stages: [
        { minXp: 220, emoji: "🦎", name: "补零蜥蜴", title: "Lv.4 蜥蜴", desc: "学会了 %05d，鳞片闪着零。" },
        { minXp: 520, emoji: "🐉", name: "编译巨龙", title: "Lv.5 巨龙", desc: "龙系最终形态：吐息皆是正确格式。" },
      ]
    },
    star: {
      id: "star", name: "星系", icon: "🦄", unlockXp: 100,
      blurb: "星尘精灵 → 独角兽，传说级综合",
      stages: [
        { minXp: 250, emoji: "✨", name: "星尘精灵", title: "Lv.4 精灵", desc: "转义符在身边化作星光。" },
        { minXp: 600, emoji: "🦄", name: "算法独角兽", title: "Lv.5 传说", desc: "星系最终形态：GESP 格式传说！" },
      ]
    }
  };

  const PET_BLESSINGS = [
    (n) => `${n}，今天也一起来刷题吧！我会陪着你的～`,
    (n) => `嗨 ${n}！答对题目我会长大哦，加油！`,
    (n) => `${n} 早上好精神！（不一定是早上，但要有精神）`,
    (n) => `检测到训练员 ${n} 上线，宠物蓄力完毕！`,
    (n) => `${n}，错题不可怕，可怕的是不打开错题本～`,
    (n) => `给 ${n} 比个爪：今天正确率冲一冲！`,
    (n) => `${n} 专属提醒：看清是 == 还是 = 再选！`,
    (n) => `你好呀 ${n}，分支走对，循环不迷路！`,
    (n) => `${n}，格式符对了，输出就对了～`,
    (n) => `欢迎回来，${n}！先做一组热热身吧。`,
  ];

  function getPetPathId() {
    const id = (global.data && global.data.petPath) || "bird";
    return PET_PATHS[id] ? id : "bird";
  }

  function setPetPath(id) {
    if (!PET_PATHS[id]) return;
    const xp = (global.data && global.data.totalXp) || 0;
    if (xp < PET_PATHS[id].unlockXp) return;
    global.data.petPath = id;
    if (typeof global.saveData === "function") global.saveData(global.data);
    renderPetPage();
    if (typeof global.updateHome === "function") global.updateHome();
  }

  function getActivePetStages() {
    const xp = (global.data && global.data.totalXp) || 0;
    const path = PET_PATHS[getPetPathId()];
    if (xp < 100) return PET_COMMON.slice();
    return PET_COMMON.concat(path.stages);
  }

  function getPetStage(totalXp) {
    const stages = getActivePetStages();
    let stage = stages[0];
    for (const st of stages) {
      if (totalXp >= st.minXp) stage = st;
    }
    return stage;
  }

  function getNextPetStage(totalXp) {
    const stages = getActivePetStages();
    for (const st of stages) {
      if (st.minXp > totalXp) return st;
    }
    return null;
  }

  function renderPetPage() {
    const xp = (global.data && global.data.totalXp) || 0;
    const stage = getPetStage(xp);
    const next = getNextPetStage(xp);
    const pathId = getPetPathId();
    const path = PET_PATHS[pathId];

    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setText("pet-emoji", stage.emoji);
    setText("pet-name", stage.name);
    setText("pet-level", stage.title);
    setText("pet-total-xp", String(xp));
    setText("pet-form", stage.name);
    setText("pet-desc", stage.desc);

    const pathNameEl = document.getElementById("pet-path-name");
    if (pathNameEl) {
      pathNameEl.textContent = xp < 100 ? "幼年期（尚未分支）" : path.name + " · " + path.blurb;
    }

    let pct = 100;
    let xpText = "当前路线已满级";
    if (next) {
      const span = Math.max(1, next.minXp - stage.minXp);
      const cur = xp - stage.minXp;
      pct = Math.min(100, Math.round((cur / span) * 100));
      xpText = `${xp} / ${next.minXp} XP`;
    } else {
      xpText = `${xp} XP（当前路线满级）`;
    }
    setText("pet-xp-text", xpText);
    const bar = document.getElementById("pet-bar-fill");
    if (bar) bar.style.width = pct + "%";

    const sel = document.getElementById("pet-path-select");
    if (sel) {
      sel.innerHTML = Object.values(PET_PATHS).map(p => {
        const unlocked = xp >= p.unlockXp;
        const active = pathId === p.id;
        return `<button class="pet-path-btn ${active ? "active" : ""}" data-path="${p.id}" ${unlocked ? "" : "disabled"}
          title="${unlocked ? p.blurb : "需要 " + p.unlockXp + " XP 解锁"}">
          <span class="pe">${p.icon}</span>${p.name}${unlocked ? "" : " 🔒"}
        </button>`;
      }).join("");
      sel.querySelectorAll(".pet-path-btn").forEach(btn => {
        btn.onclick = () => setPetPath(btn.dataset.path);
      });
    }

    const road = document.getElementById("pet-roadmap");
    if (road) {
      const stages = getActivePetStages();
      road.innerHTML = stages.map(st => {
        const unlocked = xp >= st.minXp;
        return `<div class="pet-road-item ${unlocked ? "unlocked" : ""}">
          <span class="re">${st.emoji}</span>${st.name}<br><span style="opacity:0.7">${st.minXp}XP</span>
        </div>`;
      }).join("");
    }

    const all = document.getElementById("pet-all-paths");
    if (all) {
      all.innerHTML = `
        <div><strong>共同幼年期</strong>：🥚 代码之蛋 → 🐣 破壳雏鸟 → 🐥 格式幼鸟（100XP 可分支）</div>
        <div style="margin-top:8px;"><strong>🦅 鸟系</strong>：🐦 输出飞鸟(200) → 🦅 调试之鹰(420)　最终形态：老鹰</div>
        <div><strong>🐉 龙系</strong>：🦎 补零蜥蜴(220) → 🐉 编译巨龙(520)　前置是蜥蜴，不是鸟</div>
        <div><strong>🦄 星系</strong>：✨ 星尘精灵(250) → 🦄 算法独角兽(600)　独立传说线</div>
        <div style="margin-top:8px;opacity:0.85;">达到幼鸟(100XP)后可在上方切换路线；换路线不会清空 XP，形态按当前路线重新计算。</div>
      `;
    }
  }

  function maybeShowPetBless() {
    const el = document.getElementById("pet-bless");
    if (!el) return;
    const cfg = typeof global.getConfig === "function" ? global.getConfig() : (global.GESP_CONFIG || {});
    const enabled = !(global.data && global.data.settings && global.data.settings.petBless === false);
    if (!enabled) {
      el.style.display = "none";
      return;
    }
    const chance = cfg.petBlessChance != null ? cfg.petBlessChance : 0.45;
    if (Math.random() > chance) {
      el.style.display = "none";
      return;
    }
    const name = typeof global.getUserName === "function" ? global.getUserName() : "同学";
    const pet = getPetStage((global.data && global.data.totalXp) || 0);
    const msg = PET_BLESSINGS[Math.floor(Math.random() * PET_BLESSINGS.length)](name);
    el.style.display = "inline-block";
    el.innerHTML = `<span style="font-size:1.3rem;margin-right:6px;">${pet.emoji}</span>${msg}`;
  }

  // 导出到全局，供 script.js 调用
  global.PET_COMMON = PET_COMMON;
  global.PET_PATHS = PET_PATHS;
  global.getPetPathId = getPetPathId;
  global.setPetPath = setPetPath;
  global.getActivePetStages = getActivePetStages;
  global.getPetStage = getPetStage;
  global.getNextPetStage = getNextPetStage;
  global.renderPetPage = renderPetPage;
  global.maybeShowPetBless = maybeShowPetBless;
})(typeof window !== "undefined" ? window : globalThis);
