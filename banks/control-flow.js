/**
 * 题库：分支 / switch / 循环
 * GESP C++ 一级常见控制结构理解
 * 题型：仅选择题、判断题（无填空）
 *
 * 通过 window.GESP_BANKS 注册，由 script.js 统一加载
 */
(function () {
  const STATIC_CONTROL_FLOW = [
    // ========== if / else ==========
    {
      id: 1001, type: "choice", category: "branch", difficulty: 3, knowledgePoint: "if 基本",
      question: `int x = 5;\nif (x > 3)\n  printf("A");\nelse\n  printf("B");\n\n输出是？`,
      options: ["A", "B", "AB", "无输出"],
      answer: 0,
      explanation: "x>3 成立，执行 if 分支，输出 A。"
    },
    {
      id: 1002, type: "choice", category: "branch", difficulty: 3, knowledgePoint: "if-else",
      question: `int n = 0;\nif (n)\n  printf("yes");\nelse\n  printf("no");\n\n输出是？`,
      options: ["yes", "no", "yesno", "编译错误"],
      answer: 1,
      explanation: "在 if 条件中，0 视为假，走 else，输出 no。"
    },
    {
      id: 1003, type: "choice", category: "branch", difficulty: 3, knowledgePoint: "else if",
      question: `int s = 85;\nif (s >= 90) printf("A");\nelse if (s >= 80) printf("B");\nelse printf("C");\n\n输出是？`,
      options: ["A", "B", "C", "BC"],
      answer: 1,
      explanation: "85 不满足 >=90，但满足 >=80，输出 B。不会再执行后面的 else。"
    },
    {
      id: 1004, type: "judge", category: "branch", difficulty: 3, knowledgePoint: "if 花括号",
      question: `下面代码中，printf("B") 一定属于 else 分支。\n\nint x = 1;\nif (x > 0)\n  printf("A");\n  printf("B");\nelse\n  printf("C");`,
      options: ["正确", "错误"],
      answer: 1,
      explanation: "没有花括号时，if 只管紧跟的一句。printf(\"B\") 在 if 之外，且 else 无法正确匹配，这段代码本身结构有问题/易错。"
    },
    {
      id: 1005, type: "choice", category: "branch", difficulty: 4, knowledgePoint: "嵌套 if",
      question: `int a = 3, b = 5;\nif (a < b) {\n  if (a == 3) printf("X");\n  else printf("Y");\n} else printf("Z");\n\n输出是？`,
      options: ["X", "Y", "Z", "XY"],
      answer: 0,
      explanation: "外层 a<b 成立，内层 a==3 成立，输出 X。"
    },
    {
      id: 1006, type: "choice", category: "branch", difficulty: 4, knowledgePoint: "if 条件运算",
      question: `int x = 2;\nif (x = 0)\n  printf("T");\nelse\n  printf("F");\n\n输出是？`,
      options: ["T", "F", "编译错误", "不确定"],
      answer: 1,
      explanation: "这里是赋值 x=0，不是比较。赋值表达式结果为 0，条件为假，输出 F。（常见笔误）"
    },
    {
      id: 1007, type: "judge", category: "branch", difficulty: 3, knowledgePoint: "if 真假",
      question: `在 C++ 中，if (1) 的条件为真，会执行 if 后面的语句。`,
      options: ["正确", "错误"],
      answer: 0,
      explanation: "非 0 为真，1 为真。"
    },
    {
      id: 1008, type: "choice", category: "branch", difficulty: 4, knowledgePoint: "多条件",
      question: `int a = 4;\nif (a > 1 && a < 4)\n  printf("Y");\nelse\n  printf("N");\n\n输出是？`,
      options: ["Y", "N", "YN", "无输出"],
      answer: 1,
      explanation: "a>1 真，但 a<4 假（4<4 不成立），与运算为假，输出 N。"
    },
    {
      id: 1009, type: "choice", category: "branch", difficulty: 5, knowledgePoint: "else 匹配",
      question: `int x = 0, y = 1;\nif (x)\n  if (y) printf("A");\nelse printf("B");\n\n实际输出是？`,
      options: ["A", "B", "无输出", "AB"],
      answer: 1,
      explanation: "else 与最近的尚未匹配的 if 配对，即内层 if (y)。外层 if(x) 为假时不会进内层；但若按就近匹配，结构易混淆。此处 x 为 0，外层不进入，理论上不应输出——若编译按就近匹配 else 属于内层，外层为假则整段不执行，无输出。更严谨：x 假，不进入外层 if，无输出。",
      // Fix: when x is 0, outer if false, nothing runs → 无输出
      // Let me fix answer to 无输出
    },

    // ========== switch ==========
    {
      id: 1101, type: "choice", category: "switch", difficulty: 3, knowledgePoint: "switch 基本",
      question: `int n = 2;\nswitch (n) {\n  case 1: printf("A"); break;\n  case 2: printf("B"); break;\n  default: printf("C");\n}\n\n输出是？`,
      options: ["A", "B", "C", "BC"],
      answer: 1,
      explanation: "n 为 2，匹配 case 2，输出 B 后 break。"
    },
    {
      id: 1102, type: "choice", category: "switch", difficulty: 4, knowledgePoint: "switch 贯穿",
      question: `int n = 1;\nswitch (n) {\n  case 1: printf("A");\n  case 2: printf("B"); break;\n  default: printf("C");\n}\n\n输出是？`,
      options: ["A", "B", "AB", "ABC"],
      answer: 2,
      explanation: "case 1 没有 break，会继续执行到 case 2，输出 AB，然后 break。"
    },
    {
      id: 1103, type: "choice", category: "switch", difficulty: 3, knowledgePoint: "default",
      question: `int n = 9;\nswitch (n) {\n  case 1: printf("A"); break;\n  case 2: printf("B"); break;\n  default: printf("C");\n}\n\n输出是？`,
      options: ["A", "B", "C", "无输出"],
      answer: 2,
      explanation: "没有匹配的 case，走 default，输出 C。"
    },
    {
      id: 1104, type: "judge", category: "switch", difficulty: 3, knowledgePoint: "switch break",
      question: `switch 的每个 case 末尾写 break 是为了防止继续执行后面的 case（贯穿）。`,
      options: ["正确", "错误"],
      answer: 0,
      explanation: "break 跳出 switch，避免 fall-through。"
    },
    {
      id: 1105, type: "choice", category: "switch", difficulty: 4, knowledgePoint: "switch 类型",
      question: `下列哪项最适合用 switch 来写？`,
      options: [
        "判断浮点数是否接近 3.14",
        "根据整数菜单选项 1/2/3 分支",
        "判断字符串是否相等",
        "比较两个小数的大小"
      ],
      answer: 1,
      explanation: "switch 适合整型（或可转为整型）的等值分支；浮点、字符串比较一般用 if。"
    },
    {
      id: 1106, type: "choice", category: "switch", difficulty: 5, knowledgePoint: "switch 贯穿 default",
      question: `int x = 2;\nswitch (x) {\n  case 1: printf("1");\n  case 2: printf("2");\n  case 3: printf("3");\n  default: printf("D");\n}\n\n输出是？`,
      options: ["2", "23", "23D", "2D"],
      answer: 2,
      explanation: "从 case 2 开始贯穿到 default，输出 23D。"
    },
    {
      id: 1107, type: "judge", category: "switch", difficulty: 4, knowledgePoint: "case 常量",
      question: `case 后面必须是常量表达式，不能是变量。`,
      options: ["正确", "错误"],
      answer: 0,
      explanation: "case 标签需要编译期常量。"
    },
    {
      id: 1108, type: "choice", category: "switch", difficulty: 4, knowledgePoint: "switch 字符",
      question: `char c = 'b';\nswitch (c) {\n  case 'a': printf("1"); break;\n  case 'b': printf("2"); break;\n  case 'c': printf("3"); break;\n}\n\n输出是？`,
      options: ["1", "2", "3", "无输出"],
      answer: 1,
      explanation: "字符可以用于 switch，匹配 'b'，输出 2。"
    },

    // ========== 循环 for / while / do-while ==========
    {
      id: 1201, type: "choice", category: "loop", difficulty: 3, knowledgePoint: "for 基本",
      question: `int s = 0;\nfor (int i = 1; i <= 3; i++)\n  s = s + i;\nprintf("%d", s);\n\n输出是？`,
      options: ["3", "6", "9", "0"],
      answer: 1,
      explanation: "i=1,2,3 累加，s=1+2+3=6。"
    },
    {
      id: 1202, type: "choice", category: "loop", difficulty: 3, knowledgePoint: "while 基本",
      question: `int n = 3;\nwhile (n > 0) {\n  printf("%d", n);\n  n--;\n}\n\n输出是？`,
      options: ["321", "123", "333", "012"],
      answer: 0,
      explanation: "先输出 3，n 变 2；再输出 2，n 变 1；再输出 1，n 变 0；结束。输出 321。"
    },
    {
      id: 1203, type: "choice", category: "loop", difficulty: 4, knowledgePoint: "do-while",
      question: `int n = 0;\ndo {\n  printf("A");\n  n++;\n} while (n < 0);\n\n输出是？`,
      options: ["无输出", "A", "AA", "死循环"],
      answer: 1,
      explanation: "do-while 至少执行一次，先输出 A，然后 n=1，条件 n<0 为假，结束。"
    },
    {
      id: 1204, type: "judge", category: "loop", difficulty: 3, knowledgePoint: "while vs do-while",
      question: `while 循环可能一次都不执行；do-while 至少执行一次。`,
      options: ["正确", "错误"],
      answer: 0,
      explanation: "while 先判断；do-while 先执行再判断。"
    },
    {
      id: 1205, type: "choice", category: "loop", difficulty: 4, knowledgePoint: "for 次数",
      question: `int c = 0;\nfor (int i = 0; i < 5; i++)\n  c++;\nprintf("%d", c);\n\n输出是？`,
      options: ["4", "5", "6", "0"],
      answer: 1,
      explanation: "i=0,1,2,3,4 共 5 次，c=5。"
    },
    {
      id: 1206, type: "choice", category: "loop", difficulty: 4, knowledgePoint: "循环变量",
      question: `int i;\nfor (i = 0; i < 3; i++)\n  ;\nprintf("%d", i);\n\n输出是？`,
      options: ["0", "2", "3", "编译错误"],
      answer: 2,
      explanation: "空循环体。i 取 0,1,2 后加到 3，条件失败退出，输出 3。"
    },
    {
      id: 1207, type: "choice", category: "loop", difficulty: 5, knowledgePoint: "break",
      question: `int s = 0;\nfor (int i = 1; i <= 10; i++) {\n  if (i == 4) break;\n  s += i;\n}\nprintf("%d", s);\n\n输出是？`,
      options: ["10", "6", "15", "4"],
      answer: 1,
      explanation: "i=1,2,3 累加后 s=6，i==4 时 break，不再加 4。"
    },
    {
      id: 1208, type: "choice", category: "loop", difficulty: 5, knowledgePoint: "continue",
      question: `int s = 0;\nfor (int i = 1; i <= 5; i++) {\n  if (i == 3) continue;\n  s += i;\n}\nprintf("%d", s);\n\n输出是？`,
      options: ["15", "12", "9", "3"],
      answer: 1,
      explanation: "跳过 i==3，s=1+2+4+5=12。"
    },
    {
      id: 1209, type: "judge", category: "loop", difficulty: 4, knowledgePoint: "break 作用",
      question: `在 for 循环里执行 break，会结束整个程序。`,
      options: ["正确", "错误"],
      answer: 1,
      explanation: "break 只跳出当前循环（或 switch），不是结束整个程序。"
    },
    {
      id: 1210, type: "choice", category: "loop", difficulty: 4, knowledgePoint: "嵌套循环",
      question: `int c = 0;\nfor (int i = 0; i < 2; i++)\n  for (int j = 0; j < 3; j++)\n    c++;\nprintf("%d", c);\n\n输出是？`,
      options: ["2", "3", "5", "6"],
      answer: 3,
      explanation: "外层 2 次，内层每次 3 次，共 2×3=6。"
    },
    {
      id: 1211, type: "choice", category: "loop", difficulty: 5, knowledgePoint: "while 条件",
      question: `int x = 1;\nwhile (x < 10) {\n  x = x * 2;\n}\nprintf("%d", x);\n\n输出是？`,
      options: ["8", "10", "16", "1"],
      answer: 2,
      explanation: "x: 1→2→4→8→16，当 x=16 时 16<10 为假，退出，输出 16。"
    },
    {
      id: 1212, type: "judge", category: "loop", difficulty: 3, knowledgePoint: "for 三要素",
      question: `for (初始化; 条件; 步进) 中，条件为假时不会进入循环体。`,
      options: ["正确", "错误"],
      answer: 0,
      explanation: "与 while 类似，先判断条件。"
    },
    {
      id: 1213, type: "choice", category: "loop", difficulty: 5, knowledgePoint: "死循环识别",
      question: `下列哪个最可能造成死循环？`,
      options: [
        "for (int i = 0; i < 10; i++)",
        "while (1) { break; }",
        "int i = 0; while (i < 5) { printf(\"%d\", i); }",
        "do { break; } while (1);"
      ],
      answer: 2,
      explanation: "选项 C 中 i 始终为 0，条件一直为真，且循环体内没有修改 i 或 break。"
    },
    {
      id: 1214, type: "choice", category: "loop", difficulty: 4, knowledgePoint: "do-while 次数",
      question: `int i = 5;\ndo {\n  printf("%d", i);\n  i++;\n} while (i < 5);\n\n输出是？`,
      options: ["5", "无输出", "567...", "编译错误"],
      answer: 0,
      explanation: "先执行一次输出 5，i 变为 6，条件 6<5 假，结束。"
    },

    // ========== 综合判断 ==========
    {
      id: 1301, type: "judge", category: "branch", difficulty: 4, knowledgePoint: "if 赋值笔误",
      question: `if (x == 0) 与 if (x = 0) 含义完全相同。`,
      options: ["正确", "错误"],
      answer: 1,
      explanation: "== 是比较，= 是赋值，含义不同。"
    },
    {
      id: 1302, type: "judge", category: "switch", difficulty: 3, knowledgePoint: "switch 用途",
      question: `switch 只能用于判断整数，不能用于字符 char。`,
      options: ["正确", "错误"],
      answer: 1,
      explanation: "char 底层是整数编码，可以用于 switch。"
    },
    {
      id: 1303, type: "choice", category: "branch", difficulty: 5, knowledgePoint: "条件短路",
      question: `int a = 0, b = 5;\nif (a && (b = 1))\n  ;\nprintf("%d", b);\n\n输出是？`,
      options: ["0", "1", "5", "编译错误"],
      answer: 2,
      explanation: "a 为 0，与运算短路，右边 (b=1) 不执行，b 仍为 5。"
    },
    {
      id: 1304, type: "choice", category: "loop", difficulty: 5, knowledgePoint: "continue 与 for",
      question: `for (int i = 1; i <= 3; i++) {\n  if (i == 2) continue;\n  printf("%d", i);\n}\n\n输出是？`,
      options: ["13", "123", "12", "23"],
      answer: 0,
      explanation: "i=2 时 continue，跳过打印，输出 13。"
    },
    {
      id: 1305, type: "judge", category: "loop", difficulty: 4, knowledgePoint: "嵌套 break",
      question: `在双层 for 循环的内层使用 break，会同时跳出内外两层循环。`,
      options: ["正确", "错误"],
      answer: 1,
      explanation: "break 只跳出一层（当前内层循环）。"
    },
    {
      id: 1306, type: "choice", category: "switch", difficulty: 4, knowledgePoint: "switch 无 default",
      question: `int n = 7;\nswitch (n) {\n  case 1: printf("A"); break;\n  case 2: printf("B"); break;\n}\nprintf("OK");\n\n输出是？`,
      options: ["AOK", "BOK", "OK", "无输出"],
      answer: 2,
      explanation: "无匹配 case 且无 default，switch 什么都不做，然后输出 OK。"
    },
    {
      id: 1307, type: "choice", category: "branch", difficulty: 3, knowledgePoint: "三目运算",
      question: `int a = 3, b = 5;\nint m = (a > b) ? a : b;\nprintf("%d", m);\n\n输出是？`,
      options: ["3", "5", "1", "0"],
      answer: 1,
      explanation: "三目运算取较大者，输出 5。"
    },
    {
      id: 1308, type: "judge", category: "branch", difficulty: 3, knowledgePoint: "else 可选",
      question: `写 if 时可以没有 else。`,
      options: ["正确", "错误"],
      answer: 0,
      explanation: "else 是可选的。"
    },
    {
      id: 1309, type: "choice", category: "loop", difficulty: 4, knowledgePoint: "for 等价 while",
      question: `下列与 for (int i=0; i<3; i++) printf("%d", i); 输出相同的是？`,
      options: [
        "int i=0; while(i<3){ printf(\"%d\",i); }",
        "int i=0; while(i<3){ printf(\"%d\",i); i++; }",
        "int i=0; do{ printf(\"%d\",i); }while(i<3);",
        "int i=1; while(i<=3){ printf(\"%d\",i); i++; }"
      ],
      answer: 1,
      explanation: "for 每次步进 i++，对应 while 循环体内 i++，输出 012。"
    },
    {
      id: 1310, type: "choice", category: "switch", difficulty: 5, knowledgePoint: "多 case 合并",
      question: `int d = 3;\nswitch (d) {\n  case 1:\n  case 2:\n  case 3: printf("work"); break;\n  default: printf("rest");\n}\n\n输出是？`,
      options: ["work", "rest", "workrest", "无输出"],
      answer: 0,
      explanation: "case 1/2/3 共用同一段，d=3 输出 work。"
    }
  ];

  // 修正 1009 答案为无输出
  const q1009 = STATIC_CONTROL_FLOW.find(q => q.id === 1009);
  if (q1009) {
    q1009.answer = 2;
    q1009.options = ["A", "B", "无输出", "AB"];
    q1009.explanation = "x 为 0，外层 if 条件为假，内层与 else 都不会执行，无输出。";
  }

  window.GESP_BANKS = window.GESP_BANKS || {};
  window.GESP_BANKS["control-flow"] = {
    id: "control-flow",
    name: "分支 · switch · 循环",
    exam: "GESP C++ 一级",
    description: "if/else、switch/case、for/while/do-while 理解与输出判断",
    staticQuestions: STATIC_CONTROL_FLOW,
    // 本库设置：无填空、无字符串开关、无动态模板
    settings: {
      allowFill: false,
      allowDynamic: false,
      enableString: false,
      defaultComplexity: 2
    },
    modes: [
      { id: "mixed", label: "综合训练" },
      { id: "branch", label: "分支 if" },
      { id: "switch", label: "switch" },
      { id: "loop", label: "循环" },
      { id: "judge", label: "判断题" }
    ]
  };
})();
