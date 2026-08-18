# 题库格式说明（GESP 增库专用）

> 后续 GESP **以增加新题库为主**，不做功能大改。大改见 `FRAMEWORK.md`。

## 注册

```js
global.GESP_BANKS["your-bank"] = {
  id: "your-bank",
  name: "展示名称",
  shortName: "短名",
  description: "...",
  staticQuestions: [ /* ... */ ],
  hasFill: false,
  hasDynamic: false,
  requiresUnlock: null,
  shuffleAlways: false
};
```

`index.html`：引入脚本 + 下拉 `option`。

## 题目字段

`id`, `type`(`choice`|`judge`|`fill`), `difficulty`, `knowledgePoint`,
`question`, `options`, `answer`, `explanation`

- 判断题 options：`["正确","错误"]`，answer 为下标
- 填空题 answer 为字符串
- 选项勿重复；题库内勿操作 DOM / saveData

## 现有库

printf-scanf · control-flow · data-ops · computer-basics · real-exam · eval-mode

## 自检

管理面板 → 题库自检。增库后 bump 资源 `?v=`。

| gesp2-ascii-cast | GESP二级 ASCII与类型转换 |
