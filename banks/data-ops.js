/**
 * 题库：变量 · 类型 · 运算符（GESP C++ 一级考纲）
 * 考点：标识符、类型、赋值、算术/关系/逻辑、自增自减、整除取余、顺序结构
 * 题型：选择 / 判断（结果判断为主）
 */
(function () {
  const Q = [
    {
      id: 2101, type: "choice", category: "type", difficulty: 3, knowledgePoint: "数据类型",
      question: "要存储整数 100，最常用的类型是？",
      options: ["int", "float", "bool", "仅能用 char"],
      answer: 0,
      explanation: "整数常用 int。"
    },
    {
      id: 2102, type: "choice", category: "type", difficulty: 3, knowledgePoint: "数据类型",
      question: "要存储小数 3.14，更合适的是？",
      options: ["int", "char", "float 或 double", "bool"],
      answer: 2,
      explanation: "小数用浮点型 float / double。"
    },
    {
      id: 2103, type: "choice", category: "type", difficulty: 3, knowledgePoint: "字符类型",
      question: "char 类型通常用来存储？",
      options: ["一个字符", "一串很长的文章", "仅布尔值", "仅小数"],
      answer: 0,
      explanation: "char 存储单个字符。"
    },
    {
      id: 2104, type: "judge", category: "type", difficulty: 3, knowledgePoint: "bool",
      question: "bool 类型的值通常只有 true 和 false 两种（逻辑真/假）。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "布尔型表示真假。"
    },
    {
      id: 2105, type: "choice", category: "ident", difficulty: 3, knowledgePoint: "标识符",
      question: "下列可以作为变量名的是？",
      options: ["2num", "int", "student_age", "my-age"],
      answer: 2,
      explanation: "不能以数字开头；不能是关键字 int；不能含减号。student_age 合法。"
    },
    {
      id: 2106, type: "judge", category: "ident", difficulty: 3, knowledgePoint: "关键字",
      question: "int、if、for 都是 C++ 的关键字，一般不能当作变量名。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "关键字有特殊含义，不能作标识符。"
    },
    {
      id: 2107, type: "choice", category: "arith", difficulty: 3, knowledgePoint: "整除",
      question: "在 C++ 中，int a = 7, b = 2; 则 a / b 的结果是？",
      options: ["3.5", "3", "4", "2"],
      answer: 1,
      explanation: "两个 int 相除为整除，7/2=3。"
    },
    {
      id: 2108, type: "choice", category: "arith", difficulty: 3, knowledgePoint: "取余",
      question: "int x = 17; 则 x % 5 的结果是？",
      options: ["3", "2", "5", "0"],
      answer: 0,
      explanation: "17 = 3×5 + 2？不对，17=3*5+2，应是 2。等等 3*5=15，余 2。修正答案为 2。"
    },
    {
      id: 2109, type: "choice", category: "arith", difficulty: 3, knowledgePoint: "算术运算",
      question: "int a = 2, b = 3; 则 a * b + 1 的结果是？",
      options: ["7", "8", "6", "5"],
      answer: 0,
      explanation: "先乘后加：2*3+1=7。"
    },
    {
      id: 2110, type: "choice", category: "inc", difficulty: 4, knowledgePoint: "自增",
      question: "int n = 5; n++; 之后 n 的值是？",
      options: ["5", "6", "4", "0"],
      answer: 1,
      explanation: "n++ 使 n 自增 1，变为 6。"
    },
    {
      id: 2111, type: "choice", category: "inc", difficulty: 4, knowledgePoint: "自减",
      question: "int n = 5; --n; 之后 n 的值是？",
      options: ["5", "6", "4", "0"],
      answer: 2,
      explanation: "--n 先自减，n 变为 4。"
    },
    {
      id: 2112, type: "choice", category: "rel", difficulty: 3, knowledgePoint: "关系运算",
      question: "int a = 3, b = 5; 表达式 a < b 的值是？",
      options: ["true（真）", "false（假）", "3", "5"],
      answer: 0,
      explanation: "3<5 成立，为真。"
    },
    {
      id: 2113, type: "choice", category: "rel", difficulty: 4, knowledgePoint: "等于比较",
      question: "判断两个 int 变量 x 与 y 是否相等，应写？",
      options: ["x = y", "x == y", "x := y", "x != y 表示相等"],
      answer: 1,
      explanation: "== 是关系相等；= 是赋值。"
    },
    {
      id: 2114, type: "judge", category: "rel", difficulty: 3, knowledgePoint: "赋值与比较",
      question: "if (x = 0) 与 if (x == 0) 含义相同。",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "前者赋值，后者比较，含义不同。"
    },
    {
      id: 2115, type: "choice", category: "logic", difficulty: 4, knowledgePoint: "逻辑与",
      question: "int a = 1, b = 0; 则 a && b 的结果为？",
      options: ["真", "假", "1", "编译错误"],
      answer: 1,
      explanation: "与运算：两边都真才真。b 为 0 假，结果假。"
    },
    {
      id: 2116, type: "choice", category: "logic", difficulty: 4, knowledgePoint: "逻辑或",
      question: "int a = 0, b = 2; 则 a || b 的结果为？",
      options: ["假", "真", "0", "只能是 2"],
      answer: 1,
      explanation: "或运算：有一个真即为真。b 非 0 为真。"
    },
    {
      id: 2117, type: "choice", category: "logic", difficulty: 3, knowledgePoint: "逻辑非",
      question: "int a = 0; 则 !a 的结果为？",
      options: ["假", "真", "0", "错误"],
      answer: 1,
      explanation: "0 为假，取非后为真。"
    },
    {
      id: 2118, type: "choice", category: "arith", difficulty: 4, knowledgePoint: "表达式求值",
      question: "int x = 10; 则 (x % 3) * 2 的结果是？",
      options: ["1", "2", "6", "0"],
      answer: 1,
      explanation: "10%3=1，1*2=2。"
    },
    {
      id: 2119, type: "choice", category: "assign", difficulty: 3, knowledgePoint: "赋值",
      question: "int a; a = 5; 这句的作用是？",
      options: ["比较 a 是否等于 5", "把 5 存入变量 a", "定义类型为 5", "输出 5"],
      answer: 1,
      explanation: "赋值：把右边的值赋给左边变量。"
    },
    {
      id: 2120, type: "choice", category: "arith", difficulty: 5, knowledgePoint: "数位拆分",
      question: "int n = 257; 则 n % 10 得到？",
      options: ["2", "5", "7", "25"],
      answer: 2,
      explanation: "n%10 取个位，为 7。"
    },
    {
      id: 2121, type: "choice", category: "arith", difficulty: 5, knowledgePoint: "数位拆分",
      question: "int n = 257; 则 n / 100 得到？",
      options: ["2", "5", "7", "57"],
      answer: 0,
      explanation: "整除 100 得到百位：2。"
    },
    {
      id: 2122, type: "judge", category: "type", difficulty: 4, knowledgePoint: "初始化",
      question: "定义变量时可以同时赋初值，例如 int a = 0;",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "这是常见的定义并初始化写法。"
    },
    {
      id: 2123, type: "choice", category: "arith", difficulty: 4, knowledgePoint: "优先级",
      question: "int r = 2 + 3 * 4; 则 r 为？",
      options: ["20", "14", "24", "9"],
      answer: 1,
      explanation: "先乘后加：3*4=12，+2=14。"
    },
    {
      id: 2124, type: "choice", category: "logic", difficulty: 5, knowledgePoint: "短路",
      question: "int a = 0, b = 5; 执行 if (a && (b = 1)); 后 b 的值是？",
      options: ["1", "5", "0", "不确定"],
      answer: 1,
      explanation: "a 为 0，与运算短路，右边不执行，b 仍为 5。"
    },
    {
      id: 2125, type: "judge", category: "ident", difficulty: 3, knowledgePoint: "大小写",
      question: "在 C++ 中，变量名 score 与 Score 是不同的标识符。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "C++ 区分大小写。"
    },
    {
      id: 2126, type: "choice", category: "type", difficulty: 4, knowledgePoint: "字符",
      question: "char c = 'A'; 中，单引号里的 A 表示？",
      options: ["字符串", "字符常量", "变量名", "注释"],
      answer: 1,
      explanation: "单引号表示字符常量。"
    },
    {
      id: 2127, type: "choice", category: "arith", difficulty: 4, knowledgePoint: "取余应用",
      question: "判断整数 n 是否为偶数，常用条件是？",
      options: ["n / 2 == 0", "n % 2 == 0", "n % 2 == 1", "n == 2"],
      answer: 1,
      explanation: "偶数对 2 取余为 0。"
    },
    {
      id: 2128, type: "judge", category: "assign", difficulty: 3, knowledgePoint: "顺序结构",
      question: "顺序结构就是按照代码书写顺序从上到下依次执行。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "顺序结构是最基本的程序结构。"
    },
    {
      id: 2129, type: "choice", category: "inc", difficulty: 5, knowledgePoint: "表达式",
      question: "int a = 3; int b = a++; 则之后 a 与 b 为？",
      options: ["a=4,b=3", "a=3,b=4", "a=4,b=4", "a=3,b=3"],
      answer: 0,
      explanation: "后置 ++：b 得到 a 的原值 3，然后 a 变成 4。"
    },
    {
      id: 2130, type: "choice", category: "arith", difficulty: 4, knowledgePoint: "混合运算",
      question: "int a = 5; double b = 2; 则 a / b 更接近？",
      options: ["2", "2.5", "3", "0"],
      answer: 1,
      explanation: "有浮点数参与时按浮点除法，得到 2.5。"
    }
  ];

  // 修正 2108 答案
  const q2108 = Q.find(q => q.id === 2108);
  if (q2108) {
    q2108.answer = 1;
    q2108.explanation = "17 ÷ 5 = 3 余 2，所以 17 % 5 = 2。";
  }

  window.GESP_BANKS = window.GESP_BANKS || {};
  window.GESP_BANKS["data-ops"] = {
    id: "data-ops",
    name: "变量与运算",
    exam: "GESP C++ 一级",
    description: "类型、标识符、算术/关系/逻辑运算、整除取余",
    staticQuestions: Q,
    settings: { allowFill: false, allowDynamic: false },
    modes: [
      { id: "mixed", label: "综合训练" },
      { id: "type", label: "类型与变量" },
      { id: "arith", label: "算术运算" },
      { id: "logic", label: "关系逻辑" },
      { id: "judge", label: "判断题" }
    ]
  };
})();
