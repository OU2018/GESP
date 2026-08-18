# 题库文件格式说明（用于提示词生成）

每个题库是一个独立 JS 文件，放在 `banks/` 目录，通过 `window.GESP_BANKS` 注册。

## 最小模板

```js
(function () {
  const Q = [
    {
      id: 3001,                    // 唯一数字 ID（建议分题库号段）
      type: "choice",              // "choice" | "judge" | "fill"
      category: "output",          // 分类，用于模式筛选
      difficulty: 3,               // 3 基础 · 4 中等 · 5 易错/复合
      knowledgePoint: "知识点名",  // 用于去重与错题标签
      question: `题干，可用多行`,
      options: ["A选项", "B选项", "C选项", "D选项"],  // choice/judge 必填
      answer: 0,                   // choice/judge：正确选项下标（从 0 开始）
      explanation: "解析文字"
      // needsString: true         // 可选：依赖 char[]/%s 时标记
    },
    {
      id: 3002,
      type: "fill",
      category: "fill",
      difficulty: 5,
      knowledgePoint: "printf 输出",
      question: `printf("%d", 3);\n\n输出是？`,
      answer: "3",                 // fill：标准答案字符串
      explanation: "直接输出 3。"
    },
    {
      id: 3003,
      type: "judge",
      category: "branch",
      difficulty: 4,
      knowledgePoint: "if 真假",
      question: `在 C++ 中，if (0) 条件为假。`,
      options: ["正确", "错误"],
      answer: 0,                   // 0=正确，1=错误
      explanation: "0 视为假。"
    }
  ];

  window.GESP_BANKS = window.GESP_BANKS || {};
  window.GESP_BANKS["your-bank-id"] = {
    id: "your-bank-id",
    name: "显示名称",
    exam: "GESP C++ 一级",
    description: "一句话说明",
    staticQuestions: Q,
    settings: {
      allowFill: true,       // 是否允许填空题模式
      allowDynamic: false    // 是否使用 script.js 动态出题（一般新库写 false）
    },
    modes: [
      { id: "mixed", label: "综合训练" },
      { id: "output", label: "某分类" },  // id 需与题目 category 或 type 对应
      { id: "judge", label: "判断题" }
    ]
  };
})();
```

## 字段约定

| 字段 | 说明 |
|------|------|
| `type` | `choice` 四选一；`judge` 对错（options 固定「正确」「错误」）；`fill` 填空 |
| `category` | 自定义字符串，供模式筛选（如 output / branch / loop） |
| `difficulty` | **3** 基础，**4** 中等，**5** 真五星（空格、精度、复合易错） |
| `answer` | 选择题为选项下标；填空为字符串（不要多余空格，除非空格本身是考点） |
| `question` | 用模板字符串；换行写 `\n`；格式符空位用 `%___` |

## 模式筛选规则（script.js）

- `mixed`：全库题目  
- `judge`：`type === "judge"`  
- 其他 mode id：优先匹配 `category === modeId`  

## 接入步骤

1. 新建 `banks/xxx.js`，按上面注册  
2. 在 `index.html` 增加：`<script src="banks/xxx.js"></script>`  
3. 刷新页面，题库下拉与 Esc 菜单会自动出现  

## 生成提示词示例

```
请按 GESP C++ 一级考纲，生成「xxx」专项题库 JS。
格式必须符合 banks/BANK_FORMAT.md：
- 仅 choice / judge（或需要时 fill）
- 每题含 id, type, category, difficulty(3-5), knowledgePoint, question, options, answer, explanation
- 五星题要有易错点（空格、%.0f、整除、贯穿等）
- 最后注册到 window.GESP_BANKS["xxx"]
- 不要 Markdown，只要可运行的 JS 文件内容
共 30 题。
```
