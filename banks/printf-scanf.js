/**
 * 题库元数据：printf / scanf
 * 静态题目仍在 script.js 的 STATIC_QUESTIONS 中（历史兼容）
 * 本文件只注册题库信息与模式，便于和 control-flow 并列管理
 */
(function () {
  window.GESP_BANKS = window.GESP_BANKS || {};
  window.GESP_BANKS["printf-scanf"] = {
    id: "printf-scanf",
    name: "printf / scanf 专项",
    exam: "GESP C++ 一级",
    description: "格式化输入输出专项训练",
    // staticQuestions 由 script.js 挂载
    staticQuestions: null,
    settings: {
      allowFill: true,
      allowDynamic: true,
      enableString: false,
      defaultComplexity: 2
    },
    modes: [
      { id: "mixed", label: "综合训练" },
      { id: "fill", label: "填空专项" },
      { id: "output", label: "输出判断" },
      { id: "format", label: "格式符" },
      { id: "scanf", label: "scanf专项" }
    ]
  };
})();
