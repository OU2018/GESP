/**
 * system/achievements.js — 成就系统（适配 Byte/KB/MB · 孵化 · 探索）
 */
(function (global) {
  "use strict";

  const ACHIEVEMENTS = [
    // —— 练习 ——
    { id: "first_session", name: "main 启动", desc: "完成第 1 次训练", emoji: "🎯",
      xp: 25, bytes: 20, kb: 0, mb: 0,
      check: (ctx) => (ctx.stats && ctx.stats.totalSessions) >= 1 },
    { id: "sessions_5", name: "循环五次", desc: "累计完成 5 次训练", emoji: "📚",
      xp: 40, bytes: 40, kb: 1, mb: 0,
      check: (ctx) => (ctx.stats && ctx.stats.totalSessions) >= 5 },
    { id: "sessions_20", name: "刷题 daemon", desc: "累计完成 20 次训练", emoji: "💪",
      xp: 90, bytes: 80, kb: 2, mb: 0,
      check: (ctx) => (ctx.stats && ctx.stats.totalSessions) >= 20 },
    { id: "sessions_50", name: "常驻进程", desc: "累计完成 50 次训练", emoji: "🖥️",
      xp: 180, bytes: 120, kb: 4, mb: 0,
      check: (ctx) => (ctx.stats && ctx.stats.totalSessions) >= 50 },
    { id: "perfect", name: "零 Warning", desc: "单次训练全对（≥8 题）", emoji: "💯",
      xp: 70, bytes: 50, kb: 1, mb: 0,
      check: (ctx) => ctx.last && ctx.last.total >= 8 && ctx.last.accuracy === 100 },
    { id: "acc_90", name: "高正确率", desc: "单次正确率 ≥ 90%（至少 10 题）", emoji: "⭐",
      xp: 35, bytes: 30, kb: 0, mb: 0,
      check: (ctx) => ctx.last && ctx.last.total >= 10 && ctx.last.accuracy >= 90 },
    { id: "combo_5", name: "连击 cache", desc: "单次最高连击 ≥ 5", emoji: "🔥",
      xp: 30, bytes: 25, kb: 0, mb: 0,
      check: (ctx) => ctx.last && ctx.last.maxCombo >= 5 },
    { id: "combo_10", name: "流水线满载", desc: "单次最高连击 ≥ 10", emoji: "⚡",
      xp: 60, bytes: 45, kb: 1, mb: 0,
      check: (ctx) => ctx.last && ctx.last.maxCombo >= 10 },
    { id: "combo_20", name: "超标量", desc: "单次最高连击 ≥ 20", emoji: "🚀",
      xp: 120, bytes: 80, kb: 2, mb: 0,
      check: (ctx) => ctx.last && ctx.last.maxCombo >= 20 },
    { id: "four_banks", name: "多模块链接", desc: "四个题库都练过至少一次", emoji: "🗺️",
      xp: 70, bytes: 50, kb: 1, mb: 0,
      check: (ctx) => {
        const b = (ctx.stats && ctx.stats.banksPlayed) || {};
        return b["printf-scanf"] && b["control-flow"] && b["computer-basics"] && b["data-ops"];
      }},
    { id: "race_1", name: "竞速首航", desc: "完成 1 次竞速模式", emoji: "🏁",
      xp: 40, bytes: 30, kb: 1, mb: 0,
      check: (ctx) => ctx.last && ctx.last.mode === "race" },
    { id: "settle_perfect_tag", name: "完美词条", desc: "结算触发「完美通关」词条", emoji: "🏅",
      xp: 50, bytes: 40, kb: 1, mb: 0,
      check: (ctx) => ctx.last && ctx.last.settleTags && ctx.last.settleTags.indexOf("完美通关") >= 0 },

    // —— 连续 ——
    { id: "streak_3", name: "三日 cron", desc: "连续练习 3 天", emoji: "📅",
      xp: 45, bytes: 35, kb: 1, mb: 0,
      check: (ctx) => (ctx.streak || 0) >= 3 },
    { id: "streak_7", name: "一周 uptime", desc: "连续练习 7 天", emoji: "📆",
      xp: 120, bytes: 70, kb: 2, mb: 0,
      check: (ctx) => (ctx.streak || 0) >= 7 },
    { id: "streak_30", name: "月度 daemon", desc: "连续练习 30 天", emoji: "🌙",
      xp: 400, bytes: 150, kb: 5, mb: 1,
      check: (ctx) => (ctx.streak || 0) >= 30 },

    // —— 等级 / 内存货币 ——
    { id: "lv_5", name: "初级程序员", desc: "个人等级达到 5", emoji: "5️⃣",
      xp: 40, bytes: 40, kb: 1, mb: 0,
      check: (ctx) => (ctx.level || 1) >= 5 },
    { id: "lv_10", name: "段错误克星", desc: "个人等级达到 10", emoji: "🔟",
      xp: 100, bytes: 80, kb: 2, mb: 0,
      check: (ctx) => (ctx.level || 1) >= 10 },
    { id: "lv_20", name: "资深调试员", desc: "个人等级达到 20", emoji: "🧠",
      xp: 220, bytes: 120, kb: 4, mb: 1,
      check: (ctx) => (ctx.level || 1) >= 20 },
    { id: "kb_5", name: "KB 入门", desc: "累计持有过或当前 KB ≥ 5", emoji: "📘",
      xp: 50, bytes: 20, kb: 1, mb: 0,
      check: (ctx) => (ctx.kb || 0) >= 5 || (ctx.stats && (ctx.stats.lifetimeKb || 0) >= 5) },
    { id: "mb_1", name: "第一枚 MB", desc: "持有 MB ≥ 1", emoji: "💎",
      xp: 80, bytes: 30, kb: 2, mb: 0,
      check: (ctx) => (ctx.mb || 0) >= 1 },
    { id: "bytes_200", name: "小金库", desc: "持有 Byte ≥ 200", emoji: "💰",
      xp: 40, bytes: 0, kb: 1, mb: 0,
      check: (ctx) => (ctx.bytes || 0) >= 200 },
    { id: "bytes_1000", name: "内存大户", desc: "持有 Byte ≥ 1000", emoji: "💾",
      xp: 100, bytes: 0, kb: 3, mb: 0,
      check: (ctx) => (ctx.bytes || 0) >= 1000 },

    // —— 宠物 / 孵化 / 探索 ——
    { id: "first_pet", name: "第一个进程", desc: "Heap 中拥有至少 1 个进程", emoji: "🐣",
      xp: 25, bytes: 25, kb: 0, mb: 0,
      check: (ctx) => (ctx.petCount || 0) >= 1 },
    { id: "pets_5", name: "小进程池", desc: "同时拥有至少 5 个进程", emoji: "📚",
      xp: 70, bytes: 50, kb: 1, mb: 0,
      check: (ctx) => (ctx.petCount || 0) >= 5 },
    { id: "pets_12", name: "Heap 热闹", desc: "同时拥有至少 12 个进程", emoji: "🏢",
      xp: 150, bytes: 80, kb: 3, mb: 0,
      check: (ctx) => (ctx.petCount || 0) >= 12 },
    { id: "hatch_1", name: "第一次孵化", desc: "累计孵化 ≥ 1 次", emoji: "🥚",
      xp: 35, bytes: 30, kb: 0, mb: 0,
      check: (ctx) => (ctx.hatchCount || ctx.gachaCount || 0) >= 1 },
    { id: "hatch_10", name: "孵化十次", desc: "累计孵化 ≥ 10 次", emoji: "🪺",
      xp: 90, bytes: 60, kb: 2, mb: 0,
      check: (ctx) => (ctx.hatchCount || ctx.gachaCount || 0) >= 10 },
    { id: "egg_sr", name: "稀有蛋收藏", desc: "曾拥有或孵化相关 SR 进度", emoji: "💜",
      xp: 80, bytes: 40, kb: 2, mb: 0,
      check: (ctx) => (ctx.stats && ctx.stats.srEggs || 0) >= 1 || (ctx.ssrCount || 0) >= 1 },
    { id: "ssr_1", name: "第一只 double", desc: "拥有至少 1 只 SSR", emoji: "✨",
      xp: 150, bytes: 60, kb: 3, mb: 1,
      check: (ctx) => (ctx.ssrCount || 0) >= 1 },
    { id: "ssr_2", name: "双 double", desc: "拥有至少 2 只 SSR", emoji: "🌟",
      xp: 250, bytes: 80, kb: 4, mb: 1,
      check: (ctx) => (ctx.ssrCount || 0) >= 2 },
    { id: "dispatch_1", name: "初次探索", desc: "累计领取探索奖励 1 次", emoji: "🌲",
      xp: 30, bytes: 25, kb: 0, mb: 0,
      check: (ctx) => (ctx.dispatchClaims || 0) >= 1 },
    { id: "dispatch_10", name: "任务调度器", desc: "累计领取探索奖励 10 次", emoji: "⚙️",
      xp: 100, bytes: 50, kb: 2, mb: 0,
      check: (ctx) => (ctx.dispatchClaims || 0) >= 10 },
    { id: "dispatch_30", name: "运维专家", desc: "累计领取探索奖励 30 次", emoji: "🛠️",
      xp: 200, bytes: 80, kb: 4, mb: 1,
      check: (ctx) => (ctx.dispatchClaims || 0) >= 30 },
    { id: "idle_50", name: "挂机启动", desc: "累计挂机收获 ≥ 50 Byte", emoji: "📡",
      xp: 40, bytes: 20, kb: 1, mb: 0,
      check: (ctx) => (ctx.lifetimeIdle || 0) >= 50 },
    { id: "idle_300", name: "挂机达人", desc: "累计挂机收获 ≥ 300 Byte", emoji: "🛋️",
      xp: 120, bytes: 50, kb: 2, mb: 0,
      check: (ctx) => (ctx.lifetimeIdle || 0) >= 300 },
    { id: "upgrade_3", name: "开始强化", desc: "任意永久升级总等级之和 ≥ 3", emoji: "⬆️",
      xp: 50, bytes: 30, kb: 1, mb: 0,
      check: (ctx) => (ctx.upgradeLevels || 0) >= 3 },
    { id: "upgrade_15", name: "强化狂魔", desc: "永久升级总等级之和 ≥ 15", emoji: "🔧",
      xp: 160, bytes: 70, kb: 3, mb: 0,
      check: (ctx) => (ctx.upgradeLevels || 0) >= 15 },
    { id: "heap_16", name: "大 Heap", desc: "Heap 容量 ≥ 16", emoji: "📦",
      xp: 110, bytes: 40, kb: 2, mb: 0,
      check: (ctx) => (ctx.warehouseCap || 0) >= 16 },
  ];

  function showToast(html, ms) {
    ms = ms == null ? 3200 : ms;
    const layer = document.getElementById("toast-layer");
    if (!layer) return;
    const el = document.createElement("div");
    el.className = "toast-item";
    el.innerHTML = html;
    layer.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 350);
    }, ms);
  }

  function formatReward(a) {
    const parts = [];
    if (a.xp) parts.push("+" + a.xp + " XP");
    if (a.bytes) parts.push("+" + a.bytes + " B");
    if (a.kb) parts.push("+" + a.kb + " KB");
    if (a.mb) parts.push("+" + a.mb + " MB");
    return parts.join(" · ");
  }

  function checkAchievements(ctx) {
    if (!global.data) return [];
    if (!global.data.achievements) global.data.achievements = {};
    const newly = [];
    ACHIEVEMENTS.forEach(a => {
      if (global.data.achievements[a.id]) return;
      try {
        if (a.check(ctx)) {
          global.data.achievements[a.id] = {
            unlockedAt: new Date().toISOString(),
            xpAwarded: a.xp || 0,
            bytesAwarded: a.bytes || 0,
            kbAwarded: a.kb || 0,
            mbAwarded: a.mb || 0
          };
          global.data.totalXp = (global.data.totalXp || 0) + (a.xp || 0);
          if (a.bytes) global.data.bytes = (global.data.bytes || 0) + a.bytes;
          if (a.kb) global.data.kb = (global.data.kb || 0) + a.kb;
          if (a.mb) global.data.mb = (global.data.mb || 0) + a.mb;
          newly.push(a);
        }
      } catch (e) {}
    });
    if (newly.length) {
      if (typeof global.saveData === "function") global.saveData(global.data);
      newly.forEach(a => {
        showToast(`🏅 成就解锁：${a.emoji} <strong>${a.name}</strong>　${formatReward(a)}`);
      });
    }
    return newly;
  }

  let achievePage = 1;
  const ACH_PAGE_SIZE = 8;

  function renderAchievementsPage() {
    const host = document.getElementById("achievements-list") || document.getElementById("achieve-list");
    if (!host) return;
    const unlocked = (global.data && global.data.achievements) || {};
    const pages = Math.max(1, Math.ceil(ACHIEVEMENTS.length / ACH_PAGE_SIZE));
    if (achievePage > pages) achievePage = pages;
    if (achievePage < 1) achievePage = 1;
    const slice = ACHIEVEMENTS.slice((achievePage - 1) * ACH_PAGE_SIZE, achievePage * ACH_PAGE_SIZE);
    const done = Object.keys(unlocked).length;
    host.innerHTML = `<div class="setting-hint" style="margin-bottom:10px;">已解锁 ${done} / ${ACHIEVEMENTS.length} · 奖励含 XP · Byte · KB · MB</div>`;
    slice.forEach(a => {
      const u = unlocked[a.id];
      const card = document.createElement("div");
      card.className = "achieve-card" + (u ? " unlocked" : "");
      card.innerHTML = `<div class="achieve-emoji">${a.emoji}</div>
        <div class="achieve-body">
          <strong>${a.name}</strong>
          <div class="setting-hint">${a.desc}</div>
          <div class="achieve-reward">${formatReward(a)}</div>
          ${u ? `<div class="achieve-date">✓ ${new Date(u.unlockedAt).toLocaleDateString()}</div>` : `<div class="achieve-date">未解锁</div>`}
        </div>`;
      host.appendChild(card);
    });
    const pager = document.getElementById("achieve-pager") || document.getElementById("achievements-pager");
    if (pager && typeof global.renderPager === "function") {
      global.renderPager("achieve-pager", achievePage, pages, (p) => { achievePage = p; renderAchievementsPage(); });
    } else if (pager) {
      pager.innerHTML = `<button type="button" class="btn-secondary btn-sm" id="ach-prev">上一页</button>
        <span>${achievePage}/${pages}</span>
        <button type="button" class="btn-secondary btn-sm" id="ach-next">下一页</button>`;
      const prev = document.getElementById("ach-prev");
      const next = document.getElementById("ach-next");
      if (prev) prev.onclick = () => { if (achievePage > 1) { achievePage--; renderAchievementsPage(); } };
      if (next) next.onclick = () => { if (achievePage < pages) { achievePage++; renderAchievementsPage(); } };
    }
  }

  global.ACHIEVEMENTS = ACHIEVEMENTS;
  global.checkAchievements = checkAchievements;
  global.renderAchievementsPage = renderAchievementsPage;
  global.renderAchievePage = renderAchievementsPage;
})(typeof window !== "undefined" ? window : globalThis);
