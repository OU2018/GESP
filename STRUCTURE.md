# 项目架构说明

纯静态网页，双击 `index.html` 即可运行。无构建工具、无后端。

## 目录结构

```
gesp-printf-scanf/
├── index.html              # 页面骨架（视图容器）
├── style.css               # 全局样式
├── config.js               # 用户/机构配置（姓名、祝福概率等）
├── script.js               # 核心：存储、出题、做题流程、设置、UI 调度
│
├── banks/                  # 题库（可扩展）
│   ├── printf-scanf.js     # 题库元数据
│   └── control-flow.js     # 分支 / switch / 循环 题目与元数据
│
└── system/                 # 独立子系统（与刷题核心解耦）
    ├── pet.js              # 宠物成长、进化路线、进门祝福
    └── achievements.js     # 成就解锁、Toast、额外 XP
```

## 脚本加载顺序

```
config.js
→ banks/*.js
→ system/pet.js
→ system/achievements.js
→ script.js
```

`system/*` 运行时通过 `window.data` / `window.saveData` 读写进度；
`script.js` 末尾挂上 `getUserName`、`updateHome` 等桥接。

## 职责划分

| 模块 | 职责 |
|------|------|
| **config.js** | 默认姓名、祝福概率、默认题库 |
| **banks/** | 题目数据、题库模式、题库级 settings |
| **system/pet.js** | 宠物阶段、路线、宠物页、祝福 |
| **system/achievements.js** | 成就列表、解锁检查、成就页、Toast |
| **script.js** | 版本化存储、出题答题、设置、首页/结果/错题/历史 |

## 扩展建议

1. **新题库**：`banks/` 新建文件 → 注册 `GESP_BANKS` → 首页加按钮  
2. **改宠物**：只改 `system/pet.js`  
3. **改成就**：只改 `system/achievements.js`  
4. 刷题核心逻辑留在 `script.js`，不要把出题逻辑塞进 system  
