/**
 * 题库：printf / scanf 专项（GESP C++ 一级）
 * 自包含：静态题目直接存放于本文件（v1.10.29 从 script.js 迁入）
 * 难度与字段规范见 banks/BANK_FORMAT.md
 */
(function () {
  window.GESP_BANKS = window.GESP_BANKS || {};
  window.GESP_BANKS["printf-scanf"] = {
    id: "printf-scanf",
    name: "printf / scanf 专项",
    exam: "GESP C++ 一级",
    description: "格式化输入输出专项训练",
    staticQuestions: [
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
    question: `printf("Hello\\nWorld");\n\n输出结果是？`,
    options: ["Hello\\nWorld", "Hello World", "Hello\nWorld", "编译错误"],
    answer: 2,
    explanation: "\\n 是换行符。正确输出为两行：第一行 Hello，第二行 World。",
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
    id: 10, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 转义 %%",
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
    id: 12, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 综合",
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
    id: 23, type: "choice", category: "format", difficulty: 3, knowledgePoint: "printf %s", needsString: true,
    question: `char name[] = "Tom";\nprintf("%___", name);\n\n应填？`,
    options: ["d", "c", "s", "f"],
    answer: 2,
    explanation: "name 是字符数组（字符串），输出用 %s。"
  },
  {
    id: 25, type: "choice", category: "format", difficulty: 3, knowledgePoint: "scanf %d",
    question: `int age;\nscanf("%___", &age);\n\n应填？`,
    options: ["d", "f", "c", "s"],
    answer: 0,
    explanation: "age 是 int，输入整数用 %d。"
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
    id: 35, type: "choice", category: "scanf", difficulty: 4, knowledgePoint: "类型匹配",
    question: `int n;\nscanf("%f", &n);\n\n问题是？`,
    options: ["没有问题", "格式符与类型不匹配", "缺少 &", "变量名错误"],
    answer: 1,
    explanation: "n 是 int，应使用 %d，不能用 %f。"
  },
  {
    id: 37, type: "choice", category: "scanf", difficulty: 4, knowledgePoint: "参数数量",
    question: `int a, b;\nscanf("%d", &a, &b);\n\n问题？`,
    options: ["正确", "只读入一个，b 未读", "格式符太多", "编译错误"],
    answer: 1,
    explanation: "只有一个 %d，只会读入 a，b 保持原值（未定义）。"
  },

  // —— 找错 ——
  {
    id: 41, type: "choice", category: "error", difficulty: 4, knowledgePoint: "%c vs %s", needsString: true,
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
    id: 57, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf %.1f",
    question: `float f = 3.14159;\nprintf("%.2f", f);\n\n输出是？`,
    answer: "3.14",
    explanation: "%.2f 保留两位小数，四舍五入为 3.14。"
  },
  {
    id: 59, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf 综合",
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
  ,
  {
    id: 70, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 宽度+精度",
    question: `double x = 3.14159;\nprintf("%6.2f", x);\n\n输出效果最接近？`,
    options: ["  3.14", "3.14159", "03.14", "3.14  "],
    answer: 0,
    explanation: "总宽度 6、小数 2 位，整数部分前补空格：两个空格+3.14。"
  },
  {
    id: 72, type: "choice", category: "format", difficulty: 4, knowledgePoint: "scanf 多变量",
    question: `int a, b;\nscanf("%d,%d", &a, &b);\n\n输入时较合理的写法是？`,
    options: ["3 5", "3,5", "3;5", "a,b"],
    answer: 1,
    explanation: "格式串中有逗号，输入也应写 3,5。"
  },
  {
    id: 73, type: "choice", category: "output", difficulty: 4, knowledgePoint: "转义综合",
    question: `printf("A\\tB\\nC");\n\n关于输出描述正确的是？`,
    options: ["一行：A t B n C", "A与B之间有制表间隔，然后换行再输出C", "只输出 ABC", "编译错误"],
    answer: 1,
    explanation: "\\t 制表符，\\n 换行。"
  },
  {
    id: 74, type: "choice", category: "error", difficulty: 5, knowledgePoint: "格式不匹配",
    question: `int x = 65;\nprintf("%c", x);\n\n更可能的输出是？`,
    options: ["65", "A", "%c", "编译一定失败"],
    answer: 1,
    explanation: "按字符输出时，65 对应字符 'A'（ASCII）。"
  },
  {
    id: 75, type: "fill", category: "fill", difficulty: 5, knowledgePoint: "printf 复合填空",
    question: `printf("%d+%d=%d", 2, 3, 2+3);\n\n输出是？`,
    answer: "2+3=5",
    explanation: "三个 %d 依次替换为 2、3、5。"
  },
  {
    id: 76, type: "choice", category: "output", difficulty: 5, knowledgePoint: "零填充",
    question: `printf("%04d", 58);\n\n输出是？`,
    options: ["58", "0058", "  58", "5800"],
    answer: 1,
    explanation: "%04d 表示宽度 4、不足补 0。"
  }

  ,
  // ===== 真·五星：格式细节 / 复合输出（对标 GESP 易错题） =====
  {
    id: 80, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 无空格拼接",
    question: `int a = 1;\nprintf("a+1=%d\\n", a+1);\n\n输出是？`,
    options: ["a+1= 2", "a+1=2", "2=2", "2= 2"],
    answer: 1,
    explanation: "格式串为 a+1=%d 再换行，%d 换成 2，中间没有空格，得到 a+1=2。"
  },
  {
    id: 81, type: "choice", category: "output", difficulty: 5, knowledgePoint: "float 再赋值 + %.0f",
    question: `float a;\na = 101.101;\na = 101;\nprintf("a+1={%.0f}", a+1);\n\n输出是？`,
    options: ["102={102}", "a+1={a+1}", "a+1={102}", "执行将报错"],
    answer: 2,
    explanation: "float 可被赋值为整数 101（变成 101.0），不会报错。a+1 为 102，%.0f 不输出小数部分，故 a+1={102}。"
  },
  {
    id: 82, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 空格位置",
    question: `int x = 5;\nprintf("x = %d", x);\n\n输出是？`,
    options: ["x =5", "x=5", "x = 5", "x= 5"],
    answer: 2,
    explanation: "等号两侧在格式串里各有一个空格：x 空格 = 空格 %d → x = 5。"
  },
  {
    id: 83, type: "choice", category: "output", difficulty: 5, knowledgePoint: "%.0f 舍入",
    question: `printf("%.0f", 3.5);\n\n在常见教学环境下输出最可能是？`,
    options: ["3.5", "3", "4", "3.50"],
    answer: 2,
    explanation: "%.0f 表示不保留小数，通常四舍五入，3.5 多为 4。（具体实现可能因库而异，考试常按四舍五入）"
  },
  {
    id: 84, type: "choice", category: "output", difficulty: 5, knowledgePoint: "宽度与左端空格",
    question: `printf("[%3d]", 7);\n\n输出是？`,
    options: ["[7]", "[ 7]", "[07]", "[7 ]"],
    answer: 1,
    explanation: "%3d 宽度为 3，7 占 1 位，左侧补 2 个空格中的效果为 [␠7] 即前面有空格。"
  },
  {
    id: 86, type: "choice", category: "output", difficulty: 5, knowledgePoint: "多格式混合",
    question: `int a = 2; double b = 3.0;\nprintf("%d%.0f", a, b);\n\n输出是？`,
    options: ["23.0", "2 3", "23", "2.03"],
    answer: 2,
    explanation: "%d 输出 2，%.0f 输出 3，中间无空格，得到 23。"
  },
  {
    id: 87, type: "choice", category: "output", difficulty: 5, knowledgePoint: "字符与整数同码",
    question: `char c = '0';\nprintf("%d", c);\n\n输出更可能是？`,
    options: ["0", "48", "'0'", "编译错误"],
    answer: 1,
    explanation: "字符 '0' 的 ASCII 码是 48，用 %d 按整数输出为 48。"
  },
  {
    id: 88, type: "choice", category: "output", difficulty: 5, knowledgePoint: "表达式作为参数",
    question: `int a = 3;\nprintf("%d%d", a+1, a*2);\n\n输出是？`,
    options: ["4 6", "46", "3 6", "34"],
    answer: 1,
    explanation: "两个 %d 之间无空格，输出 4 与 6 紧贴成 46。"
  },
  {
    id: 91, type: "choice", category: "output", difficulty: 4, knowledgePoint: "\\n 位置",
    question: `printf("A\\nB"); printf("C");\n\n输出行数与内容是？`,
    options: ["一行 ABC", "两行：第一行 A，第二行 BC", "两行：第一行 AB，第二行 C", "三行 A、B、C"],
    answer: 1,
    explanation: "第一个 printf 在 A 后换行再输出 B，第二个紧接输出 C，故第二行为 BC。"
  },
  {
    id: 93, type: "choice", category: "output", difficulty: 5, knowledgePoint: "%5.1f",
    question: `printf("%5.1f", 3.14);\n\n输出效果最接近？`,
    options: ["3.14 ", " 3.1", "03.1", "3.140"],
    answer: 1,
    explanation: "精度 1 位变成 3.1，总宽 5，左侧补空格。"
  },
  {
    id: 97, type: "choice", category: "error", difficulty: 5, knowledgePoint: "参数个数",
    question: `printf("%d%d", 5);\n\n下列说法较合理的是？`,
    options: ["一定输出 55", "行为不确定或错误，少了参数", "输出 5", "编译期一定失败且无法运行"],
    answer: 1,
    explanation: "两个 %d 只提供一个参数，属于未定义行为/错误用法。"
  },
  {
    id: 98, type: "choice", category: "output", difficulty: 5, knowledgePoint: "整型除法再打印",
    question: `int a = 5, b = 2;\nprintf("%d", a / b * 2);\n\n输出是？`,
    options: ["5", "4", "2.5", "10"],
    answer: 1,
    explanation: "整除 5/2=2，再*2=4。"
  },
  {
    id: 99, type: "choice", category: "output", difficulty: 5, knowledgePoint: "格式串中的花括号与精度",
    question: `float x = 9.9;\nprintf("v={%.0f}", x);\n\n输出是？`,
    options: ["v={9.9}", "v={10}", "v={9}", "v={%.0f}"],
    answer: 1,
    explanation: "%.0f 对 9.9 四舍五入为 10，输出 v={10}。"
  }

  ,
  // ===== 五星补充（去重后保留重编号 + 新增）：宽度、精度、对齐、scanf 细节 =====
  {
    id: 101, type: "choice", category: "output", difficulty: 5, knowledgePoint: "宽度不足",
    question: `printf("%3d", 1234);\n\n输出是？`,
    options: ["123", "234", "1234", " 1234"],
    answer: 2,
    explanation: "宽度不够时完整输出，不会截断。"
  },
  {
    id: 102, type: "choice", category: "output", difficulty: 5, knowledgePoint: "\\n 分行输出",
    question: `printf("a=%d\\nb=%d", 1, 2);\n\n输出是？`,
    options: ["a=1 b=2", "a=1\\nb=2", "a=1\nb=2", "a=%d b=%d"],
    answer: 2,
    explanation: "\\n 换行，两行分别为 a=1 与 b=2。"
  },
  {
    id: 103, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "scanf 返回值概念",
    question: `int x, y, r;\nr = scanf("%d%d", &x, &y);\n\n若成功读入两个整数，r 通常为？`,
    options: ["0", "1", "2", "x 的值"],
    answer: 2,
    explanation: "scanf 返回成功赋值的项数，读入两个则为 2。"
  },
  {
    id: 104, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 左对齐",
    question: `printf("[%-5d]", 42);\n\n输出是？`,
    options: ["[42   ]", "[   42]", "[42]", "[0042]"],
    answer: 0,
    explanation: "%-5d 中 - 表示左对齐：宽度 5，42 占 2 位，右侧补 3 个空格。"
  },
  {
    id: 106, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 字符串宽度",
    question: `printf("[%6s]", "hi");\n\n输出是？`,
    options: ["[hi    ]", "[    hi]", "[hi]", "[00hi0]"],
    answer: 1,
    explanation: "%6s 宽度 6，默认右对齐，\"hi\" 占 2 位，左侧补 4 个空格。"
  },
  {
    id: 107, type: "choice", category: "output", difficulty: 5, knowledgePoint: "连续 %%",
    question: `printf("%%%%%d", 8);\n\n输出是？`,
    options: ["%%8", "%%%%8", "%8", "8"],
    answer: 0,
    explanation: "每两个 %% 输出一个 %：四个 %% 输出两个 %，再由 %d 输出 8，结果 %%8。"
  },
  {
    id: 108, type: "choice", category: "output", difficulty: 5, knowledgePoint: "转义双引号",
    question: `printf("\\\"hi\\\"\");\n\n输出是？`,
    options: ["hi", "\"hi\"", "'hi'", "\\hi\\"],
    answer: 1,
    explanation: "\\\" 表示一个双引号字符，所以输出带引号的 \"hi\"（共 4 个字符）。"
  },
  {
    id: 109, type: "choice", category: "output", difficulty: 5, knowledgePoint: "字符运算",
    question: `char c = 'a';\nprintf("%c", c + 1);\n\n输出是？`,
    options: ["a", "b", "98", "a+1"],
    answer: 1,
    explanation: "c + 1 的值是 98（'b' 的 ASCII 码），用 %c 按字符输出为 b。"
  },
  {
    id: 110, type: "choice", category: "output", difficulty: 5, knowledgePoint: "负数整除",
    question: `int a = -7;\nprintf("%d", a / 2);\n\n输出是？`,
    options: ["-4", "-3.5", "-3", "3"],
    answer: 2,
    explanation: "C++ 整数除法向零取整：-7 / 2 = -3，而不是 -4。"
  },
  {
    id: 111, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "scanf 域宽",
    question: `int n;\nscanf("%3d", &n);\n\n输入 12345，n 的值是？`,
    options: ["12345", "123", "1234", "读入失败"],
    answer: 1,
    explanation: "%3d 最多读 3 位数字，n 得到 123，剩下的 45 留在输入缓冲区。"
  },
  {
    id: 112, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "scanf 返回值 0",
    question: `int x, r;\nr = scanf("%d", &x);\n\n若输入 abc，r 的值通常是？`,
    options: ["x 的值", "1", "0", "-1"],
    answer: 2,
    explanation: "输入与 %d 不匹配，没有任何项被成功赋值，scanf 返回 0。"
  },
  {
    id: 113, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "%c 读空白",
    question: `int a; char c;\nscanf("%d%c", &a, &c);\n\n输入 12 x（12 与 x 之间有一个空格），c 读到的是？`,
    options: ["字符 x", "空格", "换行符", "读入失败"],
    answer: 1,
    explanation: "%c 不跳过空白字符：%d 读到 12 后，紧随其后的空格会被 %c 读入，所以 c 是空格。"
  },
  {
    id: 114, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "scanf 字面字符匹配",
    question: `int a, b;\nscanf("%d,%d", &a, &b);\n\n输入 3 5（用空格分隔），结果是？`,
    options: ["a=3, b=5", "a=3, b 未成功读入", "a、b 都未读入", "编译错误"],
    answer: 1,
    explanation: "格式串要求一个逗号，输入却是空格：%d 读到 3 后，空格与逗号不匹配，第二个 %d 失败，b 保持原值。"
  },
  {
    id: 115, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf %.3f",
    question: `printf("%.3f", 6.5);\n\n输出是？\n（直接填写输出结果）`,
    answer: "6.500",
    explanation: "%.3f 保留 3 位小数，6.5 末尾补齐为 6.500。"
  },
  {
    id: 116, type: "fill", category: "fill", difficulty: 5, knowledgePoint: "零填充+精度",
    question: `printf("[%06.2f]", 9.5);\n\n输出是？\n（直接填写输出结果）`,
    answer: "[009.50]",
    explanation: "先按精度 2 位得到 9.50（4 个字符），宽度 6 不足用 0 填充得 009.50，加上方括号。"
  }

  ,
  // ===== 五星扩充：多应用复合题（输入 + 运算 + 混合格式输出） =====
  {
    id: 117, type: "choice", category: "output", difficulty: 5, knowledgePoint: "整除取余+%% 混合",
    question: `int a = 7, b = 2;\nprintf("a/b=%d a%%b=%d", a / b, a % b);\n\n输出是？`,
    options: ["a/b=3 a%b=1", "a/b=3.5 a%b=1", "a/b=3 a%%b=1", "a/b=3 a%b=2"],
    answer: 0,
    explanation: "整除 7/2=3、取余 7%2=1；两个 %d 分别换成 3 和 1，%% 输出一个百分号，其余字符原样输出。"
  },
  {
    id: 118, type: "choice", category: "output", difficulty: 5, knowledgePoint: "连续 printf 分行",
    question: `printf("1+2=");\nprintf("%d\\n", 1 + 2);\nprintf("3*3=%d\\n", 9);\n\n输出的行数与内容是？`,
    options: ["一行：1+2=33*3=9", "两行：第一行 1+2=3，第二行 3*3=9", "三行：1+2=、3、3*3=9", "两行：第一行 1+2=，第二行 33*3=9"],
    answer: 1,
    explanation: "前两个 printf 之间没有换行，先拼成 1+2=3，随后 \\n 换行；第三个输出 3*3=9 再换行，共两行。"
  },
  {
    id: 119, type: "fill", category: "fill", difficulty: 5, knowledgePoint: "scanf 字面冒号+换算",
    question: `int h, m;\nscanf("%d:%d", &h, &m);\nprintf("%d", h * 60 + m);\n\n输入 2:30 时，输出是？\n（直接填写输出结果）`,
    answer: "150",
    explanation: "%d 读入 2，格式串中的冒号与输入中的冒号匹配，%d 读入 30；2×60+30=150。"
  },
  {
    id: 120, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "域宽+连续读入",
    question: `int a, b;\nscanf("%2d%d", &a, &b);\n\n输入 12345，a 和 b 的值分别是？`,
    options: ["a=12, b=345", "a=12345, b 未读入", "a=1, b=2345", "a=12345, b=345"],
    answer: 0,
    explanation: "%2d 最多读 2 位，a 得到 12；第二个 %d 从剩余输入继续读，b 得到 345。"
  },
  {
    id: 121, type: "fill", category: "fill", difficulty: 5, knowledgePoint: "字面文本+%%+多变量",
    question: `printf("a=%d%%,b=%d", 10, 20);\n\n输出是？\n（直接填写输出结果）`,
    answer: "a=10%,b=20",
    explanation: "第一个 %d 换成 10，%% 输出一个百分号，第二个 %d 换成 20；等号、逗号原样输出，各项之间没有多余空格。"
  },
  {
    id: 122, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "混合类型输入+运算",
    question: `int n;\nfloat x;\nscanf("%d%f", &n, &x);\nprintf("%.1f", n + x);\n\n输入 42 3.5（空格分隔）时，输出是？`,
    options: ["45.5", "423.5", "45", "读入失败"],
    answer: 0,
    explanation: "%d 读入 42，%f 读入 3.5（scanf 遇空白自动分隔）；42+3.5=45.5，%.1f 保留一位小数输出 45.5。"
  },
  {
    id: 123, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "scanf 字面前缀",
    question: `int a, b;\nscanf("a=%d,b=%d", &a, &b);\nprintf("%d", a + b);\n\n输入 a=3,b=4 时，输出是？`,
    options: ["7", "34", "a=3,b=4", "a、b 未成功读入"],
    answer: 0,
    explanation: "scanf 格式串中的普通字符（a=、逗号、b=）要求输入原样提供；输入完全匹配，成功读入 3 和 4，输出 7。"
  },
  {
    id: 124, type: "fill", category: "fill", difficulty: 5, knowledgePoint: "表达式参数+%%",
    question: `printf("%d%%", 25 * 4);\n\n输出是？\n（直接填写输出结果）`,
    answer: "100%",
    explanation: "%d 输出表达式 25*4 的结果 100，%% 输出一个百分号。"
  },
  {
    id: 125, type: "choice", category: "output", difficulty: 5, knowledgePoint: "字符运算双格式",
    question: `char c1 = 'a', c2;\nc2 = c1 + 2;\nprintf("%c%d", c2, c2 - c1);\n\n输出是？`,
    options: ["c2", "c98", "b2", "98c"],
    answer: 0,
    explanation: "c2 是 'a'+2 即字符 'c'，%c 输出 c；c2-c1 是整数 2，%d 输出 2，两者紧挨拼成 c2。"
  },
  {
    id: 126, type: "fill", category: "fill", difficulty: 5, knowledgePoint: "三变量拼数",
    question: `int a, b, c;\nscanf("%d %d %d", &a, &b, &c);\nprintf("%d", a * 100 + b * 10 + c);\n\n输入 1 2 3 时，输出是？\n（直接填写输出结果）`,
    answer: "123",
    explanation: "读入 1、2、3 三个整数，按 a×100+b×10+c 拼成三位数 123。"
  },
  {
    id: 127, type: "choice", category: "output", difficulty: 5, knowledgePoint: "零填充+精度+字面字符",
    question: `int n = 5;\ndouble pi = 3.14159;\nprintf("%02d|%.2f", n, pi);\n\n输出是？`,
    options: ["05|3.14", "5|3.14", "05|3.14159", "5|3.15"],
    answer: 0,
    explanation: "%02d 宽度 2、不足补 0，得 05；竖线原样输出；%.2f 对 3.14159 保留两位小数得 3.14。"
  },
  {
    id: 128, type: "choice", category: "output", difficulty: 5, knowledgePoint: "%g 格式",
    question: `printf("%g", 3.140000);\n\n输出是？`,
    options: ["3.14", "3.140000", "3", "3.1"],
    answer: 0,
    explanation: "%g 自动去掉末尾多余的 0，以最短形式输出浮点数，得 3.14。"
  },
  {
    id: 129, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "%c 读数字字符",
    question: `char c1, c2;\nscanf("%c%c", &c1, &c2);\nprintf("%d", c2 - c1);\n\n输入 18 时，输出是？`,
    options: ["7", "18", "8", "56"],
    answer: 0,
    explanation: "%c 读入的是字符 '1' 和 '8'（ASCII 49 和 56），c2-c1 = 56-49 = 7，而不是把 18 当作整数。"
  }

],
    dynamicTemplates: [
    // ===== 基础动态（仍会在复杂度设置下过滤）=====
    {
      minC: 1, kp: "printf 花括号", cat: "output",
      make: () => {
        const a = randInt(1, 50), b = randInt(1, 50);
        return {
          type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 花括号",
          question: `int a = ${a}, b = ${b};\nprintf("{%d,%d}", a, b);\n\n输出是？`,
          options: [`{${a},${b}}`, `${a},${b}`, `{%d,%d}`, `{${a}, ${b}}`],
          answer: 0,
          explanation: `花括号原样输出，结果 {${a},${b}}。`
        };
      }
    },
    {
      minC: 1, kp: "printf %%", cat: "output",
      make: () => {
        const n = randInt(1, 30);
        if (Math.random() < 0.5) {
          return {
            type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 转义 %%",
            question: `printf("%%%d%%", ${n});\n\n输出是？`,
            options: [`%${n}%`, `%%${n}%%`, String(n), `%${n}`],
            answer: 0,
            explanation: `%%→%，%d→${n}，%%→%。`
          };
        }
        return {
          type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf 转义 %%",
          question: `printf("%d%%", ${n});\n\n输出是？`,
          answer: `${n}%`,
          explanation: `%d 输出 ${n}，%% 输出普通百分号。`
        };
      }
    },
    {
      minC: 2, kp: "printf 宽度 %0Nd", cat: "output",
      make: () => {
        const w = pick([3, 4, 5]);
        const n = randInt(1, 9);
        const out = String(n).padStart(w, "0");
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 宽度补零",
          question: `printf("%0${w}d", ${n});\n\n输出是？`,
          options: [out, String(n), " ".repeat(Math.max(0,w-1)) + n, String(n).padEnd(w, "0")],
          answer: 0,
          explanation: `%0${w}d 表示宽度 ${w}，不足补 0 → ${out}。`
        };
      }
    },
    {
      minC: 2, kp: "printf 精度 %f", cat: "output",
      make: () => {
        const x = pick([3.14159, 2.71828, 1.5, 9.876]);
        const p = pick([0, 1, 2]);
        const out = x.toFixed(p);
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 精度",
          question: `printf("%.${p}f", ${x});\n\n输出最接近？`,
          options: [out, String(x), String(Math.floor(x)), out + "0"],
          answer: 0,
          explanation: `%.${p}f 保留 ${p} 位小数 → ${out}。`
        };
      }
    },
    {
      minC: 2, kp: "printf 宽度+精度", cat: "output",
      make: () => {
        const x = 3.14159;
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 宽度+精度",
          question: `double x = ${x};\nprintf("%6.2f", x);\n\n输出效果最接近？`,
          options: ["  3.14", "3.14159", "03.14", "3.14  "],
          answer: 0,
          explanation: "总宽 6、小数 2 位，前面补空格。"
        };
      }
    },
    {
      minC: 1, kp: "格式符 %d", cat: "format",
      make: () => {
        const v = pick(["a", "n", "x"]);
        return {
          type: "choice", category: "format", difficulty: 4, knowledgePoint: "printf %d",
          question: `int ${v} = 5;\nprintf("%___", ${v});\n\n横线处应填？（只填字母）`,
          options: ["d", "f", "c", "s"],
          answer: 0,
          explanation: `int 用 %d。`
        };
      }
    },
    {
      minC: 1, kp: "scanf 格式", cat: "format",
      make: () => {
        const v = pick(["n", "age", "x"]);
        return {
          type: "choice", category: "format", difficulty: 4, knowledgePoint: "scanf %d",
          question: `int ${v};\nscanf("%___", &${v});\n\n应填？`,
          options: ["d", "f", "c", "s"],
          answer: 0,
          explanation: `int 输入用 %d，并注意 &。`
        };
      }
    },

    // ===== 五星复合：printf + 运算优先级 =====
    {
      minC: 1, kp: "printf+乘法加法", cat: "output", hard: true,
      make: () => {
        const a = randInt(2, 6), b = randInt(2, 6), c = randInt(1, 5);
        const val = a + b * c;
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 运算优先级",
          question: `int a = ${a}, b = ${b}, c = ${c};\nprintf("%d", a + b * c);\n\n输出是？`,
          options: [String(val), String((a + b) * c), String(a + b + c), String(a * b * c)],
          answer: 0,
          explanation: `先乘后加：b*c=${b*c}，再 +a → ${val}。`
        };
      }
    },
    {
      minC: 1, kp: "printf+整除", cat: "output", hard: true,
      make: () => {
        const a = randInt(7, 20), b = randInt(2, 5);
        const val = Math.floor(a / b);
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 整除",
          question: `int a = ${a}, b = ${b};\nprintf("%d", a / b);\n\n输出是？`,
          options: [String(val), String(a / b), String(a % b), String(a * b)],
          answer: 0,
          explanation: `整数除法截断小数，${a}/${b}=${val}。`
        };
      }
    },
    {
      minC: 1, kp: "printf+取余", cat: "output", hard: true,
      make: () => {
        const a = randInt(10, 30), b = randInt(3, 7);
        const val = a % b;
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 取余",
          question: `printf("%d", ${a} % ${b});\n\n输出是？`,
          options: [String(val), String(Math.floor(a/b)), String(a+b), String(b)],
          answer: 0,
          explanation: `${a} % ${b} = ${val}。`
        };
      }
    },
    {
      minC: 1, kp: "printf+括号优先级", cat: "output", hard: true,
      make: () => {
        const a = randInt(2, 5), b = randInt(2, 5), c = randInt(2, 4);
        const withParen = (a + b) * c;
        const noParen = a + b * c;
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 括号改变优先级",
          question: `int a=${a}, b=${b}, c=${c};\nprintf("%d %d", (a+b)*c, a+b*c);\n\n输出是？`,
          options: [`${withParen} ${noParen}`, `${noParen} ${withParen}`, `${withParen} ${withParen}`, `${noParen} ${noParen}`],
          answer: 0,
          explanation: `(a+b)*c=${withParen}；a+b*c=${noParen}。`
        };
      }
    },
    {
      minC: 1, kp: "printf+自增", cat: "output", hard: true,
      make: () => {
        // 只考「先输出再自增」的后置风格：printf("%d", a++); 再用一次
        const a0 = randInt(3, 9);
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 后置自增",
          question: `int a = ${a0};\nprintf("%d", a++);\nprintf("%d", a);\n\n输出是？`,
          options: [`${a0}${a0+1}`, `${a0+1}${a0+1}`, `${a0}${a0}`, `${a0+1}${a0}`],
          answer: 0,
          explanation: `后置 ++ 先取值再加：先输出 ${a0}，a 变为 ${a0+1}，再输出 ${a0+1}。`
        };
      }
    },
    {
      minC: 1, kp: "printf+前置自增", cat: "output", hard: true,
      make: () => {
        const a0 = randInt(3, 9);
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 前置自增",
          question: `int a = ${a0};\nprintf("%d", ++a);\n\n输出是？`,
          options: [String(a0+1), String(a0), String(a0+2), String(a0-1)],
          answer: 0,
          explanation: `前置 ++ 先加再取值，输出 ${a0+1}。`
        };
      }
    },
    {
      minC: 1, kp: "printf+复合赋值", cat: "output", hard: true,
      make: () => {
        const x0 = randInt(5, 12), k = randInt(2, 4);
        const x1 = x0 + k;
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 复合赋值",
          question: `int x = ${x0};\nx += ${k};\nprintf("%d", x * 2);\n\n输出是？`,
          options: [String(x1 * 2), String(x0 * 2), String(x0 + k * 2), String(x1)],
          answer: 0,
          explanation: `x 变为 ${x1}，再 *2 → ${x1*2}。`
        };
      }
    },
    {
      minC: 2, kp: "printf 多语句换行", cat: "output", hard: true,
      make: () => {
        const a = randInt(1, 9), b = randInt(1, 9);
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "连续 printf",
          question: `printf("%d", ${a});\nprintf("%d", ${b});\nprintf("\\n");\nprintf("%d", ${a}+${b});\n\n输出是？`,
          options: [`${a}${b}\n${a+b}`, `${a}\n${b}\n${a+b}`, `${a} ${b}\n${a+b}`, String(a+b)],
          answer: 0,
          explanation: `前两次不换行得 ${a}${b}，然后换行，再输出和 ${a+b}。`
        };
      }
    },
    {
      minC: 2, kp: "printf %% 与表达式", cat: "output", hard: true,
      make: () => {
        const n = randInt(2, 8), m = randInt(2, 5);
        const v = n * m;
        return {
          type: "fill", category: "fill", difficulty: 5, knowledgePoint: "printf 复合填空",
          question: `printf("%d%%", ${n}*${m});\n\n输出是？`,
          answer: `${v}%`,
          explanation: `先算 ${n}*${m}=${v}，再 %d 与 %% → ${v}%。`
        };
      }
    },
    {
      minC: 2, kp: "printf 强制转换", cat: "output", hard: true,
      make: () => {
        const a = pick([7, 9, 11, 13]);
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 强制转换",
          question: `int a = ${a};\nprintf("%.1f", (double)a / 2);\n\n输出最接近？`,
          options: [(a/2).toFixed(1), String(Math.floor(a/2)), String(a/2), (a/2).toFixed(0)+".0"],
          answer: 0,
          explanation: `先转为 double 再除，保留 1 位小数 → ${(a/2).toFixed(1)}。`
        };
      }
    },
    {
      minC: 1, kp: "printf 三目", cat: "output", hard: true,
      make: () => {
        const a = randInt(1, 9), b = randInt(1, 9);
        const v = a > b ? a : b;
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 三目运算",
          question: `int a=${a}, b=${b};\nprintf("%d", a>b?a:b);\n\n输出是？`,
          options: [String(v), String(a), String(b), String(a+b)],
          answer: 0,
          explanation: `三目取较大者 → ${v}。`
        };
      }
    },
    {
      minC: 2, kp: "printf 字符ASCII", cat: "output", hard: true,
      make: () => {
        const ch = pick(["A", "B", "0", "a"]);
        const code = ch.charCodeAt(0);
        return {
          type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 字符作整数",
          question: `char c = '${ch}';\nprintf("%d", c);\n\n输出是？`,
          options: [String(code), ch, String(code + 1), "0"],
          answer: 0,
          explanation: `%d 打印字符的 ASCII 码，'${ch}' → ${code}。`
        };
      }
    },
],
    settings: {
      allowFill: true,
      allowDynamic: true,
      enableString: false,
      defaultComplexity: 2
    },
    modes: [
      { id: "mixed", label: "综合训练" },
      { id: "fill", label: "填空专项" },
      { id: "output", label: "输出判断" },
      { id: "format", label: "格式符" },
      { id: "scanf", label: "scanf专项" }
    ]
  };
})();
