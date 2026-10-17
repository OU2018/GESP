/**
 * GESP C++ 一级 智能组卷引擎（generator.js）
 *
 * 三层架构：
 *   ① 元素库 FACTS —— 按考点组织的原子素材池（标识符、类型、设备、单位……）
 *   ② 生成器 GENERATORS —— 28 个 make(rng) 函数，元素组合出题；
 *      计算类题目的正确答案一律由 ③ 求值器算出，干扰项按「典型错误模式」生成
 *   ③ C++ 表达式子集求值器 CEval —— tokenize + AST + 求值，作为标准答案的 ground truth
 *
 * 注册为虚拟题库 GESP_BANKS["gen-exam"]，加载时预生成 staticQuestions。
 * 题目按「日种子」轮换：同一天内容稳定（便于反馈错题），隔天自动换卷。
 */
(function () {
  "use strict";

  /* =========================================================
   * ① 元素库 FACTS
   * ========================================================= */
  var FACTS = {
    // 合法标识符（字母/下划线开头，仅含字母数字下划线）
    IDENT_OK: [
      "age", "student_score", "_count", "x2", "sum1", "_tmp", "maxValue",
      "n_1", "a_b_c", "dayOfWeek", "total_sum", "_x", "score2", "myBook",
      "class_1", "for_ever", "int_x", "num3", "user_name", "_data"
    ],
    // 非法标识符（s: 内容, why: 错误原因）
    IDENT_BAD: [
      { s: "2score", why: "以数字开头" },
      { s: "my-name", why: "包含连字符 -" },
      { s: "a.b", why: "包含小数点 ." },
      { s: "$money", why: "包含 $ 符号" },
      { s: "@email", why: "包含 @ 符号" },
      { s: "num#1", why: "包含 # 符号" },
      { s: "my name", why: "包含空格" },
      { s: "3rd", why: "以数字开头" },
      { s: "9num", why: "以数字开头" },
      { s: "x+y", why: "包含 + 号" }
    ],
    // 会被误认为「只是普通标识符」的关键字（作为非法标识符出题）
    IDENT_BAD_KEYWORD: [
      { s: "int", why: "int 是 C++ 关键字" },
      { s: "float", why: "float 是 C++ 关键字" },
      { s: "double", why: "double 是 C++ 关键字" },
      { s: "char", why: "char 是 C++ 关键字" },
      { s: "bool", why: "bool 是 C++ 关键字" },
      { s: "if", why: "if 是 C++ 关键字" },
      { s: "else", why: "else 是 C++ 关键字" },
      { s: "for", why: "for 是 C++ 关键字" },
      { s: "while", why: "while 是 C++ 关键字" },
      { s: "return", why: "return 是 C++ 关键字" },
      { s: "break", why: "break 是 C++ 关键字" },
      { s: "true", why: "true 是 C++ 关键字（布尔字面量）" },
      { s: "false", why: "false 是 C++ 关键字（布尔字面量）" },
      { s: "const", why: "const 是 C++ 关键字" },
      { s: "switch", why: "switch 是 C++ 关键字" }
    ],
    KEYWORDS: [
      "int", "double", "char", "bool", "if", "else", "for", "while", "do",
      "return", "break", "continue", "switch", "case", "default", "true",
      "false", "const", "void", "long", "short", "unsigned", "struct",
      "class", "new", "delete", "using", "namespace", "static", "float"
    ],
    // 不是关键字但常被误认（main/printf/cout 是标识符或库内容）
    NOT_KEYWORDS: [
      "main", "printf", "cin", "cout", "endl", "include", "iostream", "std",
      "string", "abs", "max", "min", "size", "function", "define", "print", "scan"
    ],
    // 变量命名场景：见名知意
    NAME_SCENES: [
      { scene: "学生的年龄", good: "age", why: "age 直接表达「年龄」" },
      { scene: "全班的总分", good: "totalScore", why: "totalScore 表达「总分」" },
      { scene: "圆的半径", good: "radius", why: "radius 表达「半径」" },
      { scene: "一本书的页数", good: "pageCount", why: "pageCount 表达「页数」" },
      { scene: "学生的姓名（拼音）", good: "name", why: "name 表达「姓名」" },
      { scene: "考试及格的人数", good: "passCount", why: "passCount 表达「及格人数」" },
      { scene: "游戏当前的关卡", good: "level", why: "level 表达「关卡」" },
      { scene: "正方形的边长", good: "sideLen", why: "sideLen 表达「边长」" }
    ],
    // 数据类型选择场景
    TYPE_SCENES: [
      { scene: "学生的年龄（如 12 岁）", type: "int", why: "年龄是整数，用 int。" },
      { scene: "期末平均分（如 92.5 分）", type: "double", why: "平均分可能有小数，用 double。" },
      { scene: "学生的成绩等级（用 A/B/C 表示）", type: "char", why: "单个字符用 char。" },
      { scene: "一道判断题的对错", type: "bool", why: "只有真/假两种状态，用 bool。" },
      { scene: "一本书的页数", type: "int", why: "页数是整数，用 int。" },
      { scene: "体检的身高（如 1.62 米）", type: "double", why: "身高有小数，用 double。" },
      { scene: "开关的开/关状态", type: "bool", why: "开/关是两种状态，用 bool。" },
      { scene: "车牌号中的一位字母", type: "char", why: "单个字符用 char。" }
    ],
    TYPE_ALL: ["int", "double", "char", "bool"],
    // 类型字节数 / 范围（静态小池）
    TYPE_FACTS: [
      {
        q: "在常见的 64 位系统上，C++ 的 int 类型通常占几个字节？",
        opts: ["1", "2", "4", "8"], a: 2,
        exp: "常见平台上 int 占 4 字节。"
      },
      {
        q: "C++ 的 char 类型占几个字节？",
        opts: ["1", "2", "4", "8"], a: 0,
        exp: "char 占 1 字节，正好存放一个字符。"
      },
      {
        q: "int 类型的取值范围大约是？",
        opts: ["约 -21 亿 ~ 21 亿", "0 ~ 65535", "约 -92 亿亿 ~ 92 亿亿", "0 ~ 255"], a: 0,
        exp: "int 为 32 位有符号整数，范围约 ±21 亿（-2^31 ~ 2^31-1）。"
      },
      {
        q: "要存放小数（如 3.14），应使用的类型是？",
        opts: ["int", "bool", "char", "double"], a: 3,
        exp: "小数用浮点类型 double（float 也可以，但 double 更常用、精度更高）。"
      }
    ],
    ASCII: { a: 97, A: 65, zero: 48 },
    // 计算机基础：设备分类
    DEVICES: {
      input: ["键盘", "鼠标", "扫描仪", "麦克风", "摄像头", "手写板"],
      output: ["显示器", "打印机", "音箱", "投影仪"],
      both: ["触摸屏"],
      storage: ["硬盘", "U 盘", "光盘", "内存条"],
      compute: ["CPU"]
    },
    // 存储单位（相邻进率 1024）
    UNITS: ["B", "KB", "MB", "GB", "TB"],
    // 计算机基础：静态事实池
    PROCESS_FACTS: [
      {
        q: "C++ 源程序（.cpp 文件）要经过哪一步才能生成可执行程序？",
        opts: ["编译（和链接）", "直接双击运行", "压缩打包", "上传到网络"], a: 0,
        exp: "源程序必须先编译成机器代码并链接，才能生成可执行程序。"
      },
      {
        q: "CPU 能直接识别并执行的是？",
        opts: ["机器语言程序", "C++ 源程序", "中文指令", "流程图"], a: 0,
        exp: "CPU 只能直接执行机器语言；C++ 源程序要先编译成机器码。"
      },
      {
        q: "从写代码到看到结果，正确的顺序是？",
        opts: ["编辑 → 编译 → 链接 → 运行", "运行 → 编辑 → 编译", "编译 → 编辑 → 运行", "链接 → 编辑 → 编译"], a: 0,
        exp: "先编辑源代码，再编译成目标文件，链接库后运行。"
      }
    ],
    MEM_FACTS: [
      {
        q: "程序运行时，正在使用的数据和指令主要存放在？",
        opts: ["内存（RAM）", "硬盘", "U 盘", "光盘"], a: 0,
        exp: "运行时的程序和数据装在内存中，CPU 从内存读取执行。"
      },
      {
        q: "关于内存（RAM）和硬盘，下列说法正确的是？",
        opts: [
          "内存断电后数据丢失，硬盘断电后数据保留",
          "内存断电后数据保留，硬盘断电后数据丢失",
          "两者断电后数据都保留",
          "两者断电后数据都丢失"
        ], a: 0,
        exp: "RAM 是易失性存储，断电丢失；硬盘是外存，断电保留。"
      }
    ],
    // 判断题静态池（正确/错误混合，f 为正确答案 0=正确 1=错误）
    OS_JUDGE: [
      { s: "Windows 和 Linux 都是操作系统。", f: 0, exp: "两者都是常见的操作系统。" },
      { s: "操作系统属于应用软件。", f: 1, exp: "操作系统是系统软件，不是应用软件。" },
      { s: "操作系统负责管理计算机的硬件与软件资源。", f: 0, exp: "这是操作系统的基本职责。" },
      { s: "Word 文字处理软件是一种操作系统。", f: 1, exp: "Word 是应用软件。" }
    ],
    SYNTAX_JUDGE: [
      { s: "C++ 中每条语句的结尾都要加分号 ;。", f: 0, exp: "分号是语句结束的标志。" },
      { s: "C++ 不区分大小写，Name 和 name 是同一个变量。", f: 1, exp: "C++ 区分大小写，两者是不同变量。" },
      { s: "一个变量必须先定义（声明）才能使用。", f: 0, exp: "先定义后使用是 C++ 的基本规则。" },
      { s: "用 const 定义的常量在程序中可以随时修改。", f: 1, exp: "const 常量初始化后不能修改。" },
      { s: "注释内容会被编译进程序一起执行。", f: 1, exp: "注释是给人看的，编译时被忽略。" },
      { s: "一行内可以写多条以分号分隔的语句。", f: 0, exp: "用分号分隔即可，一行可写多条语句。" }
    ],
    IO_JUDGE: [
      { s: "scanf(\"%d\", &x); 中 &x 表示取变量 x 的地址。", f: 0, exp: "& 是取地址符，scanf 需要地址来写入数据。" },
      { s: "scanf(\"%d\", x); （x 为 int 变量）是正确写法。", f: 1, exp: "缺少 &，scanf 无法把读到的值写回变量。" },
      { s: "printf(\"%d\", 3+4); 会输出 7。", f: 0, exp: "printf 先计算表达式 3+4 再按 %d 输出 7。" }
    ]
  };

  /* =========================================================
   * 通用工具：可播种随机数 + 选项组装
   * ========================================================= */
  // mulberry32：小而稳的可播种 PRNG
  function makeRng(seed) {
    var s = (seed >>> 0) || 1;
    return function () {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function rint(rng, a, b) { return a + Math.floor(rng() * (b - a + 1)); }
  function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
  // 洗牌（返回新数组）
  function shuf(rng, arr) {
    var cp = arr.slice();
    for (var i = cp.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = cp[i]; cp[i] = cp[j]; cp[j] = t;
    }
    return cp;
  }
  // 不重复抽取 n 个
  function pickN(rng, arr, n) { return shuf(rng, arr).slice(0, n); }

  // 组装四选一：correctText 为正确项文本，wrongTexts 为候选干扰项（典型错误值）
  // 返回 {options, answer}；干扰项不足 3 个时返回 null（触发重试）
  function buildChoice(rng, correctText, wrongTexts) {
    correctText = String(correctText);
    var uniq = [];
    for (var i = 0; i < wrongTexts.length && uniq.length < 3; i++) {
      var t = String(wrongTexts[i]);
      if (t !== correctText && uniq.indexOf(t) < 0) uniq.push(t);
    }
    if (uniq.length < 3) return null;
    var opts = shuf(rng, [correctText].concat(uniq));
    return { options: opts, answer: opts.indexOf(correctText) };
  }

  // 用随机兜底值补足干扰项（correct ±1、×2 等），仍不足返回 null
  function numWrongs(correct, extra) {
    var pool = (extra || []).concat([correct + 1, correct - 1, correct * 2, correct + 2, correct - 2, correct + 10]);
    return pool.filter(function (v) { return v !== correct; });
  }

  // 重试包装：最多试 20 次直到生成成功
  function attempt(rng, gen) {
    for (var i = 0; i < 20; i++) {
      var q = gen(rng);
      if (q) return q;
    }
    return null;
  }

  // 题目构造器（category/kp/diff 固定，生成器内部只关心内容）
  function C(category, kp, diff) {
    return function (question, options, answer, explanation, type) {
      return {
        type: type || "choice", category: category, difficulty: diff,
        knowledgePoint: kp, question: question, options: options,
        answer: answer, explanation: explanation
      };
    };
  }

  /* =========================================================
   * ③ C++ 表达式子集求值器 CEval（ground truth）
   * 支持：整数字面量、字符字面量（'a'）、变量、括号、
   *   单目 + - !、前置/后置 ++ --、
   *   双目 + - * / %、关系 < <= > >= == !=、逻辑 && ||（短路）、三目 ?:、
   *   赋值 = += -= *= /= %=、语句分隔 ;
   * 全 int 语义：除法向零截断（与 C++ 一致）
   * ========================================================= */
  var CEval = (function () {
    var TWO_OPS = ["++", "--", "+=", "-=", "*=", "/=", "%=", "==", "!=", "<=", ">=", "&&", "||"];
    var ONE_OPS = "+-*/%<>=!?:(),;";

    function tokenize(src) {
      var toks = [], i = 0, n = src.length;
      while (i < n) {
        var c = src[i];
        if (c === " " || c === "\n" || c === "\t" || c === "\r") { i++; continue; }
        if (c >= "0" && c <= "9") {
          var v = 0;
          while (i < n && src[i] >= "0" && src[i] <= "9") { v = v * 10 + (src.charCodeAt(i) - 48); i++; }
          toks.push({ t: "num", v: v }); continue;
        }
        if (/[A-Za-z_]/.test(c)) {
          var s = "";
          while (i < n && /[A-Za-z0-9_]/.test(src[i])) { s += src[i]; i++; }
          toks.push({ t: "id", v: s }); continue;
        }
        if (c === "'") { // 字符字面量：'a' 或 '\n'
          var ch;
          if (src[i + 1] === "\\") {
            var e = src[i + 2];
            ch = e === "n" ? 10 : e === "t" ? 9 : e.charCodeAt(0);
          } else { ch = src.charCodeAt(i + 1); }
          toks.push({ t: "num", v: ch });
          i = src.indexOf("'", i + 2) + 1; // 跳到闭合引号
          continue;
        }
        var two = src.substr(i, 2);
        if (TWO_OPS.indexOf(two) >= 0) { toks.push({ t: "op", v: two }); i += 2; continue; }
        if (ONE_OPS.indexOf(c) >= 0) { toks.push({ t: "op", v: c }); i++; continue; }
        throw new Error("CEval: 无法识别的字符 " + c);
      }
      return toks;
    }

    function parse(toks) {
      var p = 0;
      function peek() { return toks[p]; }
      function next() { return toks[p++]; }
      function isOp(vals) { var tk = toks[p]; return !!tk && tk.t === "op" && vals.indexOf(tk.v) >= 0; }
      function expect(op) {
        var tk = next();
        if (!tk || tk.t !== "op" || tk.v !== op) throw new Error("CEval: 期望 " + op);
      }
      function parseAssign() {
        var l = parseTernary();
        if (isOp(["=", "+=", "-=", "*=", "/=", "%="])) {
          var op = next().v;
          if (l.k !== "id") throw new Error("CEval: 赋值左侧必须是变量");
          return { k: "asg", op: op, n: l.n, b: parseAssign() };
        }
        return l;
      }
      function parseTernary() {
        var c = parseOr();
        if (isOp(["?"])) {
          next();
          var a = parseAssign();
          expect(":");
          return { k: "tri", c: c, a: a, b: parseTernary() };
        }
        return c;
      }
      function binLevel(sub, ops) {
        var l = sub();
        while (isOp(ops)) { var op = next().v; l = { k: "bin", op: op, a: l, b: sub() }; }
        return l;
      }
      function parseOr() { return binLevel(parseAnd, ["||"]); }
      function parseAnd() { return binLevel(parseEq, ["&&"]); }
      function parseEq() { return binLevel(parseRel, ["==", "!="]); }
      function parseRel() { return binLevel(parseAdd, ["<", "<=", ">", ">="]); }
      function parseAdd() { return binLevel(parseMul, ["+", "-"]); }
      function parseMul() { return binLevel(parseUnary, ["*", "/", "%"]); }
      function parseUnary() {
        if (isOp(["++", "--"])) {
          var op = next().v, a = parseUnary();
          if (a.k !== "id") throw new Error("CEval: ++/-- 只能作用于变量");
          return { k: "pre", op: op, n: a.n };
        }
        if (isOp(["+", "-", "!"])) { var o = next().v; return { k: "un", op: o, a: parseUnary() }; }
        return parsePostfix();
      }
      function parsePostfix() {
        var a = parsePrimary();
        while (isOp(["++", "--"])) {
          var op = next().v;
          if (a.k !== "id") throw new Error("CEval: ++/-- 只能作用于变量");
          a = { k: "post", op: op, n: a.n };
        }
        return a;
      }
      function parsePrimary() {
        var tk = next();
        if (!tk) throw new Error("CEval: 表达式不完整");
        if (tk.t === "num") return { k: "num", v: tk.v };
        if (tk.t === "id") return { k: "id", n: tk.v };
        if (tk.v === "(") { var e = parseAssign(); expect(")"); return e; }
        throw new Error("CEval: 意外的记号 " + tk.v);
      }
      var ast = parseAssign();
      if (p < toks.length) throw new Error("CEval: 表达式末尾有多余内容");
      return ast;
    }

    // C++ 整数除法：向零截断
    function cdiv(a, b) {
      if (b === 0) throw new Error("CEval: 除以零");
      var q = a / b;
      return q < 0 ? Math.ceil(q) : Math.floor(q);
    }
    function cmod(a, b) { return a - cdiv(a, b) * b; }

    function evalNode(nd, env) {
      switch (nd.k) {
        case "num": return nd.v;
        case "id":
          if (!Object.prototype.hasOwnProperty.call(env, nd.n)) throw new Error("CEval: 未定义变量 " + nd.n);
          return env[nd.n];
        case "un":
          var u = evalNode(nd.a, env);
          if (nd.op === "-") return -u;
          if (nd.op === "+") return u;
          return u ? 0 : 1; // !
        case "pre":
          var pv = env[nd.n] + (nd.op === "++" ? 1 : -1);
          env[nd.n] = pv; return pv;
        case "post":
          var ov = env[nd.n];
          env[nd.n] = ov + (nd.op === "++" ? 1 : -1);
          return ov;
        case "asg":
          var r = evalNode(nd.b, env), cur = env[nd.n], val;
          if (nd.op === "=") val = r;
          else if (nd.op === "+=") val = cur + r;
          else if (nd.op === "-=") val = cur - r;
          else if (nd.op === "*=") val = cur * r;
          else if (nd.op === "/=") val = cdiv(cur, r);
          else val = cmod(cur, r);
          env[nd.n] = val; return val;
        case "bin":
          if (nd.op === "&&") return (evalNode(nd.a, env) && evalNode(nd.b, env)) ? 1 : 0;
          if (nd.op === "||") return (evalNode(nd.a, env) || evalNode(nd.b, env)) ? 1 : 0;
          var x = evalNode(nd.a, env), y = evalNode(nd.b, env);
          switch (nd.op) {
            case "+": return x + y;
            case "-": return x - y;
            case "*": return x * y;
            case "/": return cdiv(x, y);
            case "%": return cmod(x, y);
            case "<": return x < y ? 1 : 0;
            case "<=": return x <= y ? 1 : 0;
            case ">": return x > y ? 1 : 0;
            case ">=": return x >= y ? 1 : 0;
            case "==": return x === y ? 1 : 0;
            case "!=": return x !== y ? 1 : 0;
          }
          throw new Error("CEval: 未知运算符 " + nd.op);
        case "tri": return evalNode(nd.c, env) ? evalNode(nd.a, env) : evalNode(nd.b, env);
      }
      throw new Error("CEval: 未知节点");
    }

    /**
     * 求值入口。src 支持分号分隔的多条语句（副作用累积），取最后一条语句的值。
     * CEval.run("a = 3; b = 5; a + b * 2", {}) -> { value: 13, env: {a:3,b:5} }
     */
    function run(src, envInit) {
      var env = {};
      if (envInit) for (var k in envInit) if (Object.prototype.hasOwnProperty.call(envInit, k)) env[k] = envInit[k];
      var toks = tokenize(src);
      // 按 ';' 切分成语句段
      var segs = [], cur = [];
      for (var i = 0; i < toks.length; i++) {
        if (toks[i].t === "op" && toks[i].v === ";") { if (cur.length) { segs.push(cur); cur = []; } }
        else cur.push(toks[i]);
      }
      if (cur.length) segs.push(cur);
      if (!segs.length) throw new Error("CEval: 空表达式");
      var value = 0;
      for (var j = 0; j < segs.length; j++) {
        value = evalNode(parse(segs[j]), env);
      }
      return { value: value, env: env };
    }

    return { run: run, cdiv: cdiv, cmod: cmod };
  })();

  /* =========================================================
   * ② 生成器 GENERATORS
   * 统一签名 gen(rng) -> 题对象 | null（null 触发 attempt 重试）
   * 原则：计算类题目的正确答案由 CEval 求出（ground truth），
   *       干扰项按「典型错误模式」构造
   * ========================================================= */
  var GENS = [];
  function reg(cat, kp, diff, gen) { GENS.push({ cat: cat, kp: kp, diff: diff, gen: gen }); }

  /* ---------- 标识符与命名 ---------- */

  // 哪个是 / 不是 合法标识符
  reg("ident", "标识符规则", 4, function (rng) {
    if (rng() < 0.55) {
      var good = pick(rng, FACTS.IDENT_OK);
      var bads = pickN(rng, FACTS.IDENT_BAD, 3);
      var ch = buildChoice(rng, good, bads.map(function (b) { return b.s; }));
      if (!ch) return null;
      return C("ident", "标识符规则", 4)(
        "下列选项中，能用作 C++ 变量名（合法标识符）的是？",
        ch.options, ch.answer,
        "标识符只能由字母、数字、下划线组成，且不能以数字开头，也不能是关键字。" +
        bads.map(function (b) { return b.s + "（" + b.why + "）"; }).join("；") + "。"
      );
    }
    var bad = pick(rng, FACTS.IDENT_BAD);
    var goods = pickN(rng, FACTS.IDENT_OK, 3);
    var ch2 = buildChoice(rng, bad.s, goods);
    if (!ch2) return null;
    return C("ident", "标识符规则", 4)(
      "下列选项中，不能用作 C++ 变量名（非法标识符）的是？",
      ch2.options, ch2.answer,
      bad.s + " 不能作为标识符：" + bad.why + "。"
    );
  });

  // 哪个是 / 不是 关键字
  reg("ident", "关键字", 4, function (rng) {
    if (rng() < 0.5) {
      var kw = pick(rng, FACTS.KEYWORDS);
      var nk = pickN(rng, FACTS.NOT_KEYWORDS, 3);
      var ch = buildChoice(rng, kw, nk);
      if (!ch) return null;
      return C("ident", "关键字", 4)(
        "下列选项中，属于 C++ 关键字的是？",
        ch.options, ch.answer,
        kw + " 是 C++ 关键字；" + nk.join("、") + " 都不是关键字（它们是普通标识符、库内容或预处理指令的一部分）。"
      );
    }
    var nk2 = pick(rng, FACTS.NOT_KEYWORDS);
    var kw2 = pickN(rng, FACTS.KEYWORDS, 3);
    var ch2 = buildChoice(rng, nk2, kw2);
    if (!ch2) return null;
    return C("ident", "关键字", 4)(
      "下列选项中，不属于 C++ 关键字的是？",
      ch2.options, ch2.answer,
      nk2 + " 不是关键字。main 是函数名，printf/cout 是库提供的名字，include/define 属于预处理指令，都不是关键字。"
    );
  });

  // 非法标识符错在哪
  reg("ident", "标识符命名错误", 4, function (rng) {
    var bad = pick(rng, FACTS.IDENT_BAD.concat(FACTS.IDENT_BAD_KEYWORD));
    var others = pickN(rng, FACTS.IDENT_BAD, 5).filter(function (o) { return o.why !== bad.why; });
    var ch = buildChoice(rng, bad.why, others.map(function (o) { return o.why; }));
    if (!ch) return null;
    return C("ident", "标识符命名错误", 4)(
      "标识符 " + bad.s + " 不合法，原因是？",
      ch.options, ch.answer,
      bad.s + " " + bad.why + "。标识符只能由字母、数字、下划线组成，且不能以数字开头，也不能是关键字。"
    );
  });

  // 见名知意的命名
  reg("ident", "变量命名", 4, function (rng) {
    var BAD_NAMES = ["a", "x", "xx", "num", "data", "s1", "n2", "tmp", "val", "q"];
    var sc = pick(rng, FACTS.NAME_SCENES);
    var ch = buildChoice(rng, sc.good, pickN(rng, BAD_NAMES, 4));
    if (!ch) return null;
    return C("ident", "变量命名", 4)(
      "要表示「" + sc.scene + "」，下列最合适的变量名是？",
      ch.options, ch.answer,
      sc.why + "。好的变量名应见名知意，像 a、xx、num 这类名字无法表达具体含义。"
    );
  });

  /* ---------- 数据类型 ---------- */

  reg("type", "类型选择", 4, function (rng) {
    var sc = pick(rng, FACTS.TYPE_SCENES);
    var wrongs = FACTS.TYPE_ALL.filter(function (t) { return t !== sc.type; });
    var ch = buildChoice(rng, sc.type, wrongs);
    if (!ch) return null;
    return C("type", "类型选择", 4)(
      "要存放「" + sc.scene + "」，最合适的变量类型是？",
      ch.options, ch.answer,
      "应选 " + sc.type + "：" + sc.why
    );
  });

  // 类型转换：整数除法截断 / char 与 ASCII 互转
  reg("type", "类型转换", 4, function (rng) {
    var mk = C("type", "类型转换", 4);
    var r = rng();
    if (r < 0.4) {
      var a = rint(rng, 5, 20) * 2 + 1; // 奇数
      var v = CEval.cdiv(a, 2);
      var ch = buildChoice(rng, v, [a / 2, v + 1, v - 1, Math.round(a / 2)]);
      if (!ch) return null;
      return mk(
        "int x = " + a + " / 2;\ncout << x;\n\n输出是？",
        ch.options, ch.answer,
        "两个整数相除，结果仍取整数部分（向零截断）：" + a + "/2 = " + v +
        "。小数部分直接舍弃，不会四舍五入。"
      );
    }
    if (r < 0.7) {
      var letter = pick(rng, ["A", "B", "a", "b", "z", "Z", "m", "Q"]);
      var code = letter.charCodeAt(0);
      var ch2 = buildChoice(rng, code, [code + 32, code - 32, code + 1, code - 1]);
      if (!ch2) return null;
      return mk(
        "int x = '" + letter + "';\ncout << x;\n\n输出是？",
        ch2.options, ch2.answer,
        "字符赋给 int 时，存的是它的 ASCII 码，'" + letter + "' 的 ASCII 码是 " + code + "。"
      );
    }
    var code2 = pick(rng, [65, 66, 67, 97, 98, 99, 100, 122]);
    var letter2 = String.fromCharCode(code2);
    var ch3 = buildChoice(rng, letter2, [String(code2), String.fromCharCode(code2 + 1), String.fromCharCode(code2 - 1)]);
    if (!ch3) return null;
    return mk(
      "char c = " + code2 + ";\ncout << c;\n\n输出是？",
      ch3.options, ch3.answer,
      "整数赋给 char 时被当作 ASCII 码，" + code2 + " 对应的字符是 " + letter2 + "。"
    );
  });

  // 字符算术：'a' + 1
  reg("type", "字符与 ASCII", 4, function (rng) {
    var mk = C("type", "字符与 ASCII", 4);
    var letter = pick(rng, ["A", "B", "C", "a", "b", "c", "m", "n"]);
    var d = rint(rng, 1, 3);
    var v = CEval.run("'" + letter + "' + " + d, {}).value;
    if (rng() < 0.5) {
      var ch = buildChoice(rng, v, numWrongs(v, [v - d, v + d, letter.charCodeAt(0)]));
      if (!ch) return null;
      return mk(
        "cout << '" + letter + "' + " + d + ";\n\n输出是？",
        ch.options, ch.answer,
        "字符与整数相加，先转成 ASCII 码再运算：'" + letter + "' 是 " + letter.charCodeAt(0) +
        "，加 " + d + " 得 " + v + "，结果按整数输出。"
      );
    }
    var c2 = String.fromCharCode(v);
    var ch2 = buildChoice(rng, c2, [String.fromCharCode(v + 1), String.fromCharCode(v - 1), String(v)]);
    if (!ch2) return null;
    return mk(
      "char c = '" + letter + "' + " + d + ";\ncout << c;\n\n输出是？",
      ch2.options, ch2.answer,
      "'" + letter + "' 的 ASCII 码是 " + letter.charCodeAt(0) + "，加 " + d + " 得 " + v +
      "，对应字符 " + c2 + "。"
    );
  });

  /* ---------- 算术运算 ---------- */

  reg("arith", "算术运算", 4, function (rng) {
    var mk = C("arith", "算术运算", 4);
    var a = rint(rng, 2, 12), b = rint(rng, 2, 9), c = rint(rng, 2, 9);
    var picks = [
      { s: a + " + " + b + " * " + c, w: (a + b) * c },
      { s: a + " - " + b + " + " + c, w: a - (b + c) },
      { s: a + " + " + b + " % " + c, w: (a + b) % c }
    ];
    var f = pick(rng, picks);
    var v = CEval.run(f.s, {}).value;
    var ch = buildChoice(rng, v, numWrongs(v, [f.w]));
    if (!ch) return null;
    return mk(
      "cout << " + f.s + ";\n\n输出是？",
      ch.options, ch.answer,
      "先算乘除取余、后算加减：" + f.s + " = " + v + "。" +
      (f.w !== v ? "若不按优先级、从左到右硬算会得到 " + f.w + "，这正是常见错误。" : "")
    );
  });

  // 整数除法（含负数截断陷阱）
  reg("arith", "整数除法", 5, function (rng) {
    var mk = C("arith", "整数除法", 5);
    var neg = rng() < 0.5;
    var b = rint(rng, 3, 9);
    var a = neg ? -rint(rng, 10, 98) : rint(rng, 10, 98);
    var v = CEval.cdiv(a, b);
    var ch = buildChoice(rng, v, numWrongs(v, [Math.floor(a / b), Math.round(a / b), a - v * b]));
    if (!ch) return null;
    return mk(
      "int a = " + a + ", b = " + b + ";\ncout << a / b;\n\n输出是？",
      ch.options, ch.answer,
      "C++ 整数除法向零截断（舍弃小数部分）：" + a + " / " + b + " = " + v + "。" +
      (neg ? "注意不是向下取整（那会得到 " + Math.floor(a / b) + "）。" : "小数部分直接舍弃，不是四舍五入。")
    );
  });

  // 取余（含负数符号陷阱）
  reg("arith", "取余运算", 5, function (rng) {
    var mk = C("arith", "取余运算", 5);
    var neg = rng() < 0.45;
    var b = rint(rng, 3, 9);
    var a = neg ? -rint(rng, 10, 98) : rint(rng, 10, 98);
    var v = CEval.cmod(a, b);
    var ch = buildChoice(rng, v, numWrongs(v, [-v, Math.abs(b) - Math.abs(v), a - v]));
    if (!ch) return null;
    return mk(
      "int a = " + a + ", b = " + b + ";\ncout << a % b;\n\n输出是？",
      ch.options, ch.answer,
      "C++ 取余结果的符号与被除数相同：" + a + " % " + b + " = " + v + "。" +
      "也可以按 a - (a/b)*b 验证：" + a + " - " + CEval.cdiv(a, b) + "*" + b + " = " + v + "。"
    );
  });

  // 优先级陷阱专项
  reg("arith", "运算优先级", 5, function (rng) {
    var mk = C("arith", "运算优先级", 5);
    var a = rint(rng, 2, 8), b = rint(rng, 2, 8), c = rint(rng, 2, 8);
    var picks = [
      { s: a + " + " + b + " * " + c, w: (a + b) * c, note: "乘法优先于加法" },
      { s: a + " * " + b + " + " + c, w: a * (b + c), note: "乘法优先于加法" },
      { s: a + " - " + b + " % " + c, w: (a - b) % c, note: "取余优先于减法" },
      { s: a + " + " + b + " / " + c, w: CEval.cdiv(a + b, c), note: "除法优先于加法" }
    ];
    var f = pick(rng, picks);
    var v = CEval.run(f.s, {}).value;
    var ch = buildChoice(rng, v, numWrongs(v, [f.w]));
    if (!ch) return null;
    return mk(
      "cout << " + f.s + ";\n\n输出是？",
      ch.options, ch.answer,
      f.note + "：" + f.s + " = " + v + "。" +
      (f.w !== v ? "常见错误是不管优先级从左到右算出 " + f.w + "。" : "")
    );
  });

  /* ---------- 赋值 ---------- */

  // 赋值链与变量交换
  reg("assign", "赋值运算", 4, function (rng) {
    var mk = C("assign", "赋值运算", 4);
    var a0 = rint(rng, 2, 9), b0 = rint(rng, 2, 9);
    var picks = [
      {
        decl: "int a, b;",
        code: "a = b = " + a0 + ";\nb = a + " + b0 + ";\ncout << b;",
        src: "a = b = " + a0 + "; b = a + " + b0 + "; b",
        exp: "a = b = " + a0 + " 是连续赋值：先把 " + a0 + " 赋给 b，再赋给 a，两者都变成 " + a0 + "。"
      },
      {
        decl: "int a, b, t;",
        code: "a = " + a0 + ";\nb = " + b0 + ";\nt = a;\na = b;\nb = t;\ncout << a * 10 + b;",
        src: "a = " + a0 + "; b = " + b0 + "; t = a; a = b; b = t; a * 10 + b",
        exp: "借助中间变量 t 完成交换，交换后 a=" + b0 + "、b=" + a0 + "。"
      },
      {
        decl: "int a, b;",
        code: "a = " + a0 + ";\nb = " + b0 + ";\ncout << (a = a + b);",
        src: "a = " + a0 + "; b = " + b0 + "; a = a + b",
        exp: "赋值表达式本身也有值：a = a + b 把 " + (a0 + b0) + " 赋给 a，整个表达式的值也是 " + (a0 + b0) + "。"
      }
    ];
    var f = pick(rng, picks);
    var v = CEval.run(f.src, {}).value;
    var ch = buildChoice(rng, v, numWrongs(v));
    if (!ch) return null;
    return mk(f.decl + "\n" + f.code + "\n\n输出是？", ch.options, ch.answer, f.exp);
  });

  // 复合赋值：a *= b + c 的右侧先整体求值
  reg("assign", "复合赋值", 5, function (rng) {
    var mk = C("assign", "复合赋值", 5);
    var a = rint(rng, 2, 9), b = rint(rng, 2, 5), c = rint(rng, 2, 5);
    var picks = [
      { op: "*=", rhs: b + " + " + c, naive: a * b + c, why: "a *= b + c 等价于 a = a * (b + c)，右侧先算 b + c" },
      { op: "+=", rhs: b + " * " + c, naive: (a + b) * c, why: "a += b * c 等价于 a = a + (b * c)，右侧先算 b * c" },
      { op: "-=", rhs: b + " + " + c, naive: a - b + c, why: "a -= b + c 等价于 a = a - (b + c)，右侧先算 b + c" }
    ];
    var f = pick(rng, picks);
    var src = "a = " + a + "; a " + f.op + " " + f.rhs + "; a";
    var v = CEval.run(src, {}).value;
    var ch = buildChoice(rng, v, numWrongs(v, [f.naive]));
    if (!ch) return null;
    return mk(
      "int a = " + a + ";\na " + f.op + " " + f.rhs + ";\ncout << a;\n\n输出是？",
      ch.options, ch.answer,
      f.why + "，所以结果是 " + v + "。" +
      (f.naive !== v ? "常见错误是先拿 a 参与运算再处理右边，得到 " + f.naive + "。" : "")
    );
  });

  /* ---------- 自增自减 ---------- */

  // 后置 ++/--：先取旧值
  reg("inc", "自增自减", 4, function (rng) {
    var mk = C("inc", "自增自减", 4);
    var a0 = rint(rng, 3, 9);
    var isInc = rng() < 0.7;
    var op = isInc ? "++" : "--";
    var vB = CEval.run("a = " + a0 + "; b = a" + op + "; b", {}).value; // 旧值
    var vA = isInc ? a0 + 1 : a0 - 1;
    if (rng() < 0.5) {
      var ch = buildChoice(rng, vB, numWrongs(vB, [vA]));
      if (!ch) return null;
      return mk(
        "int a = " + a0 + ", b;\nb = a" + op + ";\ncout << b;\n\n输出是？",
        ch.options, ch.answer,
        "后置 " + op + " 先把 a 的旧值 " + a0 + " 赋给 b，再改变 a，所以 b = " + vB + "，a 变为 " + vA + "。"
      );
    }
    var ch2 = buildChoice(rng, vA, numWrongs(vA, [a0]));
    if (!ch2) return null;
    return mk(
      "int a = " + a0 + ", b;\nb = a" + op + ";\ncout << a;\n\n输出是？",
      ch2.options, ch2.answer,
      "b = a" + op + " 执行完后，a 已经变为 " + vA + "（b 拿到的是旧值 " + a0 + "）。"
    );
  });

  // 前置与后置混合（分语句书写，无求值顺序歧义）
  reg("inc", "前置与后置", 5, function (rng) {
    var mk = C("inc", "前置与后置", 5);
    var a0 = rint(rng, 2, 7);
    var v = CEval.run("a = " + a0 + "; x = a++; y = ++a; x + y", {}).value;
    var ch = buildChoice(rng, v, numWrongs(v, [2 * a0 + 1, 2 * a0 + 3]));
    if (!ch) return null;
    return mk(
      "int a = " + a0 + ", x, y;\nx = a++;\ny = ++a;\ncout << x + y;\n\n输出是？",
      ch.options, ch.answer,
      "x = a++ 取旧值 " + a0 + "，a 变 " + (a0 + 1) + "；y = ++a 先自增，a 变 " + (a0 + 2) +
      "，y 取新值 " + (a0 + 2) + "。所以 x + y = " + a0 + " + " + (a0 + 2) + " = " + v + "。"
    );
  });

  /* ---------- 关系与逻辑 ---------- */

  // 关系表达式的值是 1 或 0
  reg("rel", "关系运算", 4, function (rng) {
    var mk = C("rel", "关系运算", 4);
    var a = rint(rng, 1, 9), b = rint(rng, 1, 10);
    if (b === a) b = b % 10 + 1;
    var op = pick(rng, ["<", "<=", ">", ">=", "==", "!="]);
    var v = CEval.run(a + " " + op + " " + b, {}).value;
    var ch = buildChoice(rng, String(v), [String(1 - v), String(a), String(b)]);
    if (!ch) return null;
    return mk(
      "int a = " + a + ", b = " + b + ";\ncout << (a " + op + " b);\n\n输出是？",
      ch.options, ch.answer,
      "a " + op + " b 即 " + a + " " + op + " " + b + "，条件为" + (v ? "真" : "假") +
      "。关系运算的结果是整数：真输出 1，假输出 0。"
    );
  });

  // && / || 真值
  reg("logic", "逻辑运算", 4, function (rng) {
    var mk = C("logic", "逻辑运算", 4);
    var a = rint(rng, 0, 5), b = rint(rng, 0, 5);
    var op = rng() < 0.5 ? "&&" : "||";
    var v = CEval.run(a + " " + op + " " + b, {}).value;
    var ch = buildChoice(rng, String(v), [String(1 - v), String(a), String(b)]);
    if (!ch) return null;
    return mk(
      "int a = " + a + ", b = " + b + ";\ncout << (a " + op + " b);\n\n输出是？",
      ch.options, ch.answer,
      "a = " + a + " 为" + (a ? "真" : "假") + "，b = " + b + " 为" + (b ? "真" : "假") + "；" +
      (op === "&&" ? "&& 要求两边都真才为真" : "|| 有一边为真即为真") +
      "，所以结果是 " + v + "。（非 0 即真，逻辑运算结果为 1 或 0）"
    );
  });

  // 短路求值：&& 左假 / || 左真 时右侧不执行
  reg("logic", "短路求值", 5, function (rng) {
    var mk = C("logic", "短路求值", 5);
    var a0 = rint(rng, 1, 5), b0 = rint(rng, 2, 6);
    if (rng() < 0.5) {
      var v = CEval.run("a = " + a0 + "; b = " + b0 + "; r = (a = 0) && (b = 9); b", {}).value;
      var ch = buildChoice(rng, v, numWrongs(v, [9, 0]));
      if (!ch) return null;
      return mk(
        "int a = " + a0 + ", b = " + b0 + ", r;\nr = (a = 0) && (b = 9);\ncout << b;\n\n输出是？",
        ch.options, ch.answer,
        "&& 左侧 (a = 0) 的值是 0（假），触发短路：右侧 (b = 9) 根本不会执行，b 保持 " + b0 + "。"
      );
    }
    var v2 = CEval.run("a = " + a0 + "; b = " + b0 + "; r = (a = 1) || (b = 9); b", {}).value;
    var ch2 = buildChoice(rng, v2, numWrongs(v2, [9, 1]));
    if (!ch2) return null;
    return mk(
      "int a = " + a0 + ", b = " + b0 + ", r;\nr = (a = 1) || (b = 9);\ncout << b;\n\n输出是？",
      ch2.options, ch2.answer,
      "|| 左侧 (a = 1) 的值是 1（真），已能确定整体为真，触发短路：右侧 (b = 9) 不会执行，b 保持 " + b0 + "。"
    );
  });

  /* ---------- 分支 ---------- */

  reg("branch", "if-else 分支", 4, function (rng) {
    var mk = C("branch", "if-else 分支", 4);
    var x = rint(rng, -5, 10);
    var cond = pick(rng, [">", "<", ">=", "<=", "==", "!="]);
    var rhs = rint(rng, 0, 6);
    var v = CEval.run(x + " " + cond + " " + rhs, {}).value;
    var correct = v ? "A" : "B";
    var ch = buildChoice(rng, correct, [v ? "B" : "A", "AB", "无输出"]);
    if (!ch) return null;
    return mk(
      "int x = " + x + ";\nif (x " + cond + " " + rhs + ")\n  printf(\"A\");\nelse\n  printf(\"B\");\n\n输出是？",
      ch.options, ch.answer,
      "条件 x " + cond + " " + rhs + " 即 " + x + " " + cond + " " + rhs + "，为" + (v ? "真" : "假") +
      "，走 " + (v ? "if" : "else") + " 分支，输出 " + correct + "。"
    );
  });

  // else if 链：自上而下第一个满足的分支
  reg("branch", "多路分支", 4, function (rng) {
    var mk = C("branch", "多路分支", 4);
    var s = rint(rng, 0, 100);
    var brackets = pick(rng, [
      { cuts: [90, 80, 70], labels: ["A", "B", "C", "D"] },
      { cuts: [85, 70, 60], labels: ["优", "良", "中", "差"] }
    ]);
    var idx = 3;
    for (var i = 0; i < 3; i++) {
      if (CEval.run(s + " >= " + brackets.cuts[i], {}).value) { idx = i; break; }
    }
    var correct = brackets.labels[idx];
    var wrongs = brackets.labels.filter(function (l) { return l !== correct; });
    var ch = buildChoice(rng, correct, wrongs);
    if (!ch) return null;
    var code = "int s = " + s + ";\n";
    for (var j = 0; j < 3; j++) {
      code += (j === 0 ? "if" : "else if") + " (s >= " + brackets.cuts[j] + ") printf(\"" +
        brackets.labels[j] + "\");\n";
    }
    code += "else printf(\"" + brackets.labels[3] + "\");";
    var why = idx < 3
      ? "s = " + s + " 不满足前面的条件，但满足 s >= " + brackets.cuts[idx] + "，输出 " + correct + "。else if 从上往下依次判断，命中一个就不再往下。"
      : "s = " + s + " 连 " + brackets.cuts[2] + " 都不到，前面条件全不满足，走最后的 else，输出 " + correct + "。";
    return mk(code + "\n\n输出是？", ch.options, ch.answer, why);
  });

  // 三目运算符
  reg("branch", "条件表达式", 4, function (rng) {
    var mk = C("branch", "条件表达式", 4);
    var a = rint(rng, 1, 9), b = rint(rng, 1, 9);
    if (b === a) b++;
    var cond = pick(rng, [">", "<"]);
    var v = CEval.run(a + " " + cond + " " + b + " ? " + a + " : " + b, {}).value;
    var ch = buildChoice(rng, v, numWrongs(v, [a + b, a === v ? b : a, Math.abs(a - b)]));
    if (!ch) return null;
    var condTrue = CEval.run(a + " " + cond + " " + b, {}).value;
    return mk(
      "int a = " + a + ", b = " + b + ";\ncout << (a " + cond + " b ? a : b);\n\n输出是？",
      ch.options, ch.answer,
      "条件 a " + cond + " b（即 " + a + " " + cond + " " + b + "）为" + (condTrue ? "真" : "假") +
      "，三目运算符取" + (condTrue ? "问号后面的 a" : "冒号后面的 b") + "，结果是 " + v + "。"
    );
  });

  // 嵌套 if
  reg("branch", "嵌套分支", 5, function (rng) {
    var mk = C("branch", "嵌套分支", 5);
    var x = rint(rng, 0, 9), y = rint(rng, 0, 9);
    var outer = CEval.run(x + " > 5", {}).value;
    var inner = CEval.run(y + " > 5", {}).value;
    var correct = outer ? (inner ? "A" : "B") : "C";
    var ch = buildChoice(rng, correct, ["A", "B", "C", "无输出"].filter(function (l) { return l !== correct; }));
    if (!ch) return null;
    return mk(
      "int x = " + x + ", y = " + y + ";\nif (x > 5)\n  if (y > 5)\n    printf(\"A\");\n  else\n    printf(\"B\");\nelse\n  printf(\"C\");\n\n输出是？",
      ch.options, ch.answer,
      "先看外层：x = " + x + (outer ? " 满足 > 5" : " 不满足 > 5") + "，" +
      (outer
        ? "再判断内层：y = " + y + (inner ? " 满足 > 5，输出 A" : " 不满足 > 5，输出 B")
        : "直接走外层 else，输出 C") + "。"
    );
  });

  /* =========================================================
   * 批 3c：循环 / 输入输出 / 计算机基础
   * （CEval 不支持循环语句，循环题由生成器内 JS 模拟出 ground truth）
   * ========================================================= */

  // ---- 循环 ----

  // for 累加 1..n
  reg("loop", "for 循环累加", 4, function (rng) {
    var mk = C("loop", "for 循环累加", 4);
    var n = rint(rng, 5, 12);
    var sum = 0;
    for (var i = 1; i <= n; i++) sum += i;
    var ch = buildChoice(rng, sum, numWrongs(sum, [sum + n, sum - n, sum + n + 1]));
    if (!ch) return null;
    return mk(
      "int s = 0;\nfor (int i = 1; i <= " + n + "; i++)\n  s += i;\ncout << s;\n\n输出是？",
      ch.options, ch.answer,
      "循环把 1 到 " + n + " 依次加进 s：s = 1+2+…+" + n + " = " + n + "×" + (n + 1) + "÷2 = " + sum + "。"
    );
  });

  // 循环执行次数（i<=b / i<b / 步长三种模式）
  reg("loop", "循环次数", 4, function (rng) {
    var mk = C("loop", "循环次数", 4);
    var a = rint(rng, 0, 3), b = rint(rng, 8, 15);
    var mode = rint(rng, 0, 2), cond, step = 1, cnt, why;
    if (mode === 0) {
      cond = "i <= " + b; cnt = b - a + 1;
      why = "i 从 " + a + " 取到 " + b + "（两端都算），每个值执行一次，共 " + cnt + " 次。";
    } else if (mode === 1) {
      cond = "i < " + b; cnt = b - a;
      why = "条件是 i < " + b + "，i 取 " + a + " 到 " + (b - 1) + "（不含 " + b + "），共 " + cnt + " 次。i <= b 和 i < b 相差一次，这是最常见的陷阱。";
    } else {
      step = pick(rng, [2, 3]);
      cond = "i <= " + b; cnt = Math.floor((b - a) / step) + 1;
      why = "i 依次为 " + a + ", " + (a + step) + ", " + (a + 2 * step) + ", …，只要不超过 " + b + " 就执行，共 " + cnt + " 次。";
    }
    var head = "for (int i = " + a + "; " + cond + "; i" + (step === 1 ? "++" : " += " + step) + ")";
    var ch = buildChoice(rng, cnt, numWrongs(cnt, [cnt + 1, cnt - 1, b - a, b - a + 1]));
    if (!ch) return null;
    return mk(
      head + "\n  cout << \"*\";\n\n循环体共执行多少次？",
      ch.options, ch.answer, why
    );
  });

  // while 折半计数
  reg("loop", "while 循环", 5, function (rng) {
    var mk = C("loop", "while 循环", 5);
    var x0 = rint(rng, 20, 99);
    var seq = [x0], c = 0, v = x0;
    while (v > 1) { v = Math.floor(v / 2); c++; seq.push(v); }
    var ch = buildChoice(rng, c, numWrongs(c, [c + 1, c - 1, c + 2]));
    if (!ch) return null;
    return mk(
      "int x = " + x0 + ", c = 0;\nwhile (x > 1) {\n  x = x / 2;\n  c++;\n}\ncout << c;\n\n输出是？",
      ch.options, ch.answer,
      "x 每次整数除以 2：" + seq.join(" → ") + "，直到不大于 1 停止，共除了 " + c + " 次，所以 c = " + c + "。"
    );
  });

  // break 与 continue 混合
  reg("loop", "break 与 continue", 5, function (rng) {
    var mk = C("loop", "break 与 continue", 5);
    var n = rint(rng, 8, 14), k = rint(rng, 4, 7);
    var s = 0, hits = [];
    for (var i = 1; i <= n; i++) {
      if (i % 2 === 0) continue;
      if (i > k) break;
      s += i; hits.push(i);
    }
    // 典型错误：忽略 break（奇数全加）/ 忽略 continue（1..k 全加）
    var sNoBreak = 0, sNoCont = 0;
    for (var j = 1; j <= n; j += 2) sNoBreak += j;
    for (var j2 = 1; j2 <= k; j2++) sNoCont += j2;
    var ch = buildChoice(rng, s, numWrongs(s, [sNoBreak, sNoCont]));
    if (!ch) return null;
    return mk(
      "int s = 0;\nfor (int i = 1; i <= " + n + "; i++) {\n  if (i % 2 == 0) continue;\n  if (i > " + k + ") break;\n  s += i;\n}\ncout << s;\n\n输出是？",
      ch.options, ch.answer,
      "偶数被 continue 跳过（不累加但继续下一轮）；遇到第一个大于 " + k + " 的奇数时 break 直接退出循环。真正累加的只有 " +
      hits.join(" + ") + " = " + s + "。"
    );
  });

  // ---- 输入输出 ----

  // printf：%d 表达式 / %c 字符 / %d 输出字符的 ASCII 陷阱
  reg("io", "printf 输出", 4, function (rng) {
    var mk = C("io", "printf 输出", 4);
    var mode = rint(rng, 0, 2);
    if (mode === 0) {
      var a = rint(rng, 3, 12), b = rint(rng, 2, 9);
      var expr = pick(rng, [
        a + " * " + b + " + " + b,
        a + " + " + b + " * " + b,
        (a * b) + " % " + (b + 1) + " + " + a
      ]);
      var v = CEval.run(expr, {}).value;
      var ch = buildChoice(rng, v, numWrongs(v, [(a + b) * b, v + b]));
      if (!ch) return null;
      return mk(
        "int a = " + a + ", b = " + b + ";\nprintf(\"%d\", " + expr + ");\n\n输出是？",
        ch.options, ch.answer,
        "printf 先按优先级算出表达式的值：" + expr + " = " + v + "，再按 %d 以整数形式输出。"
      );
    }
    if (mode === 1) {
      var k = rint(rng, 1, 5);
      var correct = String.fromCharCode(65 + k);
      var ch2 = buildChoice(rng, correct, [
        String.fromCharCode(65 + k + 1),
        String.fromCharCode(65 + k - 1),
        String(65 + k),
        "A" + k
      ]);
      if (!ch2) return null;
      return mk(
        "char c = 'A' + " + k + ";\nprintf(\"%c\", c);\n\n输出是？",
        ch2.options, ch2.answer,
        "'A' 的 ASCII 码是 65，加 " + k + " 后是 " + (65 + k) + "，对应字符 '" + correct +
        "'。%c 按字符输出；若用 %d 就会输出 " + (65 + k) + "。"
      );
    }
    var src = pick(rng, ["'A'", "'a'", "'0'", "'B'", "'z'"]);
    var v3 = CEval.run(src, {}).value;
    var ch3 = buildChoice(rng, v3, numWrongs(v3, [v3 - 1, v3 + 1, v3 + 32]));
    if (!ch3) return null;
    return mk(
      "printf(\"%d\", " + src + ");\n\n输出是？",
      ch3.options, ch3.answer,
      "字符在内存中以 ASCII 码存储，" + src + " 的 ASCII 码是 " + v3 +
      "。%d 把它按整数输出，所以是 " + v3 + "（想输出字符本身要用 %c）。"
    );
  });

  // scanf 正确写法（& 陷阱）
  reg("io", "scanf 用法", 4, function (rng) {
    var mk = C("io", "scanf 用法", 4);
    var v = pick(rng, ["age", "score", "n", "count", "num", "total"]);
    var correct = 'scanf("%d", &' + v + ');';
    var ch = buildChoice(rng, correct, [
      'scanf("%d", ' + v + ');',
      'scanf(%d, &' + v + ');',
      'scanf("%d", &&' + v + ');',
      'cin >> &' + v + ';'
    ]);
    if (!ch) return null;
    return mk(
      "int " + v + ";\n要从键盘读入一个整数存入变量 " + v + "，正确的语句是？",
      ch.options, ch.answer,
      "scanf 的格式串必须加双引号；变量前必须写取地址符 &，scanf 才知道把读到的值写到哪里。" +
      "（cin 则不需要 &：cin >> " + v + ";）"
    );
  });

  // ---- 计算机基础 ----

  // 静态事实池通用出题（q/opts/a/exp 结构）
  function regFacts(cat, kp, diff, facts) {
    reg(cat, kp, diff, function (rng) {
      var f = pick(rng, facts);
      var ch = buildChoice(rng, f.opts[f.a], f.opts.filter(function (o, i) { return i !== f.a; }));
      if (!ch) return null;
      return C(cat, kp, diff)(f.q, ch.options, ch.answer, f.exp);
    });
  }
  // 判断题池通用出题（s/f/exp 结构）
  function regJudge(cat, kp, diff, facts) {
    reg(cat, kp, diff, function (rng) {
      var f = pick(rng, facts);
      return {
        type: "judge", category: cat, difficulty: diff, knowledgePoint: kp,
        question: f.s, options: ["正确", "错误"], answer: f.f, explanation: f.exp
      };
    });
  }

  regFacts("process", "程序开发流程", 4, FACTS.PROCESS_FACTS);
  regFacts("os", "内存与外存", 4, FACTS.MEM_FACTS);
  regFacts("type", "类型的字节数", 4, FACTS.TYPE_FACTS);
  regJudge("type", "语法规则判断", 4, FACTS.SYNTAX_JUDGE);
  regJudge("io", "输入输出判断", 4, FACTS.IO_JUDGE);
  regJudge("os", "操作系统判断", 4, FACTS.OS_JUDGE);

  // 输入/输出设备分类（触摸屏、硬盘作陷阱）
  reg("hardware", "输入输出设备", 4, function (rng) {
    var mk = C("hardware", "输入输出设备", 4);
    var labels = {
      input: "输入设备", output: "输出设备",
      both: "既是输入设备又是输出设备", storage: "存储设备（外存）"
    };
    var kind = pick(rng, Object.keys(labels));
    var dev = pick(rng, FACTS.DEVICES[kind]);
    var correct = labels[kind];
    var wrongs = Object.keys(labels).filter(function (k) { return k !== kind; })
      .map(function (k) { return labels[k]; });
    var ch = buildChoice(rng, correct, wrongs);
    if (!ch) return null;
    var why = {
      input: dev + " 把外界信息送入计算机，属于输入设备。",
      output: dev + " 把计算机处理的结果呈现出来，属于输出设备。",
      both: dev + " 既能向计算机输入信息（触摸操作），又能显示输出结果，两者都是。",
      storage: dev + " 属于外部存储器，用来长期保存数据，不是输入/输出设备。"
    }[kind];
    return mk(dev + " 属于哪类设备？", ch.options, ch.answer, why);
  });

  // 存储单位换算（相邻 1024 / 跨级 1024²）
  reg("storage", "存储单位换算", 4, function (rng) {
    var mk = C("storage", "存储单位换算", 4);
    if (rng() < 0.6) {
      var u = rint(rng, 1, 3), n = rint(rng, 2, 9);
      var from = FACTS.UNITS[u - 1], to = FACTS.UNITS[u];
      var ans = n * 1024;
      var ch = buildChoice(rng, ans, [n * 1000, n * 1024 + n, n * 2048, n * 1024 - 1024]);
      if (!ch) return null;
      return mk(
        n + " " + from + " = ? " + to,
        ch.options, ch.answer,
        "相邻存储单位的进率是 1024（不是 1000）：" + n + " " + from + " = " + n + " × 1024 = " + ans + " " + to + "。"
      );
    }
    var pair = pick(rng, [["GB", "KB"], ["MB", "B"], ["TB", "MB"]]);
    var n2 = rint(rng, 2, 4);
    var ans2 = n2 * 1024 * 1024;
    var ch2 = buildChoice(rng, ans2, [n2 * 1024, n2 * 1000000, ans2 * 2, ans2 - 1024]);
    if (!ch2) return null;
    return mk(
      n2 + " " + pair[0] + " = ? " + pair[1],
      ch2.options, ch2.answer,
      pair[0] + "→" + pair[1] + " 要跨两级，每级 ×1024：" + n2 + " " + pair[0] + " = " + n2 +
      " × 1024 × 1024 = " + ans2 + " " + pair[1] + "。"
    );
  });

  /* =========================================================
   * ④ 组卷与注册
   * ========================================================= */

  // 日种子（YYYYMMDD）：同一天内容稳定便于反馈错题，隔天自动换卷
  function daySeed() {
    var d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  // 按种子遍历全部生成器各出一题（注册顺序固定，同种子结果可复现）
  function buildStaticQuestions(seed) {
    var rng = makeRng(seed == null ? daySeed() : seed);
    var out = [], usedKp = {}, usedQ = {};
    for (var i = 0; i < GENS.length; i++) {
      var q = attempt(rng, GENS[i].gen);
      if (!q) continue;
      // kp 与题干双重去重（防止静态池/随机模板撞题）
      if (usedKp[q.knowledgePoint] || usedQ[q.question]) continue;
      usedKp[q.knowledgePoint] = true; usedQ[q.question] = true;
      q.id = 80001 + i;
      out.push(q);
    }
    return out;
  }

  var QUESTIONS = buildStaticQuestions();

  // 暴露给调试自检（script.js registerBuiltinDebugTests 使用）
  window.GESP_GEN = {
    build: buildStaticQuestions,
    gens: GENS,
    eval: CEval
  };

  window.GESP_BANKS = window.GESP_BANKS || {};
  window.GESP_BANKS["gen-exam"] = {
    id: "gen-exam",
    name: "智能组卷",
    exam: "GESP C++ 一级",
    description: "36 个生成器按考点自动组卷，每日换卷；答案由 C++ 子集求值器算出",
    staticQuestions: QUESTIONS,
    settings: { allowFill: false, allowDynamic: false },
    modes: [
      { id: "mixed", label: "综合组卷" },
      { id: "type", label: "类型与标识符" },
      { id: "arith", label: "运算与表达式" },
      { id: "branch", label: "分支结构" },
      { id: "loop", label: "循环结构" },
      { id: "io", label: "输入输出" },
      { id: "hardware", label: "计算机基础" },
      { id: "judge", label: "判断题" }
    ]
  };
})();
