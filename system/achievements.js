/**
 * system/achievements.js — 成就 / 解锁系统
 * 依赖（运行时）：data, saveData
 */
(function (global) {
  "use strict";

  const ACHIEVEMENTS = [
    { id: "first_session", name: "初出茅庐", desc: "完成第 1 次训练", emoji: "🎯", xp: 30,
      check: (ctx) => ctx.stats.totalSessions >= 1 },
    { id: "sessions_5", name: "勤学苦练", desc: "累计完成 5 次训练", emoji: "📚", xp: 50,
      check: (ctx) => ctx.stats.totalSessions >= 5 },
    { id: "sessions_20", name: "刷题达人", desc: "累计完成 20 次训练", emoji: "💪", xp: 100,
      check: (ctx) => ctx.stats.totalSessions >= 20 },
    { id: "perfect", name: "完美通关", desc: "单次训练全对", emoji: "💯", xp: 80,
      check: (ctx) => ctx.last && ctx.last.accuracy === 100 },
    { id: "acc_90", name: "高正确率", desc: "单次正确率 ≥ 90%（且至少 10 题）", emoji: "⭐", xp: 40,
      check: (ctx) => ctx.last && ctx.last.total >= 10 && ctx.last.accuracy >= 90 },
    { id: "combo_5", name: "连击新星", desc: "单次最高连击 ≥ 5", emoji: "🔥", xp: 35,
      check: (ctx) => ctx.last && ctx.last.maxCombo >= 5 },
    { id: "combo_10", name: "连击大师", desc: "单次最高连击 ≥ 10", emoji: "⚡", xp: 70,
      check: (ctx) => ctx.last && ctx.last.maxCombo >= 10 },
    { id: "speed_clear", name: "速战速决", desc: "20 题以内用时 ≤ 3 分钟且正确率 ≥ 80%", emoji: "⏱️", xp: 45,
      check: (ctx) => ctx.last && ctx.last.total <= 20 && ctx.last.duration <= 180 && ctx.last.accuracy >= 80 },
    { id: "both_banks", name: "双库探索", desc: "printf 与 分支循环 都练过", emoji: "🗺️", xp: 60,
      check: (ctx) => ctx.stats.banksPlayed["printf-scanf"] && ctx.stats.banksPlayed["control-flow"] },
    { id: "streak_3", name: "三日打卡", desc: "连续练习达到 3 天", emoji: "📅", xp: 50,
      check: (ctx) => (ctx.streak || 0) >= 3 },
    { id: "path_unlock", name: "进化启程", desc: "累计 XP 达到 100，解锁进化分支", emoji: "✨", xp: 25,
      check: (ctx) => (ctx.totalXp || 0) >= 100 },
    { id: "eagle", name: "雄鹰展翅", desc: "鸟系进化到最终形态（420XP）", emoji: "🦅", xp: 60,
      check: (ctx) => (ctx.totalXp || 0) >= 420 && (ctx.petPath === "bird") },
    { id: "dragon_final", name: "龙吟出渊", desc: "龙系进化到最终形态（520XP）", emoji: "🐉", xp: 70,
      check: (ctx) => (ctx.totalXp || 0) >= 520 && (ctx.petPath === "dragon") },
    { id: "unicorn", name: "传说降临", desc: "星系进化到最终形态（600XP）", emoji: "🦄", xp: 80,
      check: (ctx) => (ctx.totalXp || 0) >= 600 && (ctx.petPath === "star") },
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

  /** 检查并解锁成就，返回本次新解锁列表 */
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
            xpAwarded: a.xp
          };
          global.data.totalXp = (global.data.totalXp || 0) + a.xp;
          newly.push(a);
        }
      } catch (e) {}
    });
    if (newly.length) {
      if (typeof global.saveData === "function") global.saveData(global.data);
      newly.forEach(a => {
        showToast(`🏅 成就解锁：${a.emoji} <strong>${a.name}</strong>　+${a.xp} XP`);
      });
    }
    return newly;
  }

  function renderAchievePage() {
    const list = document.getElementById("achieve-list");
    if (!list) return;
    const unlocked = (global.data && global.data.achievements) || {};
    list.innerHTML = ACHIEVEMENTS.map(a => {
      const u = unlocked[a.id];
      return `<div class="achieve-item ${u ? "unlocked" : "locked"}">
        <div class="achieve-emoji">${a.emoji}</div>
        <div class="achieve-body">
          <div class="achieve-name">${a.name} ${u ? "✓" : ""}</div>
          <div class="achieve-desc">${a.desc}</div>
          <div class="achieve-xp">奖励 +${a.xp} XP${u ? " · 已获得" : ""}</div>
        </div>
      </div>`;
    }).join("");
  }

  global.ACHIEVEMENTS = ACHIEVEMENTS;
  global.showToast = showToast;
  global.checkAchievements = checkAchievements;
  global.renderAchievePage = renderAchievePage;
})(typeof window !== "undefined" ? window : globalThis);
