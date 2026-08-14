# GESP C++ 一级专项训练

轻量化刷题网页：printf/scanf、分支循环、计算机基础、变量与运算。

## 本地使用

直接用浏览器打开 `index.html`，或：

```bash
python -m http.server 8080
# 访问 http://localhost:8080
```

## 目录

```
├── index.html
├── style.css / script.js / config.js
├── banks/          # 题库
├── system/         # 宠物、成就
└── STRUCTURE.md    # 架构说明
```

## 部署到 GitHub Pages

1. 在 GitHub 新建空仓库（例如 `gesp-printf-scanf`）
2. 本机执行：

```bash
cd gesp-printf-scanf
git init
git add .
git commit -m "Initial commit: GESP training site"
git branch -M main
git remote add origin https://github.com/你的用户名/gesp-printf-scanf.git
git push -u origin main
```

3. 打开仓库 **Settings → Pages**
4. **Source** 选 `Deploy from a branch`
5. Branch 选 `main`，文件夹选 `/ (root)`，保存
6. 约 1 分钟后访问：

`https://你的用户名.github.io/gesp-printf-scanf/`

> 若仓库名不是项目名，链接里的路径要与仓库名一致。

## 配置姓名

编辑 `config.js` 中的 `userName`，或在网页「设置」里填写。
