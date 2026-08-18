/**
 * system/codex.js — 词条解锁 / 阅读 / 严格模式问答 / 里程碑
 */
(function (global) {
  "use strict";

  let codexSelected = null;
  let codexCat = "all";
  let codexQuizOpen = false;

  function entries() {
    return (global.CODEX_DATA && global.CODEX_DATA.CODEX_ENTRIES) || [];
  }
  function cats() {
    return (global.CODEX_DATA && global.CODEX_DATA.CODEX_CATS) || {};
  }

  function ensureCodex() {
    const d = global.data;
    if (!d) return null;
    if (!d.codex) d.codex = { unlocked: {}, viewed: {}, milestones: {}, quizPassed: {} };
    if (!d.codex.unlocked) d.codex.unlocked = {};
    if (!d.codex.viewed) d.codex.viewed = {};
    if (!d.codex.milestones) d.codex.milestones = {};
    if (!d.codex.quizPassed) d.codex.quizPassed = {};
    return d.codex;
  }

  function strictOn() {
    try {
      if (typeof global.isStrictMode === "function") return global.isStrictMode();
      return !(global.data && global.data.settings && global.data.settings.strictMode === false);
    } catch (e) { return true; }
  }

  function unlockCodexProgress(opts) {
    opts = opts || {};
    const cx = ensureCodex();
    if (!cx) return [];
    const all = entries();
    const newly = [];
    const sessions = (global.data.stats && global.data.stats.totalSessions) || 0;
    let target = 3 + Math.floor(sessions * 1.2);
    if (opts.bankId === "computer-basics") target += 2;
    if (opts.bonus) target += opts.bonus;
    target = Math.min(all.length, target);

    const locked = all.filter(e => !cx.unlocked[e.id]);
    while (Object.keys(cx.unlocked).length < target && locked.length) {
      const i = Math.floor(Math.random() * locked.length);
      const e = locked.splice(i, 1)[0];
      cx.unlocked[e.id] = Date.now();
      newly.push(e.id);
    }
    for (let i = 0; i < all.length && Object.keys(cx.unlocked).length < target; i++) {
      if (!cx.unlocked[all[i].id]) {
        cx.unlocked[all[i].id] = Date.now();
        newly.push(all[i].id);
      }
    }
    if (newly.length && typeof global.saveData === "function") global.saveData(global.data);
    return newly;
  }

  function viewedCount() {
    const cx = ensureCodex();
    if (!cx) return 0;
    return Object.keys(cx.viewed).length;
  }

  function unlockedCount() {
    const cx = ensureCodex();
    if (!cx) return 0;
    return Object.keys(cx.unlocked).length;
  }

  function markViewed(id) {
    const cx = ensureCodex();
    if (!cx || !cx.unlocked[id]) return false;
    const first = !cx.viewed[id];
    cx.viewed[id] = Date.now();
    if (typeof global.saveData === "function") global.saveData(global.data);
    if (first) checkCodexMilestones();
    return first;
  }

  function checkCodexMilestones() {
    const cx = ensureCodex();
    if (!cx) return [];
    const n = viewedCount();
    const total = entries().length;
    const marks = [
      { id: "c5", need: 5 },
      { id: "c12", need: 12 },
      { id: "c20", need: 20 },
      { id: "call", need: total }
    ];
    const hit = [];
    marks.forEach(m => {
      if (n >= m.need && !cx.milestones[m.id]) {
        cx.milestones[m.id] = Date.now();
        hit.push(m.id);
        try {
          if (typeof global.forceMailById === "function") {
            global.forceMailById("codex_milestone_" + m.id);
          }
        } catch (e) {}
      }
    });
    if (hit.length && typeof global.saveData === "function") global.saveData(global.data);
    return hit;
  }

  function flushPendingCodexMail() {
    /* 兼容旧调用 */
  }

  function textOf(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") return String(v);
    if (typeof v === "object") {
      if (v.name != null) return textOf(v.name);
      if (v.title != null) return textOf(v.title);
      if (v.label != null) return textOf(v.label);
      if (v.emoji != null && v.name == null) return textOf(v.emoji);
      return "";
    }
    return String(v);
  }

  function escape(s) {
    return textOf(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function catLabel(catMap, key) {
    if (key === "all") return "全部";
    const c = catMap && catMap[key];
    if (!c) return String(key);
    if (typeof c === "string") return c;
    const name = textOf(c.name || c.title || c.label || "");
    const emoji = textOf(c.emoji || "");
    return (emoji ? emoji + " " : "") + (name || key);
  }

  function entryById(id) {
    return entries().find(e => e.id === id) || null;
  }

  function buildQuiz(entry) {
    if (entry.quiz && entry.quiz.q && Array.isArray(entry.quiz.options) && entry.quiz.answer != null) {
      return entry.quiz;
    }
    const all = entries().filter(e => e.id !== entry.id);
    const correct = (entry.summary || entry.title || "").slice(0, 56) || "请阅读词条正文";
    const distractors = [];
    const shuffled = all.slice().sort(() => Math.random() - 0.5);
    for (const e of shuffled) {
      const t = (e.summary || e.title || "").slice(0, 56);
      if (t && t !== correct && distractors.indexOf(t) < 0) distractors.push(t);
      if (distractors.length >= 3) break;
    }
    while (distractors.length < 3) distractors.push("与「" + entry.title + "」无关的说法");
    const options = distractors.slice(0, 3);
    const ans = Math.floor(Math.random() * 4);
    options.splice(ans, 0, correct);
    return {
      q: "关于「" + entry.title + "」，哪一项更贴近词条要点？",
      options,
      answer: ans
    };
  }

  function needsQuiz(id) {
    if (!strictOn() || !id) return false;
    const cx = ensureCodex();
    if (!cx) return false;
    if (cx.quizPassed[id]) return false;
    return true;
  }

  function showCodexQuiz(entry, onDone) {
    const modal = document.getElementById("codex-quiz-modal");
    const qEl = document.getElementById("codex-quiz-q");
    const optsEl = document.getElementById("codex-quiz-opts");
    const msgEl = document.getElementById("codex-quiz-msg");
    if (!modal || !qEl || !optsEl) {
      if (onDone) onDone(true);
      return;
    }
    codexQuizOpen = true;
    const quiz = buildQuiz(entry);
    qEl.textContent = quiz.q;
    if (msgEl) { msgEl.textContent = ""; msgEl.style.color = ""; }
    optsEl.innerHTML = "";
    const side0 = document.getElementById("codex-quiz-side");
    if (side0) {
      side0.hidden = true;
      side0.setAttribute("aria-hidden", "true");
    }
    quiz.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "btn-secondary codex-quiz-opt";
      b.textContent = opt;
      b.onclick = () => {
        if (i === quiz.answer) {
          const cx = ensureCodex();
          cx.quizPassed[entry.id] = Date.now();
          markViewed(entry.id);
          if (msgEl) { msgEl.textContent = "回答正确。"; msgEl.style.color = "#86efac"; }
          setTimeout(() => {
            modal.style.display = "none";
            codexQuizOpen = false;
            if (onDone) onDone(true);
          }, 350);
        } else {
          if (msgEl) { msgEl.textContent = "答错了，请阅读右侧词条 5 秒…"; msgEl.style.color = "#fca5a5"; }
          optsEl.querySelectorAll("button").forEach(x => { x.disabled = true; });
          const side = document.getElementById("codex-quiz-side");
          const sideHead = document.getElementById("codex-quiz-side-head");
          const sideBody = document.getElementById("codex-quiz-side-body");
          if (side) {
            side.hidden = false;
            side.setAttribute("aria-hidden", "false");
            if (sideHead) sideHead.innerHTML = `${escape(entry.emoji || "📖")} <strong>${escape(entry.title)}</strong>`;
            if (sideBody) {
              const sum = escape(entry.summary || "");
              const body = escape(entry.body || "").replace(/\n/g, "<br>");
              sideBody.innerHTML = (sum ? `<div class="setting-hint" style="margin-bottom:8px;">${sum}</div>` : "") +
                `<div class="codex-body">${body}</div>`;
            }
          }
          const detail = document.getElementById("codex-detail");
          if (detail) {
            detail.innerHTML = `<div class="codex-force-read">
              <div class="codex-force-title">${escape(entry.emoji || "")} ${escape(entry.title)}</div>
              <div class="codex-body">${escape(entry.body || entry.summary || "").replace(/\n/g, "<br>")}</div>
            </div>`;
          }
          let left = 5;
          const timerEl = document.getElementById("codex-force-timer");
          if (timerEl) timerEl.textContent = "请阅读 5 秒…";
          const tick = setInterval(() => {
            left--;
            const t = document.getElementById("codex-force-timer");
            if (t) t.textContent = left > 0 ? ("请阅读 " + left + " 秒…") : "可以继续了";
            if (left <= 0) {
              clearInterval(tick);
              const cx = ensureCodex();
              cx.quizPassed[entry.id] = Date.now();
              markViewed(entry.id);
              if (side) {
                side.hidden = true;
                side.setAttribute("aria-hidden", "true");
              }
              modal.style.display = "none";
              codexQuizOpen = false;
              if (onDone) onDone(true);
            }
          }, 1000);
        }
      };
      optsEl.appendChild(b);
    });
    modal.style.display = "flex";
  }

  /** 切换词条或离开页面前调用 */
  function requestCodexLeave(cb) {
    if (codexQuizOpen) return;
    if (!needsQuiz(codexSelected)) {
      if (cb) cb();
      return;
    }
    const entry = entryById(codexSelected);
    if (!entry) {
      if (cb) cb();
      return;
    }
    showCodexQuiz(entry, (ok) => { if (ok && cb) cb(); });
  }

  function renderCodexPage() {
    const host = document.getElementById("codex-root") || document.getElementById("codex-list-host");
    // fallback: whole codex view body
    let root = document.getElementById("codex-root");
    if (!root) {
      const view = document.getElementById("codex-view");
      if (view) {
        root = view.querySelector(".codex-page-root") || view.querySelector(".subpage-panel") || view;
      }
    }
    // Prefer dedicated mount
    let mount = document.getElementById("codex-root") || document.getElementById("codex-page-root");
    if (!mount) {
      const panel = document.querySelector("#codex-view .subpage-panel") || document.getElementById("codex-view");
      if (panel) {
        mount = document.createElement("div");
        mount.id = "codex-root";
        panel.appendChild(mount);
      }
    }
    if (!mount) return;

    const cx = ensureCodex();
    const all = entries();
    const unlocked = (cx && cx.unlocked) || {};
    const viewed = (cx && cx.viewed) || {};
    const catMap = cats();
    const list = all.filter(e => {
      if (!unlocked[e.id]) return false;
      if (codexCat !== "all" && e.cat !== codexCat) return false;
      return true;
    });

    const tabKeys = ["all"].concat(Object.keys(catMap));
    const tabs = tabKeys.map(k => {
      const label = catLabel(catMap, k);
      return `<button type="button" class="tab-btn ${codexCat === k ? "active" : ""}" data-cat="${k}">${escape(label)}</button>`;
    }).join("");

    const cards = list.map(e => {
      const isV = !!viewed[e.id];
      const passed = !!(cx.quizPassed && cx.quizPassed[e.id]);
      const lv = e.level ? `<span class="codex-lv">L${e.level}</span>` : "";
      return `<button type="button" class="codex-card ${isV ? "viewed" : "new"} ${codexSelected === e.id ? "sel" : ""}" data-id="${escape(e.id)}">
        <span class="codex-emoji">${escape(e.emoji || "📖")}</span>
        <span class="codex-title">${escape(e.title)}${lv}</span>
        ${(!isV && !passed) ? '<span class="red-dot codex-dot"></span>' : ""}
      </button>`;
    }).join("");

    const sel = all.find(e => e.id === codexSelected && unlocked[e.id]);
    let detail = `<div class="setting-hint">选择左侧已解锁词条阅读。严格模式下，首次离开前会确认问答。</div>
      <div class="setting-hint">已解锁 ${Object.keys(unlocked).length}/${all.length} · 已阅读 ${Object.keys(viewed).length}/${all.length}</div>`;
    if (sel) {
      detail = `<div class="codex-detail-head">${sel.emoji || ""} <strong>${escape(sel.title)}</strong></div>
        <div class="setting-hint">${escape(sel.summary || "")}</div>
        <div class="codex-body">${escape(sel.body || "").replace(/\n/g, "<br>")}</div>
        <button type="button" class="btn-primary btn-sm" id="btn-codex-mark">完成阅读</button>`;
    }

    mount.innerHTML = `
      <div class="codex-progress">已解锁 <strong>${Object.keys(unlocked).length}</strong> / ${all.length}
        · 已阅读 <strong>${Object.keys(viewed).length}</strong>
        · 严格模式：${strictOn() ? "开" : "关"}</div>
      <div class="tab-bar tab-bar-scroll" id="codex-tabs">${tabs}</div>
      <div class="codex-layout">
        <div class="codex-list">${cards || "<div class='setting-hint'>暂无已解锁词条，先去完成几组练习。</div>"}</div>
        <div class="codex-detail" id="codex-detail">${detail}</div>
      </div>`;

    mount.querySelectorAll("#codex-tabs [data-cat]").forEach(btn => {
      btn.onclick = () => {
        const next = () => { codexCat = btn.dataset.cat; renderCodexPage(); };
        if (needsQuiz(codexSelected)) requestCodexLeave(next);
        else next();
      };
    });
    mount.querySelectorAll(".codex-card[data-id]").forEach(btn => {
      btn.onclick = () => {
        const nextId = btn.dataset.id;
        const go = () => {
          codexSelected = nextId;
          // 打开时不立刻 markViewed（严格模式等问答后）
          if (!strictOn()) markViewed(nextId);
          renderCodexPage();
        };
        if (codexSelected && codexSelected !== nextId && needsQuiz(codexSelected)) {
          requestCodexLeave(go);
        } else go();
      };
    });
    const mark = document.getElementById("btn-codex-mark");
    if (mark) {
      mark.onclick = () => {
        const done = () => { codexSelected = null; renderCodexPage(); };
        if (needsQuiz(codexSelected)) requestCodexLeave(done);
        else {
          if (codexSelected) markViewed(codexSelected);
          done();
        }
      };
    }
  }

  function openCodexView() {
    unlockCodexProgress();
    if (typeof global.showView === "function") global.showView("codex-view");
    renderCodexPage();
  }

  global.ensureCodex = ensureCodex;
  global.unlockCodexProgress = unlockCodexProgress;
  global.renderCodexPage = renderCodexPage;
  global.openCodexView = openCodexView;
  global.checkCodexMilestones = checkCodexMilestones;
  global.codexViewedCount = viewedCount;
  global.requestCodexLeave = requestCodexLeave;
  global.flushPendingCodexMail = flushPendingCodexMail;
})(typeof window !== "undefined" ? window : globalThis);
