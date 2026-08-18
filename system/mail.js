/**
 * system/mail.js — 邮件投递 / 附件领取 / 任务道具交付 / 红点
 */
(function (global) {
  "use strict";

  const TEMPLATES = () => ((global.MAIL_DATA && global.MAIL_DATA.MAIL_TEMPLATES) || []);
  const QUEST_ITEMS = () => ((global.MAIL_DATA && global.MAIL_DATA.QUEST_ITEMS) || {});

  function ensureMail() {
    const d = global.data;
    if (!d) return null;
    if (!d.mail) d.mail = { delivered: {}, inbox: [], lastWeekly: {}, claimedAttach: {}, deliveredQuest: {} };
    if (!d.mail.delivered) d.mail.delivered = {};
    if (!Array.isArray(d.mail.inbox)) d.mail.inbox = [];
    if (!d.mail.lastWeekly) d.mail.lastWeekly = {};
    if (!d.mail.claimedAttach) d.mail.claimedAttach = {};
    if (!d.mail.deliveredQuest) d.mail.deliveredQuest = {};
    if (!d.questItems) d.questItems = {};
    return d.mail;
  }

  function pad2(n) { return String(n).padStart(2, "0"); }

  function todayParts(now) {
    now = now || new Date();
    return {
      y: now.getFullYear(),
      m: pad2(now.getMonth() + 1),
      d: pad2(now.getDate()),
      monthDay: pad2(now.getMonth() + 1) + "-" + pad2(now.getDate()),
      date: now.getFullYear() + "-" + pad2(now.getMonth() + 1) + "-" + pad2(now.getDate()),
      weekday: now.getDay(),
      weekKey: (function () {
        const t = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const day = t.getDay() || 7;
        t.setDate(t.getDate() + 4 - day);
        const ys = new Date(t.getFullYear(), 0, 1);
        const w = Math.ceil((((t - ys) / 86400000) + 1) / 7);
        return t.getFullYear() + "-W" + w;
      })()
    };
  }

  function getUserName() {
    if (typeof global.getDisplayName === "function") return global.getDisplayName();
    if (global.data && global.data.userName) return String(global.data.userName).trim();
    return "同学";
  }

  function getLevel() {
    if (typeof global.getPlayerLevelInfo === "function") return global.getPlayerLevelInfo().level || 1;
    return 1;
  }

  function matchTriggers(tpl, ctx) {
    const t = tpl.triggers || {};
    if (t.always) return true;
    if (t.firstOpen && !ctx.isFirstOpen) return false;
    if (t.userNames && t.userNames.length) {
      if (t.userNames.indexOf(ctx.name) < 0) return false;
    }
    if (t.userNameIncludes && t.userNameIncludes.length) {
      if (!t.userNameIncludes.some(s => ctx.name.indexOf(s) >= 0)) return false;
    }
    if (t.monthDay && t.monthDay !== ctx.monthDay) return false;
    if (t.date && t.date !== ctx.date) return false;
    if (t.dateRange) {
      if (ctx.date < t.dateRange.from || ctx.date > t.dateRange.to) return false;
    }
    if (t.weekday != null && t.weekday !== ctx.weekday) return false;
    if (t.minLevel != null && ctx.level < t.minLevel) return false;
    if (t.maxLevel != null && ctx.level > t.maxLevel) return false;
    if (t.minSessions != null && ctx.sessions < t.minSessions) return false;
    if (t.minPerfect != null && ctx.perfectSessions < t.minPerfect) return false;
    if (t.minNails != null && ctx.nails < t.minNails) return false;
    if (t.requireQuestItems && t.requireQuestItems.length) {
      for (let i = 0; i < t.requireQuestItems.length; i++) {
        const r = t.requireQuestItems[i];
        if (getQuestItemCount(r.itemId) < (r.amount || 1)) return false;
      }
    }
    if (t.requireDelivered && t.requireDelivered.length) {
      const mail = ensureMail();
      for (let i = 0; i < t.requireDelivered.length; i++) {
        if (!mail.delivered[t.requireDelivered[i]]) return false;
      }
    }
    if (t.firstOpen && !ctx.isFirstOpen) return false;
    const keys = Object.keys(t);
    if (!keys.length) return false;
    return true;
  }

  function fillBody(text, ctx) {
    return String(text || "")
      .replace(/\{\{name\}\}/g, ctx.name)
      .replace(/\{\{date\}\}/g, ctx.date)
      .replace(/\{\{level\}\}/g, String(ctx.level));
  }

  function getQuestItemCount(itemId) {
    const d = global.data;
    if (!d || !d.questItems) return 0;
    return d.questItems[itemId] || 0;
  }

  function addQuestItem(itemId, n) {
    const d = global.data;
    if (!d) return;
    if (!d.questItems) d.questItems = {};
    d.questItems[itemId] = (d.questItems[itemId] || 0) + (n || 1);
  }

  function takeQuestItem(itemId, n) {
    n = n || 1;
    const have = getQuestItemCount(itemId);
    if (have < n) return false;
    global.data.questItems[itemId] = have - n;
    return true;
  }

  function describeAttach(a) {
    if (!a) return "";
    if (a.type === "byte") return "+" + a.amount + " Byte";
    if (a.type === "kb") return "+" + a.amount + " KB";
    if (a.type === "mb") return "+" + a.amount + " MB";
    if (a.type === "xp") return "+" + a.amount + " XP";
    if (a.type === "egg") return "蛋×" + (a.amount || 1) + "(" + (a.rarity || "N") + ")";
    if (a.type === "stamina") return "时间片+" + a.amount;
    if (a.type === "item") return "道具 " + (a.itemId || "?") + "×" + (a.amount || 1);
    if (a.type === "questItem") {
      const meta = QUEST_ITEMS()[a.itemId] || {};
      return (meta.emoji || "📦") + (meta.name || a.itemId) + "×" + (a.amount || 1);
    }
    if (a.type === "pet") return "进程 " + (a.speciesId || "?");
    return a.type;
  }

  /** 发放附件（不负责 save） */
  function grantAttachment(a) {
    const d = global.data;
    if (!d || !a) return false;
    const n = a.amount != null ? a.amount : 1;
    if (a.type === "byte") d.bytes = (d.bytes || 0) + n;
    else if (a.type === "kb") d.kb = (d.kb || 0) + n;
    else if (a.type === "mb") d.mb = (d.mb || 0) + n;
    else if (a.type === "xp") d.totalXp = (d.totalXp || 0) + n;
    else if (a.type === "egg") {
      if (typeof global.addEgg === "function") global.addEgg(a.rarity || "N", n);
      else {
        const ps = d.petSystem;
        if (ps) {
          if (!ps.eggs) ps.eggs = { N: 0, R: 0, SR: 0, SSR: 0 };
          const r = a.rarity || "N";
          ps.eggs[r] = (ps.eggs[r] || 0) + n;
        }
      }
    } else if (a.type === "stamina") {
      try {
        if (typeof global.ensurePetSystem === "function") global.ensurePetSystem();
        const ps = d.petSystem;
        if (ps && ps.pets && ps.pets.length) {
          let pet = ps.pets.find(p => p.uid === ps.activePetId) || ps.pets[0];
          if (pet) {
            pet.maxStamina = pet.maxStamina || 30;
            pet.stamina = Math.min(pet.maxStamina, (pet.stamina || 0) + n);
          }
        }
      } catch (e) {}
    } else if (a.type === "item") {
      const ps = d.petSystem;
      if (ps) {
        if (!ps.items) ps.items = {};
        ps.items[a.itemId] = (ps.items[a.itemId] || 0) + n;
      }
    } else if (a.type === "questItem") {
      addQuestItem(a.itemId, n);
    } else if (a.type === "pet") {
      try {
        if (typeof global.createPetInstance === "function" && typeof global.ensurePetSystem === "function") {
          // may not be exported - skip soft
        }
      } catch (e) {}
    } else return false;
    return true;
  }

  function grantAttachmentList(list) {
    const got = [];
    (list || []).forEach(a => {
      if (grantAttachment(a)) got.push(describeAttach(a));
    });
    return got;
  }

  function deliverMail(tpl, ctx) {
    const mail = ensureMail();
    if (!mail) return false;
    if (tpl.once !== false && mail.delivered[tpl.id]) return false;
    if (tpl.triggers && tpl.triggers.weekly) {
      const wk = mail.lastWeekly[tpl.id];
      if (wk === ctx.weekKey) return false;
      mail.lastWeekly[tpl.id] = ctx.weekKey;
    }
    mail.delivered[tpl.id] = Date.now();
    mail.inbox.unshift({
      id: tpl.id + "_" + Date.now(),
      templateId: tpl.id,
      from: tpl.from || "系统",
      title: fillBody(tpl.title, ctx),
      body: fillBody(tpl.body, ctx),
      at: Date.now(),
      read: false,
      attachments: tpl.attachments ? JSON.parse(JSON.stringify(tpl.attachments)) : [],
      requireDelivery: tpl.requireDelivery ? JSON.parse(JSON.stringify(tpl.requireDelivery)) : [],
      afterDeliverAttachments: tpl.afterDeliverAttachments ? JSON.parse(JSON.stringify(tpl.afterDeliverAttachments)) : [],
      attachClaimed: !!(mail.claimedAttach && (mail.claimedAttach["tpl:"+tpl.id])),
      questDone: !!(mail.deliveredQuest && mail.deliveredQuest[tpl.id]),
      storyNote: tpl.storyNote || ""
    });
    if (mail.inbox.length > 60) mail.inbox = mail.inbox.slice(0, 60);
    if (typeof global.saveData === "function") global.saveData(global.data);
    return true;
  }

  function checkAndDeliverMails() {
    const d = global.data;
    if (!d) return [];
    ensureMail();
    const parts = todayParts();
    const nails = getQuestItemCount("qi_timeline_nail");
    const ctx = {
      name: getUserName(),
      level: getLevel(),
      isFirstOpen: !d.mail || !d.mail._openedOnce,
      monthDay: parts.monthDay,
      date: parts.date,
      weekday: parts.weekday,
      weekKey: parts.weekKey,
      sessions: (d.stats && d.stats.totalSessions) || 0,
      perfectSessions: (d.stats && d.stats.perfectSessions) || 0,
      nails: nails
    };
    const newly = [];
    TEMPLATES().forEach(tpl => {
      try {
        if (!matchTriggers(tpl, ctx)) return;
        if (deliverMail(tpl, ctx)) newly.push(tpl.id);
      } catch (e) {}
    });
    d.mail._openedOnce = true;
    if (typeof global.saveData === "function") global.saveData(d);
    return newly;
  }

  function claimMailAttachments(mailId) {
    const mail = ensureMail();
    const item = mail.inbox.find(m => m.id === mailId);
    if (!item) return { ok: false, msg: "邮件不存在" };
    if (!mail.claimedAttach) mail.claimedAttach = {};
    if (item.attachClaimed || mail.claimedAttach[item.id] ||
        (item.templateId && mail.claimedAttach["tpl:"+item.templateId])) {
      item.attachClaimed = true;
      item.read = true;
      return { ok: false, msg: "附件已领取" };
    }
    if (!item.attachments || !item.attachments.length) return { ok: false, msg: "无附件" };
    const got = grantAttachmentList(item.attachments);
    item.attachClaimed = true;
    item.read = true;
    if (!mail.claimedAttach) mail.claimedAttach = {};
    // 按实例 id 与模板 id 双记，防止迁移/重发后重复领
    mail.claimedAttach[item.id] = Date.now();
    if (item.templateId) mail.claimedAttach["tpl:"+item.templateId] = Date.now();
    if (typeof global.saveData === "function") global.saveData(global.data);
    updateMailBadges();
    try { if (typeof global.updateHome === "function") global.updateHome(); } catch (e) {}
    return { ok: true, got };
  }

  function deliverQuestForMail(mailId) {
    const mail = ensureMail();
    const item = mail.inbox.find(m => m.id === mailId);
    if (!item) return { ok: false, msg: "邮件不存在" };
    if (item.questDone) return { ok: false, msg: "已交付过" };
    const req = item.requireDelivery || [];
    if (!req.length) return { ok: false, msg: "本信无需交付" };
    for (let i = 0; i < req.length; i++) {
      const r = req[i];
      if (getQuestItemCount(r.itemId) < (r.amount || 1)) {
        const meta = QUEST_ITEMS()[r.itemId] || {};
        return { ok: false, msg: "缺少任务道具：" + (meta.name || r.itemId) };
      }
    }
    req.forEach(r => takeQuestItem(r.itemId, r.amount || 1));
    const got = grantAttachmentList(item.afterDeliverAttachments || []);
    item.questDone = true;
    item.read = true;
    mail.deliveredQuest[item.templateId] = Date.now();
    if (typeof global.saveData === "function") global.saveData(global.data);
    updateMailBadges();
    try { if (typeof global.updateHome === "function") global.updateHome(); } catch (e) {}
    return { ok: true, got, story: item.storyNote || "" };
  }

  function getUnreadCount() {
    const mail = ensureMail();
    if (!mail) return 0;
    return (mail.inbox || []).filter(m => {
      if (!m.read) return true;
      if (m.attachments && m.attachments.length && !m.attachClaimed) return true;
      if (m.requireDelivery && m.requireDelivery.length && !m.questDone) return true;
      return false;
    }).length;
  }

  function markRead(id) {
    const mail = ensureMail();
    if (!mail) return;
    const item = mail.inbox.find(m => m.id === id);
    if (item) item.read = true;
    if (typeof global.saveData === "function") global.saveData(global.data);
    updateMailBadges();
  }

  function updateMailBadges() {
    const n = getUnreadCount();
    document.querySelectorAll("[data-mail-badge]").forEach(el => {
      if (n > 0) {
        el.textContent = n > 99 ? "99+" : String(n);
        el.style.display = "inline-flex";
      } else {
        el.textContent = "";
        el.style.display = "none";
      }
    });
  }

  function escape(s) {
    return String(s || "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function renderQuestBag() {
    const d = global.data;
    if (!d || !d.questItems) return "<div class='setting-hint'>暂无任务道具</div>";
    const ids = Object.keys(d.questItems).filter(k => d.questItems[k] > 0);
    if (!ids.length) return "<div class='setting-hint'>暂无任务道具</div>";
    return ids.map(id => {
      const meta = QUEST_ITEMS()[id] || { name: id, emoji: "📦", desc: "" };
      return `<div class="quest-item-row"><span>${meta.emoji} <strong>${escape(meta.name)}</strong> ×${d.questItems[id]}</span>
        <div class="setting-hint">${escape(meta.desc || "")}</div></div>`;
    }).join("");
  }

  function renderMailPage() {
    checkAndDeliverMails();
    updateMailBadges();
    const host = document.getElementById("mail-list");
    if (!host) return;
    const mail = ensureMail();
    const list = (mail && mail.inbox) || [];

    let html = `<div class="quest-bag"><div class="ov-title">任务道具袋</div>${renderQuestBag()}</div>`;

    if (!list.length) {
      host.innerHTML = html + `<div class="setting-hint">收件箱是空的。升级、日期与任务链会寄来新信。</div>`;
      return;
    }

    host.innerHTML = html;
    list.forEach(m => {
      const needAction = (m.attachments && m.attachments.length && !m.attachClaimed) ||
        (m.requireDelivery && m.requireDelivery.length && !m.questDone);
      const card = document.createElement("div");
      card.className = "mail-card" + ((m.read && !needAction) ? "" : " unread");
      const attStr = (m.attachments || []).map(describeAttach).join(" · ");
      const reqStr = (m.requireDelivery || []).map(r => {
        const meta = QUEST_ITEMS()[r.itemId] || {};
        return (meta.name || r.itemId) + "×" + (r.amount || 1);
      }).join("、");

      card.innerHTML = `
        <div class="mail-card-top">
          ${needAction || !m.read ? '<span class="red-dot mail-item-dot"></span>' : ""}
          <strong>${escape(m.title)}</strong>
        </div>
        <div class="mail-meta">来自 ${escape(m.from)} · ${new Date(m.at).toLocaleString()}</div>
        <div class="mail-body" style="display:none; white-space:pre-wrap;"></div>
        <div class="mail-actions" style="display:none; margin-top:8px;"></div>`;
      const body = card.querySelector(".mail-body");
      body.textContent = m.body;
      const actions = card.querySelector(".mail-actions");

      if (attStr) {
        actions.innerHTML += `<div class="setting-hint">附件：${escape(attStr)} ${m.attachClaimed ? "（已领）" : ""}</div>`;
        if (!m.attachClaimed) {
          actions.innerHTML += `<button type="button" class="btn-primary btn-sm btn-claim-att">领取附件</button> `;
        }
      }
      if (reqStr) {
        actions.innerHTML += `<div class="setting-hint">需交付：${escape(reqStr)} ${m.questDone ? "（已完成）" : ""}</div>`;
        if (!m.questDone) {
          actions.innerHTML += `<button type="button" class="btn-secondary btn-sm btn-deliver-q">交付任务道具</button>`;
        }
      }

      card.addEventListener("click", (ev) => {
        if (ev.target.tagName === "BUTTON") return;
        const open = body.style.display !== "none";
        body.style.display = open ? "none" : "block";
        actions.style.display = open ? "none" : "block";
        if (!m.read) markRead(m.id);
      });

      const claimBtn = actions.querySelector(".btn-claim-att");
      if (claimBtn) {
        claimBtn.onclick = (e) => {
          e.stopPropagation();
          const r = claimMailAttachments(m.id);
          if (r.ok) {
            if (typeof global.uiToast === "function") global.uiToast("已领取：" + (r.got || []).join("、"), "success");
            else if (typeof global.petToast === "function") global.petToast("已领取附件", "success");
          } else {
            if (typeof global.uiToast === "function") global.uiToast(r.msg || "失败", "error");
          }
          renderMailPage();
        };
      }
      const delBtn = actions.querySelector(".btn-deliver-q");
      if (delBtn) {
        delBtn.onclick = (e) => {
          e.stopPropagation();
          const r = deliverQuestForMail(m.id);
          if (r.ok) {
            let msg = "交付成功";
            if (r.got && r.got.length) msg += "：" + r.got.join("、");
            if (typeof global.uiToast === "function") global.uiToast(msg, "success");
            if (r.story && typeof global.uiToast === "function") {
              setTimeout(() => global.uiToast("档案注记：" + r.story, "success"), 600);
            }
          } else {
            if (typeof global.uiToast === "function") global.uiToast(r.msg || "失败", "error");
          }
          renderMailPage();
        };
      }

      host.appendChild(card);
    });
  }

  function openMailView() {
    try { checkAndDeliverMails(); } catch (e) {}
    const view = document.getElementById("mail-view");
    if (!view) {
      if (typeof global.uiToast === "function") global.uiToast("邮箱页面未找到，请强制刷新", "error");
      else alert("邮箱页面未找到，请强制刷新（Ctrl+F5）");
      return false;
    }
    if (typeof global.showView === "function") global.showView("mail-view");
    else {
      document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
      view.classList.add("active");
    }
    renderMailPage();
    updateMailBadges();
    return true;
  }

  function initMailSystem() {
    try {
      checkAndDeliverMails();
      updateMailBadges();
    } catch (e) {}
  }

  global.checkAndDeliverMails = checkAndDeliverMails;
  global.updateMailBadges = updateMailBadges;
  global.renderMailPage = renderMailPage;
  global.openMailView = openMailView;
  global.initMailSystem = initMailSystem;
  global.getUnreadMailCount = getUnreadCount;
  global.claimMailAttachments = claimMailAttachments;
  global.deliverQuestForMail = deliverQuestForMail;
  global.getQuestItemCount = getQuestItemCount;
})(typeof window !== "undefined" ? window : globalThis);
