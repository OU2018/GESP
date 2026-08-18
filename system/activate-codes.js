/**
 * system/activate-codes.js — 激活码（混淆指令执行器）
 * 码面为数字与大小写字母，内部映射到动作；用过的码记入 redeemedCodes
 */
(function (global) {
  "use strict";

  /**
   * 预置激活码（可继续追加）
   * 评测模式：K8mQ2pLx9Rn4wY
   * 校准符×3：P3tY7vH1nB6sZ
   * double蛋×1：E9sS5rR2uD0cA
   * Byte 包：B4yT6eX8uM2kQ
   */
  const CODE_ACTIONS = {
    "K8mQ2pLx9Rn4wY": { id: "unlock_eval", label: "解锁评测模式题库" },
    "P3tY7vH1nB6sZ": { id: "grant_permit", n: 3, label: "时序校准符×3" },
    "E9sS5rR2uD0cA": { id: "grant_egg_ssr", n: 1, label: "double 蛋×1" },
    "B4yT6eX8uM2kQ": { id: "grant_byte", n: 512, label: "Byte +512（可进位）" },
    "M1aI0lH5dQ9eN": { id: "unlock_mail_pack", label: "解锁隐藏致谢邮件包" }
  };

  function normalizeCode(s) {
    return String(s || "").replace(/\s+/g, "").trim();
  }

  function ensureUnlocks() {
    const d = global.data;
    if (!d) return null;
    if (!d.unlocks) d.unlocks = {};
    if (!d.redeemedCodes) d.redeemedCodes = {};
    return d;
  }

  function isEvalUnlocked() {
    try { return !!(global.data && global.data.unlocks && global.data.unlocks.evalMode); } catch (e) { return false; }
  }

  function runAction(action) {
    const d = ensureUnlocks();
    if (!d) return { ok: false, msg: "数据未就绪" };
    const id = action.id;
    if (id === "unlock_eval") {
      d.unlocks.evalMode = true;
      return { ok: true, msg: "已解锁「评测模式」题库（固定题、每次打乱顺序）" };
    }
    if (id === "grant_permit") {
      if (!d.questItems) d.questItems = {};
      const n = action.n || 1;
      d.questItems.qi_sync_permit = (d.questItems.qi_sync_permit || 0) + n;
      return { ok: true, msg: "获得时序校准符 ×" + n };
    }
    if (id === "grant_egg_ssr") {
      const n = action.n || 1;
      if (typeof global.addEgg === "function") global.addEgg("SSR", n);
      else {
        if (typeof global.ensurePetSystem === "function") global.ensurePetSystem();
        if (d.petSystem) {
          if (!d.petSystem.eggs) d.petSystem.eggs = { N: 0, R: 0, SR: 0, SSR: 0 };
          d.petSystem.eggs.SSR = (d.petSystem.eggs.SSR || 0) + n;
        }
      }
      return { ok: true, msg: "获得 double 蛋 ×" + n };
    }
    if (id === "grant_byte") {
      d.bytes = (d.bytes || 0) + (action.n || 0);
      if (typeof global.normalizeWallet === "function") global.normalizeWallet();
      return { ok: true, msg: "获得 Byte +" + (action.n || 0) + "（已尝试进位）" };
    }
    if (id === "unlock_mail_pack") {
      d.unlocks.mailPackThanks = true;
      try {
        if (typeof global.forceMailById === "function") global.forceMailById("activate_thanks");
      } catch (e) {}
      return { ok: true, msg: "已触发隐藏邮件（若模板存在）" };
    }
    return { ok: false, msg: "未知指令" };
  }

  function redeemActivationCode(raw) {
    const code = normalizeCode(raw);
    if (!code) return { ok: false, msg: "请输入激活码" };
    const d = ensureUnlocks();
    if (!d) return { ok: false, msg: "数据未就绪" };
    if (d.redeemedCodes[code]) return { ok: false, msg: "该激活码已使用" };
    const action = CODE_ACTIONS[code];
    if (!action) return { ok: false, msg: "激活码无效" };
    const r = runAction(action);
    if (!r.ok) return r;
    d.redeemedCodes[code] = { at: Date.now(), id: action.id };
    if (typeof global.saveData === "function") global.saveData(d);
    try { if (typeof global.refreshBankSelect === "function") global.refreshBankSelect(); } catch (e) {}
    try { if (typeof global.updateHome === "function") global.updateHome(); } catch (e) {}
    return { ok: true, msg: r.msg || ("已生效：" + (action.label || action.id)) };
  }

  global.redeemActivationCode = redeemActivationCode;
  global.isEvalUnlocked = isEvalUnlocked;
  global.CODE_ACTIONS_HINT = Object.keys(CODE_ACTIONS).length; // 不暴露明文列表到 UI
})(typeof window !== "undefined" ? window : globalThis);
