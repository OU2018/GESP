/**
 * 题库：GESP C++ 二级常见客观题
 * 考点：ASCII 码、字符运算、隐式/显式类型转换、混合运算中的类型提升
 * 题型：选择 / 判断（无填空）
 * 说明：面向二级常考常识与结果判断，不涉及上机编程题
 */
(function () {
  "use strict";

  const Q = [
    // ========== ASCII 基础 ==========
    {
      id: 4001, type: "choice", category: "ascii", difficulty: 4, knowledgePoint: "ASCII 基本",
      question: "在 ASCII 码中，字符 '0' 的十进制码值是？",
      options: ["0", "48", "30", "96"],
      answer: 1,
      explanation: "数字字符 '0'～'9' 的 ASCII 依次为 48～57。'0' 是 48 而不是数值 0。"
    },
    {
      id: 4002, type: "choice", category: "ascii", difficulty: 4, knowledgePoint: "ASCII 字母",
      question: "大写字母 'A' 的 ASCII 码（十进制）是？",
      options: ["65", "97", "26", "1"],
      answer: 0,
      explanation: "'A'～'Z' 为 65～90；'a'～'z' 为 97～122。"
    },
    {
      id: 4003, type: "choice", category: "ascii", difficulty: 4, knowledgePoint: "ASCII 大小写",
      question: "小写 'a' 与大写 'A' 的 ASCII 码差值是？",
      options: ["0", "26", "32", "48"],
      answer: 2,
      explanation: "'a'=97，'A'=65，差值为 32。同一字母大小写相差 32。"
    },
    {
      id: 4004, type: "choice", category: "ascii", difficulty: 4, knowledgePoint: "ASCII 比较",
      question: "比较字符 'A' 与 'a'，下列说法正确的是？",
      options: ["'A' > 'a'", "'A' < 'a'", "'A' == 'a'", "无法比较"],
      answer: 1,
      explanation: "字符比较本质是码值比较。65 < 97，故 'A' < 'a'。"
    },
    {
      id: 4005, type: "choice", category: "ascii", difficulty: 4, knowledgePoint: "ASCII 数字字符",
      question: "表达式 '7' - '0' 的结果是？",
      options: ["字符 7", "整数 7", "字符 '7'", "编译错误"],
      answer: 1,
      explanation: "字符参与算术运算时按码值计算：'7'-'0' = 55-48 = 7，得到整型数值 7。"
    },
    {
      id: 4006, type: "choice", category: "ascii", difficulty: 5, knowledgePoint: "ASCII 转换技巧",
      question: "把数字字符 ch（保证为 '0'～'9'）变成对应整数，常用写法是？",
      options: ["ch + '0'", "ch - '0'", "ch * '0'", "(int)\"ch\""],
      answer: 1,
      explanation: "数字字符减 '0' 可得到 0～9 的整数，这是二级常见写法。"
    },
    {
      id: 4007, type: "choice", category: "ascii", difficulty: 5, knowledgePoint: "ASCII 大小写转换",
      question: "已知大写字母 c（'A'～'Z'），转为小写的常用表达式是？",
      options: ["c + 32", "c - 32", "c + 'a'", "c - 'A'"],
      answer: 0,
      explanation: "大写转小写可加 32，或写 c - 'A' + 'a'。减 32 是小写转大写。"
    },
    {
      id: 4008, type: "judge", category: "ascii", difficulty: 4, knowledgePoint: "ASCII 连续",
      question: "ASCII 中 '0'～'9'、'A'～'Z'、'a'～'z' 各自内部都是连续编码的。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "三组字符在 ASCII 中各自连续，因此可用差值做转换与判断。"
    },
    {
      id: 4009, type: "choice", category: "ascii", difficulty: 5, knowledgePoint: "ASCII 输出",
      question: `char c = 'A';\nprintf("%d", c);\n\n输出是？`,
      options: ["A", "65", "97", "编译错误"],
      answer: 1,
      explanation: "%d 按整数输出，char 提升为 int 后输出其码值 65。"
    },
    {
      id: 4010, type: "choice", category: "ascii", difficulty: 5, knowledgePoint: "ASCII 运算",
      question: `printf("%c", 'A' + 2);\n\n输出是？`,
      options: ["A2", "C", "67", "编译错误"],
      answer: 1,
      explanation: "'A'+2 = 67，对应字符 'C'；%c 按字符输出。"
    },
    {
      id: 4011, type: "choice", category: "ascii", difficulty: 4, knowledgePoint: "ASCII 空格",
      question: "空格字符 ' ' 的 ASCII 码约为？",
      options: ["0", "10", "32", "65"],
      answer: 2,
      explanation: "空格的 ASCII 码是 32，属于常见可打印控制相关码值。"
    },
    {
      id: 4012, type: "judge", category: "ascii", difficulty: 5, knowledgePoint: "ASCII 与中文",
      question: "一个汉字在内存中一定只占 1 个字节，与 char 相同。",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "汉字编码（如 UTF-8/GBK）通常多字节，不能简单等同于一个 ASCII 字符。"
    },

    // ========== 类型转换：隐式 ==========
    {
      id: 4101, type: "choice", category: "cast", difficulty: 4, knowledgePoint: "隐式转换",
      question: "int 与 double 混合运算时，通常会？",
      options: ["结果一定是 int", "int 先转为 double 再运算", "double 转为 int 再运算", "一定编译错误"],
      answer: 1,
      explanation: "通常向更大、更“宽”的浮点类型提升，int 会转为 double 再算。"
    },
    {
      id: 4102, type: "choice", category: "cast", difficulty: 4, knowledgePoint: "整除与转换",
      question: `int a = 5, b = 2;\ndouble x = a / b;\nprintf("%.1f", x);\n\n输出是？`,
      options: ["2.5", "2.0", "2", "2.50"],
      answer: 1,
      explanation: "a/b 在赋值前已是 int 整除得 2，再转为 double 变成 2.0。"
    },
    {
      id: 4103, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "强制转浮点除",
      question: `int a = 5, b = 2;\ndouble x = (double)a / b;\n\nx 的值更接近？`,
      options: ["2", "2.0", "2.5", "3"],
      answer: 2,
      explanation: "先把 a 转为 double，再与 b 运算，得到浮点除法 2.5。"
    },
    {
      id: 4104, type: "choice", category: "cast", difficulty: 4, knowledgePoint: "赋值截断",
      question: `int n;\nn = 3.9;\nprintf("%d", n);\n\n输出是？`,
      options: ["3.9", "4", "3", "编译错误"],
      answer: 2,
      explanation: "浮点赋给 int 会截断小数部分（向 0 取整），3.9 变成 3。"
    },
    {
      id: 4105, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "char 与 int",
      question: `char c = 65;\nprintf("%c", c);\n\n输出是？`,
      options: ["65", "A", "a", "编译错误"],
      answer: 1,
      explanation: "整数字面量 65 赋给 char，对应 ASCII 'A'；%c 输出字符 A。"
    },
    {
      id: 4106, type: "judge", category: "cast", difficulty: 4, knowledgePoint: "隐式转换安全",
      question: "从 double 赋给 int 一定不会丢失信息。",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "小数部分会丢失，大数值还可能无法准确表示，存在信息损失。"
    },
    {
      id: 4107, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "表达式类型",
      question: `printf("%d", (int)3.7 + (int)2.8);\n\n输出是？`,
      options: ["6", "5", "6.5", "5.0"],
      answer: 1,
      explanation: "(int)3.7=3，(int)2.8=2，3+2=5。"
    },
    {
      id: 4108, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "强制转换位置",
      question: "下列哪个能得到 2.5？",
      options: [
        "int a=5,b=2; double x=a/b;",
        "int a=5,b=2; double x=(double)(a/b);",
        "int a=5,b=2; double x=a/(double)b;",
        "int a=5,b=2; double x=(int)a/b;"
      ],
      answer: 2,
      explanation: "必须在除法发生前把至少一侧变成浮点。先 a/b 再转 double 仍是 2.0。"
    },

    // ========== 类型转换：显式 / 混合 ==========
    {
      id: 4201, type: "choice", category: "cast", difficulty: 4, knowledgePoint: "强制转换语法",
      question: "C++ 中把 double x 转成 int 的常见写法是？",
      options: ["int(x) 或 (int)x", "x.toInt()", "int <- x", "cast int x"],
      answer: 0,
      explanation: "可用 C 风格 (int)x 或函数风格 int(x)。"
    },
    {
      id: 4202, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "bool 转换",
      question: `bool b = 3;\nprintf("%d", b);\n\n输出是？`,
      options: ["3", "1", "0", "编译错误"],
      answer: 1,
      explanation: "非 0 转 bool 为 true，再以 %d 输出通常为 1。"
    },
    {
      id: 4203, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "bool 与条件",
      question: `int x = 0;\nif (x) printf("T"); else printf("F");\n\n输出是？`,
      options: ["T", "F", "0", "无输出"],
      answer: 1,
      explanation: "0 在条件中视为假，走 else，输出 F。"
    },
    {
      id: 4204, type: "judge", category: "cast", difficulty: 4, knowledgePoint: "显式转换",
      question: "强制类型转换可以改变变量在内存中已存储的类型声明。",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "强制转换产生临时值用于表达式，不会改变原变量的类型声明。"
    },
    {
      id: 4205, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "混合运算",
      question: `int a = 1;\ndouble b = 2.5;\nprintf("%.1f", a + b);\n\n输出是？`,
      options: ["3", "3.0", "3.5", "1"],
      answer: 2,
      explanation: "a 转为 double 后与 2.5 相加得 3.5。"
    },
    {
      id: 4206, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "整数除法陷阱",
      question: "计算圆的某比例时写成 int r=5; double s=2/3*r*r; 结果偏小，主要原因是？",
      options: ["r 太小", "2/3 先按整数除法变成 0", "double 不能乘 int", "printf 格式不对"],
      answer: 1,
      explanation: "2/3 在 int 下为 0，后面再乘再转 double 也往往从 0 开始。"
    },
    {
      id: 4207, type: "choice", category: "ascii", difficulty: 5, knowledgePoint: "char 溢出概念",
      question: "若 char 为有符号且范围很小，将超过范围的整数赋给 char，可能？",
      options: ["自动改为 long long", "发生溢出/截断，值可能异常", "一定编译失败", "自动改为 double"],
      answer: 1,
      explanation: "窄整型赋值可能截断或溢出，二级需建立“范围”意识。"
    },
    {
      id: 4208, type: "judge", category: "cast", difficulty: 5, knowledgePoint: "static_cast 认知",
      question: "在 GESP 二级客观题范围内，理解 (int)x 这类转换含义通常已足够，不必先掌握全部 C++ 转换运算符细节。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "二级重点是隐式提升、赋值截断、除法陷阱与 char/ASCII，而非全部现代转换语法细节。"
    },

    // ========== 综合结果判断 ==========
    {
      id: 4301, type: "choice", category: "mixed", difficulty: 5, knowledgePoint: "综合 ASCII+运算",
      question: `char c = '5';\nint n = c - '0' + 1;\nprintf("%d", n);\n\n输出是？`,
      options: ["51", "6", "5", "16"],
      answer: 1,
      explanation: "'5'-'0'=5，再 +1 得 6。"
    },
    {
      id: 4302, type: "choice", category: "mixed", difficulty: 5, knowledgePoint: "综合转换",
      question: `printf("%d", (int)('A' + 1.5));\n\n输出是？`,
      options: ["66", "66.5", "65", "A"],
      answer: 0,
      explanation: "'A'+1.5 先变成浮点 66.5，再 (int) 截断为 66。"
    },
    {
      id: 4303, type: "choice", category: "mixed", difficulty: 5, knowledgePoint: "输出格式与类型",
      question: `int x = 'B';\nprintf("%c %d", x, x);\n\n输出是？`,
      options: ["B 66", "66 66", "B B", "编译错误"],
      answer: 0,
      explanation: "x 存的是 'B' 的码值 66；%c 显示 B，%d 显示 66。"
    },
    {
      id: 4304, type: "judge", category: "mixed", difficulty: 4, knowledgePoint: "类型选择题",
      question: "需要存储学生人数（非负整数、通常不太大）时，优先考虑 int，而不是 double。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "计数用整型更合适，避免浮点误差与语义不清。"
    },
    {
      id: 4305, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "优先级与转换",
      question: `double x = (double)5 / 2 * 2;\nprintf("%.1f", x);\n\n输出是？`,
      options: ["2.0", "4.0", "5.0", "2.5"],
      answer: 2,
      explanation: "(double)5/2=2.5，再 *2=5.0。注意与 (double)(5/2*2) 不同。"
    },
    {
      id: 4306, type: "choice", category: "ascii", difficulty: 5, knowledgePoint: "字符判断",
      question: "判断字符 c 是否为大写字母，常用条件是？",
      options: ["c >= 0 && c <= 25", "c >= 'A' && c <= 'Z'", "c == \"A\"", "c > 65"],
      answer: 1,
      explanation: "用 'A'～'Z' 的闭区间判断最清晰、可移植。"
    },
    {
      id: 4307, type: "choice", category: "cast", difficulty: 4, knowledgePoint: "float 与 double",
      question: "关于 float 与 double，更符合常识的是？",
      options: ["float 一定更精确", "double 通常精度更高、范围更大", "二者完全没有区别", "只能用 float 不能用 double"],
      answer: 1,
      explanation: "double 一般精度与范围优于 float；考试常考基本对比。"
    },
    {
      id: 4308, type: "judge", category: "ascii", difficulty: 5, knowledgePoint: "字符与字符串",
      question: "char c = 'A'; 与 char s[] = \"A\"; 在含义与存储上完全相同。",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "'A' 是单个字符；\"A\" 是字符串，还包含结束符 '\\0'，占更多空间。"
    },
    {
      id: 4309, type: "choice", category: "mixed", difficulty: 5, knowledgePoint: "二级易错综合",
      question: `int a = 3.9 + 1.1;\nprintf("%d", a);\n\n输出是？`,
      options: ["5", "4", "5.0", "编译错误"],
      answer: 0,
      explanation: "3.9+1.1 先按浮点得 5.0，再赋给 int 得 5。注意不是先截断再加。"
    },
    {
      id: 4310, type: "choice", category: "cast", difficulty: 5, knowledgePoint: "先截断再加",
      question: `int a = (int)3.9 + (int)1.1;\nprintf("%d", a);\n\n输出是？`,
      options: ["5", "4", "5.0", "3"],
      answer: 1,
      explanation: "(int)3.9=3，(int)1.1=1，3+1=4。与先加再转不同。"
    }
  ];

  window.GESP_BANKS = window.GESP_BANKS || {};
  window.GESP_BANKS["gesp2-ascii-cast"] = {
    id: "gesp2-ascii-cast",
    name: "二级 · ASCII与类型转换",
    exam: "GESP C++ 二级",
    description: "ASCII 码、字符运算、隐式/显式类型转换、混合运算易错点",
    staticQuestions: Q,
    hasFill: false,
    hasDynamic: false,
    settings: { allowFill: false, allowDynamic: false },
    modes: [
      { id: "mixed", label: "综合训练" },
      { id: "ascii", label: "ASCII 码" },
      { id: "cast", label: "类型转换" },
      { id: "judge", label: "判断题" }
    ]
  };
})();
