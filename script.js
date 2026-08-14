/* ========== 静态题库（规范下划线 + 格式符选项只写字母） ========== */
const STATIC_QUESTIONS = [
  // —— 输出结果判断 ——
  {
    id: 1, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf %d",
    question: `int a = 10;\nprintf("%d", a);\n\n这段代码的输出是？`,
    options: ["a=10", "10", "%d", "编译错误"],
    answer: 1,
    explanation: "%d 用于输出整数。变量 a 的值是 10，所以直接输出 10。"
  },
  {
    id: 2, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 文本+%d",
    question: `int age = 12;\nprintf("age=%d", age);\n\n输出结果是？`,
    options: ["age=12", "12", "age=%d", "age="],
    answer: 0,
    explanation: "printf 会输出引号内的普通文本，%d 被替换为 age 的值 12。"
  },
  {
    id: 3, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf \\n",
    question: `printf("Hello\\nWorld");\n\n输出结果是？（\\n 表示换行）`,
    options: ["Hello\\nWorld", "Hello World", "Hello\nWorld", "编译错误"],
    answer: 2,
    explanation: "\\n 是换行符，所以 Hello 后换行再输出 World。"
  },
  {
    id: 4, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 多变量",
    question: `int a = 3, b = 5;\nprintf("%d %d", a, b);\n\n输出是？`,
    options: ["3 5", "a b", "%d %d", "35"],
    answer: 0,
    explanation: "两个 %d 分别对应 a 和 b 的值，中间有空格。"
  },
  {
    id: 5, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf %c",
    question: `char ch = 'A';\nprintf("%c", ch);\n\n输出是？`,
    options: ["A", "65", "%c", "ch"],
    answer: 0,
    explanation: "%c 用于输出字符，ch 的值是字符 'A'。"
  },
  {
    id: 6, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf %s", needsString: true,
    question: `printf("%s", "GESP");\n\n输出是？`,
    options: ["GESP", "%s", "\"GESP\"", "编译错误"],
    answer: 0,
    explanation: "%s 用于输出字符串，直接输出 GESP。"
  },
  {
    id: 7, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf %f",
    question: `float score = 98.5;\nprintf("%.1f", score);\n\n输出是？`,
    options: ["98.5", "98", "%.1f", "98.50"],
    answer: 0,
    explanation: "%.1f 表示保留一位小数输出浮点数。"
  },
  {
    id: 8, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 顺序",
    question: `int a = 10, b = 20;\nprintf("%d%d", b, a);\n\n输出是？`,
    options: ["1020", "2010", "10 20", "20 10"],
    answer: 1,
    explanation: "参数顺序决定输出顺序：先 b=20，再 a=10，无空格。"
  },
  {
    id: 9, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 无空格",
    question: `printf("%d%d%d", 1, 2, 3);\n\n输出？`,
    options: ["123", "1 2 3", "1,2,3", "%d%d%d"],
    answer: 0,
    explanation: "格式串中没有空格，所以数字连在一起。"
  },
  {
    id: 10, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 转义 %%",
    question: `printf("%%%d", 3);\n\n输出是？`,
    options: ["%3", "%%3", "3", "%%d"],
    answer: 0,
    explanation: "%% 输出一个普通的百分号 %，然后 %d 输出 3，所以结果是 %3。"
  },
  {
    id: 11, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 转义",
    question: `printf("\\\\n");\n\n输出是？`,
    options: ["\\n", "换行", "\\\\n", "n"],
    answer: 0,
    explanation: "\\\\ 输出一个反斜杠，所以看到 \\n。"
  },
  {
    id: 12, type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 综合",
    question: `int a = 2, b = 3;\nprintf("%d + %d = %d", a, b, a + b);\n\n输出？`,
    options: ["2 + 3 = 5", "a + b = 5", "%d + %d = %d", "2+3=5"],
    answer: 0,
    explanation: "三个 %d 分别对应 a、b、a+b。"
  },

  // —— 格式符选择（选项只写字母，题目用 %___，几个字母就几个下划线） ——
  {
    id: 21, type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf %d",
    question: `int n = 5;\nprintf("n=%___", n);\n\n横线处应填什么？（只填字母部分）`,
    options: ["d", "f", "c", "s"],
    answer: 0,
    explanation: "n 是 int 类型，整数输出使用 %d，所以填 d。"
  },
  {
    id: 22, type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf %c",
    question: `char c = 'x';\nprintf("%___", c);\n\n应填？`,
    options: ["d", "f", "c", "s"],
    answer: 2,
    explanation: "c 是 char 类型，输出字符用 %c。"
  },
  {
    id: 23, type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf %s", needsString: true,
    question: `char name[] = "Tom";\nprintf("%___", name);\n\n应填？`,
    options: ["d", "c", "s", "f"],
    answer: 2,
    explanation: "name 是字符数组（字符串），输出用 %s。"
  },
  {
    id: 24, type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf %f",
    question: `double pi = 3.14;\nprintf("%___", pi);\n\n常用格式符字母是？`,
    options: ["d", "f", "c", "s"],
    answer: 1,
    explanation: "double / float 输出用 %f。"
  },
  {
    id: 25, type: "choice", category: "format", difficulty: 3, knowledgePoint: "scanf %d",
    question: `int age;\nscanf("%___", &age);\n\n应填？`,
    options: ["d", "f", "c", "s"],
    answer: 0,
    explanation: "age 是 int，输入整数用 %d。"
  },
  {
    id: 26, type: "choice", category: "format", difficulty: 3, knowledgePoint: "scanf %f",
    question: `float score;\nscanf("%___", &score);\n\n应填？`,
    options: ["d", "f", "c", "s"],
    answer: 1,
    explanation: "score 是 float，输入浮点数用 %f。"
  },
  {
    id: 27, type: "choice", category: "format", difficulty: 3, knowledgePoint: "scanf %c",
    question: `char ch;\nscanf("%___", &ch);\n\n读取一个字符应填？`,
    options: ["d", "s", "c", "f"],
    answer: 2,
    explanation: "读取单个字符用 %c。"
  },

  // —— scanf 与 & ——
  {
    id: 31, type: "choice", category: "scanf", difficulty: 3, knowledgePoint: "scanf &",
    question: `int age;\nscanf("%d", ______);\n\n横线处应填？`,
    options: ["age", "&age", "*age", "%age"],
    answer: 1,
    explanation: "scanf 需要变量的地址，所以用 &age。"
  },
  {
    id: 32, type: "choice", category: "scanf", difficulty: 3, knowledgePoint: "scanf 忘记&",
    question: `int a;\nscanf("%d", a);\n\n这段代码有什么问题？`,
    options: ["没有问题", "忘记取地址符 &", "格式符错误", "变量未初始化"],
    answer: 1,
    explanation: "scanf 的参数必须是地址，应写 &a，否则是错误的。"
  },
  {
    id: 33, type: "choice", category: "scanf", difficulty: 3, knowledgePoint: "scanf 多变量",
    question: `int a, b;\nscanf("%d%d", ______, ______);\n\n正确的是？`,
    options: ["a, b", "&a, &b", "a, &b", "&a, b"],
    answer: 1,
    explanation: "两个变量都需要取地址：&a, &b。"
  },

  {
    id: 34, type: "choice", category: "scanf", difficulty: 3, knowledgePoint: "scanf %s", needsString: true,
    question: `char str[20];\nscanf("%s", &str);\n\n这段代码？`,
    options: ["正确", "不需要 &，写 str 即可", "格式符错误", "数组太小"],
    answer: 1,
    explanation: "字符数组名本身就是地址，scanf(\"%s\", str); 即可，不必写 &str。"
  },
  {
    id: 35, type: "choice", category: "scanf", difficulty: 3, knowledgePoint: "类型匹配",
    question: `int n;\nscanf("%f", &n);\n\n问题是？`,
    options: ["没有问题", "格式符与类型不匹配", "缺少 &", "变量名错误"],
    answer: 1,
    explanation: "n 是 int，应使用 %d，不能用 %f。"
  },
  {
    id: 36, type: "choice", category: "scanf", difficulty: 3, knowledgePoint: "类型匹配",
    question: `float f;\nscanf("%d", &f);\n\n问题？`,
    options: ["正确", "格式符与类型不匹配", "需要 &f 已正确", "float 不能用 scanf"],
    answer: 1,
    explanation: "float 应使用 %f，%d 是给 int 的。"
  },
  {
    id: 37, type: "choice", category: "scanf", difficulty: 3, knowledgePoint: "参数数量",
    question: `int a, b;\nscanf("%d", &a, &b);\n\n问题？`,
    options: ["正确", "只读入一个，b 未读", "格式符太多", "编译错误"],
    answer: 1,
    explanation: "只有一个 %d，只会读入 a，b 保持原值（未定义）。"
  },

  // —— 找错 ——
  {
    id: 41, type: "choice", category: "error", difficulty: 3, knowledgePoint: "%c vs %s", needsString: true,
    question: `char c = 'A';\nprintf("%s", c);\n\n问题是？`,
    options: ["没有问题", "%s 需要字符串，不能直接用字符", "缺少 &", "应使用 %d"],
    answer: 1,
    explanation: "%s 期望的是字符串地址，传字符会导致错误。"
  },
  {
    id: 42, type: "choice", category: "error", difficulty: 4, knowledgePoint: "常见错误综合",
    question: `int x;\nscanf("%d", x);\nprintf("%d", x);\n\n主要问题？`,
    options: ["没有问题，可以正常运行", "scanf 参数应写 &x（缺少取地址符）", "printf 的格式符写错了", "变量名 x 不合法"],
    answer: 1,
    explanation: "主要错误是 scanf 少了 &。应写成 scanf(\"%d\", &x); 否则无法正确读入。"
  },
  {
    id: 43, type: "choice", category: "error", difficulty: 4, knowledgePoint: "类型不匹配综合", needsString: true,
    question: `char str[20] = "hi";\nprintf("%c", str);\n\n问题？`,
    options: ["正确输出 h", "%c 期望字符，传的是地址，行为未定义", "应用 %d", "编译一定报错"],
    answer: 1,
    explanation: "应使用 %s 输出字符串。"
  },

  // —— 填空题（静态） ——
  {
    id: 51, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 转义 %%",
    question: `printf("%%%d", 3);\n\n会输出什么？\n（直接填写输出结果）`,
    answer: "%3",
    explanation: "%% 输出一个普通百分号 %，%d 输出 3，所以整体输出 %3。"
  },
  {
    id: 52, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf %d",
    question: `int a = 7;\nprintf("%d", a);\n\n输出是？`,
    answer: "7",
    explanation: "%d 输出整数 7。"
  },
  {
    id: 53, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 文本+%d",
    question: `int n = 100;\nprintf("n=%d", n);\n\n输出是？`,
    answer: "n=100",
    explanation: "文本 n= 加上 %d 替换后的 100。"
  },
  {
    id: 54, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 转义",
    question: `printf("%%");\n\n输出是？`,
    answer: "%",
    explanation: "%% 专门用来输出一个普通的 % 字符。"
  },
  {
    id: 55, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 多变量",
    question: `int x = 1, y = 2;\nprintf("%d%d", x, y);\n\n输出是？`,
    answer: "12",
    explanation: "无空格，两个数字直接相连。"
  },
  {
    id: 56, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "scanf &",
    question: `int a;\nscanf("%d", ______);\n\n横线处应填什么？（填完整，如 &a）`,
    answer: "&a",
    explanation: "必须取地址，写成 &a。"
  },

  {
    id: 57, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf %.1f",
    question: `float f = 3.14159;\nprintf("%.2f", f);\n\n输出是？`,
    answer: "3.14",
    explanation: "%.2f 保留两位小数，四舍五入为 3.14。"
  },
  {
    id: 58, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf %c",
    question: `char ch = 'B';\nprintf("%c", ch);\n\n输出是？`,
    answer: "B",
    explanation: "%c 输出字符 B。"
  },
  {
    id: 59, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 综合",
    question: `printf("%d%%", 50);\n\n输出是？`,
    answer: "50%",
    explanation: "%d 输出 50，%% 输出普通百分号，结果 50%。"
  },
  {
    id: 60, type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf %s", needsString: true,
    question: `printf("%s", "OK");\n\n输出是？`,
    answer: "OK",
    explanation: "%s 输出字符串 OK。"
  }
];

/* =========================================================
 * 题库注册表
 * 外部 banks/*.js 通过 window.GESP_BANKS 注册
 * ========================================================= */
const QUESTION_BANKS = Object.assign({
  "printf-scanf": {
    id: "printf-scanf",
    name: "printf / scanf 专项",
    exam: "GESP C++ 一级",
    description: "格式化输入输出专项训练",
    staticQuestions: null,
    settings: { allowFill: true, allowDynamic: true },
    modes: [
      { id: "mixed", label: "综合训练" },
      { id: "fill", label: "填空专项" },
      { id: "output", label: "输出判断" },
      { id: "format", label: "格式符" },
      { id: "scanf", label: "scanf专项" }
    ]
  }
}, (typeof window !== "undefined" && window.GESP_BANKS) ? window.GESP_BANKS : {});

// 挂载 printf 静态题到注册表
if (QUESTION_BANKS["printf-scanf"]) {
  QUESTION_BANKS["printf-scanf"].staticQuestions = STATIC_QUESTIONS;
}

let currentBankId = "printf-scanf";

function getCurrentBank() {
  return QUESTION_BANKS[currentBankId] || QUESTION_BANKS["printf-scanf"];
}

function getBankStaticQuestions() {
  const bank = getCurrentBank();
  if (bank && bank.staticQuestions && bank.staticQuestions.length) {
    return bank.staticQuestions;
  }
  // 兼容：printf 题库
  if (currentBankId === "printf-scanf") return STATIC_QUESTIONS;
  return [];
}

function getBankModes() {
  const bank = getCurrentBank();
  return (bank && bank.modes) ? bank.modes : [{ id: "mixed", label: "综合训练" }];
}

function bankAllowsDynamic() {
  const bank = getCurrentBank();
  if (bank && bank.settings && bank.settings.allowDynamic === false) return false;
  return currentBankId === "printf-scanf";
}

function bankAllowsFill() {
  const bank = getCurrentBank();
  if (bank && bank.settings && bank.settings.allowFill === false) return false;
  return true;
}

function refreshModeButtons() {
  const row = document.getElementById("mode-row");
  if (!row) return;
  const modes = getBankModes();
  // 若当前 mode 不在新题库中，切回 mixed
  if (!modes.some(m => m.id === currentMode)) currentMode = "mixed";
  row.innerHTML = modes.map(m =>
    `<button class="mode-btn ${m.id === currentMode ? "active" : ""}" data-mode="${m.id}">${m.label}</button>`
  ).join("");
  row.querySelectorAll(".mode-btn").forEach(btn => {
    btn.onclick = () => {
      row.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentMode = btn.dataset.mode;
    };
  });
}

function setCurrentBank(id) {
  if (!QUESTION_BANKS[id] && id !== "printf-scanf") return;
  currentBankId = id;
  refreshModeButtons();
  const sel = document.getElementById("bank-select");
  if (sel && sel.value !== id) sel.value = id;
  const sub = document.getElementById("home-subtitle") || document.querySelector(".subtitle");
  if (sub) {
    const bank = getCurrentBank();
    sub.textContent = bank.description || bank.name || "专项训练";
  }
}




/* ========== 动态题库生成器 ========== */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 生成动态输出判断题（偏综合，少单纯 %d） */

/** 当前复杂度 1基础 2进阶 3综合 */
function getComplexity() {
  return getBankSetting("complexity", 2);
}

/** 是否启用字符数组 / %s 题目（默认关闭） */
function isStringEnabled() {
  return !!getBankSetting("enableString", false);
}

/** 判断题目是否依赖字符数组 / 字符串 / %s */
function isStringRelated(q) {
  if (!q) return false;
  if (q.needsString) return true;
  const kp = String(q.knowledgePoint || q.kp || "");
  const text = String(q.question || "") + " " + kp;
  return /%s|字符串|char\s+\w+\s*\[|name\[\]|buf\[|str\[/i.test(text) ||
         /printf %s|scanf %s|%c vs %s|格式符 %s/.test(kp);
}

/**
 * 统一题库模板池
 * 每个模板声明: minComplexity, knowledgePoint, category, make()
 * make 返回完整题目对象；同一考点可有 choice / fill 多种形态
 */
function getTemplatePool() {
  const C = getComplexity();

  const pool = [
    // ===== 输出：带符号 / 转义 =====
    {
      minC: 1, kp: "printf 花括号", cat: "output",
      make: () => {
        const a = randInt(1, 50), b = randInt(1, 50);
        const asChoice = Math.random() < 0.55;
        if (asChoice) {
          return {
            type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 花括号",
            question: `int a = ${a}, b = ${b};\nprintf("{%d,%d}", a, b);\n\n输出是？`,
            options: [`{${a},${b}}`, `${a},${b}`, `{%d,%d}`, `{${a}, ${b}}`],
            answer: 0,
            explanation: `花括号是普通字符，%d 输出数字，结果 {${a},${b}}。`
          };
        }
        return {
          type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 花括号",
          question: `printf("{%d}", ${a});\n\n输出是？`,
          answer: `{${a}}`,
          explanation: `花括号原样输出，中间是 ${a}。`
        };
      }
    },
    {
      minC: 1, kp: "printf %%", cat: "output",
      make: () => {
        const n = randInt(1, 30);
        if (Math.random() < 0.5) {
          return {
            type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 转义 %%",
            question: `printf("%%%d%%", ${n});\n\n输出是？`,
            options: [`%${n}%`, `%%${n}%%`, String(n), `%${n}`],
            answer: 0,
            explanation: `%%→%，%d→${n}，%%→%，结果 %${n}%。`
          };
        }
        return {
          type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 转义 %%",
          question: `printf("%d%%", ${n});\n\n输出是？`,
          answer: `${n}%`,
          explanation: `%d 输出 ${n}，%% 输出普通百分号。`
        };
      }
    },
    {
      minC: 2, kp: "printf 引号转义", cat: "output",
      make: () => {
        const a = randInt(1, 9);
        if (Math.random() < 0.5) {
          return {
            type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 引号转义",
            question: `printf("\\"%d\\"", ${a});\n\n输出是？`,
            options: [`"${a}"`, `\\"${a}\\"`, `"%d"`, String(a)],
            answer: 0,
            explanation: `\\" 输出双引号，结果 "${a}"。`
          };
        }
        return {
          type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 引号转义",
          question: `printf("\\"%d\\"", ${a});\n\n输出是？`,
          answer: `"${a}"`,
          explanation: `\\" 输出一个双引号。`
        };
      }
    },
    {
      minC: 2, kp: "printf 反斜杠", cat: "output",
      make: () => {
        const a = randInt(1, 20);
        return {
          type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 转义 \\\\ ",
          question: `printf("a\\\\b%d", ${a});\n\n输出是？`,
          answer: `a\\b${a}`,
          explanation: `\\\\ 输出一个反斜杠 \\。`
        };
      }
    },
    {
      minC: 1, kp: "printf 方括号", cat: "output",
      make: () => {
        const a = randInt(1, 9), b = randInt(1, 9);
        if (Math.random() < 0.5) {
          return {
            type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 综合符号",
            question: `printf("[%d|%d]", ${a}, ${b});\n\n输出是？`,
            options: [`[${a}|${b}]`, `${a}|${b}`, `[%d|%d]`, `[${a},${b}]`],
            answer: 0,
            explanation: `方括号和竖线都是普通字符。`
          };
        }
        return {
          type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 综合符号",
          question: `printf("[%d-%d]", ${a}, ${b});\n\n输出是？`,
          answer: `[${a}-${b}]`,
          explanation: `方括号和减号原样输出。`
        };
      }
    },
    {
      minC: 1, kp: "printf %c 引号", cat: "output",
      make: () => {
        const ch = pick(["A", "B", "X", "z"]);
        if (Math.random() < 0.5) {
          return {
            type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf %c 与引号",
            question: `char c = '${ch}';\nprintf("'%c'", c);\n\n输出是？`,
            options: [`'${ch}'`, ch, `'%c'`, `"${ch}"`],
            answer: 0,
            explanation: `单引号是普通字符，%c 输出 ${ch}。`
          };
        }
        return {
          type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf %c 与引号",
          question: `char c = '${ch}';\nprintf("'%c'", c);\n\n输出是？`,
          answer: `'${ch}'`,
          explanation: `结果带单引号：'${ch}'。`
        };
      }
    },

    // ===== 宽度 / 精度控制（进阶+） =====
    {
      minC: 2, kp: "printf 宽度 %0Nd", cat: "output",
      make: () => {
        const n = randInt(3, 42);
        const w = pick([5, 5, 8]);
        const padded = String(n).padStart(w, "0");
        if (Math.random() < 0.5) {
          return {
            type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 宽度补零",
            question: `int n = ${n};\nprintf("%0${w}d", n);\n\n输出是？`,
            options: [padded, String(n), `%0${w}d`, " ".repeat(Math.max(0, w - String(n).length)) + n],
            answer: 0,
            explanation: `%0${w}d 表示宽度至少 ${w}，不足左侧补 0，所以是 ${padded}。`
          };
        }
        return {
          type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 宽度补零",
          question: `printf("%0${w}d", ${n});\n\n输出是？`,
          answer: padded,
          explanation: `%0${w}d：宽度 ${w}，左边补 0 → ${padded}。`
        };
      }
    },
    {
      minC: 2, kp: "printf 宽度空格", cat: "output",
      make: () => {
        const n = randInt(1, 9);
        const w = 4;
        const spaced = String(n).padStart(w, " ");
        return {
          type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 宽度对齐",
          question: `int n = ${n};\nprintf("%${w}d", n);\n\n输出是？（右侧对齐，宽度${w}）`,
          options: [spaced, String(n), "0".repeat(w - 1) + n, `%${w}d`],
          answer: 0,
          explanation: `%${w}d 最小宽度 ${w}，不足左侧补空格。`
        };
      }
    },
    {
      minC: 2, kp: "printf 精度 %f", cat: "output",
      make: () => {
        // 用可预测的小数
        const cases = [
          { v: 3.14159, fmt: ".2f", out: "3.14" },
          { v: 3.14159, fmt: ".3f", out: "3.142" },
          { v: 2.5, fmt: ".1f", out: "2.5" },
          { v: 9.876, fmt: ".2f", out: "9.88" },
        ];
        const c = pick(cases);
        if (Math.random() < 0.5) {
          return {
            type: "choice", category: "output", difficulty: 3, knowledgePoint: "printf 小数精度",
            question: `float f = ${c.v};\nprintf("%${c.fmt}", f);\n\n输出是？`,
            options: [c.out, String(c.v), `%${c.fmt}`, c.out + "0"],
            answer: 0,
            explanation: `%${c.fmt} 控制小数位数，结果 ${c.out}。`
          };
        }
        return {
          type: "fill", category: "fill", difficulty: 3, knowledgePoint: "printf 小数精度",
          question: `printf("%${c.fmt}", ${c.v});\n\n输出是？`,
          answer: c.out,
          explanation: `%${c.fmt} → ${c.out}。`
        };
      }
    },
    {
      minC: 3, kp: "printf 宽度+精度", cat: "output",
      make: () => {
        // %09.5f 类
        const cases = [
          { v: 3.14, fmt: "09.5f", out: "003.14000" },
          { v: 1.5, fmt: "08.3f", out: "0001.500" },
          { v: 12.3, fmt: "07.2f", out: "0012.30" },
        ];
        const c = pick(cases);
        if (Math.random() < 0.45) {
          return {
            type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 宽度精度组合",
            question: `float f = ${c.v};\nprintf("%${c.fmt}", f);\n\n输出是？`,
            options: [c.out, String(c.v), c.out.replace(/^0+/, "") || "0", `%${c.fmt}`],
            answer: 0,
            explanation: `%${c.fmt}：总宽度+精度+补零，结果 ${c.out}。`
          };
        }
        return {
          type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf 宽度精度组合",
          question: `printf("%${c.fmt}", ${c.v});\n\n输出是？`,
          answer: c.out,
          explanation: `%${c.fmt} 输出 ${c.out}。`
        };
      }
    },

    // ===== 格式符选择（带上下文，不单干） =====
    {
      minC: 1, kp: "格式符 %d", cat: "format",
      make: () => {
        const v = pick(["n", "age", "cnt"]);
        return {
          type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf %d",
          question: `int ${v} = 5;\nprintf("{%___}", ${v});\n\n横线处应填？（只填字母）`,
          options: ["d", "f", "c", "s"],
          answer: 0,
          explanation: `${v} 是 int，用 %d。`
        };
      }
    },
    {
      minC: 1, kp: "格式符 %f", cat: "format",
      make: () => {
        const v = pick(["score", "pi", "rate"]);
        return {
          type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf %f",
          question: `float ${v} = 3.14;\nprintf("%___%%", ${v});\n\n应填？`,
          options: ["d", "f", "c", "s"],
          answer: 1,
          explanation: `float 用 %f；%% 输出普通百分号。`
        };
      }
    },
    {
      minC: 2, kp: "格式符 宽度", cat: "format",
      make: () => {
        return {
          type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf 宽度补零",
          question: `int n = 7;\nprintf("%___5d", n);  // 希望输出 00007\n\n横线处应填？`,
          options: ["0", " ", "-", "#"],
          answer: 0,
          explanation: `%05d 中的 0 表示用 0 填充，宽度 5。`
        };
      }
    },
    {
      minC: 1, kp: "格式符 %c", cat: "format",
      make: () => {
        const v = pick(["ch", "c", "grade"]);
        return {
          type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf %c",
          question: `char ${v} = 'A';\nprintf("'%___'", ${v});\n\n应填？`,
          options: ["d", "f", "c", "s"],
          answer: 2,
          explanation: `char 用 %c。`
        };
      }
    },
    {
      minC: 1, kp: "格式符 %s", cat: "format",
      make: () => {
        return {
          type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf %s",
          question: `char name[] = "GESP";\nprintf("[%___]", name);\n\n应填？`,
          options: ["d", "c", "s", "f"],
          answer: 2,
          explanation: `字符串用 %s。`
        };
      }
    },
    {
      minC: 1, kp: "scanf 格式", cat: "format",
      make: () => {
        return {
          type: "choice", category: "format", difficulty: 3, knowledgePoint: "scanf %d",
          question: `int num;\nscanf("%___", &num);\n\n应填？`,
          options: ["d", "f", "c", "s"],
          answer: 0,
          explanation: `int 输入用 %d。`
        };
      }
    },
    {
      minC: 2, kp: "scanf %s", cat: "format",
      make: () => {
        return {
          type: "choice", category: "format", difficulty: 3, knowledgePoint: "scanf %s",
          question: `char buf[20];\nscanf("%___", buf);\n\n读字符串应填？`,
          options: ["d", "c", "s", "f"],
          answer: 2,
          explanation: `读字符串用 %s，数组名已是地址。`
        };
      }
    },
  ];

  return pool.filter(t => {
    if (t.minC > C) return false;
    // 未开启字符串题时过滤 %s / 字符数组相关模板
    if (!isStringEnabled()) {
      if (/字符串|%s|scanf %s|格式符 %s/.test(t.kp)) return false;
    }
    return true;
  });
}

function genFromPool(idBase, categoryFilter) {
  let pool = getTemplatePool();
  if (categoryFilter) {
    const filtered = pool.filter(t => t.cat === categoryFilter || (categoryFilter === "fill" && t.cat === "output"));
    if (filtered.length) pool = filtered;
  }
  // 过滤今日已掌握
  const available = pool.filter(t => !isMasteredToday(t.kp));
  const use = available.length ? available : pool;
  const t = pick(use);
  const q = t.make();
  q.id = idBase;
  q.dynamic = true;
  q.difficulty = Math.max(3, q.difficulty || 3);
  return q;
}

function genOutputQuestion(idBase) {
  return genFromPool(idBase, "output");
}

function genFillQuestion(idBase) {
  // 强制偏向 fill：多试几次
  for (let i = 0; i < 8; i++) {
    const q = genFromPool(idBase + i, "output");
    if (q.type === "fill") {
      q.id = idBase;
      return q;
    }
  }
  // 保底一个 fill
  const n = randInt(1, 30);
  return {
    id: idBase, dynamic: true, type: "fill", category: "fill", difficulty: 3,
    knowledgePoint: "printf 转义 %%",
    question: `printf("%%%d", ${n});\n\n输出是？`,
    answer: `%${n}`,
    explanation: `%% → %，%d → ${n}。`
  };
}

function genFormatQuestion(idBase) {
  return genFromPool(idBase, "format");
}


function buildQuizList(mode, count) {
  const list = [];
  let dynId = 10000;
  const usedKp = new Set();
  const usedSig = new Set();

  const usableStatic = (filterFn) =>
    getBankStaticQuestions().filter(q => {
      if (!filterFn(q)) return false;
      if (isMasteredToday(q.knowledgePoint)) return false;
      if (!isStringEnabled() && isStringRelated(q)) return false;
      if ((q.difficulty || 1) < 3) return false;
      return true;
    });

  function sigOf(q) {
    // 题干前 40 字 + 知识点 + 类型，避免同文反复出现
    return (q.knowledgePoint || "") + "|" + (q.type || "") + "|" + String(q.question || "").slice(0, 48);
  }

  function tryPush(q) {
    if (!q) return false;
    const kp = q.knowledgePoint || "";
    const sig = sigOf(q);
    // 同一套题内：同一知识点最多 1 次；完全相同签名直接拒绝
    if (usedSig.has(sig)) return false;
    if (kp && usedKp.has(kp)) return false;
    usedSig.add(sig);
    if (kp) usedKp.add(kp);
    q.difficulty = Math.max(3, q.difficulty || 3);
    list.push(q);
    return true;
  }

  function pushDyn(gen, attempts = 12) {
    for (let i = 0; i < attempts; i++) {
      const q = gen(dynId++);
      if (tryPush(q)) return true;
    }
    // 放宽：允许同知识点但签名不同
    for (let i = 0; i < 8; i++) {
      const q = gen(dynId++);
      if (!q) continue;
      const sig = sigOf(q);
      if (usedSig.has(sig)) continue;
      usedSig.add(sig);
      q.difficulty = Math.max(3, q.difficulty || 3);
      list.push(q);
      return true;
    }
    return false;
  }

  const staticPool = {
    fill: usableStatic(q => q.type === "fill"),
    output: usableStatic(q => q.category === "output"),
    format: usableStatic(q => q.category === "format"),
    scanf: usableStatic(q => q.category === "scanf" || q.category === "error"),
    branch: usableStatic(q => q.category === "branch"),
    switch: usableStatic(q => q.category === "switch"),
    loop: usableStatic(q => q.category === "loop"),
    judge: usableStatic(q => q.type === "judge"),
    all: usableStatic(() => true)
  };

  Object.keys(staticPool).forEach(k => {
    staticPool[k] = staticPool[k].sort(() => Math.random() - 0.5);
  });

  let staticIdx = {};
  Object.keys(staticPool).forEach(k => { staticIdx[k] = 0; });

  function takeStatic(key) {
    if (staticIdx[key] == null) staticIdx[key] = 0;
    const pool = staticPool[key] || [];
    while (staticIdx[key] < pool.length) {
      const q = { ...pool[staticIdx[key]++] };
      if (tryPush(q)) return true;
    }
    return false;
  }

  const allowDyn = bankAllowsDynamic();
  const allowFill = bankAllowsFill();

  // ---------- 纯静态题库（控制流 / 计算机基础 / 变量运算等） ----------
  if (!allowDyn) {
    const orderMap = {
      mixed: ["all"],
      branch: ["branch", "judge", "all"],
      switch: ["switch", "judge", "all"],
      loop: ["loop", "judge", "all"],
      judge: ["judge", "all"],
      hardware: ["hardware", "all"],
      storage: ["storage", "all"],
      process: ["process", "all"],
      type: ["type", "ident", "all"],
      arith: ["arith", "inc", "all"],
      logic: ["logic", "rel", "all"],
      ident: ["ident", "all"]
    };
    const order = orderMap[mode] || [mode, "all"];
    // 为 category 建池
    ["hardware","storage","process","os","ide","history","type","ident","arith","inc","rel","logic","assign"].forEach(cat => {
      if (!staticPool[cat]) {
        staticPool[cat] = usableStatic(q => q.category === cat).sort(() => Math.random() - 0.5);
        staticIdx[cat] = 0;
      }
    });
    for (let i = 0; i < count; i++) {
      let ok = false;
      const key = order[i % order.length];
      ok = takeStatic(key);
      if (!ok) {
        for (const k of order) {
          if (takeStatic(k)) { ok = true; break; }
        }
      }
      if (!ok) takeStatic("all");
    }
  } else {
    // ---------- printf / scanf 题库 ----------
    for (let i = 0; i < count; i++) {
      let ok = false;
      if (mode === "fill" && allowFill) {
        if (Math.random() < 0.25) ok = takeStatic("fill");
        if (!ok && allowDyn) ok = pushDyn(genFillQuestion);
        if (!ok) ok = takeStatic("fill");
      } else if (mode === "output") {
        if (Math.random() < 0.2) ok = takeStatic("output");
        if (!ok && allowDyn) ok = pushDyn(genOutputQuestion);
        if (!ok) ok = takeStatic("output");
      } else if (mode === "format") {
        if (Math.random() < 0.3) ok = takeStatic("format");
        if (!ok && allowDyn) ok = pushDyn(genFormatQuestion);
        if (!ok) ok = takeStatic("format");
      } else if (mode === "scanf") {
        ok = takeStatic("scanf");
        if (!ok) ok = takeStatic("all");
        if (!ok && allowDyn) ok = pushDyn(genFormatQuestion);
      } else {
        const slot = i % 4;
        if (slot === 0) {
          if (Math.random() < 0.25) ok = takeStatic("all");
          if (!ok && allowDyn) ok = pushDyn(genOutputQuestion);
        } else if (slot === 1 && allowFill) {
          if (allowDyn) ok = pushDyn(genFillQuestion);
          if (!ok) ok = takeStatic("fill");
        } else if (slot === 2) {
          if (allowDyn) ok = pushDyn(genFormatQuestion);
          if (!ok) ok = takeStatic("format");
        } else {
          if (Math.random() < 0.35) ok = takeStatic("scanf");
          if (!ok && allowDyn) ok = pushDyn(genOutputQuestion);
        }
      }
      if (!ok) {
        if (allowDyn) pushDyn(genOutputQuestion, 5);
        else takeStatic("all");
      }
    }
  }

  // 保证本套题覆盖 3★～5★：按位置分配目标难度再微调
  const n = list.length;
  list.forEach((q, i) => {
    // 前 30% → 3，中 40% → 4，后 30% → 5
    let target = 3;
    const r = n <= 1 ? 0 : i / (n - 1);
    if (r >= 0.7) target = 5;
    else if (r >= 0.3) target = 4;
    // 动态题可上调到 target；静态保留原难度但至少 3
    if (q.dynamic) q.difficulty = target;
    else q.difficulty = Math.max(3, Math.min(5, q.difficulty || target));
  });
  list.sort((a, b) => (a.difficulty || 3) - (b.difficulty || 3) || (Math.random() - 0.5));
  return list;
}


/* ========== 状态与存储 ========== */
const STORAGE_KEY = "gesp_train_records_v3";
const STORAGE_LEGACY_KEYS = ["gesp_printf_scanf_v2", "gesp_printf_scanf_v1"];
const SCHEMA_VERSION = 3;

/** 标准训练记录（固定字段，后续版本只增不改） */
function makeHistoryRecord(partial) {
  return {
    v: 1,
    date: partial.date || new Date().toISOString(),
    bankId: partial.bankId || "printf-scanf",
    mode: partial.mode || "mixed",
    total: partial.total | 0,
    correct: partial.correct | 0,
    wrong: partial.wrong | 0,
    accuracy: partial.accuracy | 0,
    maxCombo: partial.maxCombo | 0,
    xp: partial.xp | 0,
    duration: partial.duration | 0,
    achievementIds: Array.isArray(partial.achievementIds) ? partial.achievementIds : []
  };
}

function defaultGlobalSettings() {
  return {
    timePerQ: 20,
    qCount: 20,
    autoNext: 1,
    sound: true,
    anim: true,
    petBless: true
  };
}

function defaultBankSettings() {
  return {
    "printf-scanf": { complexity: 2, enableString: false },
    "control-flow": {}
  };
}

function createEmptyData() {
  return {
    schemaVersion: SCHEMA_VERSION,
    userName: "",
    settings: defaultGlobalSettings(),      // 全局设置
    bankSettings: defaultBankSettings(),    // 各题库设置
    history: [],
    wrongBook: {},
    mastery: {},
    achievements: {},   // id -> { unlockedAt, xpAwarded }
    streak: 0,
    totalXp: 0,
    petPath: "bird",
    stats: {
      totalSessions: 0,
      perfectSessions: 0,
      banksPlayed: {}
    }
  };
}

/** 从旧版结构迁移到 v3，尽量不丢记录 */
function migrateToV3(raw) {
  const base = createEmptyData();
  if (!raw || typeof raw !== "object") return base;

  base.userName = raw.userName || "";
  base.totalXp = raw.totalXp || 0;
  base.petPath = raw.petPath || "bird";
  base.streak = raw.streak || 0;
  base.mastery = raw.mastery || {};
  base.wrongBook = raw.wrongBook || {};
  base.achievements = raw.achievements || {};

  // 全局设置
  const os = raw.settings || {};
  base.settings = Object.assign(defaultGlobalSettings(), {
    timePerQ: os.timePerQ != null ? os.timePerQ : 20,
    qCount: os.qCount != null ? os.qCount : 20,
    autoNext: os.autoNext != null ? os.autoNext : 1,
    sound: os.sound != null ? !!os.sound : true,
    anim: os.anim != null ? !!os.anim : true,
    petBless: os.petBless != null ? !!os.petBless : true
  });

  // 题库设置（旧 complexity/enableString 迁到 printf）
  base.bankSettings = defaultBankSettings();
  if (raw.bankSettings) {
    Object.keys(raw.bankSettings).forEach(k => {
      base.bankSettings[k] = Object.assign({}, base.bankSettings[k] || {}, raw.bankSettings[k]);
    });
  }
  if (os.complexity != null) base.bankSettings["printf-scanf"].complexity = os.complexity;
  if (os.enableString != null) base.bankSettings["printf-scanf"].enableString = !!os.enableString;

  // 历史记录规范化
  const hist = Array.isArray(raw.history) ? raw.history : [];
  base.history = hist.map(h => makeHistoryRecord({
    date: h.date,
    bankId: h.bankId || "printf-scanf",
    mode: h.mode || "mixed",
    total: h.total,
    correct: h.correct,
    wrong: h.wrong != null ? h.wrong : Math.max(0, (h.total || 0) - (h.correct || 0)),
    accuracy: h.accuracy,
    maxCombo: h.maxCombo,
    xp: h.xp,
    duration: h.duration,
    achievementIds: h.achievementIds || h.achievementsGained || []
  }));

  if (!raw._xpMigrated && base.totalXp === 0 && base.history.length) {
    base.totalXp = base.history.reduce((sum, h) => sum + (h.xp || 0), 0);
  }

  base.stats = Object.assign({ totalSessions: 0, perfectSessions: 0, banksPlayed: {} }, raw.stats || {});
  if (!base.stats.totalSessions) base.stats.totalSessions = base.history.length;
  base.history.forEach(h => {
    if (h.accuracy === 100) base.stats.perfectSessions = (base.stats.perfectSessions || 0) + 1;
    if (h.bankId) base.stats.banksPlayed[h.bankId] = true;
  });

  base.schemaVersion = SCHEMA_VERSION;
  return base;
}

function loadData() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      for (const k of STORAGE_LEGACY_KEYS) {
        const leg = localStorage.getItem(k);
        if (leg) { raw = leg; break; }
      }
    }
    if (raw) {
      const parsed = JSON.parse(raw);
      const d = (parsed.schemaVersion >= 3) ? migrateToV3(parsed) : migrateToV3(parsed);
      // 写回新 key，旧数据不删以免回滚丢档
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch (e) {}
      return d;
    }
  } catch (e) {
    console.warn("loadData failed", e);
  }
  return createEmptyData();
}

function saveData(dataObj) {
  try {
    dataObj.schemaVersion = SCHEMA_VERSION;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObj));
  } catch (e) {
    console.warn("saveData failed", e);
  }
}

function todayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

/** 今日已掌握（答对 >= 2 次）的知识点不再出现 */
function isMasteredToday(kp) {
  if (!kp || !data || !data.mastery) return false;
  const m = data.mastery[kp];
  if (!m) return false;
  if (m.date !== todayStr()) return false;
  return (m.count || 0) >= 2;
}

function recordMastery(kp) {
  if (!kp || !data) return;
  if (!data.mastery) data.mastery = {};
  const t = todayStr();
  if (!data.mastery[kp] || data.mastery[kp].date !== t) {
    data.mastery[kp] = { count: 1, date: t };
  } else {
    data.mastery[kp].count++;
  }
  saveData(data);
}

/** 读取当前题库设置 */
function getBankSetting(key, fallback) {
  const bs = (data.bankSettings && data.bankSettings[currentBankId]) || {};
  return bs[key] != null ? bs[key] : fallback;
}

function setBankSetting(key, value) {
  if (!data.bankSettings) data.bankSettings = defaultBankSettings();
  if (!data.bankSettings[currentBankId]) data.bankSettings[currentBankId] = {};
  data.bankSettings[currentBankId][key] = value;
}

let data = loadData();
if (typeof window !== "undefined") {
  Object.defineProperty(window, "data", {
    get() { return data; },
    set(v) { data = v; },
    configurable: true
  });
  window.saveData = saveData;
}


let currentMode = "mixed";

/* ========== 音效 ========== */
let audioCtx = null;
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playTone(freq, duration, type = "sine", vol = 0.15) {
  if (!data.settings.sound) return;
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}
function soundCorrect() { playTone(660, 0.08); setTimeout(() => playTone(880, 0.12), 80); }
function soundWrong() { playTone(220, 0.2, "square", 0.1); }
function soundCombo() { playTone(520, 0.06); setTimeout(() => playTone(780, 0.08), 60); setTimeout(() => playTone(1040, 0.1), 120); }
function soundTimeout() { playTone(180, 0.3, "sawtooth", 0.08); }
function soundFinish() { playTone(523, 0.1); setTimeout(() => playTone(659, 0.1), 100); setTimeout(() => playTone(784, 0.15), 200); }

/* ========== 粒子 ========== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
function spawnParticles(x, y, count = 12, color = "#22c55e") {
  if (!data.settings.anim) return;
  for (let i = 0; i < count; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 2,
      life: 1,
      decay: 0.02 + Math.random() * 0.03,
      size: 2 + Math.random() * 3,
      color
    });
  }
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= p.decay;
    if (p.life <= 0) return false;
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    return true;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ========== 视图 ========== */
function showView(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDuration(sec) {
  sec = Math.max(0, Math.round(sec));
  if (sec < 60) return sec + "秒";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s > 0 ? `${m}分${s}秒` : `${m}分钟`;
}

/* 高亮空白：___ 或连续下划线整段作为一个标记 */
function formatQuestionText(text) {
  let t = escapeHtml(text);
  // 连续下划线整段作为一个空白标记（支持 %___ ）
  t = t.replace(/%_{2,}/g, m => `<span class="blank">${m}</span>`);
  t = t.replace(/(?<![%\w])_{2,}(?!\w)/g, m => `<span class="blank">${m}</span>`);
  return t;
}

/** 选项展示：关键/连续空格用 ␣ 标出并加提示 */
function formatOptionDisplay(text) {
  const raw = String(text ?? "");
  const hasLeading = /^\s/.test(raw);
  const hasTrailing = /\s$/.test(raw);
  const hasMulti = /\s{2,}/.test(raw);
  if (hasLeading || hasTrailing || hasMulti) {
    const shown = raw.replace(/ /g, "␣");
    const parts = [];
    if (hasLeading) parts.push("前面有空格");
    if (hasTrailing) parts.push("后面有空格");
    if (hasMulti) parts.push("含多空格");
    return escapeHtml(shown) + ` <span class="space-hint">（${parts.join("，")}）</span>`;
  }
  return escapeHtml(raw);
}


/* ========== 首页 ========== */
function updateHome() {
  const today = new Date().toDateString();
  const todayRecords = data.history.filter(h => new Date(h.date).toDateString() === today);
  let todayAcc = "--%";
  if (todayRecords.length) {
    const totalC = todayRecords.reduce((s, r) => s + r.correct, 0);
    const totalQ = todayRecords.reduce((s, r) => s + r.total, 0);
    todayAcc = Math.round((totalC / totalQ) * 100) + "%";
  }
  document.getElementById("today-accuracy").textContent = todayAcc;

  const wrongCnt = Object.keys(data.wrongBook).filter(id => {
    const w = data.wrongBook[id];
    return (w.consecutiveCorrect || 0) < 2;
  }).length;
  document.getElementById("wrong-count").textContent = wrongCnt + "题";

  updateStreak();
  document.getElementById("streak-days").textContent = data.streak + "天";

  const hist = data.history.slice(-5);
  if (hist.length >= 2) {
    const last = hist[hist.length - 1].accuracy;
    const prev = hist[hist.length - 2].accuracy;
    const diff = last - prev;
    const el = document.getElementById("trend-text");
    if (diff > 0) { el.textContent = `↑ ${diff}%`; el.style.color = "#22c55e"; }
    else if (diff < 0) { el.textContent = `↓ ${Math.abs(diff)}%`; el.style.color = "#ef4444"; }
    else { el.textContent = "持平"; el.style.color = "#94a3b8"; }
  } else {
    document.getElementById("trend-text").textContent = "暂无足够数据";
  }
  // 首页宠物徽章
  const petXp = data.totalXp || 0;
  const pet = getPetStage(petXp);
  const he = document.getElementById("home-pet-emoji");
  const hl = document.getElementById("home-pet-label");
  if (he) he.textContent = pet.emoji;
  if (hl) hl.textContent = `${pet.name} · ${petXp} XP`;
  refreshUserDisplay();


}

function updateStreak() {
  if (!data.history.length) { data.streak = 0; return; }
  const dates = [...new Set(data.history.map(h => new Date(h.date).toDateString()))]
    .sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  let check = new Date();
  check.setHours(0, 0, 0, 0);
  for (let i = 0; i < dates.length; i++) {
    const d = new Date(dates[i]);
    d.setHours(0, 0, 0, 0);
    if (d.getTime() === check.getTime()) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else if (i === 0 && d.getTime() === check.getTime() - 86400000) {
      streak++;
      check = d;
      check.setDate(check.getDate() - 1);
    } else break;
  }
  data.streak = streak;
}

/* ========== 训练核心 ========== */
let quiz = {
  list: [],
  index: 0,
  correct: 0,
  wrong: 0,
  combo: 0,
  maxCombo: 0,
  xp: 0,
  answered: false,
  timer: null,
  timeLeft: 0,
  startTime: 0
};



/** 读取配置：localStorage 姓名 > config.js > 默认 */
function getUserName() {
  if (data && data.userName && String(data.userName).trim()) {
    return String(data.userName).trim();
  }
  const cfg = (typeof window !== "undefined" && window.GESP_CONFIG) ? window.GESP_CONFIG : {};
  return (cfg.userName && String(cfg.userName).trim()) || "同学";
}

function getConfig() {
  return (typeof window !== "undefined" && window.GESP_CONFIG) ? window.GESP_CONFIG : {};
}

function refreshUserDisplay() {
  const name = getUserName();
  const dn = document.getElementById("display-name");
  if (dn) dn.textContent = name;
  const greet = document.getElementById("user-greeting");
  if (greet) greet.innerHTML = `你好，<span id="display-name">${name}</span>`;
}

const MODE_LABELS = {
  mixed: "综合训练",
  fill: "填空专项",
  output: "输出判断",
  format: "格式符",
  scanf: "scanf专项",
  branch: "分支 if",
  switch: "switch",
  loop: "循环",
  judge: "判断题",
  hardware: "组成与设备",
  storage: "存储单位",
  process: "编译与程序",
  type: "类型与变量",
  arith: "算术运算",
  logic: "关系逻辑",
  ident: "标识符",
  os: "操作系统",
  ide: "IDE",
  history: "计算机历史",
  assign: "赋值",
  rel: "关系运算",
  inc: "自增自减"
};

function startQuiz() {
  const count = data.settings.qCount;
  quiz.list = buildQuizList(currentMode, count);
  quiz.index = 0;
  quiz.correct = 0;
  quiz.wrong = 0;
  quiz.combo = 0;
  quiz.maxCombo = 0;
  quiz.xp = 0;
  quiz.startTime = Date.now();
  document.getElementById("mode-label").textContent = MODE_LABELS[currentMode] || "综合";
  showView("quiz-view");
  renderQuestion();
}

function renderQuestion() {
  clearInterval(quiz.timer);
  quiz.answered = false;
  const q = quiz.list[quiz.index];

  document.getElementById("q-num").textContent = `第 ${quiz.index + 1} / ${quiz.list.length} 题`;
  const acc = quiz.index === 0 ? 100 : Math.round((quiz.correct / quiz.index) * 100);
  document.getElementById("q-acc").textContent = `正确率 ${acc}%`;

  const stars = "★".repeat(q.difficulty) + "☆".repeat(5 - q.difficulty);
  document.getElementById("question-text").innerHTML =
    `<div class="diff">${stars}</div>` + formatQuestionText(q.question);

  const optsEl = document.getElementById("options");
  const fillEl = document.getElementById("fill-area");

  // 彻底重置填空区域，避免残留「下一题」按钮
  fillEl.innerHTML = "";
  fillEl.style.display = "none";
  optsEl.innerHTML = "";
  optsEl.style.display = "none";

  if (q.type === "fill") {
    optsEl.style.display = "none";
    fillEl.style.display = "flex";
    fillEl.innerHTML = `
      <input type="text" id="fill-input" class="fill-input" placeholder="在此输入答案" autocomplete="off" spellcheck="false">
      <button class="btn-submit" id="btn-submit-fill">提交</button>
    `;
    const inputEl = document.getElementById("fill-input");
    const submitBtn = document.getElementById("btn-submit-fill");
    inputEl.focus();
    submitBtn.onclick = () => submitFill();
    inputEl.onkeydown = (e) => { if (e.key === "Enter") submitFill(); };
  } else {
    optsEl.style.display = "flex";
    fillEl.style.display = "none";
    q.options.forEach((text, i) => {
      const div = document.createElement("div");
      div.className = "option";
      div.dataset.idx = i;
      const label = String.fromCharCode(65 + i);
      div.innerHTML = `<span class="mark">${label}.</span> <span>${formatOptionDisplay(text)}</span>`;
      div.onclick = () => selectAnswer(i);
      optsEl.appendChild(div);
    });
  }

  document.getElementById("explain-area").innerHTML =
    `<div class="explain-placeholder">选择或填写答案后显示解析</div>`;
  document.getElementById("combo-display").textContent = quiz.combo > 1 ? `🔥 ${quiz.combo} 连对` : "";
  document.getElementById("xp-display").textContent = "";

  if (data.settings.timePerQ > 0) {
    quiz.timeLeft = data.settings.timePerQ;
    updateTimerDisplay();
    quiz.timer = setInterval(() => {
      quiz.timeLeft--;
      updateTimerDisplay();
      if (quiz.timeLeft <= 0) {
        clearInterval(quiz.timer);
        if (!quiz.answered) handleTimeout();
      }
    }, 1000);
  } else {
    document.getElementById("timer").textContent = "⏱ 不限时";
    document.getElementById("timer").className = "timer";
  }
}

function updateTimerDisplay() {
  const el = document.getElementById("timer");
  el.textContent = `⏱ ${String(quiz.timeLeft).padStart(2, "0")}s`;
  el.className = "timer";
  if (quiz.timeLeft <= 5) el.classList.add("danger");
  else if (quiz.timeLeft <= 10) el.classList.add("warn");
}

function normalizeFill(str) {
  return String(str).trim().replace(/\s+/g, " ");
}

function submitFill() {
  if (quiz.answered) return;
  const q = quiz.list[quiz.index];
  const inputEl = document.getElementById("fill-input");
  const userAns = normalizeFill(inputEl.value);
  if (!userAns) return;

  quiz.answered = true;
  clearInterval(quiz.timer);
  document.getElementById("btn-submit-fill").disabled = true;
  inputEl.disabled = true;

  const correctAns = normalizeFill(q.answer);
  // 允许一些等价写法（如 %3 和 ％3 等，简单处理）
  const isCorrect = userAns === correctAns ||
                    userAns.toLowerCase() === correctAns.toLowerCase();

  if (isCorrect) {
    inputEl.classList.add("correct");
    handleCorrect(q);
  } else {
    inputEl.classList.add("wrong");
    handleWrong(q, userAns);
  }
}

function selectAnswer(idx) {
  if (quiz.answered) return;
  quiz.answered = true;
  clearInterval(quiz.timer);

  const q = quiz.list[quiz.index];
  const opts = document.querySelectorAll(".option");
  const isCorrect = idx === q.answer;

  opts.forEach(o => o.classList.add("disabled"));

  if (isCorrect) {
    opts[idx].classList.add("correct");
    opts[idx].innerHTML = `<span class="mark">✓</span> <span>${opts[idx].querySelector("span:last-child").textContent}</span>`;
    handleCorrect(q, opts[idx]);
  } else {
    // 错误选项标记 ❌，正确答案高亮 ✓
    opts[idx].classList.add("wrong");
    opts[idx].innerHTML = `<span class="mark">❌</span> <span>${opts[idx].querySelector("span:last-child").textContent}</span>`;
    opts[q.answer].classList.add("correct");
    opts[q.answer].innerHTML = `<span class="mark">✓</span> <span>${opts[q.answer].querySelector("span:last-child").textContent}</span>`;
    // 关键：错误选项本身变成「下一题」按钮
    handleWrong(q, q.options[idx], opts[idx]);
  }
}

function handleCorrect(q, nextBtnEl) {
  quiz.correct++;
  quiz.combo++;
  if (quiz.combo > quiz.maxCombo) quiz.maxCombo = quiz.combo;
  const gain = 10 + Math.min(quiz.combo - 1, 5) * 2;
  quiz.xp += gain;

  soundCorrect();
  if (quiz.combo >= 2) soundCombo();

  if (nextBtnEl) {
    const rect = nextBtnEl.getBoundingClientRect();
    spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 10 + Math.min(quiz.combo, 5));
  } else {
    const inputEl = document.getElementById("fill-input");
    const rect = inputEl.getBoundingClientRect();
    spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
  }

  document.getElementById("xp-display").textContent = `+${gain} XP`;
  document.getElementById("combo-display").textContent = quiz.combo > 1 ? `🔥 ${quiz.combo} 连对` : "";

  updateWrongBookOnCorrect(q.id);
  recordMastery(q.knowledgePoint);
  showExplain(true, q);

  // 变成下一题按钮
  setTimeout(() => {
    if (nextBtnEl) {
      nextBtnEl.classList.add("next-btn");
      nextBtnEl.innerHTML = "▶ 下一题";
      nextBtnEl.classList.remove("disabled");
      nextBtnEl.onclick = () => nextQuestion();
    } else {
      // 填空题：在输入框下方加下一题
      const fillArea = document.getElementById("fill-area");
      const btn = document.createElement("button");
      btn.className = "btn-submit next-btn";
      btn.textContent = "▶ 下一题";
      btn.onclick = () => nextQuestion();
      fillArea.appendChild(btn);
    }
  }, 400);

  if (data.settings.autoNext > 0) {
    setTimeout(() => {
      if (quiz.answered) nextQuestion();
    }, data.settings.autoNext * 1000);
  }
}

function handleWrong(q, userAns, nextBtnEl) {
  quiz.wrong++;
  quiz.combo = 0;
  soundWrong();
  document.getElementById("combo-display").textContent = "";

  addToWrongBook(q, userAns);
  showExplain(false, q, userAns);

  setTimeout(() => {
    if (nextBtnEl) {
      nextBtnEl.classList.add("next-btn");
      nextBtnEl.innerHTML = "▶ 下一题";
      nextBtnEl.classList.remove("disabled");
      nextBtnEl.onclick = () => nextQuestion();
    } else {
      const fillArea = document.getElementById("fill-area");
      // 显示正确答案
      const tip = document.createElement("div");
      tip.style.cssText = "color:#86efac;margin-top:8px;font-size:0.95rem;";
      tip.textContent = `正确答案：${q.answer}`;
      fillArea.appendChild(tip);
      const btn = document.createElement("button");
      btn.className = "btn-submit next-btn";
      btn.style.marginTop = "8px";
      btn.textContent = "▶ 下一题";
      btn.onclick = () => nextQuestion();
      fillArea.appendChild(btn);
    }
  }, 300);
}

function handleTimeout() {
  if (quiz.answered) return;
  quiz.answered = true;
  quiz.wrong++;
  quiz.combo = 0;
  soundTimeout();

  const q = quiz.list[quiz.index];
  if (q.type === "fill") {
    const inputEl = document.getElementById("fill-input");
    inputEl.disabled = true;
    inputEl.classList.add("wrong");
    document.getElementById("btn-submit-fill").disabled = true;
    addToWrongBook(q, "(超时未答)");
    showExplain(false, q, "(超时未答)", true);
    setTimeout(() => {
      const fillArea = document.getElementById("fill-area");
      const tip = document.createElement("div");
      tip.style.cssText = "color:#86efac;margin-top:8px;";
      tip.textContent = `正确答案：${q.answer}`;
      fillArea.appendChild(tip);
      const btn = document.createElement("button");
      btn.className = "btn-submit next-btn";
      btn.textContent = "▶ 下一题";
      btn.onclick = () => nextQuestion();
      fillArea.appendChild(btn);
    }, 300);
  } else {
    const opts = document.querySelectorAll(".option");
    opts.forEach(o => o.classList.add("disabled"));
    opts[q.answer].classList.add("correct");
    opts[q.answer].innerHTML = `<span class="mark">✓</span> <span>${opts[q.answer].querySelector("span:last-child").textContent}</span>`;
    addToWrongBook(q, "(超时未答)");
    showExplain(false, q, "(超时未答)", true);
    setTimeout(() => {
      opts[q.answer].classList.add("next-btn");
      opts[q.answer].innerHTML = "▶ 下一题";
      opts[q.answer].classList.remove("disabled");
      opts[q.answer].onclick = () => nextQuestion();
    }, 300);
  }

  if (data.settings.autoNext > 0) {
    setTimeout(() => nextQuestion(), Math.max(data.settings.autoNext, 2) * 1000);
  }
}

function showExplain(ok, q, userAns, timeout = false) {
  const area = document.getElementById("explain-area");
  let status = ok ? "✓ 回答正确" : (timeout ? "⏰ 时间到" : "❌ 回答错误");
  let statusClass = ok ? "ok" : "bad";
  let extra = "";
  if (!ok) {
    let your = "（未作答）";
    if (userAns && userAns !== "(超时未答)") {
      your = (q.type === "fill") ? escapeHtml(String(userAns)) : formatOptionDisplay(userAns);
    }
    let correctText = "";
    if (q.type === "fill") {
      correctText = escapeHtml(String(q.answer));
    } else if (q.options) {
      correctText = formatOptionDisplay(q.options[q.answer]);
    }
    extra = `
      <div style="margin:8px 0;color:#fca5a5;">你的答案：${your}</div>
      <div style="margin:4px 0 10px;color:#86efac;">正确答案：${correctText}</div>
    `;
  }
  area.innerHTML = `
    <div class="explain-content">
      <div class="explain-status ${statusClass}">${status}</div>
      <div class="explain-kp">【知识点】${escapeHtml(q.knowledgePoint)}</div>
      ${extra}
      <div class="explain-body">${escapeHtml(q.explanation)}</div>
    </div>
  `;
}

function nextQuestion() {
  if (quiz.index + 1 >= quiz.list.length) {
    finishQuiz();
    return;
  }
  quiz.index++;
  renderQuestion();
}

function finishQuiz() {
  clearInterval(quiz.timer);
  soundFinish();
  const total = quiz.list.length;
  const acc = Math.round((quiz.correct / total) * 100);
  const duration = Math.round((Date.now() - quiz.startTime) / 1000);

  const record = makeHistoryRecord({
    date: new Date().toISOString(),
    bankId: currentBankId,
    mode: currentMode,
    total, correct: quiz.correct, wrong: quiz.wrong,
    accuracy: acc, maxCombo: quiz.maxCombo, xp: quiz.xp, duration
  });
  data.history.push(record);
  if (data.history.length > 80) data.history = data.history.slice(-80);
  data.totalXp = (data.totalXp || 0) + quiz.xp;
  if (!data.stats) data.stats = { totalSessions: 0, perfectSessions: 0, banksPlayed: {} };
  data.stats.totalSessions = (data.stats.totalSessions || 0) + 1;
  if (acc === 100) data.stats.perfectSessions = (data.stats.perfectSessions || 0) + 1;
  data.stats.banksPlayed = data.stats.banksPlayed || {};
  data.stats.banksPlayed[currentBankId] = true;
  saveData(data);
  updateStreak();
  const newly = checkAchievements({
    last: record,
    stats: data.stats,
    totalXp: data.totalXp,
    streak: data.streak,
    petPath: data.petPath
  });
  if (newly.length) {
    record.achievementIds = newly.map(a => a.id);
    // 回写最后一条
    data.history[data.history.length - 1] = record;
    saveData(data);
  }

  document.getElementById("r-total").textContent = total;
  document.getElementById("r-correct").textContent = quiz.correct;
  document.getElementById("r-wrong").textContent = quiz.wrong;
  document.getElementById("r-acc").textContent = acc + "%";
  document.getElementById("r-combo").textContent = quiz.maxCombo;
  document.getElementById("r-xp").textContent = quiz.xp;
  document.getElementById("r-time").textContent = formatDuration(duration);
  // 宠物成长提示
  try {
    const pet = getPetStage(data.totalXp || 0);
    const box = document.getElementById("compare-box");
    if (box && quiz.xp > 0) {
      const extra = document.createElement("div");
      extra.style.marginTop = "12px";
      extra.innerHTML = `🐾 宠物获得 <strong>+${quiz.xp} XP</strong> → ${pet.emoji} ${pet.name}`;
      box.appendChild(extra);
    }
  } catch (e) {}


  const box = document.getElementById("compare-box");
  if (data.history.length >= 2) {
    const prev = data.history[data.history.length - 2];
    const diff = acc - prev.accuracy;
    if (diff > 0) box.innerHTML = `上次：${prev.accuracy}%　本次：${acc}%<br><br>🎉 比上次进步了 ${diff}%！`;
    else if (diff < 0) box.innerHTML = `上次：${prev.accuracy}%　本次：${acc}%<br><br>💪 没关系，再练一组试试！`;
    else box.innerHTML = `上次：${prev.accuracy}%　本次：${acc}%<br><br>保持稳定，继续加油！`;
  } else {
    box.innerHTML = "这是你的第一次训练，继续加油！";
  }

  showView("result-view");
  updateHome();
}

/* ========== 错题本 ========== */
function addToWrongBook(q, userAns) {
  const key = q.dynamic ? `dyn_${q.knowledgePoint}_${Date.now()}` : String(q.id);
  if (!data.wrongBook[key]) {
    data.wrongBook[key] = { consecutiveCorrect: 0, timesWrong: 0 };
  }
  data.wrongBook[key].timesWrong++;
  data.wrongBook[key].consecutiveCorrect = 0;
  data.wrongBook[key].lastWrong = Date.now();
  data.wrongBook[key].snapshot = {
    question: q.question,
    options: q.options || null,
    answer: q.answer,
    type: q.type,
    explanation: q.explanation,
    knowledgePoint: q.knowledgePoint,
    userAns: userAns || ""
  };
  saveData(data);
}

function updateWrongBookOnCorrect(id) {
  // 对静态题按 id 更新；动态题暂不自动移除（因为 id 是临时的）
  const key = String(id);
  if (!data.wrongBook[key]) return;
  data.wrongBook[key].consecutiveCorrect = (data.wrongBook[key].consecutiveCorrect || 0) + 1;
  saveData(data);
}

let wrongFilterKp = null;

function renderWrongList() {
  const list = document.getElementById("wrong-list");
  const filterEl = document.getElementById("kp-filter");

  // 收集知识点
  const kpMap = {};
  Object.keys(data.wrongBook).forEach(id => {
    const w = data.wrongBook[id];
    if ((w.consecutiveCorrect || 0) >= 2) return;
    const kp = w.snapshot?.knowledgePoint || "其他";
    kpMap[kp] = (kpMap[kp] || 0) + 1;
  });

  // 渲染知识点标签
  filterEl.innerHTML = `<span class="kp-tag kp-tag-all ${!wrongFilterKp ? 'active' : ''}" data-kp="">全部</span>`;
  Object.keys(kpMap).sort().forEach(kp => {
    const tag = document.createElement("span");
    tag.className = `kp-tag ${wrongFilterKp === kp ? 'active' : ''}`;
    tag.dataset.kp = kp;
    tag.textContent = `${kp} (${kpMap[kp]})`;
    tag.onclick = () => {
      wrongFilterKp = kp || null;
      renderWrongList();
    };
    filterEl.appendChild(tag);
  });
  filterEl.querySelector(".kp-tag-all").onclick = () => {
    wrongFilterKp = null;
    renderWrongList();
  };

  const ids = Object.keys(data.wrongBook).filter(id => {
    const w = data.wrongBook[id];
    if ((w.consecutiveCorrect || 0) >= 2) return false;
    if (wrongFilterKp && w.snapshot?.knowledgePoint !== wrongFilterKp) return false;
    return true;
  });

  document.getElementById("wrong-list-count").textContent = `(${ids.length})`;

  if (!ids.length) {
    list.innerHTML = "<p style='color:#94a3b8;text-align:center;padding:40px;'>太棒了，暂无待复习错题！🎉</p>";
    return;
  }

  list.innerHTML = "";
  ids.forEach(id => {
    const w = data.wrongBook[id];
    const s = w.snapshot;
    if (!s) return;
    const div = document.createElement("div");
    div.className = "wrong-item";
    let ansDisplay = "";
    if (s.type === "fill") {
      ansDisplay = `正确答案：${escapeHtml(String(s.answer))}`;
    } else if (s.options) {
      ansDisplay = `正确答案：${formatOptionDisplay(s.options[s.answer] || "")}`;
    }
    div.innerHTML = `
      <div class="q-title">
        <span class="kp-tag" style="cursor:default;margin-right:8px;">${escapeHtml(s.knowledgePoint)}</span>
      </div>
      <div style="white-space:pre-wrap;font-family:monospace;font-size:0.9rem;margin:8px 0;">${formatQuestionText(s.question)}</div>
      <div class="meta">${ansDisplay}</div>
      ${s.userAns ? `<div class="meta" style="color:#fca5a5;">你的答案：${escapeHtml(String(s.userAns))}</div>` : ""}
      <div class="exp">${escapeHtml(s.explanation)}</div>
      <button class="btn-redo" data-id="${id}">再做一次</button>
    `;
    list.appendChild(div);
  });

  list.querySelectorAll(".btn-redo").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const snap = data.wrongBook[id].snapshot;
      const q = {
        id: id,
        type: snap.type || "choice",
        question: snap.question,
        options: snap.options,
        answer: snap.answer,
        explanation: snap.explanation,
        knowledgePoint: snap.knowledgePoint,
        difficulty: 3,
        category: "review"
      };
      quiz.list = [q];
      quiz.index = 0;
      quiz.correct = 0;
      quiz.wrong = 0;
      quiz.combo = 0;
      quiz.maxCombo = 0;
      quiz.xp = 0;
      quiz.startTime = Date.now();
      document.getElementById("mode-label").textContent = "错题复习";
      showView("quiz-view");
      renderQuestion();
    };
  });
}

/* ========== 历史 ========== */
function renderHistory() {
  const list = document.getElementById("history-list");
  const hist = data.history.slice().reverse().slice(0, 15);
  if (!hist.length) {
    list.innerHTML = "<p style='color:#94a3b8;text-align:center;'>暂无训练记录</p>";
  } else {
    list.innerHTML = hist.map(h => {
      const d = new Date(h.date);
      const dateStr = `${d.getMonth() + 1}月${d.getDate()}日`;
      const modeStr = MODE_LABELS[h.mode] || "综合";
      const timeStr = h.duration != null ? formatDuration(h.duration) : "--";
      return `<div class="history-item">
        <span>${dateStr}</span>
        <span>${modeStr}</span>
        <span>${h.total}题 · ${h.accuracy}%</span>
        <span>用时 ${timeStr}</span>
        <span>连击 ${h.maxCombo}</span>
      </div>`;
    }).join("");
  }
  drawChart();
}

function drawChart() {
  const c = document.getElementById("acc-chart");
  const cx = c.getContext("2d");
  const w = c.width, h = c.height;
  cx.clearRect(0, 0, w, h);
  const hist = data.history.slice(-10);
  if (hist.length < 2) {
    cx.fillStyle = "#94a3b8";
    cx.font = "14px sans-serif";
    cx.fillText("数据不足，多练几次后显示趋势", 60, h / 2);
    return;
  }
  const pad = 30;
  cx.strokeStyle = "#334155";
  cx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad + (h - 2 * pad) * (1 - i / 4);
    cx.beginPath();
    cx.moveTo(pad, y);
    cx.lineTo(w - pad, y);
    cx.stroke();
    cx.fillStyle = "#64748b";
    cx.font = "11px sans-serif";
    cx.fillText((i * 25) + "%", 4, y + 4);
  }
  cx.beginPath();
  cx.strokeStyle = "#3b82f6";
  cx.lineWidth = 2.5;
  hist.forEach((r, i) => {
    const x = pad + (i / (hist.length - 1)) * (w - 2 * pad);
    const y = pad + (1 - r.accuracy / 100) * (h - 2 * pad);
    if (i === 0) cx.moveTo(x, y);
    else cx.lineTo(x, y);
  });
  cx.stroke();
  hist.forEach((r, i) => {
    const x = pad + (i / (hist.length - 1)) * (w - 2 * pad);
    const y = pad + (1 - r.accuracy / 100) * (h - 2 * pad);
    cx.beginPath();
    cx.arc(x, y, 4, 0, Math.PI * 2);
    cx.fillStyle = "#60a5fa";
    cx.fill();
  });
}

/* ========== 设置 ========== */
function loadSettingsToUI() {
  const gs = data.settings || defaultGlobalSettings();
  const nameInput = document.getElementById("input-user-name");
  if (nameInput) nameInput.value = data.userName || getConfig().userName || "";
  document.querySelectorAll('input[name="timePerQ"]').forEach(r => r.checked = +r.value === gs.timePerQ);
  document.querySelectorAll('input[name="qCount"]').forEach(r => r.checked = +r.value === gs.qCount);
  document.querySelectorAll('input[name="autoNext"]').forEach(r => r.checked = +r.value === gs.autoNext);
  document.querySelectorAll('input[name="sound"]').forEach(r => r.checked = (r.value === "1") === !!gs.sound);
  document.querySelectorAll('input[name="anim"]').forEach(r => r.checked = (r.value === "1") === !!gs.anim);
  const blessOn = gs.petBless !== false;
  document.querySelectorAll('input[name="petBless"]').forEach(r => r.checked = (r.value === "1") === blessOn);

  // 题库设置
  const comp = getBankSetting("complexity", 2);
  document.querySelectorAll('input[name="complexity"]').forEach(r => r.checked = +r.value === comp);
  const enStr = getBankSetting("enableString", false) === true;
  document.querySelectorAll('input[name="enableString"]').forEach(r => r.checked = (r.value === "1") === enStr);

  const isPrintf = currentBankId === "printf-scanf";
  const bank = getCurrentBank();
  const title = document.getElementById("bank-settings-title");
  if (title) title.textContent = (bank && bank.name) || currentBankId;
  const cg = document.getElementById("setting-complexity-group");
  const sg = document.getElementById("setting-string-group");
  const note = document.getElementById("setting-bank-note");
  if (cg) cg.style.display = isPrintf ? "" : "none";
  if (sg) sg.style.display = isPrintf ? "" : "none";
  if (note) note.style.display = isPrintf ? "none" : "";
}

function saveSettingsFromUI() {
  const nameInput = document.getElementById("input-user-name");
  if (nameInput) data.userName = nameInput.value.trim();
  if (!data.settings) data.settings = defaultGlobalSettings();
  data.settings.timePerQ = +document.querySelector('input[name="timePerQ"]:checked').value;
  data.settings.qCount = +document.querySelector('input[name="qCount"]:checked').value;
  data.settings.autoNext = +document.querySelector('input[name="autoNext"]:checked').value;
  data.settings.sound = document.querySelector('input[name="sound"]:checked').value === "1";
  data.settings.anim = document.querySelector('input[name="anim"]:checked').value === "1";
  const blessEl = document.querySelector('input[name="petBless"]:checked');
  data.settings.petBless = blessEl ? blessEl.value === "1" : true;
  // 题库级
  const compEl = document.querySelector('input[name="complexity"]:checked');
  if (compEl) setBankSetting("complexity", +compEl.value);
  const strEl = document.querySelector('input[name="enableString"]:checked');
  if (strEl) setBankSetting("enableString", strEl.value === "1");
  saveData(data);
  refreshUserDisplay();
}

/* ========== 事件 ========== */
const bankSelect = document.getElementById("bank-select");
if (bankSelect) {
  // 用已注册题库刷新下拉（若 HTML 选项不全也能对齐）
  const ids = Object.keys(QUESTION_BANKS);
  if (ids.length) {
    const cur = bankSelect.value;
    bankSelect.innerHTML = ids.map(id => {
      const b = QUESTION_BANKS[id];
      const name = (b && b.name) || id;
      return `<option value="${id}">${name}</option>`;
    }).join("");
    bankSelect.value = QUESTION_BANKS[cur] ? cur : (ids[0] || "printf-scanf");
  }
  bankSelect.onchange = () => setCurrentBank(bankSelect.value);
  setCurrentBank(bankSelect.value);
} else {
  refreshModeButtons();
}


document.getElementById("btn-start").onclick = () => startQuiz();
const homePet = document.getElementById("home-pet");
if (homePet) homePet.onclick = () => { renderPetPage(); showView("pet-view"); };
document.getElementById("btn-pet").onclick = () => { renderPetPage(); showView("pet-view"); };
document.getElementById("btn-achieve").onclick = () => { renderAchievePage(); showView("achieve-view"); };
document.getElementById("btn-achieve-back").onclick = () => { showView("home-view"); updateHome(); };
document.getElementById("btn-pet-back").onclick = () => { showView("home-view"); updateHome(); maybeShowPetBless(); };

document.getElementById("btn-settings").onclick = () => { loadSettingsToUI(); showView("settings-view"); };
document.getElementById("btn-save-settings").onclick = () => { saveSettingsFromUI(); showView("home-view"); updateHome(); };
document.getElementById("btn-wrong").onclick = () => { wrongFilterKp = null; renderWrongList(); showView("wrong-view"); };
document.getElementById("btn-wrong-back").onclick = () => { showView("home-view"); updateHome(); maybeShowPetBless(); };
document.getElementById("btn-history").onclick = () => { renderHistory(); showView("history-view"); };
document.getElementById("btn-history-back").onclick = () => showView("home-view");
document.getElementById("btn-retry").onclick = () => startQuiz();
document.getElementById("btn-view-wrong").onclick = () => { wrongFilterKp = null; renderWrongList(); showView("wrong-view"); };
document.getElementById("btn-home").onclick = () => { showView("home-view"); updateHome(); maybeShowPetBless(); };

/* 初始化 */
updateHome();
maybeShowPetBless();

// 供 system 模块调用的桥接
if (typeof window !== "undefined") {
  window.getUserName = getUserName;
  window.getConfig = getConfig;
  window.updateHome = updateHome;
  window.refreshUserDisplay = refreshUserDisplay;
}
