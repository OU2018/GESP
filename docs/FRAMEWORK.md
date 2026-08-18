# GESP 训练站 · 功能框架文档（模块化）

> 目标：把当前静态站拆成**可复用模块**，便于下一阶段  
> 1）GESP 题库「只增不改核心」  
> 2）填入 **CSP-J 题库**  
> 3）对接**新宠物系统**（可替换 `system/pet*`）

版本基准：v1.10.16+

---

## 1. 架构总览

```
index.html          壳层：视图容器、脚本顺序
config.js           全局配置（版本、姓名映射、默认设置）
script.js           应用核心：数据、做题流、结算、设置、首页
style.css           全局样式

banks/              题库插件（只注册数据，不碰业务）
system/             可插拔子系统（宠物 / 邮件 / 词条 / 激活码 / 日志）
docs/               框架与题库文档
```

原则：
- **题库 = 数据插件**：`window.GESP_BANKS[id] = { ... }`
- **系统 = 可选脚本**：读写 `global.data`，不依赖具体题库
- **script.js**：localStorage、刷题状态机、通用 UI

---

## 2. 数据层

| 字段 | 用途 |
|------|------|
| `schemaVersion` | 存档版本 |
| `history` / `wrongBook` / `mastery` / `questionStats` | 刷题 |
| `totalXp` / `bytes`/`kb`/`mb` | 经济 |
| `petSystem` | 宠物（下阶段可 `petSystem.version` 迁移） |
| `mail` / `questItems` / `codex` | 叙事 |
| `unlocks` / `redeemedCodes` | 激活码 |

迁移时必须保留子系统字段，禁止只建空对象覆盖。

---

## 3. 题库契约

见 `docs/BANK_FORMAT.md`。

GESP 约定：**只新增 banks 文件与下拉项**，不在题库里改引擎。

CSP-J：新建 `banks/cspj-*.js`；旧基础库可隐藏选项而非删文件。

---

## 4. 做题核心可复用

`buildQuizList` / `startQuiz` / 答题反馈 / `finishQuiz` / 错题本 / 竞速  

建议下阶段将结算公式抽到 `system/economy.js`，宠物订阅 `onPracticeSettled`。

---

## 5. 宠物边界（可整包替换）

- 配置：`pet-data.js`　运行时：`pet.js`
- 首页依赖：`getPetStage` / `formatWallet` / `normalizeWallet`
- **循环锦鲤**：`unique` + `trait: const`，约 1% 孵化，全局一只，无闪光，升阶提升稀有度与倍率，养成成本数倍

---

## 6. 下一阶段清单

- [ ] 冻结题库与做题 API
- [ ] 接入 CSP-J 题库
- [ ] `system/pet-v2` 替换并迁移存档
- [ ] `schemaVersion++` 与回归（邮件、激活码、旧宠）

## 7. 非目标

无后端判题、无强制 SPA 框架，保持 GitHub Pages 可静态部署。
