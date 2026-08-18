/* ========== 静态题库（规范下划线 + 格式符选项只写字母） ========== */
const STATIC_QUESTIONS = [
  // —— 输出结果判断 ——
  {
    id: 1, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf %d",
    question: `int a = 10;\nprintf("%d", a);\n\n这段代码的输出是？`,
    options: ["a=10", "10", "%d", "编译错误"],
    answer: 1,
    explanation: "%d 用于输出整数。变量 a 的值是 10，所以直接输出 10。"
  },
  {
    id: 2, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 文本+%d",
    question: `int age = 12;\nprintf("age=%d", age);\n\n输出结果是？`,
    options: ["age=12", "12", "age=%d", "age="],
    answer: 0,
    explanation: "printf 会输出引号内的普通文本，%d 被替换为 age 的值 12。"
  },
  {
    id: 3, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf \\n",
    question: `printf("Hello\\nWorld");\n\n输出结果是？`,
    options: ["Hello\\nWorld", "Hello World", "Hello\nWorld", "编译错误"],
    answer: 2,
    explanation: "\\n 是换行符。正确输出为两行：第一行 Hello，第二行 World。",
  },
  {
    id: 4, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 多变量",
    question: `int a = 3, b = 5;\nprintf("%d %d", a, b);\n\n输出是？`,
    options: ["3 5", "a b", "%d %d", "35"],
    answer: 0,
    explanation: "两个 %d 分别对应 a 和 b 的值，中间有空格。"
  },
  {
    id: 5, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf %c",
    question: `char ch = 'A';\nprintf("%c", ch);\n\n输出是？`,
    options: ["A", "65", "%c", "ch"],
    answer: 0,
    explanation: "%c 用于输出字符，ch 的值是字符 'A'。"
  },
  {
    id: 6, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf %s", needsString: true,
    question: `printf("%s", "GESP");\n\n输出是？`,
    options: ["GESP", "%s", "\"GESP\"", "编译错误"],
    answer: 0,
    explanation: "%s 用于输出字符串，直接输出 GESP。"
  },
  {
    id: 7, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf %f",
    question: `float score = 98.5;\nprintf("%.1f", score);\n\n输出是？`,
    options: ["98.5", "98", "%.1f", "98.50"],
    answer: 0,
    explanation: "%.1f 表示保留一位小数输出浮点数。"
  },
  {
    id: 8, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 顺序",
    question: `int a = 10, b = 20;\nprintf("%d%d", b, a);\n\n输出是？`,
    options: ["1020", "2010", "10 20", "20 10"],
    answer: 1,
    explanation: "参数顺序决定输出顺序：先 b=20，再 a=10，无空格。"
  },
  {
    id: 9, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 无空格",
    question: `printf("%d%d%d", 1, 2, 3);\n\n输出？`,
    options: ["123", "1 2 3", "1,2,3", "%d%d%d"],
    answer: 0,
    explanation: "格式串中没有空格，所以数字连在一起。"
  },
  {
    id: 10, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 转义 %%",
    question: `printf("%%%d", 3);\n\n输出是？`,
    options: ["%3", "%%3", "3", "%%d"],
    answer: 0,
    explanation: "%% 输出一个普通的百分号 %，然后 %d 输出 3，所以结果是 %3。"
  },
  {
    id: 11, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 转义",
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
    id: 21, type: "choice", category: "format", difficulty: 4, knowledgePoint: "printf %d",
    question: `int n = 5;\nprintf("n=%___", n);\n\n横线处应填什么？（只填字母部分）`,
    options: ["d", "f", "c", "s"],
    answer: 0,
    explanation: "n 是 int 类型，整数输出使用 %d，所以填 d。"
  },
  {
    id: 22, type: "choice", category: "format", difficulty: 4, knowledgePoint: "printf %c",
    question: `char c = 'x';\nprintf("%___", c);\n\n应填？`,
    options: ["d", "f", "c", "s"],
    answer: 2,
    explanation: "c 是 char 类型，输出字符用 %c。"
  },
  {
    id: 23, type: "choice", category: "format", difficulty: 4, knowledgePoint: "printf %s", needsString: true,
    question: `char name[] = "Tom";\nprintf("%___", name);\n\n应填？`,
    options: ["d", "c", "s", "f"],
    answer: 2,
    explanation: "name 是字符数组（字符串），输出用 %s。"
  },
  {
    id: 24, type: "choice", category: "format", difficulty: 4, knowledgePoint: "printf %f",
    question: `double pi = 3.14;\nprintf("%___", pi);\n\n常用格式符字母是？`,
    options: ["d", "f", "c", "s"],
    answer: 1,
    explanation: "double / float 输出用 %f。"
  },
  {
    id: 25, type: "choice", category: "format", difficulty: 4, knowledgePoint: "scanf %d",
    question: `int age;\nscanf("%___", &age);\n\n应填？`,
    options: ["d", "f", "c", "s"],
    answer: 0,
    explanation: "age 是 int，输入整数用 %d。"
  },
  {
    id: 26, type: "choice", category: "format", difficulty: 4, knowledgePoint: "scanf %f",
    question: `float score;\nscanf("%___", &score);\n\n应填？`,
    options: ["d", "f", "c", "s"],
    answer: 1,
    explanation: "score 是 float，输入浮点数用 %f。"
  },
  {
    id: 27, type: "choice", category: "format", difficulty: 4, knowledgePoint: "scanf %c",
    question: `char ch;\nscanf("%___", &ch);\n\n读取一个字符应填？`,
    options: ["d", "s", "c", "f"],
    answer: 2,
    explanation: "读取单个字符用 %c。"
  },

  // —— scanf 与 & ——
  {
    id: 31, type: "choice", category: "scanf", difficulty: 4, knowledgePoint: "scanf &",
    question: `int age;\nscanf("%d", ______);\n\n横线处应填？`,
    options: ["age", "&age", "*age", "%age"],
    answer: 1,
    explanation: "scanf 需要变量的地址，所以用 &age。"
  },
  {
    id: 32, type: "choice", category: "scanf", difficulty: 4, knowledgePoint: "scanf 忘记&",
    question: `int a;\nscanf("%d", a);\n\n这段代码有什么问题？`,
    options: ["没有问题", "忘记取地址符 &", "格式符错误", "变量未初始化"],
    answer: 1,
    explanation: "scanf 的参数必须是地址，应写 &a，否则是错误的。"
  },
  {
    id: 33, type: "choice", category: "scanf", difficulty: 4, knowledgePoint: "scanf 多变量",
    question: `int a, b;\nscanf("%d%d", ______, ______);\n\n正确的是？`,
    options: ["a, b", "&a, &b", "a, &b", "&a, b"],
    answer: 1,
    explanation: "两个变量都需要取地址：&a, &b。"
  },

  {
    id: 34, type: "choice", category: "scanf", difficulty: 4, knowledgePoint: "scanf %s", needsString: true,
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
    id: 36, type: "choice", category: "scanf", difficulty: 4, knowledgePoint: "类型匹配",
    question: `float f;\nscanf("%d", &f);\n\n问题？`,
    options: ["正确", "格式符与类型不匹配", "需要 &f 已正确", "float 不能用 scanf"],
    answer: 1,
    explanation: "float 应使用 %f，%d 是给 int 的。"
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
    id: 51, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf 转义 %%",
    question: `printf("%%%d", 3);\n\n会输出什么？\n（直接填写输出结果）`,
    answer: "%3",
    explanation: "%% 输出一个普通百分号 %，%d 输出 3，所以整体输出 %3。"
  },
  {
    id: 52, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf %d",
    question: `int a = 7;\nprintf("%d", a);\n\n输出是？`,
    answer: "7",
    explanation: "%d 输出整数 7。"
  },
  {
    id: 53, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf 文本+%d",
    question: `int n = 100;\nprintf("n=%d", n);\n\n输出是？`,
    answer: "n=100",
    explanation: "文本 n= 加上 %d 替换后的 100。"
  },
  {
    id: 54, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf 转义",
    question: `printf("%%");\n\n输出是？`,
    answer: "%",
    explanation: "%% 专门用来输出一个普通的 % 字符。"
  },
  {
    id: 55, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf 多变量",
    question: `int x = 1, y = 2;\nprintf("%d%d", x, y);\n\n输出是？`,
    answer: "12",
    explanation: "无空格，两个数字直接相连。"
  },
  {
    id: 56, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "scanf &",
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
    id: 58, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf %c",
    question: `char ch = 'B';\nprintf("%c", ch);\n\n输出是？`,
    answer: "B",
    explanation: "%c 输出字符 B。"
  },
  {
    id: 59, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf 综合",
    question: `printf("%d%%", 50);\n\n输出是？`,
    answer: "50%",
    explanation: "%d 输出 50，%% 输出普通百分号，结果 50%。"
  },
  {
    id: 60, type: "fill", category: "fill", difficulty: 4, knowledgePoint: "printf %s", needsString: true,
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
    id: 71, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf %% 与宽度",
    question: `printf("%%%d%%", 7);\n\n输出是？`,
    options: ["%7%", "%%7%%", "%d%", "7"],
    answer: 0,
    explanation: "%% 输出百分号，%d 输出 7，再 %% 输出百分号。"
  },
  {
    id: 72, type: "choice", category: "format", difficulty: 5, knowledgePoint: "scanf 多变量",
    question: `int a, b;\nscanf("%d,%d", &a, &b);\n\n输入时较合理的写法是？`,
    options: ["3 5", "3,5", "3;5", "a,b"],
    answer: 1,
    explanation: "格式串中有逗号，输入也应写 3,5。"
  },
  {
    id: 73, type: "choice", category: "output", difficulty: 5, knowledgePoint: "转义综合",
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
    id: 82, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 空格位置",
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
    id: 85, type: "choice", category: "output", difficulty: 5, knowledgePoint: "%% 与数字紧贴",
    question: `int n = 100;\nprintf("%d%%", n);\n\n输出是？`,
    options: ["100%%", "100%", "%d%", "100"],
    answer: 1,
    explanation: "%d 输出 100，%% 输出一个 % 号，结果 100%。"
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
    id: 89, type: "choice", category: "output", difficulty: 5, knowledgePoint: "花括号字面量",
    question: `int x = 9;\nprintf("{%d}", x);\n\n输出是？`,
    options: ["{9}", "%d", "{x}", "9"],
    answer: 0,
    explanation: "花括号是普通字符，%d 换成 9，得到 {9}。"
  },
  {
    id: 90, type: "choice", category: "output", difficulty: 5, knowledgePoint: "float 赋整再运算",
    question: `float t = 2.8;\nt = 2;\nprintf("%.1f", t + 0.5);\n\n输出是？`,
    options: ["3.3", "2.5", "2.8", "报错"],
    answer: 1,
    explanation: "t 被赋为 2.0，加 0.5 为 2.5，%.1f 输出 2.5。赋值合法。"
  },
  {
    id: 91, type: "choice", category: "output", difficulty: 5, knowledgePoint: "\\n 位置",
    question: `printf("A\\nB"); printf("C");\n\n输出行数与内容是？`,
    options: ["一行 ABC", "两行：第一行 A，第二行 BC", "两行：第一行 AB，第二行 C", "三行 A、B、C"],
    answer: 1,
    explanation: "第一个 printf 在 A 后换行再输出 B，第二个紧接输出 C，故第二行为 BC。"
  },
  {
    id: 92, type: "choice", category: "format", difficulty: 5, knowledgePoint: "scanf 逗号格式",
    question: `int a, b;\nscanf("%d%d", &a, &b);\n\n输入 3,5 时通常？`,
    options: ["a=3,b=5 正常", "因有逗号可能无法按预期读入", "一定编译错误", "a=3,b=0"],
    answer: 1,
    explanation: "格式是两个 %d 默认空白分隔，输入 3,5 时逗号不是合法整数部分，读入常失败或不完整。"
  },
  {
    id: 93, type: "choice", category: "output", difficulty: 5, knowledgePoint: "%5.1f",
    question: `printf("%5.1f", 3.14);\n\n输出效果最接近？`,
    options: ["3.14 ", " 3.1", "03.1", "3.140"],
    answer: 1,
    explanation: "精度 1 位变成 3.1，总宽 5，左侧补空格。"
  },
  {
    id: 94, type: "choice", category: "output", difficulty: 5, knowledgePoint: "前导零与负号",
    question: `printf("%04d", -7);\n\n输出更接近？`,
    options: ["-007", "-07", "000-7", "-7"],
    answer: 0,
    explanation: "宽度含符号位，常见结果为 -007。"
  },
  {
    id: 95, type: "fill", category: "fill", difficulty: 5, knowledgePoint: "填空输出精确",
    question: `int a = 1;\nprintf("ans=%d", a + a);\n\n输出是？`,
    answer: "ans=2",
    explanation: "无多余空格，ans=2。"
  },
  {
    id: 96, type: "choice", category: "output", difficulty: 5, knowledgePoint: "连续 printf",
    question: `printf("%d", 1); printf("%d", 2); printf("\\n");\n\n输出是？`,
    options: ["1 2", "12", "1\\n2", "1,2"],
    answer: 1,
    explanation: "两次 printf 无空格，输出 12 后换行。"
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
  // ===== 难度提升：宽度/精度/多语句/易错 =====
  {
    id: 90, type: "choice", category: "output", difficulty: 5, knowledgePoint: "连续 printf",
    question: `printf("%d", 1);\nprintf("%d", 2);\nprintf("\\n");\nprintf("%d", 3);\n\n输出是？`,
    options: ["1\\n2\\n3", "12\\n3", "1 2\\n3", "123"],
    answer: 1,
    explanation: "前两次 printf 不换行，输出 12；然后 \\n 换行；再输出 3。整体两行：12 与 3。"
  },
  {
    id: 91, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf %05d",
    question: `int n = 42;\nprintf("%05d", n);\n\n输出是？`,
    options: ["42", "00042", "  42", "42000"],
    answer: 1,
    explanation: "%05d：宽度 5，不足前面补 0。"
  },
  {
    id: 92, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf %.0f",
    question: `float a = 101.101;\na = 101;\nprintf("a+1={%.0f}", a+1);\n\n输出最接近？`,
    options: ["a+1={102}", "a+1={101.101}", "102={102}", "编译错误"],
    answer: 0,
    explanation: "a 最后为 101，a+1=102，%.0f 不保留小数，输出 a+1={102}。"
  },
  {
    id: 93, type: "choice", category: "output", difficulty: 5, knowledgePoint: "%% 与 %d 混用",
    question: `printf("%%%d%%", 100);\n\n输出是？`,
    options: ["%100%", "%%100%%", "%d%", "100"],
    answer: 0,
    explanation: "%%→%，%d→100，%%→%。"
  },
  {
    id: 94, type: "choice", category: "output", difficulty: 5, knowledgePoint: "宽度不足",
    question: `printf("%3d", 1234);\n\n输出是？`,
    options: ["123", "234", "1234", " 1234"],
    answer: 2,
    explanation: "宽度不够时完整输出，不会截断。"
  },
  {
    id: 95, type: "choice", category: "output", difficulty: 5, knowledgePoint: "\\n 与空格",
    question: `printf("a=%d\\nb=%d", 1, 2);\n\n输出是？`,
    options: ["a=1 b=2", "a=1\\nb=2", "a=1\nb=2", "a=%d b=%d"],
    answer: 2,
    explanation: "\\n 换行，两行分别为 a=1 与 b=2。"
  },
  {
    id: 96, type: "choice", category: "scanf", difficulty: 5, knowledgePoint: "scanf 返回值概念",
    question: `int x, y, r;\nr = scanf("%d%d", &x, &y);\n\n若成功读入两个整数，r 通常为？`,
    options: ["0", "1", "2", "x 的值"],
    answer: 2,
    explanation: "scanf 返回成功赋值的项数，读入两个则为 2。"
  },
  {
    id: 97, type: "choice", category: "output", difficulty: 5, knowledgePoint: "printf 表达式",
    question: `int a = 1;\nprintf("a+1=%d\\n", a+1);\n\n输出是？`,
    options: ["a+1= 2", "a+1=2", "2=2", "a+1=%d"],
    answer: 1,
    explanation: "表达式 a+1 为 2，无额外空格：a+1=2 后换行。"
  },
  {
    id: 98, type: "fill", category: "fill", difficulty: 5, knowledgePoint: "printf %04d",
    question: `printf("%04d", 7);\n\n输出是？`,
    answer: "0007",
    explanation: "宽度 4，补零得到 0007。"
  },
  {
    id: 99, type: "choice", category: "error", difficulty: 5, knowledgePoint: "printf 少参数",
    question: `int a = 5;\nprintf("%d %d", a);\n\n更可能的情况是？`,
    options: ["一定输出 5 5", "行为未定义/结果不可靠", "一定编译失败", "一定输出 5"],
    answer: 1,
    explanation: "格式符多于参数时属于未定义行为，结果不可依赖。"
  },
  {
    id: 100, type: "choice", category: "output", difficulty: 4, knowledgePoint: "printf 字符与整数",
    question: `char c = '0';\nprintf("%d", c);\n\n输出更可能是？`,
    options: ["0", "48", "字符 0", "编译错误"],
    answer: 1,
    explanation: "用 %d 打印字符会输出其 ASCII 码，'0' 为 48。"
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
  if (bank && Array.isArray(bank.modes) && bank.modes.length) return bank.modes;
  return [{ id: "mixed", label: "综合训练" }];
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
  if (!modes.some(m => m.id === currentMode)) currentMode = "mixed";
  // 仅多模式题库（如 printf）显示模式条；单一「综合」时隐藏，避免过时/无意义按钮
  if (!modes.length || (modes.length === 1 && modes[0].id === "mixed")) {
    row.style.display = "none";
    row.innerHTML = "";
    currentMode = "mixed";
    return;
  }
  row.style.display = "";
  row.innerHTML = modes.map(m =>
    `<button type="button" class="mode-btn ${m.id === currentMode ? "active" : ""}" data-mode="${m.id}">${m.label}</button>`
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
  const bk = QUESTION_BANKS[id];
  // 特殊模式（评测等）不得从普通训练入口进入
  if (bk && (bk.specialMode || bk.requiresUnlock || bk.excludeFromDaily || id === "eval-mode")) {
    try { uiToast("该模式请使用首页专属入口（需激活）", "error"); } catch (e) {}
    return;
  }
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

/** 选择题选项去重：保证正确项唯一且仍在 options 中，不足则自动补干扰项 */
function ensureUniqueChoiceOptions(q) {
  if (!q || q.type === "fill") return q;
  if (!Array.isArray(q.options) || !q.options.length) return q;
  const raw = q.options.map(o => (o == null ? "" : String(o)));
  let ansIdx = q.answer | 0;
  if (ansIdx < 0 || ansIdx >= raw.length) ansIdx = 0;
  const correct = raw[ansIdx];
  const seen = new Set();
  const uniq = [];
  // 先放正确项
  uniq.push(correct);
  seen.add(correct);
  for (let i = 0; i < raw.length; i++) {
    if (i === ansIdx) continue;
    const s = raw[i];
    if (seen.has(s)) continue;
    seen.add(s);
    uniq.push(s);
  }
  // 补足到至少 4 个（或原长度）
  const need = Math.max(4, raw.length);
  const fillers = buildDistractors(correct, need - uniq.length + 6);
  for (const f of fillers) {
    if (uniq.length >= need) break;
    if (seen.has(f)) continue;
    seen.add(f);
    uniq.push(f);
  }
  let n = 0;
  while (uniq.length < need) {
    const f = correct + "#" + (++n);
    if (seen.has(f)) continue;
    seen.add(f);
    uniq.push(f);
  }
  // 打乱，记录正确答案新下标
  const order = uniq.map((_, i) => i).sort(() => Math.random() - 0.5);
  const shuffled = order.map(i => uniq[i]);
  const newAns = shuffled.indexOf(correct);
  q.options = shuffled;
  q.answer = newAns >= 0 ? newAns : 0;
  return q;
}

function buildDistractors(correct, n) {
  const out = [];
  const s = String(correct);
  const num = Number(s);
  if (!Number.isNaN(num) && s.trim() !== "" && /^-?\d+(\.\d+)?$/.test(s.trim())) {
    const candidates = [
      String(num + 1), String(num - 1), String(num + 2), String(num * 2),
      String(Math.floor(num / 2)), String(num + 10), "0", String(-num),
      num.toFixed ? (Math.floor(num) === num ? String(num) + ".0" : String(Math.floor(num))) : s
    ];
    for (const c of candidates) {
      if (c !== s) out.push(c);
      if (out.length >= n) break;
    }
  } else {
    // 字符串类干扰
    const candidates = [
      s.replace(/\s/g, ""),
      s + " ",
      " " + s,
      s.replace(/%/g, "%%"),
      s.replace(/\n/g, "\\n"),
      s + s,
      "%" + s,
      s.slice(1) || s + "x",
      "编译错误",
      "无输出"
    ];
    for (const c of candidates) {
      if (c !== s) out.push(c);
      if (out.length >= n) break;
    }
  }
  return out;
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
  ];

  return pool.filter(t => {
    if (t.minC > C) return false;
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
  const available = pool.filter(t => !isMasteredToday(t.kp));
  let use = available.length ? available : pool;
  // 60% 概率优先抽 hard 五星模板
  const hard = use.filter(t => t.hard);
  if (hard.length && Math.random() < 0.6) use = hard;
  const t = pick(use);
  const q = ensureUniqueChoiceOptions(t.make());
  q.id = idBase;
  q.dynamic = true;
  q.difficulty = Math.max(4, q.difficulty || 4);
  return q;
}

function genHardCompound(idBase) {
  const pool = getTemplatePool().filter(t => t.hard);
  const t = pool.length ? pick(pool) : null;
  if (!t) return genFromPool(idBase, "output");
  const q = ensureUniqueChoiceOptions(t.make());
  q.id = idBase;
  q.dynamic = true;
  q.difficulty = 5;
  return q;
}



function validateQuestionBanks(sampleDyn) {
  sampleDyn = sampleDyn == null ? 40 : sampleDyn;
  const issues = [];
  function checkQ(q, src) {
    if (!q) return;
    const id = q.id != null ? q.id : "?";
    const tag = `${src}#${id}`;
    if (!q.question) issues.push(`${tag}: 缺少题干`);
    if (q.type === "fill") {
      if (q.answer == null || q.answer === "") issues.push(`${tag}: 填空无答案`);
      return;
    }
    if (!Array.isArray(q.options) || q.options.length < 2) {
      issues.push(`${tag}: 选项不足`);
      return;
    }
    const strs = q.options.map(o => String(o));
    const set = new Set(strs);
    if (set.size !== strs.length) {
      issues.push(`${tag}: 选项重复 → [${strs.join(" | ")}]`);
    }
    if (q.answer == null || q.answer < 0 || q.answer >= strs.length) {
      issues.push(`${tag}: answer 下标非法 (${q.answer})`);
    }
    // 空选项
    strs.forEach((t, i) => {
      if (t.trim() === "") issues.push(`${tag}: 选项 ${i} 为空`);
    });
  }
  // static in script
  if (typeof STATIC_QUESTIONS !== "undefined") {
    STATIC_QUESTIONS.forEach(q => checkQ(q, "printf-static"));
  }
  Object.keys(QUESTION_BANKS || {}).forEach(bid => {
    const qs = (QUESTION_BANKS[bid] && QUESTION_BANKS[bid].staticQuestions) || [];
    qs.forEach(q => checkQ(q, bid));
  });
  // dynamic samples
  if (typeof getTemplatePool === "function") {
    for (let i = 0; i < sampleDyn; i++) {
      try {
        const q = genFromPool(90000 + i);
        checkQ(q, "dynamic");
      } catch (e) {
        issues.push(`dynamic#${i}: 生成异常 ${e.message || e}`);
      }
      try {
        const q2 = genHardCompound(91000 + i);
        checkQ(q2, "dynamic-hard");
      } catch (e) {
        issues.push(`dynamic-hard#${i}: 生成异常 ${e.message || e}`);
      }
    }
  }
  return issues;
}


/* ========== Esc 系统测试台 ========== */
window.GESP_DEBUG_TESTS = window.GESP_DEBUG_TESTS || [];

function registerDebugTest(group, name, run, desc) {
  window.GESP_DEBUG_TESTS.push({ group: group || "其它", name, run, desc: desc || "" });
}

function debugTestLog(msg, type) {
  const el = document.getElementById("debug-test-log");
  if (!el) { console.log("[debug-test]", msg); return; }
  const line = document.createElement("div");
  line.className = type === "err" ? "err" : (type === "ok" ? "ok" : "");
  line.textContent = "[" + new Date().toLocaleTimeString() + "] " + msg;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}

function getDebugTestGroups() {
  const map = {};
  (window.GESP_DEBUG_TESTS || []).forEach(t => {
    const g = t.group || "其它";
    if (!map[g]) map[g] = [];
    map[g].push(t);
  });
  return map;
}

let debugTestGroup = null;

function renderDebugTestPanel() {
  const tabs = document.getElementById("debug-test-tabs");
  const cmds = document.getElementById("debug-test-cmds");
  if (!tabs || !cmds) return;
  const groups = getDebugTestGroups();
  const names = Object.keys(groups);
  if (!names.length) {
    tabs.innerHTML = "";
    cmds.innerHTML = "<span class='setting-hint'>暂无注册测试（各系统可 registerDebugTest）</span>";
    return;
  }
  if (!debugTestGroup || !groups[debugTestGroup]) debugTestGroup = names[0];
  tabs.innerHTML = names.map(g =>
    `<button type="button" class="tab-btn ${g===debugTestGroup?"active":""}" data-g="${g}">${g}</button>`
  ).join("");
  tabs.querySelectorAll("button[data-g]").forEach(btn => {
    btn.onclick = () => { debugTestGroup = btn.dataset.g; renderDebugTestPanel(); };
  });
  cmds.innerHTML = "";
  (groups[debugTestGroup] || []).forEach((t, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn-secondary btn-sm";
    b.textContent = t.name;
    if (t.desc) b.title = t.desc;
    b.onclick = () => {
      try {
        const ret = t.run();
        Promise.resolve(ret).then(r => {
          debugTestLog(t.name + " → " + (r != null ? String(r) : "完成"), "ok");
        }).catch(e => debugTestLog(t.name + " 失败: " + (e && e.message || e), "err"));
      } catch (e) {
        debugTestLog(t.name + " 失败: " + (e && e.message || e), "err");
      }
    };
    cmds.appendChild(b);
  });
}

function registerBuiltinDebugTests() {
  if (window._gespDebugTestsReady) return;
  window._gespDebugTestsReady = true;

  registerDebugTest("邮件", "投递：欢迎信", () => forceMailById("welcome_default"), "忽略条件强制投递");
  registerDebugTest("邮件", "投递：卢柏铮生日", () => forceMailById("bday_lubozheng"));
  registerDebugTest("邮件", "投递：蔡小婧生日", () => forceMailById("bday_caixiaojing"));
  registerDebugTest("邮件", "乱流·电子管1906", () => forceMailById("turb_1906_tube"));
  registerDebugTest("邮件", "乱流·ENIAC1946", () => forceMailById("turb_1946_eniac"));
  registerDebugTest("邮件", "乱流·晶体管1947", () => forceMailById("turb_1947_transistor"));
  registerDebugTest("邮件", "乱流·集成电路1958", () => forceMailById("turb_1958_ic"));
  registerDebugTest("邮件", "乱流·阿帕网1969", () => forceMailById("turb_1969_arpa"));
  registerDebugTest("邮件", "乱流·微处理器1971", () => forceMailById("turb_1971_micro"));
  registerDebugTest("邮件", "乱流·PC1981", () => forceMailById("turb_1981_pc"));
  registerDebugTest("邮件", "乱流·WWW1991", () => forceMailById("turb_1991_www"));
  registerDebugTest("词条", "打开词条页", () => { if(typeof openCodexView==="function") openCodexView(); return "ok"; });
  registerDebugTest("词条", "强制解锁全部", () => {
    if (!data.codex) data.codex = { unlocked: {}, viewed: {}, milestones: {} };
    const list = (window.CODEX_DATA && window.CODEX_DATA.CODEX_ENTRIES) || [];
    list.forEach(e => { data.codex.unlocked[e.id] = Date.now(); });
    saveData(data); return "已解锁 " + list.length;
  });
  registerDebugTest("词条", "模拟读满触发邮件", () => {
    if (!data.codex) data.codex = { unlocked: {}, viewed: {}, milestones: {} };
    const list = (window.CODEX_DATA && window.CODEX_DATA.CODEX_ENTRIES) || [];
    list.forEach(e => { data.codex.unlocked[e.id] = Date.now(); data.codex.viewed[e.id] = Date.now(); });
    data.codex.milestones = {};
    saveData(data);
    if (typeof checkCodexMilestones === "function") checkCodexMilestones();
    return "已阅读 " + list.length + " 并检查里程碑";
  });
  registerDebugTest("邮件", "暗线1·第零错误", () => forceMailById("dark_line_1"));
  registerDebugTest("邮件", "暗线2·未命名", () => forceMailById("dark_line_2"));
  registerDebugTest("邮件", "暗线3·上交签名", () => forceMailById("dark_line_3"));
  registerDebugTest("邮件", "先驱者·图灵1", () => forceMailById("quest_turing_1"));
  registerDebugTest("邮件", "先驱者·图灵2交付", () => forceMailById("quest_turing_2"));
  registerDebugTest("邮件", "先驱者·香农1", () => forceMailById("quest_shannon_1"));
  registerDebugTest("邮件", "先驱者·香农2", () => forceMailById("quest_shannon_2"));
  registerDebugTest("邮件", "先驱者·冯诺依曼1", () => forceMailById("quest_von_1"));
  registerDebugTest("邮件", "先驱者·冯诺依曼2", () => forceMailById("quest_von_2"));
  registerDebugTest("邮件", "先驱者·终章", () => forceMailById("quest_alliance_end"));
  registerDebugTest("邮件", "考前4周信", () => forceMailById("exam_20260912_4w"));
  registerDebugTest("邮件", "考前3周信", () => forceMailById("exam_20260912_3w"));
  registerDebugTest("邮件", "考前2周信", () => forceMailById("exam_20260912_2w"));
  registerDebugTest("邮件", "考前1周信", () => forceMailById("exam_20260912_1w"));
  registerDebugTest("邮件", "考试日信", () => forceMailById("exam_20260912_day"));
  registerDebugTest("邮件", "投递：全部模板", () => forceAllMails(), "每封都强制入箱（可重复）");
  registerDebugTest("邮件", "打开收件箱", () => { if (typeof openMailView==="function") openMailView(); return "已打开"; });
  registerDebugTest("邮件", "清空收件箱", () => {
    if (!data.mail) return "无邮件数据";
    data.mail.inbox = [];
    data.mail.delivered = {};
    data.mail.lastWeekly = {};
    saveData(data);
    if (typeof updateMailBadges==="function") updateMailBadges();
    return "已清空";
  });
  registerDebugTest("邮件", "模拟姓名=卢柏铮", () => {
    data.userName = "卢柏铮"; saveData(data); refreshUserDisplay();
    if (typeof checkAndDeliverMails==="function") checkAndDeliverMails();
    if (typeof updateMailBadges==="function") updateMailBadges();
    return "姓名已设为卢柏铮并检查投递";
  });

  registerDebugTest("经济", "+100 Byte", () => { data.bytes=(data.bytes||0)+100; saveData(data); updateHome(); return data.bytes; });
  registerDebugTest("经济", "+5 KB", () => { data.kb=(data.kb||0)+5; saveData(data); updateHome(); return data.kb; });
  registerDebugTest("经济", "+1 MB", () => { data.mb=(data.mb||0)+1; saveData(data); updateHome(); return data.mb; });
  registerDebugTest("经济", "+500 XP", () => { data.totalXp=(data.totalXp||0)+500; saveData(data); updateHome(); return data.totalXp; });

  registerDebugTest("宠物", "测试孵化动画 N", () => testHatchAnim("N"));
  registerDebugTest("宠物", "测试孵化动画 R", () => testHatchAnim("R"));
  registerDebugTest("宠物", "测试孵化动画 SR", () => testHatchAnim("SR"));
  registerDebugTest("宠物", "测试孵化动画 SSR", () => testHatchAnim("SSR"));
  registerDebugTest("宠物", "批量给蛋 N/R/SR/SSR", () => {
    if (typeof addEgg === "function") {
      addEgg("N", 10); addEgg("R", 5); addEgg("SR", 3); addEgg("SSR", 1);
      if (typeof saveData === "function") saveData(data);
      return "N+10 R+5 SR+3 SSR+1";
    }
    return "addEgg 不可用";
  });
  registerDebugTest("宠物", "给普通蛋×3", () => {
    if (typeof addEgg==="function") { addEgg("N",3); if(typeof saveData==="function") saveData(data); return "N+3"; }
    return "addEgg 不可用";
  });
  registerDebugTest("宠物", "给精炼蛋×1", () => { if(typeof addEgg==="function"){ addEgg("R",1); saveData(data); return "R+1"; } return "不可用"; });
  registerDebugTest("宠物", "给稀有蛋×1", () => { if(typeof addEgg==="function"){ addEgg("SR",1); saveData(data); return "SR+1"; } return "不可用"; });
  registerDebugTest("宠物", "打开宠物页", () => { showView("pet-view"); if(typeof renderPetPage==="function") renderPetPage(); return "ok"; });

  registerDebugTest("题库", "题库自检", () => { if(typeof runBankSelfCheck==="function"){ runBankSelfCheck(); return "见上方结果"; } return "无"; });
  registerDebugTest("题库", "清空移除记录", () => {
    data.questionStats = {};
    saveData(data);
    return "questionStats 已清空";
  });
}

/** 强制投递一封邮件（测试用，可重复） */
function testHatchAnim(rarity) {
  rarity = rarity || "N";
  const mock = {
    _mockDisplay: {
      emoji: rarity === "SSR" ? "🐉" : rarity === "SR" ? "🦄" : rarity === "R" ? "🦊" : "🐛",
      name: "测试·" + rarity,
      rarity: rarity,
      rarityName: rarity,
      rarityColor: rarity === "SSR" ? "#fbbf24" : rarity === "SR" ? "#a78bfa" : rarity === "R" ? "#60a5fa" : "#94a3b8"
    }
  };
  if (typeof playHatchAnimation !== "function") return "playHatchAnimation 不可用";
  // force: 忽略设置中的关闭开关，便于调试
  playHatchAnimation(rarity, mock, { force: true });
  return "播放 " + rarity + " 孵化过场";
}
function forceMailById(templateId) {
  const list = (window.MAIL_DATA && window.MAIL_DATA.MAIL_TEMPLATES) || [];
  const tpl = list.find(t => t.id === templateId);
  if (!tpl) return "找不到模板 " + templateId;
  if (!data.mail) data.mail = { delivered: {}, inbox: [], lastWeekly: {}, claimedAttach: {}, deliveredQuest: {} };
  const name = typeof getDisplayName === "function" ? getDisplayName() : (data.userName || "同学");
  const level = getPlayerLevelInfo().level;
  const body = String(tpl.body || "").replace(/\{\{name\}\}/g, name).replace(/\{\{level\}\}/g, String(level)).replace(/\{\{date\}\}/g, new Date().toISOString().slice(0,10));
  const title = String(tpl.title || "").replace(/\{\{name\}\}/g, name).replace(/\{\{level\}\}/g, String(level));
  data.mail.inbox.unshift({
    id: tpl.id + "_test_" + Date.now(),
    templateId: tpl.id,
    from: tpl.from || "测试",
    title, body,
    at: Date.now(),
    read: false,
    attachments: tpl.attachments ? JSON.parse(JSON.stringify(tpl.attachments)) : [],
    requireDelivery: tpl.requireDelivery ? JSON.parse(JSON.stringify(tpl.requireDelivery)) : [],
    afterDeliverAttachments: tpl.afterDeliverAttachments ? JSON.parse(JSON.stringify(tpl.afterDeliverAttachments)) : [],
    attachClaimed: false,
    questDone: false,
    storyNote: tpl.storyNote || ""
  });
  data.mail.delivered[tpl.id] = Date.now();
  saveData(data);
  if (typeof updateMailBadges === "function") updateMailBadges();
  return "已投递「" + title + "」";
}

function forceAllMails() {
  const list = (window.MAIL_DATA && window.MAIL_DATA.MAIL_TEMPLATES) || [];
  let n = 0;
  list.forEach(t => { forceMailById(t.id); n++; });
  return "已投递 " + n + " 封";
}


function runBankSelfCheck() {
  const issues = validateQuestionBanks(50);
  const box = document.getElementById("debug-validate-result");
  if (!issues.length) {
    if (box) box.innerHTML = `<div style="color:#86efac;">✓ 检查通过：静态题 + 动态抽样未发现明显错误</div>`;
    if (typeof petToast === "function") petToast("题库自检通过", "success");
    else alert("题库自检通过");
    return;
  }
  const html = `<div style="color:#fca5a5;font-weight:700;">发现 ${issues.length} 个问题：</div>
    <ol style="margin:8px 0 0 1.2em;max-height:240px;overflow:auto;font-size:0.85rem;color:#fecaca;">
      ${issues.slice(0, 80).map(x => `<li>${escapeHtml(x)}</li>`).join("")}
      ${issues.length > 80 ? `<li>…还有 ${issues.length - 80} 条</li>` : ""}
    </ol>`;
  if (box) box.innerHTML = html;
  console.warn("bank self-check", issues);
  if (typeof petToast === "function") petToast(`题库自检：${issues.length} 个问题`, "error");
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



/** 最近若干次训练正确率；无记录视为 100%（从较难起步） */
function getRecentAccuracyPct() {
  const hist = (data.history || []).slice(-5);
  if (!hist.length) return 100;
  const c = hist.reduce((s, h) => s + (h.correct || 0), 0);
  const t = hist.reduce((s, h) => s + (h.total || 0), 0);
  if (!t) return 100;
  return Math.round(c / t * 100);
}

/** 正确率 ≥90% 时最低难度 4；低于 90% 才放出难度 3 */
function getMinQuestionDifficulty() {
  // 默认至少 4；仅当近期正确率 < 85% 才允许出现 3
  return getRecentAccuracyPct() < 85 ? 3 : 4;
}

function buildQuizList(mode, count) {
  const list = [];
  let dynId = 10000;
  const usedKp = new Set();
  const usedSig = new Set();

  const minDiff = getMinQuestionDifficulty();
  const usableStatic = (filterFn) =>
    getBankStaticQuestions().filter(q => {
      if (!filterFn(q)) return false;
      if (isMasteredToday(q.knowledgePoint)) return false;
      if (!isStringEnabled() && isStringRelated(q)) return false;
      if ((q.difficulty || 1) < minDiff) return false;
      if (isQuestionRemoved(q)) return false;
      return true;
    });

  function sigOf(q) {
    return questionSignature(q);
  }

  const recentSet = getRecentSigSet();

  function tryPush(q) {
    if (!q) return false;
    const kp = q.knowledgePoint || "";
    const sig = sigOf(q);
    // 本套内：同签名拒绝；同知识点最多 1 次
    if (usedSig.has(sig)) return false;
    // 近约 10 次练习出现过的题，优先跳过
    if (recentSet.has(sig)) return false;
    if (kp && usedKp.has(kp)) return false;
    usedSig.add(sig);
    if (kp) usedKp.add(kp);
    q.difficulty = Math.max(minDiff, q.difficulty || minDiff);
    list.push(q);
    return true;
  }

  function pushDyn(gen, attempts = 12) {
    for (let i = 0; i < attempts; i++) {
      const q = gen(dynId++);
      if (tryPush(q)) return true;
    }
    for (let i = 0; i < 8; i++) {
      const q = gen(dynId++);
      if (!q) continue;
      const sig = sigOf(q);
      if (usedSig.has(sig)) continue;
      if ((q.difficulty || 1) < minDiff) continue;
      usedSig.add(sig);
      q.difficulty = Math.max(minDiff, q.difficulty || minDiff);
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
          if (allowDyn && Math.random() < 0.55) ok = pushDyn(genHardCompound);
          if (!ok && Math.random() < 0.25) ok = takeStatic("all");
          if (!ok && allowDyn) ok = pushDyn(genOutputQuestion);
        } else if (slot === 1 && allowFill) {
          if (allowDyn && Math.random() < 0.4) ok = pushDyn(genHardCompound);
          if (!ok && allowDyn) ok = pushDyn(genFillQuestion);
          if (!ok) ok = takeStatic("fill");
        } else if (slot === 2) {
          if (allowDyn && Math.random() < 0.45) ok = pushDyn(genHardCompound);
          if (!ok && allowDyn) ok = pushDyn(genFormatQuestion);
          if (!ok) ok = takeStatic("format");
        } else {
          if (allowDyn && Math.random() < 0.5) ok = pushDyn(genHardCompound);
          if (!ok && Math.random() < 0.35) ok = takeStatic("scanf");
          if (!ok && allowDyn) ok = pushDyn(genOutputQuestion);
        }
      }
      if (!ok) {
        if (allowDyn) pushDyn(genOutputQuestion, 5);
        else takeStatic("all");
      }
    }
  }

  // 若因去重导致题量不足，放宽「近期做过」限制再补足
  if (list.length < count) {
    const need = count - list.length;
    const pool = getBankStaticQuestions().filter(q => {
      if ((q.difficulty || 1) < 3) return false;
      if (!isStringEnabled() && isStringRelated(q)) return false;
      const sig = questionSignature(q);
      if (usedSig.has(sig)) return false;
      return true;
    }).sort(() => Math.random() - 0.5);
    for (const q of pool) {
      if (list.length >= count) break;
      const kp = q.knowledgePoint || "";
      if (kp && usedKp.has(kp)) continue;
      const qq = { ...q };
      qq.difficulty = Math.max(3, qq.difficulty || 3);
      usedSig.add(questionSignature(qq));
      if (kp) usedKp.add(kp);
      list.push(qq);
    }
    // 动态题再补
    while (list.length < count && bankAllowsDynamic()) {
      const q = genOutputQuestion(10000 + list.length);
      if (!q) break;
      const sig = questionSignature(q);
      if (usedSig.has(sig)) continue;
      usedSig.add(sig);
      q.difficulty = Math.max(3, q.difficulty || 3);
      list.push(q);
    }
  }

  // 难度：默认从 4 起；仅当近期正确率 <90% 才保留 3
  const floor = minDiff;
  const n = list.length;
  list.forEach((q, i) => {
    let target = floor;
    const r = n <= 1 ? 0 : i / (n - 1);
    if (r >= 0.45) target = 5;
    else if (r >= 0.15) target = Math.max(floor, 4);
    if (q.dynamic) {
      q.difficulty = Math.max(floor, target);
    } else {
      const d = q.difficulty || floor;
      if (d >= 5) q.difficulty = 5;
      else q.difficulty = Math.max(floor, Math.min(5, Math.max(d, target)));
    }
  });
  // 再压低 4 星以下：最多保留约 15% 的 3 星题（且仅 floor===3 时）
  if (floor >= 4) {
    list.forEach(q => { if ((q.difficulty || 4) < 4) q.difficulty = 4; });
  } else {
    const low = list.filter(q => (q.difficulty || 3) <= 3);
    const high = list.filter(q => (q.difficulty || 3) > 3);
    const keepLow = Math.max(0, Math.floor(list.length * 0.15));
    low.sort(() => Math.random() - 0.5);
    const kept = low.slice(0, keepLow);
    // 其余 3 星抬到 4
    low.slice(keepLow).forEach(q => { q.difficulty = 4; });
    list.length = 0;
    list.push(...high, ...kept, ...low.slice(keepLow));
  }
  list.sort((a, b) => (a.difficulty || floor) - (b.difficulty || floor) || (Math.random() - 0.5));
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
    soundVolume: 0.7,
    soundQuiz: true,
    soundUi: true,
    anim: true,
    hatchAnim: true,
    petBless: true,
    focusMode: false,
    strictMode: true
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
    recentSigs: [],   // 近 10 次训练题签名，用于去重
    questionStats: {}, // sig -> { seen, removed }

    dailyProgress: { date: "", banks: {} },
    petSystem: null,
    streak: 0,
    totalXp: 0,
    bytes: 0,
    kb: 0,
    mb: 0,
    dailyByte: { date: "", fixedGot: 0, bonusGot: 0 },
    raceDaily: { date: "", used: 0 },
    petPath: "bird",
    stats: {
      totalSessions: 0,
      perfectSessions: 0,
      banksPlayed: {}
    },
    mail: { delivered: {}, inbox: [], lastWeekly: {}, claimedAttach: {}, deliveredQuest: {}, _openedOnce: false },
    questItems: {},
    codex: { unlocked: {}, viewed: {}, milestones: {} },
    dailySync: { date: "", n: 0 },
    unlocks: {},
    redeemedCodes: {}
  };
}

/** 从旧版结构迁移到 v3，尽量不丢记录 */
function migrateToV3(raw) {
  const base = createEmptyData();
  if (!raw || typeof raw !== "object") return base;

  base.userName = raw.userName || "";
  base.totalXp = raw.totalXp || 0;
  base.bytes = raw.bytes != null ? raw.bytes : 0;
  base.kb = raw.kb != null ? raw.kb : 0;
  base.mb = raw.mb != null ? raw.mb : 0;
  base.dailyByte = raw.dailyByte || { date: "", fixedGot: 0, bonusGot: 0 };
  base.raceDaily = raw.raceDaily || { date: "", used: 0 };
  base.petPath = raw.petPath || "bird";
  base.streak = raw.streak || 0;
  base.mastery = raw.mastery || {};
  base.wrongBook = raw.wrongBook || {};
  base.achievements = raw.achievements || {};
  base.recentSigs = Array.isArray(raw.recentSigs) ? raw.recentSigs.slice(-400) : [];
  base.questionStats = raw.questionStats || {};

  base.dailyProgress = raw.dailyProgress || { date: "", banks: {} };
  base.petSystem = raw.petSystem || null;

  // 全局设置
  const os = raw.settings || {};
  base.settings = Object.assign(defaultGlobalSettings(), {
    timePerQ: os.timePerQ != null ? os.timePerQ : 20,
    qCount: os.qCount != null ? os.qCount : 20,
    autoNext: os.autoNext != null ? os.autoNext : 1,
    sound: os.sound != null ? !!os.sound : true,
    soundVolume: os.soundVolume != null ? +os.soundVolume : 0.7,
    soundQuiz: os.soundQuiz != null ? !!os.soundQuiz : true,
    soundUi: os.soundUi != null ? !!os.soundUi : true,
    anim: os.anim != null ? !!os.anim : true,
    hatchAnim: os.hatchAnim != null ? !!os.hatchAnim : true,
    petBless: os.petBless != null ? !!os.petBless : true,
    focusMode: os.focusMode != null ? !!os.focusMode : false,
    strictMode: os.strictMode != null ? !!os.strictMode : true
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

  // 持久化邮件 / 词条 / 任务道具（此前迁移丢失导致刷新后邮件变未读可再领）
  if (raw.mail && typeof raw.mail === "object") {
    base.mail = {
      delivered: raw.mail.delivered || {},
      inbox: Array.isArray(raw.mail.inbox) ? raw.mail.inbox : [],
      lastWeekly: raw.mail.lastWeekly || {},
      claimedAttach: raw.mail.claimedAttach || {},
      deliveredQuest: raw.mail.deliveredQuest || {},
      _openedOnce: !!raw.mail._openedOnce
    };
    // 规范化每封邮件字段
    base.mail.inbox = base.mail.inbox.map(m => Object.assign({
      read: false,
      attachClaimed: false,
      questDone: false,
      attachments: [],
      requireDelivery: [],
      afterDeliverAttachments: []
    }, m || {})).slice(0, 80);
  }
  base.questItems = (raw.questItems && typeof raw.questItems === "object") ? raw.questItems : {};
  if (raw.codex && typeof raw.codex === "object") {
    base.codex = {
      unlocked: raw.codex.unlocked || {},
      viewed: raw.codex.viewed || {},
      milestones: raw.codex.milestones || {},
      quizPassed: raw.codex.quizPassed || {},
      _pendingMail: raw.codex._pendingMail || []
    };
  }
  base.dailySync = raw.dailySync || { date: "", n: 0 };
  base.unlocks = (raw.unlocks && typeof raw.unlocks === "object") ? raw.unlocks : {};
  base.redeemedCodes = (raw.redeemedCodes && typeof raw.redeemedCodes === "object") ? raw.redeemedCodes : {};

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

/** 最近练习题签名（跨约 10 次训练去重） */
function getRecentSigSet() {
  const arr = (data && data.recentSigs) ? data.recentSigs : [];
  return new Set(arr);
}

function pushRecentSigs(sigs) {
  if (!data.recentSigs) data.recentSigs = [];
  const merged = data.recentSigs.concat(sigs || []);
  // 保留最近约 400 条签名，约等于 10 次 × 20 题 × 余量
  data.recentSigs = merged.slice(-400);
  saveData(data);
}


function getQStat(sig) {
  if (!data.questionStats) data.questionStats = {};
  if (!data.questionStats[sig]) data.questionStats[sig] = { seen: 0, removed: false };
  return data.questionStats[sig];
}
function isQuestionRemoved(q) {
  const sig = questionSignature(q);
  if (!sig) return false;
  const st = data.questionStats && data.questionStats[sig];
  return !!(st && st.removed);
}
function markQuestionSeen(q) {
  const sig = questionSignature(q);
  if (!sig) return null;
  const st = getQStat(sig);
  st.seen = (st.seen || 0) + 1;
  st.lastSeen = Date.now();
  saveData(data);
  return st;
}
function removeQuestionFromBank(q) {
  const sig = questionSignature(q);
  if (!sig) return false;
  const st = getQStat(sig);
  st.removed = true;
  st.removedAt = Date.now();
  if (q && q.question) st.preview = String(q.question).slice(0, 80);
  saveData(data);
  return true;
}
function countActiveStaticQuestions() {
  const all = typeof getBankStaticQuestions === "function" ? getBankStaticQuestions() : [];
  return all.filter(q => !isQuestionRemoved(q)).length;
}
function getRemovedList() {
  const stats = data.questionStats || {};
  return Object.keys(stats).filter(k => stats[k] && stats[k].removed).map(k => ({
    sig: k,
    seen: stats[k].seen || 0,
    preview: stats[k].preview || k.slice(0, 40)
  }));
}
function restoreQuestionsBySigs(sigs) {
  if (!data.questionStats) return 0;
  let n = 0;
  (sigs || []).forEach(sig => {
    if (data.questionStats[sig] && data.questionStats[sig].removed) {
      data.questionStats[sig].removed = false;
      n++;
    }
  });
  if (n) saveData(data);
  return n;
}
/** 题库过空时强制恢复至少 minN 道 */
function ensureBankNotEmpty(minN) {
  minN = minN || 10;
  const active = countActiveStaticQuestions();
  if (active >= minN) return { ok: true, active };
  const removed = getRemovedList();
  if (!removed.length) return { ok: true, active }; // 本身题就少
  return { ok: false, active, removed, need: minN };
}
function showRestoreBankModal(info) {
  return new Promise(resolve => {
    const existing = document.getElementById("restore-bank-modal");
    if (existing) existing.remove();
    const need = info.need || 10;
    const list = (info.removed || []).slice().sort((a, b) => (b.seen || 0) - (a.seen || 0));
    const modal = document.createElement("div");
    modal.id = "restore-bank-modal";
    modal.className = "modal-mask";
    modal.innerHTML = `
      <div class="modal-card">
        <h3>题库题目不足</h3>
        <p>当前可用约 <strong>${info.active}</strong> 题，至少需要 <strong>${need}</strong> 题才能继续训练。</p>
        <p class="setting-hint">请勾选要重新加入题库的题目（至少 ${need - info.active} 道）：</p>
        <div class="restore-list" id="restore-list"></div>
        <div class="modal-actions">
          <button type="button" class="btn-primary" id="btn-restore-confirm">确认恢复</button>
        </div>
        <p class="setting-hint" id="restore-hint"></p>
      </div>`;
    document.body.appendChild(modal);
    const box = modal.querySelector("#restore-list");
    list.forEach((item, i) => {
      const row = document.createElement("label");
      row.className = "restore-row";
      row.innerHTML = `<input type="checkbox" data-sig="${item.sig}"> <span>${escapeHtml(item.preview || item.sig)} <em>出现${item.seen||0}次</em></span>`;
      box.appendChild(row);
    });
    modal.querySelector("#btn-restore-confirm").onclick = () => {
      const checked = [...modal.querySelectorAll("input[type=checkbox]:checked")].map(el => el.dataset.sig);
      const after = info.active + checked.length;
      if (after < need) {
        modal.querySelector("#restore-hint").textContent = `还差 ${need - after} 道，请再选一些。`;
        return;
      }
      restoreQuestionsBySigs(checked);
      modal.remove();
      resolve({ restored: checked.length });
    };
  });
}

function questionSignature(q) {
  if (!q) return "";
  return (q.knowledgePoint || "") + "|" + (q.type || "") + "|" + String(q.question || "").replace(/\s+/g, " ").slice(0, 64);
}


/* ========== 每日题库打卡 ========== */
function getDailyCheckinConfig() {
  const d = (getConfig().dailyCheckin) || {};
  return {
    baseQuota: d.baseQuota != null ? d.baseQuota : 20,
    highAcc: d.highAcc != null ? d.highAcc : 0.9,
    highQuota: d.highQuota != null ? d.highQuota : 6,
    midAcc: d.midAcc != null ? d.midAcc : 0.75,
    midQuota: d.midQuota != null ? d.midQuota : 8,
    lowAcc: d.lowAcc != null ? d.lowAcc : 0.6,
    lowQuota: d.lowQuota != null ? d.lowQuota : 15,
    veryLowAcc: d.veryLowAcc != null ? d.veryLowAcc : 0.4,
    veryLowQuota: d.veryLowQuota != null ? d.veryLowQuota : 20,
    minSamples: d.minSamples != null ? d.minSamples : 3
  };
}

function ensureDailyProgress() {
  if (!data.dailyProgress) data.dailyProgress = { date: todayStr(), banks: {} };
  if (data.dailyProgress.date !== todayStr()) {
    data.dailyProgress = { date: todayStr(), banks: {} };
    saveData(data);
  }
  return data.dailyProgress;
}

function getBankDailyStats(bankId) {
  const dp = ensureDailyProgress();
  const b = dp.banks[bankId] || { done: 0, correct: 0 };
  return { done: b.done || 0, correct: b.correct || 0 };
}

/** 根据今日正确率动态目标题量 */
function getDailyQuota(bankId) {
  const cfg = getDailyCheckinConfig();
  const st = getBankDailyStats(bankId);
  if (st.done < cfg.minSamples) return cfg.baseQuota;
  const acc = st.correct / Math.max(1, st.done);
  if (acc >= cfg.highAcc) return cfg.highQuota;
  if (acc >= cfg.midAcc) return cfg.midQuota;
  if (acc >= cfg.lowAcc) return cfg.baseQuota;
  if (acc >= cfg.veryLowAcc) return cfg.lowQuota;
  return cfg.veryLowQuota;
}

function recordDailyProgress(bankId, total, correct) {
  if (!bankId || !total) return;
  try {
    const b = QUESTION_BANKS && QUESTION_BANKS[bankId];
    if (b && (b.excludeFromDaily || b.specialMode || b.requiresUnlock)) return;
    if (bankId === "eval-mode") return;
  } catch (e) {}
  const dp = ensureDailyProgress();
  if (!dp.banks[bankId]) dp.banks[bankId] = { done: 0, correct: 0 };
  dp.banks[bankId].done += total;
  dp.banks[bankId].correct += correct;
  saveData(data);
}


function initDailyCheckinPanel() {
  const panel = document.getElementById("daily-checkin");
  const btn = document.getElementById("daily-checkin-toggle");
  if (!panel || !btn) return;
  try {
    if (localStorage.getItem("gesp_checkin_collapsed") === "1") {
      panel.classList.add("collapsed");
    }
  } catch (e) {}
  btn.onclick = () => {
    panel.classList.toggle("collapsed");
    try {
      localStorage.setItem(
        "gesp_checkin_collapsed",
        panel.classList.contains("collapsed") ? "1" : "0"
      );
    } catch (e) {}
  };
}

function renderDailyCheckin() {
  const list = document.getElementById("daily-checkin-list") || document.getElementById("daily-checkin-inline");
  const dateEl = document.getElementById("daily-checkin-date");
  const tip = document.getElementById("daily-checkin-tip");
  if (!list) return;
  if (dateEl) dateEl.textContent = todayStr();
  ensureDailyProgress();
  const banks = typeof QUESTION_BANKS !== "undefined" ? QUESTION_BANKS : {};
  // 排除评测等特殊模式（不计入每日打卡）
  const ids = Object.keys(banks).filter(id => {
    const b = banks[id];
    if (!b) return false;
    if (b.excludeFromDaily || b.specialMode) return false;
    if (b.requiresUnlock) return false;
    if (id === "eval-mode") return false;
    return true;
  });
  if (!ids.length) {
    list.innerHTML = "<div class='setting-hint'>暂无题库</div>";
    return;
  }
  let allDone = true;
  const html = ids.map(id => {
    const name = (banks[id] && banks[id].name) || id;
    const st = getBankDailyStats(id);
    const quota = getDailyQuota(id);
    const done = st.done;
    const acc = done ? Math.round(st.correct / done * 100) : null;
    const finished = done >= quota;
    if (!finished) allDone = false;
    const pct = Math.min(100, Math.round(done / Math.max(1, quota) * 100));
    const status = finished
      ? `<span class="status done">✓ 已完成 ${done}/${quota}</span>`
      : `<span class="status todo">${done}/${quota} 题</span>`;
    const accText = acc == null ? "今日未练" : `正确率 ${acc}% → 目标 ${quota} 题`;
    return `<div class="daily-checkin-item" data-bank="${id}">
      <div class="name">${name}</div>
      ${status}
      <div class="daily-checkin-bar"><i style="width:${pct}%"></i></div>
      <div class="setting-hint" style="grid-column:1/-1;margin:0">${accText}</div>
    </div>`;
  }).join("");
  list.innerHTML = html;
  const inline = document.getElementById("daily-checkin-inline");
  if (inline && inline !== list) inline.innerHTML = html;
  if (tip) {
    tip.textContent = allDone
      ? "今日各题库打卡已完成，继续练也会累计进步！"
      : "正确率高可少做，正确率低需多练；目标会随今日表现调整";
  }
}

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
function getSoundVolume() {
  const v = data && data.settings ? data.settings.soundVolume : 0.7;
  return Math.max(0, Math.min(1, v == null ? 0.7 : +v));
}
/** channel: "quiz" | "ui" | "all" */
/** 相同提示合并：短时间内重复文案只更新计数，不刷屏 */
const _toastState = { map: Object.create(null) };
function uiToast(msg, type, opts) {
  type = type || "info";
  opts = opts || {};
  msg = String(msg || "");
  const key = (opts.key || msg) + "|" + type;
  const now = Date.now();
  const layer = document.getElementById("toast-layer");
  if (!layer) { console.log(msg); return; }

  const prev = _toastState.map[key];
  if (prev && prev.el && prev.el.isConnected && now - prev.at < 2600) {
    prev.count += 1;
    prev.at = now;
    const base = prev.baseMsg;
    prev.el.textContent = prev.count > 1 ? base + " ×" + prev.count : base;
    prev.el.classList.remove("toast-pop");
    void prev.el.offsetWidth;
    prev.el.classList.add("toast-pop");
    clearTimeout(prev.timer);
    prev.timer = setTimeout(() => {
      if (prev.el && prev.el.isConnected) {
        prev.el.classList.add("out");
        setTimeout(() => prev.el.remove(), 350);
      }
      if (_toastState.map[key] === prev) delete _toastState.map[key];
    }, opts.ms || 2800);
    return;
  }

  const el = document.createElement("div");
  el.className = "toast-item" + (type === "error" ? " toast-err" : type === "success" ? " toast-ok" : "");
  el.textContent = msg;
  layer.appendChild(el);
  const entry = { el, at: now, count: 1, baseMsg: msg, timer: null };
  entry.timer = setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 350);
    if (_toastState.map[key] === entry) delete _toastState.map[key];
  }, opts.ms || 2800);
  _toastState.map[key] = entry;
}
window.uiToast = uiToast;

function playTone(freq, duration, type = "sine", vol = 0.15, channel = "all") {
  if (!data || !data.settings || !data.settings.sound) return;
  if (channel === "quiz" && data.settings.soundQuiz === false) return;
  if (channel === "ui" && data.settings.soundUi === false) return;
  try {
    const ctx = getAudio();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const master = getSoundVolume();
    const v = Math.max(0.0001, vol * master);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(v, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}
function soundCorrect() {
  playTone(660, 0.08, "sine", 0.15, "quiz");
  setTimeout(() => playTone(880, 0.12, "sine", 0.15, "quiz"), 80);
}
function soundWrong() { playTone(220, 0.2, "square", 0.1, "quiz"); }
function soundCombo() {
  playTone(520, 0.06, "sine", 0.12, "quiz");
  setTimeout(() => playTone(780, 0.08, "sine", 0.12, "quiz"), 60);
  setTimeout(() => playTone(1040, 0.1, "sine", 0.12, "quiz"), 120);
}
function soundTimeout() { playTone(180, 0.3, "sawtooth", 0.08, "quiz"); }
function soundFinish() {
  playTone(523, 0.1, "sine", 0.14, "quiz");
  setTimeout(() => playTone(659, 0.1, "sine", 0.14, "quiz"), 100);
  setTimeout(() => playTone(784, 0.15, "sine", 0.14, "quiz"), 200);
}
function soundUiClick() { playTone(480, 0.04, "sine", 0.08, "ui"); }
function soundUiOk() {
  playTone(520, 0.06, "sine", 0.1, "ui");
  setTimeout(() => playTone(720, 0.08, "sine", 0.1, "ui"), 50);
}
/** 分类 UI 音效：nav / ok / err / deny / toggle / soft */
function soundUi(kind) {
  kind = kind || "soft";
  if (kind === "nav" || kind === "click") {
    playTone(420, 0.035, "sine", 0.07, "ui");
  } else if (kind === "ok" || kind === "success") {
    playTone(540, 0.05, "sine", 0.1, "ui");
    setTimeout(() => playTone(760, 0.07, "sine", 0.1, "ui"), 45);
  } else if (kind === "err" || kind === "error") {
    playTone(200, 0.12, "square", 0.07, "ui");
  } else if (kind === "deny" || kind === "disabled") {
    playTone(160, 0.08, "triangle", 0.06, "ui");
    setTimeout(() => playTone(140, 0.1, "triangle", 0.05, "ui"), 70);
  } else if (kind === "toggle") {
    playTone(600, 0.04, "sine", 0.08, "ui");
  } else if (kind === "open") {
    playTone(380, 0.04, "sine", 0.07, "ui");
    setTimeout(() => playTone(520, 0.05, "sine", 0.07, "ui"), 40);
  } else if (kind === "close") {
    playTone(500, 0.04, "sine", 0.06, "ui");
    setTimeout(() => playTone(360, 0.05, "sine", 0.06, "ui"), 40);
  } else {
    playTone(480, 0.03, "sine", 0.05, "ui");
  }
}
window.soundUi = soundUi;

function unlockAudio() {
  try {
    const ctx = getAudio();
    if (ctx.state === "suspended") ctx.resume();
  } catch (e) {}
}
document.addEventListener("pointerdown", unlockAudio, { once: false, passive: true });

/** 按钮点击音效委托：根据状态分类 */
document.addEventListener("click", function (ev) {
  const t = ev.target.closest("button, .btn-primary, .btn-secondary, .tab-btn, .opt-btn, .codex-card");
  if (!t || t.disabled) {
    if (t && t.disabled) soundUi("deny");
    return;
  }
  if (t.classList.contains("locked")) { soundUi("deny"); return; }
  if (t.classList.contains("btn-danger") || t.id && t.id.indexOf("reset") >= 0) { soundUi("err"); return; }
  if (t.classList.contains("btn-primary") || t.classList.contains("opt-btn")) { soundUi("ok"); return; }
  if (t.classList.contains("tab-btn")) { soundUi("toggle"); return; }
  if (t.classList.contains("codex-card")) { soundUi("soft"); return; }
  if (t.classList.contains("btn-secondary") || t.tagName === "BUTTON") { soundUi("nav"); return; }
}, true);



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
  const el = document.getElementById(id);
  const app = document.getElementById("app");
  if (app) {
    if (id === "codex-view" || id === "pet-view") app.classList.add("app-wide");
    else app.classList.remove("app-wide");
  }
  try {
    if (id !== "pet-view" && typeof petSessionEnd === "function") petSessionEnd();
    if (id === "pet-view" && typeof petSessionStart === "function") petSessionStart();
  } catch (e) {}
  if (el) {
    el.classList.add("active");
    return true;
  }
  try { uiToast("页面不存在：" + id + "（请强制刷新加载新版本）", "error"); } catch (e) {}
  return false;
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
  const raw = String(text ?? "");
  const lines = raw.split(/\r\n|\n|\r/);
  const htmlLines = lines.map(line => {
    let i = 0;
    let lead = "";
    while (i < line.length) {
      const ch = line[i];
      if (ch === " ") { lead += "&nbsp;"; i++; }
      else if (ch === "\t") { lead += "&nbsp;&nbsp;&nbsp;&nbsp;"; i++; }
      else break;
    }
    let rest = escapeHtml(line.slice(i));
    rest = rest.replace(/%_{2,}/g, m => `<span class="blank">${m}</span>`);
    rest = rest.replace(/(?<![%\w])_{2,}(?!\w)/g, m => `<span class="blank">${m}</span>`);
    return lead + rest;
  });
  return `<div class="q-code-block">${htmlLines.join("<br>")}</div>`;
}

/** 选项展示：关键/连续空格用 ␣ 标出并加提示 */
function formatOptionDisplay(text) {
  const raw = String(text ?? "");
  const hasLeading = /^ /.test(raw);
  const hasTrailing = / $/.test(raw);
  const hasMulti = /  +/.test(raw);
  let shown = raw;
  if (hasLeading || hasTrailing || hasMulti) shown = raw.replace(/ /g, "␣");
  // 将真实换行转为 <br>，字面 \n 保持原样（escape 后仍是反斜杠+n）
  let body = escapeHtml(shown).replace(/\r\n|\n|\r/g, "<br>");
  if (hasLeading || hasTrailing || hasMulti) {
    const parts = [];
    if (hasLeading) parts.push("前面有空格");
    if (hasTrailing) parts.push("后面有空格");
    if (hasMulti) parts.push("含多空格");
    body += ` <span class="space-hint">（${parts.join("，")}）</span>`;
  }
  return body;
}

/* ========== 首页 ========== */

/* ========== 主系统积极性：今日建议 / 专注模式 / 结算考点 ========== */
function isStrictMode() {
  try { return !data || !data.settings || data.settings.strictMode !== false; } catch (e) { return true; }
}
window.isStrictMode = isStrictMode;
function isFocusMode() {
  try { return !!(data && data.settings && data.settings.focusMode); } catch (e) { return false; }
}

function countPendingWrong() {
  return Object.keys(data.wrongBook || {}).filter(id => {
    const w = data.wrongBook[id];
    return (w.consecutiveCorrect || 0) < 2;
  }).length;
}

/** 今日各库粗略正确率（基于 dailyProgress） */
function getTodayBankAcc(bankId) {
  const st = getBankDailyStats(bankId);
  if (!st.done) return null;
  return st.correct / Math.max(1, st.done);
}

/**
 * 今日建议：优先未打卡 → 正确率低 → 有错题的库
 * 返回 { bankId, reason, wrongCnt, quota, done }
 */
function getTodaySuggestion() {
  const banks = typeof QUESTION_BANKS !== "undefined" ? QUESTION_BANKS : {};
  const ids = Object.keys(banks).filter(id => {
    const b = banks[id];
    if (!b || b.excludeFromDaily || b.specialMode || b.requiresUnlock) return false;
    if (id === "eval-mode") return false;
    return true;
  });
  const wrongCnt = countPendingWrong();
  let best = null;
  let bestScore = -1e9;
  ids.forEach(id => {
    const st = getBankDailyStats(id);
    const quota = getDailyQuota(id);
    const done = st.done || 0;
    const unfinished = done < quota ? (quota - done) : 0;
    const acc = done >= 3 ? st.correct / done : null;
    let score = 0;
    let reason = "";
    if (unfinished > 0) {
      score += 100 + unfinished;
      reason = "今日打卡未完成（还差 " + unfinished + " 题）";
    }
    if (acc != null && acc < 0.85) {
      score += 80 + (1 - acc) * 40;
      if (!reason) reason = "今日正确率偏低（" + Math.round(acc * 100) + "%），建议查缺补漏";
      else reason += "；正确率 " + Math.round(acc * 100) + "%";
    }
    if (acc == null && done === 0) {
      score += 50;
      if (!reason) reason = "今天还没练过这个题库";
    }
    if (score > bestScore) {
      bestScore = score;
      best = { bankId: id, reason: reason || "保持手感，练一组巩固", done, quota, acc };
    }
  });
  if (!best && ids.length) {
    best = { bankId: ids[0], reason: "从常用题库开始一组短练习", done: 0, quota: getDailyQuota(ids[0]), acc: null };
  }
  if (best) best.wrongCnt = wrongCnt;
  return best;
}

function renderTodaySuggestion() {
  const body = document.getElementById("suggest-body");
  if (!body) return;
  const sug = getTodaySuggestion();
  const wrongCnt = countPendingWrong();
  if (!sug) {
    body.innerHTML = "暂无可用题库";
    return;
  }
  const bank = QUESTION_BANKS[sug.bankId];
  const name = (bank && bank.name) || sug.bankId;
  const accText = sug.acc == null ? "今日未练" : ("今日正确率 " + Math.round(sug.acc * 100) + "%");
  body.innerHTML =
    `<div class="suggest-title">建议题库：<strong>${name}</strong></div>` +
    `<div class="suggest-reason">${sug.reason}</div>` +
    `<div class="setting-hint">${accText} · 打卡 ${sug.done}/${sug.quota}` +
    (wrongCnt > 0 ? ` · 错题待清 <strong style="color:#fca5a5">${wrongCnt}</strong>` : " · 错题本较清爽") +
    `</div>`;
  const wb = document.getElementById("wrong-btn-badge");
  if (wb) {
    wb.textContent = String(wrongCnt);
    wb.style.display = wrongCnt > 0 ? "" : "none";
  }
}

function applyFocusModeUI() {
  const on = isFocusMode();
  document.body.classList.toggle("focus-mode", on);
  const petCol = document.querySelector(".home-col-right");
  const petPanel = document.getElementById("home-pet");
  // 专注：弱化右侧养成，不删功能，仅视觉与入口
  if (petCol) petCol.classList.toggle("focus-dim", on);
  ["btn-pet", "btn-mail", "btn-codex", "btn-achieve"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = on ? "none" : "";
  });
  // 竞速/评测在专注模式下仍可用但文案更克制
  const raceHint = document.querySelector(".race-hint");
  if (raceHint && on) raceHint.textContent = "可选抽检 · 每日次数有限 · 主线仍是日常刷题与错题";
  const sh = document.getElementById("suggest-hint");
  if (sh) {
    sh.textContent = on
      ? "专注模式已开：先做题、看解析、清错题。养成入口已隐藏。"
      : "主线是客观题查缺补漏；养成可稍后再看。";
  }
}

function analyzeSessionKnowledge() {
  const weak = {}, strong = {};
  (quiz.sessionWrongKps || []).forEach(kp => {
    if (!kp) return;
    weak[kp] = (weak[kp] || 0) + 1;
  });
  (quiz.sessionOkKps || []).forEach(kp => {
    if (!kp) return;
    strong[kp] = (strong[kp] || 0) + 1;
  });
  (quiz.answers || []).forEach(a => {
    if (!a || !a.kp) return;
    if (a.correct) strong[a.kp] = (strong[a.kp] || 0) + 1;
    else weak[a.kp] = (weak[a.kp] || 0) + 1;
  });
  const weakList = Object.keys(weak).sort((a, b) => weak[b] - weak[a]).slice(0, 5);
  const strongList = Object.keys(strong).filter(k => !weak[k]).sort((a, b) => strong[b] - strong[a]).slice(0, 5);
  return { weakList, strongList, weak, strong };
}

function renderResultKnowledge() {
  const el = document.getElementById("result-kp");
  if (!el) return;
  const { weakList, strongList } = analyzeSessionKnowledge();
  let html = `<div class="result-kp-title">本局知识点</div>`;
  if (weakList.length) {
    html += `<div class="result-kp-weak"><span class="kp-label">仍需加强</span> ${weakList.map(k => `<span class="kp-chip weak">${k}</span>`).join(" ")}</div>`;
  } else {
    html += `<div class="result-kp-weak"><span class="kp-label">仍需加强</span> <span class="setting-hint">本局无明显薄弱点，可去清历史错题</span></div>`;
  }
  if (strongList.length) {
    html += `<div class="result-kp-ok"><span class="kp-label">本局较稳</span> ${strongList.map(k => `<span class="kp-chip ok">${k}</span>`).join(" ")}</div>`;
  }
  el.innerHTML = html;
  const fh = document.getElementById("result-focus-hint");
  if (fh) {
    const w = countPendingWrong();
    fh.textContent = w > 0
      ? `建议下一步：清 ${w} 道错题，比反复抽卡更有用。`
      : (isFocusMode() ? "专注模式：可以休息或再来一组短练习。" : "养成奖励已入账的话，回首页继续练即可，不必久留宠物页。");
  }
}



function initHomeModeTabs() {
  const tabs = document.querySelectorAll(".home-mode-tab");
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.onclick = () => {
      const id = tab.dataset.homeTab;
      if (id === "eval" && !isEvalModeUnlocked()) {
        try { uiToast("评测模式需激活码解锁", "error"); } catch (e) {}
        return;
      }
      if (tab.hidden) return;
      tabs.forEach(t => t.classList.toggle("active", t === tab));
      ["train", "race", "eval"].forEach(name => {
        const panel = document.getElementById("home-tab-" + name);
        if (!panel) return;
        const on = name === id;
        panel.hidden = !on;
        panel.classList.toggle("active", on);
        panel.setAttribute("aria-hidden", on ? "false" : "true");
      });
      if (id === "race") {
        try { if (typeof refreshRaceMaxInfo === "function") refreshRaceMaxInfo(); } catch (e) {}
      }
      if (id === "eval") {
        try { if (typeof refreshEvalPanel === "function") refreshEvalPanel(); } catch (e) {}
      }
    };
  });
  try { refreshEvalPanel(); } catch (e) {}
}

function goHomeFromSubpage() {
  try {
    if (typeof tryLeaveCodex === "function") {
      // 词条页拦截在 openCodex 内部处理
    }
  } catch (e) {}
  showView("home-view");
  updateHome();
  try { if (typeof maybeShowPetBless === "function") maybeShowPetBless(); } catch (e) {}
}

function bindTopBackButtons() {
  const map = [
    ["btn-settings-back", () => { saveSettingsFromUI(); goHomeFromSubpage(); }],
    ["btn-wrong-back-top", () => goHomeFromSubpage()],
    ["btn-history-back-top", () => goHomeFromSubpage()],
    ["btn-achieve-back-top", () => goHomeFromSubpage()],
    ["btn-mail-back-top", () => goHomeFromSubpage()],
    ["btn-changelog-back-top", () => goHomeFromSubpage()],
    ["btn-codex-back-top", () => {
      if (typeof requestCodexLeave === "function") {
        requestCodexLeave(() => goHomeFromSubpage());
      } else goHomeFromSubpage();
    }],
    ["btn-pet-back-top", () => goHomeFromSubpage()]
  ];
  map.forEach(([id, fn]) => {
    const el = document.getElementById(id);
    if (el) el.onclick = fn;
  });
}

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
  try { refreshEvalPanel(); } catch (e) {}
  try { renderTodaySuggestion(); } catch (e) {}
  try { applyFocusModeUI(); } catch (e) {}

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
    const te = document.getElementById("trend-text");
    if (te) te.textContent = "暂无足够数据";
  }
  try {
    const src = document.getElementById("trend-text");
    const dst = document.getElementById("trend-text-center");
    if (src && dst) {
      dst.textContent = src.textContent;
      dst.style.color = src.style.color || "";
    }
  } catch (e) {}
  // 首页宠物徽章
  const petXp = data.totalXp || 0;
  const pet = getPetStage(petXp);
  const lvInfo = getPlayerLevelInfo(petXp);
  ensureDailyByte();
  const he = document.getElementById("home-pet-emoji");
  const hl = document.getElementById("home-pet-label");
  // pet stage may include shiny flags

  if (he) {
    he.textContent = pet.emoji;
    he.className = "home-pet-emoji pet-breath" + (pet.shiny ? " pet-shiny-emoji" : "");
  }
  if (hl) hl.textContent = `${pet.name} · Lv.${lvInfo.level}` + (pet.shiny ? " · 闪光" : "");
  const hp = document.getElementById("home-pet");
  if (hp) {
    hp.classList.toggle("is-shiny", !!pet.shiny);
    if (pet.glow) hp.style.setProperty("--pet-glow", pet.glow);
  }
  try { if (typeof normalizeWallet === "function") normalizeWallet(); } catch (e) {}
  const hb = document.getElementById("home-bytes");
  if (hb) {
    const b = data.bytes || 0, k = data.kb || 0, m = data.mb || 0;
    hb.textContent = m > 0 ? `${m}MB ${k}KB ${b}B` : (k > 0 ? `${k}KB ${b}B` : `${b}B`);
  }
  const hkb = document.getElementById("home-kb");
  if (hkb) hkb.textContent = `${data.kb||0} KB`;
  const hmb = document.getElementById("home-mb");
  if (hmb) hmb.textContent = `${data.mb||0} MB`;
  const hlv = document.getElementById("home-level");
  if (hlv) hlv.textContent = `Lv.${lvInfo.level} · ${petXp} XP`;
  const hfix = document.getElementById("home-byte-cap");
  if (hfix) hfix.textContent = `今日固定额度剩余 ${getDailyFixedRemaining()}`
  try { renderDailyCheckin(); } catch (e) {}
  try { updateRaceUI(); } catch (e) {}
  try {
    if (typeof getIdlePreview === "function") {
      const idle = getIdlePreview();
      const hl = document.getElementById("home-pet-label");
      if (hl && idle) {
        const base = hl.textContent.split("·")[0].trim();
        // keep name, append idle
        const name = (typeof getPetStage === "function") ? getPetStage().name : base;
        hl.textContent = name + " · " + idle.rate + "B/分";
        if (idle.pending >= 1) hl.textContent += " · 待领" + idle.pending;
      }
    }
  } catch (e) {}
  refreshUserDisplay();
  try { if (typeof checkAndDeliverMails === "function") { checkAndDeliverMails(); updateMailBadges(); } } catch (e) {}

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



function getConfig() {
  return (typeof window !== "undefined" && window.GESP_CONFIG) ? window.GESP_CONFIG : {};
}

/**
 * 链接后缀进站：/仓库/cxj → 404 写入 gesp_entry_*，或 ?u=cxj
 * 优先级：本次链接指定 > 本地设置姓名 > config 默认
 */
function isEvalModeUnlocked() {
  try {
    if (typeof isEvalUnlocked === "function") return !!isEvalUnlocked();
    return !!(data && data.unlocks && data.unlocks.evalMode);
  } catch (e) { return false; }
}

/** 评测入口：仅激活后显示（类似竞速独立面板） */
function sanitizeBankSelects() {
  const ban = new Set(["eval-mode"]);
  ["bank-select", "race-bank"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    Array.from(el.options).forEach(opt => {
      if (ban.has(opt.value)) opt.remove();
      const bk = QUESTION_BANKS && QUESTION_BANKS[opt.value];
      if (bk && (bk.specialMode || bk.requiresUnlock)) opt.remove();
    });
  });
}
function refreshEvalPanel() {
  const ok = isEvalModeUnlocked();
  const tabBtn = document.getElementById("home-mode-tab-eval");
  const tabPanel = document.getElementById("home-tab-eval");
  const inner = document.getElementById("eval-mode-panel");

  // 未解锁：彻底隐藏评测 Tab 与面板（不要只用 style.display，避免 flex 残留）
  if (tabBtn) {
    tabBtn.hidden = !ok;
    tabBtn.setAttribute("aria-hidden", ok ? "false" : "true");
    tabBtn.style.display = ok ? "" : "none";
    if (!ok) tabBtn.classList.remove("active");
  }
  if (tabPanel) {
    if (!ok) {
      tabPanel.hidden = true;
      tabPanel.setAttribute("aria-hidden", "true");
      tabPanel.classList.remove("active");
    }
  }
  if (inner) {
    inner.style.display = ok ? "" : "none";
  }

  if (!ok) {
    // 若误停在评测页，退回训练
    const trainTab = document.querySelector('.home-mode-tab[data-home-tab="train"]');
    const trainPanel = document.getElementById("home-tab-train");
    if (trainPanel && (trainPanel.hidden || !trainPanel.classList.contains("active"))) {
      if (trainTab) {
        document.querySelectorAll(".home-mode-tab").forEach(t => t.classList.remove("active"));
        trainTab.classList.add("active");
      }
      ["train", "race", "eval"].forEach(name => {
        const p = document.getElementById("home-tab-" + name);
        if (!p) return;
        const on = name === "train";
        p.hidden = !on;
        p.classList.toggle("active", on);
        p.setAttribute("aria-hidden", on ? "false" : "true");
      });
    }
    return;
  }

  const bank = (typeof QUESTION_BANKS !== "undefined" && QUESTION_BANKS["eval-mode"]) || null;
  const n = bank && bank.staticQuestions ? bank.staticQuestions.length : 0;
  const info = document.getElementById("eval-max-info");
  if (info) info.textContent = "固定题量：" + n + " 题（每次打乱顺序，不计入每日打卡）";
}
function refreshBankSelect() {
  try { sanitizeBankSelects(); } catch (e) {}
  refreshEvalPanel();
  try { refreshModeButtons(); } catch (e) {}
}
window.refreshBankSelect = refreshBankSelect;
window.refreshEvalPanel = refreshEvalPanel;


function getStudentMap() {
  try {
    const m = (getConfig().studentMap) || {};
    return m && typeof m === "object" ? m : {};
  } catch (e) {
    return {};
  }
}

/** 将后缀或已存值解析为正式中文姓名（始终以当前 config.studentMap 为准） */
function resolveStudentName(codeOrName) {
  if (codeOrName == null) return "";
  const raw = String(codeOrName).trim();
  if (!raw) return "";
  const map = getStudentMap();
  if (map[raw] != null && String(map[raw]).trim()) return String(map[raw]).trim();
  const key = raw.toLowerCase();
  if (map[key] != null && String(map[key]).trim()) return String(map[key]).trim();
  // 已是表中的中文名
  for (const k of Object.keys(map)) {
    if (String(map[k]).trim() === raw) return raw;
  }
  return raw;
}

/**
 * 称呼用名：识别到的中文姓名若为三个汉字，去掉姓（首字）
 * 例如 苏婧瑜 → 婧瑜；两字名保持不变
 */
function getGreetingName() {
  const full = getUserName();
  if (/^[\u4e00-\u9fff]{3}$/.test(full)) return full.slice(1);
  return full;
}

/**
 * 链接后缀进站：/仓库/sjy 或 ?u=sjy
 * 始终用最新 studentMap 解析，避免只存了拼音后缀
 */
function applyEntryNameFromUrl() {
  try {
    const params = new URLSearchParams(location.search);
    let code = params.get("u") || params.get("code") || "";
    const map = getStudentMap();

    if (!code) {
      try {
        let path = (location.pathname || "").replace(/\/+$/, "");
        const segs = path.split("/").filter(Boolean);
        const skip = new Set(["index.html", "gesp", "gesp-printf-scanf", "GESP", "docs", "app"]);
        for (let i = segs.length - 1; i >= 0; i--) {
          const seg = segs[i];
          if (skip.has(seg)) continue;
          if (/\.[a-z0-9]+$/i.test(seg)) continue;
          const key = seg.toLowerCase();
          if (map[seg] != null || map[key] != null) {
            code = seg;
            break;
          }
        }
      } catch (e) {}
    }

    if (!code) {
      try { code = localStorage.getItem("gesp_entry_code") || ""; } catch (e) {}
    }

    let name = "";
    if (code) {
      name = resolveStudentName(code);
      // map 未命中时不要把拼音后缀当成姓名写入
      const key = String(code).toLowerCase();
      const mapped = map[code] != null || map[key] != null;
      if (mapped && name) {
        try {
          localStorage.setItem("gesp_entry_code", String(code).toLowerCase());
          localStorage.setItem("gesp_entry_name", name);
        } catch (e) {}
        data.userName = name;
        saveData(data);
      }
    }

    // 纠错：本地已存的是 sjy 这类后缀，用 map 升成中文名
    if (data && data.userName) {
      const cur = String(data.userName).trim();
      const fixed = resolveStudentName(cur);
      const ck = cur.toLowerCase();
      if ((map[cur] != null || map[ck] != null) && fixed && fixed !== cur) {
        data.userName = fixed;
        saveData(data);
        name = fixed;
      }
    }

    // 再用 entry_code 强制对齐一次
    try {
      const savedCode = localStorage.getItem("gesp_entry_code") || code || "";
      if (savedCode) {
        const n2 = resolveStudentName(savedCode);
        const k2 = String(savedCode).toLowerCase();
        if ((map[savedCode] != null || map[k2] != null) && n2) {
          if (!data.userName || data.userName !== n2) {
            data.userName = n2;
            saveData(data);
          }
          name = n2;
        }
      }
    } catch (e) {}

    if (name && String(name).trim()) {
      try { refreshUserDisplay(); } catch (e) {}
      if (params.has("u") || params.has("code") || params.has("_ver") || params.has("_t")) {
        try {
          const clean = location.pathname + location.hash;
          history.replaceState(null, "", clean);
        } catch (e) {}
      }
      return data.userName;
    }
  } catch (e) {
    console.warn("applyEntryNameFromUrl", e);
  }
  return null;
}

/** 正式姓名（档案/设置）：完整中文名，绝不长期保留拼音后缀 */
function getUserName() {
  const map = getStudentMap();
  const tryMap = (code) => {
    if (!code) return "";
    const k = String(code).trim();
    if (!k) return "";
    if (map[k] != null && String(map[k]).trim()) return String(map[k]).trim();
    const low = k.toLowerCase();
    if (map[low] != null && String(map[low]).trim()) return String(map[low]).trim();
    return "";
  };

  // 1) 链接后缀 / 本地 entry code 优先（始终跟 config.studentMap）
  try {
    const code = localStorage.getItem("gesp_entry_code") || "";
    const n = tryMap(code);
    if (n) {
      if (data && data.userName !== n) {
        data.userName = n;
        try { saveData(data); } catch (e) {}
      }
      return n;
    }
  } catch (e) {}

  // 2) data.userName：若是后缀或可映射，换成中文
  if (data && data.userName && String(data.userName).trim()) {
    const cur = String(data.userName).trim();
    const mapped = tryMap(cur);
    if (mapped) {
      if (data.userName !== mapped) {
        data.userName = mapped;
        try { saveData(data); } catch (e) {}
      }
      return mapped;
    }
    // 纯拼音短码却不在表里：仍显示原值，避免误伤老师手填名
    return cur;
  }

  const cfg = getConfig();
  return (cfg.userName && String(cfg.userName).trim()) || "同学";
}

function getDisplayName() {
  return getUserName();
}

function refreshUserDisplay() {
  const greetName = getGreetingName();
  const full = getUserName();
  const dn = document.getElementById("display-name");
  if (dn) dn.textContent = greetName;
  const greet = document.getElementById("user-greeting");
  if (greet) greet.innerHTML = `你好，<span id="display-name">${greetName}</span>`;
  // 设置框仍显示全名
  try {
    const nameInput = document.getElementById("input-user-name");
    if (nameInput && document.getElementById("settings-view") &&
        document.getElementById("settings-view").classList.contains("active")) {
      nameInput.value = full;
    }
  } catch (e) {}
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


/* ========== 评测模式（激活后独立入口，不计每日打卡） ========== */
function startEvalMode() {
  if (!isEvalModeUnlocked()) {
    try { uiToast("请先在设置中使用激活码解锁评测模式", "error"); } catch (e) {}
    return;
  }
  const bank = QUESTION_BANKS["eval-mode"];
  if (!bank || !bank.staticQuestions || !bank.staticQuestions.length) {
    try { uiToast("评测题库未加载", "error"); } catch (e) {}
    return;
  }
  currentBankId = "eval-mode";
  const list = bank.staticQuestions.slice();
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = list[i]; list[i] = list[j]; list[j] = t;
  }
  quiz.list = list;
  quiz.index = 0;
  quiz.correct = 0;
  quiz.wrong = 0;
  quiz.combo = 0;
  quiz.maxCombo = 0;
  quiz.answers = [];
  quiz.isRace = false;
  quiz.isEval = true;
  quiz.startTime = Date.now();
  // 关闭竞速计时样式
  try { if (typeof stopRaceTimers === "function") stopRaceTimers(); } catch (e) {}
  const view = document.getElementById("quiz-view");
  if (view) {
    view.classList.remove("race-mode");
    view.classList.add("eval-mode");
  }
  showView("quiz-view");
  try { renderQuestion(); } catch (e) { console.warn(e); }
}

/* ========== 竞速模式 ========== */
const RACE_DAILY_LIMIT = 3;

function getRaceDaily() {
  if (!data.raceDaily || data.raceDaily.date !== todayStr()) {
    data.raceDaily = { date: todayStr(), used: 0 };
    saveData(data);
  }
  return data.raceDaily;
}

function getRaceRemaining() {
  return Math.max(0, RACE_DAILY_LIMIT - (getRaceDaily().used || 0));
}

function collectRacePool(bankKey, only5) {
  let pool = [];
  if (bankKey === "all") {
    Object.keys(QUESTION_BANKS || {}).forEach(id => {
      const b = QUESTION_BANKS[id];
      const qs = (b && b.staticQuestions) || [];
      qs.forEach(q => pool.push(Object.assign({}, q, { _fromBank: id })));
    });
    // also printf static in script
    if (typeof STATIC_QUESTIONS !== "undefined") {
      STATIC_QUESTIONS.forEach(q => pool.push(Object.assign({}, q, { _fromBank: "printf-scanf" })));
    }
  } else if (bankKey === "printf-scanf") {
    const qs = getBankStaticQuestionsFor("printf-scanf");
    pool = qs.map(q => Object.assign({}, q, { _fromBank: "printf-scanf" }));
  } else {
    const b = QUESTION_BANKS[bankKey];
    pool = ((b && b.staticQuestions) || []).map(q => Object.assign({}, q, { _fromBank: bankKey }));
  }
  // dedupe by signature
  const seen = new Set();
  pool = pool.filter(q => {
    if (only5 && (q.difficulty || 0) < 5) return false;
    if (!only5 && (q.difficulty || 0) < 4) return false; // 竞速至少 4 星
    if (isQuestionRemoved(q)) return false;
    const sig = questionSignature(q);
    if (seen.has(sig)) return false;
    seen.add(sig);
    if (!isStringEnabled() && isStringRelated(q)) return false;
    return true;
  });
  return pool;
}

function getBankStaticQuestionsFor(bankId) {
  if (bankId === "printf-scanf") {
    if (QUESTION_BANKS["printf-scanf"] && QUESTION_BANKS["printf-scanf"].staticQuestions)
      return QUESTION_BANKS["printf-scanf"].staticQuestions;
    return typeof STATIC_QUESTIONS !== "undefined" ? STATIC_QUESTIONS : [];
  }
  const b = QUESTION_BANKS[bankId];
  return (b && b.staticQuestions) || [];
}

function updateRaceUI() {
  const rem = getRaceRemaining();
  const el = document.getElementById("race-remain");
  if (el) el.textContent = `今日剩余 ${rem}/${RACE_DAILY_LIMIT}`;
  const btn = document.getElementById("btn-race-start");
  if (btn) btn.disabled = rem <= 0;
  refreshRaceMaxInfo();
}

function refreshRaceMaxInfo() {
  const bankEl = document.getElementById("race-bank");
  const only5El = document.getElementById("race-only5");
  const info = document.getElementById("race-max-info");
  if (!info || !bankEl) return;
  const bank = bankEl.value;
  const only5 = only5El ? only5El.checked : true;
  const pool = collectRacePool(bank, only5);
  const name = bankEl.options[bankEl.selectedIndex].text;
  info.textContent = `可出题量：${pool.length} 题（${name}${only5 ? " · 仅五星" : " · ≥四星"}）`;
  info.dataset.max = String(pool.length);
}


function getRaceTotalSeconds(n, bank, only5) {
  // 题量少：固定 5 分钟
  if (n <= 12) return 5 * 60;
  // 按模式：综合更紧；五星略放宽单题时间
  let secPer = only5 ? 22 : 18;
  if (bank === "all") secPer = only5 ? 28 : 24;
  else if (bank === "printf-scanf") secPer = only5 ? 24 : 20;
  const total = Math.round(n * secPer);
  return Math.max(5 * 60, Math.min(25 * 60, total));
}

function clearRaceSessionTimer() {
  if (quiz.raceTimer) { clearInterval(quiz.raceTimer); quiz.raceTimer = null; }
  if (quiz.raceBeepTimer) { clearInterval(quiz.raceBeepTimer); quiz.raceBeepTimer = null; }
  const view = document.getElementById("quiz-view");
  if (view) {
    view.classList.remove("race-mode");
    view.style.removeProperty("--race-urgency");
  }
  const bar = document.getElementById("race-timer-bar");
  if (bar) bar.remove();
}

function playRaceTick(urgency) {
  // urgency 0~1，越接近 1 音量越大、音调越高
  if (!data.settings.sound) return;
  const vol = 0.04 + urgency * 0.22;
  const freq = 420 + urgency * 480;
  playTone(freq, 0.05 + urgency * 0.04, "square", vol);
}

function updateRaceTimerUI() {
  const left = quiz.raceTimeLeft || 0;
  const total = quiz.raceTimeTotal || 1;
  const ratio = left / total;
  const urgency = 1 - ratio;
  const view = document.getElementById("quiz-view");
  if (view) view.style.setProperty("--race-urgency", String(urgency.toFixed(3)));
  const el = document.getElementById("race-timer-text");
  if (el) {
    const m = Math.floor(left / 60);
    const sec = left % 60;
    el.textContent = `⏱ ${m}:${String(sec).padStart(2,"0")}`;
    el.classList.toggle("urgent", ratio <= 0.25);
  }
  const fill = document.getElementById("race-timer-fill");
  if (fill) fill.style.width = Math.max(0, ratio * 100) + "%";
}

function startRaceSessionTimer(totalSec) {
  clearRaceSessionTimer();
  quiz.raceTimeTotal = totalSec;
  quiz.raceTimeLeft = totalSec;
  const view = document.getElementById("quiz-view");
  if (view) view.classList.add("race-mode");
  // inject bar
  let bar = document.getElementById("race-timer-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "race-timer-bar";
    bar.innerHTML = `<div class="race-timer-text" id="race-timer-text"></div>
      <div class="race-timer-track"><i id="race-timer-fill"></i></div>`;
    const head = view.querySelector(".quiz-header") || view;
    head.appendChild(bar);
  }
  updateRaceTimerUI();
  let lastBeepAt = totalSec + 1;
  quiz.raceTimer = setInterval(() => {
    if (!quiz.isRace) { clearRaceSessionTimer(); return; }
    quiz.raceTimeLeft--;
    updateRaceTimerUI();
    const left = quiz.raceTimeLeft;
    const urg = 1 - (left / quiz.raceTimeTotal);
    // 滴答频率随紧迫度加快
    const interval = urg > 0.75 ? 1 : urg > 0.5 ? 2 : urg > 0.25 ? 4 : 8;
    if (left > 0 && left % interval === 0) playRaceTick(urg);
    if (left <= 0) {
      clearRaceSessionTimer();
      // 强制结束
      if (typeof soundTimeout === "function") soundTimeout();
      if (typeof finishQuiz === "function") finishQuiz();
    }
  }, 1000);
}

async function startRaceMode() {
  const gate = ensureBankNotEmpty(10);
  if (!gate.ok) await showRestoreBankModal(gate);
  const rem = getRaceRemaining();
  if (rem <= 0) {
    if (typeof petToast === "function") petToast("今日竞速次数已用完", "error");
    else alert("今日竞速次数已用完");
    return;
  }
  const bankEl = document.getElementById("race-bank");
  const only5El = document.getElementById("race-only5");
  const bank = bankEl ? bankEl.value : "all";
  const only5 = only5El ? only5El.checked : true;
  let pool = collectRacePool(bank, only5);
  if (!pool.length) {
    if (typeof petToast === "function") petToast("当前条件下没有可用题目", "error");
    else alert("当前条件下没有可用题目");
    return;
  }
  // 消耗次数（一点进去就扣）
  const rd = getRaceDaily();
  rd.used = (rd.used || 0) + 1;
  saveData(data);
  updateRaceUI();

  pool = pool.sort(() => Math.random() - 0.5);
  // 尽量多出，但上限 40
  const maxN = Math.min(40, pool.length);
  quiz.list = pool.slice(0, maxN);
  try {
    const bank = QUESTION_BANKS[bankId] || {};
    if (bank.shuffleAlways && quiz.list.length > 1) {
      for (let i = quiz.list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = quiz.list[i]; quiz.list[i] = quiz.list[j]; quiz.list[j] = t;
      }
    }
  } catch (e) {}
  quiz.index = 0;
  quiz.correct = 0;
  quiz.wrong = 0;
  quiz.combo = 0;
  quiz.maxCombo = 0;
  quiz.xp = 0;
  quiz.startTime = Date.now();
  quiz.answerTimes = [];
  quiz.qStartTime = Date.now();
  quiz.isRace = true;
  quiz.raceBank = bank;
  currentMode = "race";
  if (bank !== "all") currentBankId = bank;
  document.getElementById("mode-label").textContent = "⚡ 竞速" + (only5 ? "·五星" : "");
  const totalSec = getRaceTotalSeconds(quiz.list.length, bank, only5);
  showView("quiz-view");
  startRaceSessionTimer(totalSec);
  renderQuestion();
}

async function startQuiz() {
  const gate = ensureBankNotEmpty(10);
  if (!gate.ok) {
    await showRestoreBankModal(gate);
  }
  const count = data.settings.qCount;
  quiz.list = buildQuizList(currentMode, count);
  try {
    const bank = typeof getCurrentBank === "function" ? getCurrentBank() : null;
    if (bank && bank.shuffleAlways && quiz.list && quiz.list.length > 1) {
      for (let i = quiz.list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = quiz.list[i]; quiz.list[i] = quiz.list[j]; quiz.list[j] = t;
      }
    }
  } catch (e) {}
  if (!quiz.list.length) {
    alert("题库为空，请先恢复至少 10 道题。");
    return;
  }
  quiz.index = 0;
  quiz.correct = 0;
  quiz.wrong = 0;
  quiz.combo = 0;
  quiz.maxCombo = 0;
  quiz.xp = 0;
  quiz.startTime = Date.now();
  quiz.answerTimes = [];
  quiz.qStartTime = Date.now();
  quiz.sessionOkKps = [];
  quiz.sessionWrongKps = [];
  quiz.answers = [];
  quiz.isRace = false;
  clearRaceSessionTimer();
  document.getElementById("mode-label").textContent = MODE_LABELS[currentMode] || "综合";
  showView("quiz-view");
  renderQuestion();
}

function renderQuestion() {
  clearInterval(quiz.timer);
  quiz.answered = false;
  quiz.qStartTime = Date.now();
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

  // 出现次数统计：第 3 次起可移除
  try {
    const st = markQuestionSeen(q);
    let bar = document.getElementById("q-remove-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "q-remove-bar";
      bar.className = "q-remove-bar";
      const qt = document.getElementById("question-text");
      if (qt && qt.parentNode) qt.parentNode.insertBefore(bar, qt.nextSibling);
    }
    if (st && st.seen >= 3 && !st.removed) {
      bar.style.display = "flex";
      bar.innerHTML = `<span>本题已出现 ${st.seen} 次</span>
        <button type="button" class="btn-secondary btn-sm" id="btn-remove-q">从题库移除</button>`;
      const btn = document.getElementById("btn-remove-q");
      if (btn) btn.onclick = () => {
        if (!confirm("确定将本题从题库移除？之后不再出现（可在题库不足时恢复）。")) return;
        removeQuestionFromBank(q);
        bar.innerHTML = `<span style="color:#86efac">已移除 · 本局仍可做完</span>`;
        if (typeof petToast === "function") petToast("已从题库移除", "success");
      };
    } else {
      bar.style.display = st && st.seen ? "flex" : "none";
      if (st && st.seen) bar.innerHTML = `<span class="setting-hint">出现次数 ${st.seen}/3（满 3 次可移除）</span>`;
    }
  } catch (e) {}

  if (quiz.isRace) {
    // 竞速使用整场倒计时，不用单题限时
  } else if (data.settings.timePerQ > 0) {
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

function recordAnswerTime() {
  if (!quiz.answerTimes) quiz.answerTimes = [];
  const t0 = quiz.qStartTime || Date.now();
  const ms = Math.max(0, Date.now() - t0);
  quiz.answerTimes.push(ms);
  return ms;
}

/** 结算词条 + 刷分检测 → 倍率 */
function computeSettlement(quiz, acc, durationSec) {
  const tags = [];
  let mult = 1;
  const total = (quiz.list && quiz.list.length) || 0;
  const times = quiz.answerTimes || [];
  const fast = times.filter(t => t < 2000).length;
  const fastRatio = times.length ? fast / times.length : 0;

  // 正面词条
  if (acc >= 100 && total >= 5) {
    tags.push({ name: "完美通关", type: "pos", delta: 0.30 });
    mult += 0.30;
  } else if (acc >= 95) {
    tags.push({ name: "高正确率", type: "pos", delta: 0.18 });
    mult += 0.18;
  } else if (acc >= 90) {
    tags.push({ name: "稳定发挥", type: "pos", delta: 0.10 });
    mult += 0.10;
  }
  if (quiz.maxCombo >= 15) {
    tags.push({ name: "超长连击", type: "pos", delta: 0.25 });
    mult += 0.25;
  } else if (quiz.maxCombo >= 10) {
    tags.push({ name: "高连击", type: "pos", delta: 0.15 });
    mult += 0.15;
  } else if (quiz.maxCombo >= 5) {
    tags.push({ name: "连击起步", type: "pos", delta: 0.08 });
    mult += 0.08;
  }
  if (quiz.isRace) {
    tags.push({ name: "竞速挑战", type: "pos", delta: 0.12 });
    mult += 0.12;
  }
  // 平均用时适中且正确率高
  const avg = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  if (acc >= 85 && avg >= 3000 && avg <= 25000 && total >= 8) {
    tags.push({ name: "沉稳作答", type: "pos", delta: 0.08 });
    mult += 0.08;
  }

  // 刷分检测：短于 2 秒占比高 + 正确率 < 85%
  if (times.length >= 5 && fastRatio >= 0.4 && acc < 85) {
    const pen = fastRatio >= 0.7 ? 0.55 : 0.35;
    tags.push({ name: "疑似刷分", type: "neg", delta: -pen, detail: `${fast}/${times.length} 题 <2s` });
    mult -= pen;
  } else if (times.length >= 5 && fastRatio >= 0.5 && acc < 90) {
    tags.push({ name: "仓促作答", type: "neg", delta: -0.20, detail: `${fast} 题极速` });
    mult -= 0.20;
  }

  // 负面：正确率过低
  if (acc < 50) {
    tags.push({ name: "需要巩固", type: "neg", delta: -0.25 });
    mult -= 0.25;
  } else if (acc < 70) {
    tags.push({ name: "正确率偏低", type: "neg", delta: -0.12 });
    mult -= 0.12;
  }

  // 竞速超时大量未做？用 duration 粗略
  mult = Math.round(Math.max(0.25, Math.min(2.5, mult)) * 100) / 100;
  return { mult, tags, fastCount: fast, fastRatio, avgMs: Math.round(avg) };
}

function handleCorrect(q, nextBtnEl) {
  recordAnswerTime();
  quiz.correct++;
  if (!quiz.sessionOkKps) quiz.sessionOkKps = [];
  if (q && q.knowledgePoint) quiz.sessionOkKps.push(q.knowledgePoint);
  if (!quiz.answers) quiz.answers = [];
  quiz.answers.push({ correct: true, kp: q && q.knowledgePoint });
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
  recordAnswerTime();
  quiz.wrong++;
  if (!quiz.sessionWrongKps) quiz.sessionWrongKps = [];
  if (q && q.knowledgePoint) quiz.sessionWrongKps.push(q.knowledgePoint);
  if (!quiz.answers) quiz.answers = [];
  quiz.answers.push({ correct: false, kp: q && q.knowledgePoint });
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
  recordAnswerTime();
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
    addToWrongBook(q, "(超时未答)", true);
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
    addToWrongBook(q, "(超时未答)", true);
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


/* ========== 等级 / Byte 经济 ========== */
function getPlayerLevelInfo(xp) {
  xp = xp != null ? xp : ((data && data.totalXp) || 0);
  // 首局优质高倍率约 180–280 XP → 可从 Lv1 升到 Lv2
  // 从第 2 级起放缓，之后逐渐陡升
  // 约：Lv2 需 200；Lv3 累计~700；Lv5~2.5k；Lv10~12k；Lv20~7万+
  let lv = 1, need = 200, left = xp;
  while (left >= need && lv < 99) {
    left -= need;
    lv++;
    if (lv === 2) need = 500;           // 第二级明显变慢
    else if (lv === 3) need = 900;
    else if (lv === 4) need = 1400;
    else if (lv <= 8) need = Math.floor(need * 1.36) + 60;
    else if (lv <= 15) need = Math.floor(need * 1.44) + 100;
    else if (lv <= 25) need = Math.floor(need * 1.52) + 160;
    else need = Math.floor(need * 1.58) + 220;
  }
  return { level: lv, into: left, need, totalXp: xp, progress: need ? left / need : 0 };
}

function ensureDailyByte() {
  if (!data.dailyByte) data.dailyByte = { date: "", fixedGot: 0, bonusGot: 0 };
  if (data.dailyByte.date !== todayStr()) {
    data.dailyByte = { date: todayStr(), fixedGot: 0, bonusGot: 0 };
  }
  return data.dailyByte;
}

/** 今日固定 Byte 额度（随等级提高） */
function getDailyFixedByteCap() {
  const lv = getPlayerLevelInfo().level;
  // 等级提高日固定额度，但不超过合理消费（饼干 30B）
  return Math.min(180, 40 + lv * 6);
}

/** 登录/回首页时发放未领完的固定日薪（立即入账剩余额度的展示用，实际在练习时领） */
function getDailyFixedRemaining() {
  const db = ensureDailyByte();
  return Math.max(0, getDailyFixedByteCap() - (db.fixedGot || 0));
}

/**
 * 练习结算 Byte：
 * 1) 先吃固定日薪额度
 * 2) 额度用尽后，按等级、精灵数/品质、正确率、难度 概率获得 bonus
 */

/** 练习掉落宠物蛋：与正确率、结算倍率、题量相关 */
function rollPracticeEggs(quiz, acc, settleMult) {
  if (typeof addEgg !== "function") return [];
  const total = (quiz.list && quiz.list.length) || 0;
  if (total < 3) return [];
  const score = (acc / 100) * (settleMult || 1) * Math.min(1.4, total / 15);
  const drops = [];
  // 至少有机会掉普通蛋
  // 降低掉落频率，避免为「开蛋」而刷题
  let pN = 0.08 + score * 0.22;
  let pR = 0.01 + score * 0.07;
  let pSR = score > 0.75 ? 0.01 + (score - 0.75) * 0.05 : 0;
  let pSSR = score > 1.05 ? 0.005 + (score - 1.05) * 0.025 : 0;
  if (quiz.isRace) { pR += 0.05; pSR += 0.03; pSSR += 0.015; }
  if (Math.random() < pN) { addEgg("N", 1); drops.push("N"); }
  if (Math.random() < pR) { addEgg("R", 1); drops.push("R"); }
  if (Math.random() < pSR) { addEgg("SR", 1); drops.push("SR"); }
  if (Math.random() < pSSR) { addEgg("SSR", 1); drops.push("SSR"); }
  // 高分给少量 KB
  if (score >= 0.9 && Math.random() < 0.25) {
    data.kb = (data.kb || 0) + 1;
    drops.push("KB+1");
  }
  if (score >= 1.2 && Math.random() < 0.08) {
    data.mb = (data.mb || 0) + 1;
    drops.push("MB+1");
  }
  if (drops.length) saveData(data);
  return drops;
}

function grantPracticeBytes(quiz, rewardMult) {
  ensureDailyByte();
  const db = data.dailyByte;
  const lv = getPlayerLevelInfo().level;
  const total = quiz.list ? quiz.list.length : 0;
  const correct = quiz.correct || 0;
  const acc = total ? correct / total : 0;
  const rm = (rewardMult != null && rewardMult > 0) ? rewardMult : 1;
  const avgDiff = total
    ? quiz.list.reduce((s, q) => s + (q.difficulty || 3), 0) / total
    : 3;

  let gained = 0;
  let fixedPart = 0;
  let bonusPart = 0;

  // 固定部分：按完成题量与正确率
  const fixedRemain = getDailyFixedRemaining();
  if (fixedRemain > 0 && total > 0) {
    const base = Math.round(total * 0.8 + correct * 1.2 + avgDiff);
    fixedPart = Math.min(fixedRemain, Math.max(1, Math.round(Math.max(3, base) * rm)));
    db.fixedGot = (db.fixedGot || 0) + fixedPart;
    gained += fixedPart;
  }

  // 随机 bonus：固定额度用尽后，或额外小概率
  const ps = data.petSystem;
  let petScore = 0;
  if (ps && ps.pets) {
    petScore = ps.pets.length;
    ps.pets.forEach(p => {
      const rar = (p.speciesId && window.PET_DATA && window.PET_DATA.PET_SPECIES)
        ? (window.PET_DATA.PET_SPECIES.find(x => x.id === p.speciesId) || {}).rarity
        : "N";
      petScore += { N: 0.5, R: 1, SR: 2, SSR: 3.5 }[rar] || 0.5;
    });
  }
  const bonusChance = Math.min(0.85,
    0.15 + lv * 0.02 + petScore * 0.01 + acc * 0.25 + (avgDiff - 3) * 0.08
  );
  // 固定额度用完后更容易走 bonus；未用完也有较低概率
  const rollGate = fixedRemain <= 0 ? bonusChance : bonusChance * 0.35;
  if (Math.random() < rollGate && total > 0) {
    bonusPart = Math.round((2 + lv * 0.5 + petScore * 0.3 + correct * 0.4 + avgDiff) * rm);
    bonusPart = Math.min(40, Math.max(0, bonusPart));
    db.bonusGot = (db.bonusGot || 0) + bonusPart;
    gained += bonusPart;
  }

  // 每日随机登录 bonus（每天一次小额）
  if (!db.loginBonus) {
    const loginB = 5 + Math.floor(Math.random() * (6 + lv));
    db.loginBonus = loginB;
    gained += loginB;
    fixedPart += loginB; // 展示并入
  }

  if (gained > 0) {
    data.bytes = (data.bytes || 0) + gained;
  }
  saveData(data);
  return { gained, fixedPart, bonusPart, fixedRemain: getDailyFixedRemaining() };
}

function finishQuiz() {
  try { clearRaceSessionTimer(); } catch(e) {}
  quiz.isRace = false;
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
  try {
    if (typeof unlockCodexProgress === "function") {
      unlockCodexProgress({ bankId: quiz.bankId || (quiz.bank && quiz.bank.id) });
    }
  } catch (e) {}
  data.history.push(record);
  recordDailyProgress(currentBankId, total, quiz.correct);
  try {
    const sigs = (quiz.list || []).map(questionSignature).filter(Boolean);
    pushRecentSigs(sigs);
  } catch (e) {}
  if (data.history.length > 80) data.history = data.history.slice(-80);
  const settle = computeSettlement(quiz, acc, duration);
  quiz.settle = settle;
  const rawXp = quiz.xp;
  quiz.xp = Math.max(0, Math.round(rawXp * settle.mult));
  quiz.rawXp = rawXp;
  data.totalXp = (data.totalXp || 0) + quiz.xp;
  const byteGain = grantPracticeBytes(quiz, settle.mult);
  const eggDrops = rollPracticeEggs(quiz, acc, settle.mult);
  let syncPermitGain = 0;
  if (acc >= 90 && total >= 8) {
    if (!data.questItems) data.questItems = {};
    // 高质量轨迹：每次达标练习 +1，单日最多 3 张，防止囤积破经济
    if (!data.dailySync) data.dailySync = { date: "", n: 0 };
    if (data.dailySync.date !== todayStr()) data.dailySync = { date: todayStr(), n: 0 };
    if (data.dailySync.n < 3) {
      data.questItems.qi_sync_permit = (data.questItems.qi_sync_permit || 0) + 1;
      data.dailySync.n += 1;
      syncPermitGain = 1;
    }
  }
  if (!data.stats) data.stats = { totalSessions: 0, perfectSessions: 0, banksPlayed: {} };
  data.stats.totalSessions = (data.stats.totalSessions || 0) + 1;
  if (acc === 100) data.stats.perfectSessions = (data.stats.perfectSessions || 0) + 1;
  data.stats.banksPlayed = data.stats.banksPlayed || {};
  data.stats.banksPlayed[currentBankId] = true;
  saveData(data);
  updateStreak();
  let petCtx = {};
  try {
    if (typeof buildPetAchieveCtx === "function") petCtx = buildPetAchieveCtx();
    else if (typeof window !== "undefined" && window.buildPetAchieveCtx) petCtx = window.buildPetAchieveCtx();
  } catch (e) {}
  const newly = checkAchievements(Object.assign({
    last: record,
    stats: data.stats,
    totalXp: data.totalXp,
    bytes: data.bytes || 0,
    kb: data.kb || 0,
    mb: data.mb || 0,
    streak: data.streak,
    level: getPlayerLevelInfo().level
  }, petCtx));
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
  const box = document.getElementById("compare-box");
  let compareHtml = "";
  if (data.history.length >= 2) {
    const prev = data.history[data.history.length - 2];
    const diff = acc - prev.accuracy;
    if (diff > 0) compareHtml = `上次：${prev.accuracy}%　本次：${acc}%<br><br>🎉 比上次进步了 ${diff}%！`;
    else if (diff < 0) compareHtml = `上次：${prev.accuracy}%　本次：${acc}%<br><br>💪 没关系，再练一组试试！`;
    else compareHtml = `上次：${prev.accuracy}%　本次：${acc}%<br><br>保持稳定，继续加油！`;
  } else {
    compareHtml = "第一组成交！先看对本局知识点，再决定要不要清错题。";
  }
  try {
    const pet = getPetStage();
    const lv = getPlayerLevelInfo();
    const bg = byteGain || { gained: 0, fixedPart: 0, bonusPart: 0 };
    const se = quiz.settle || { mult: 1, tags: [] };
    const tagHtml = (se.tags || []).map(t => {
      const cls = t.type === "neg" ? "settle-tag neg" : "settle-tag pos";
      const sign = t.delta >= 0 ? `+${Math.round(t.delta*100)}%` : `${Math.round(t.delta*100)}%`;
      return `<span class="${cls}">${t.name} ${sign}</span>`;
    }).join(" ");
    const xpLine = se.mult !== 1 && quiz.rawXp != null
      ? `+${quiz.xp} XP <span style="color:#94a3b8;font-size:0.85em;">(原始 ${quiz.rawXp} ×${se.mult})</span>`
      : `+${quiz.xp} XP`;
    if (syncPermitGain) {
      compareHtml += `<div style="margin-top:8px;color:#a5b4fc;">⏳ 稳定轨迹认证：获得时序校准符 ×1（用于领取挂机/离线收益）</div>`;
    }
    compareHtml += `<div class="settle-box" style="margin-top:12px;line-height:1.6">
      <div class="settle-tags">${tagHtml || '<span class="settle-tag">无特殊词条</span>'}</div>
      <div>结算倍率 <strong>×${se.mult}</strong></div>
      <div>Lv.${lv.level} · ${xpLine} · <span style="color:#86efac">+${bg.gained||0} Byte</span></div>
      <div>${pet.emoji} ${pet.name}</div>
      <div style="font-size:0.85em;color:#94a3b8">今日固定额度剩余 ${getDailyFixedRemaining()} Byte · KB ${data.kb||0} · MB ${data.mb||0}</div>
      ${eggDrops && eggDrops.length ? `<div style="margin-top:6px;color:#94a3b8;font-size:0.9em;">附带掉落：${eggDrops.join("、")}（可之后再处理）</div>` : ""}
      <div style="margin-top:8px;color:#cbd5e1;font-size:0.9em;">奖励是附带的；真正有用的是上方正确率与错题变化。</div>
    </div>`;
  } catch (e) {}
  box.innerHTML = compareHtml;
  try { renderResultKnowledge(); } catch (e) {}

  showView("result-view");
  updateHome();
  try {
    if (acc === 100 && total >= 8 && typeof forceMailById === "function") {
      if (!data.mail) data.mail = { delivered: {}, inbox: [], lastWeekly: {} };
      if (!data.mail.delivered["first_perfect"]) forceMailById("first_perfect");
    }
    if (typeof checkAndDeliverMails === "function") { checkAndDeliverMails(); updateMailBadges(); }
  } catch (e) {}
}

/* ========== 错题本 ========== */
function addToWrongBook(q, userAns, isTimeout) {
  const key = q.dynamic ? `dyn_${q.knowledgePoint}_${Date.now()}` : String(q.id);
  if (!data.wrongBook[key]) {
    data.wrongBook[key] = { consecutiveCorrect: 0, timesWrong: 0 };
  }
  data.wrongBook[key].timesWrong++;
  data.wrongBook[key].consecutiveCorrect = 0;
  data.wrongBook[key].lastWrong = Date.now();
  if (isTimeout || userAns === "(超时未答)") data.wrongBook[key].timeout = true;
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

let wrongFilterKp = null; // null=全部, "__timeout__"=仅超时, 其它=知识点


let wrongPage = 1;
let historyPage = 1;
let achievePage = 1;
const SUBPAGE_SIZE = 6;

function renderPager(elId, page, pages, onChange) {
  const el = document.getElementById(elId);
  if (!el) {
    console.warn("pager missing:", elId);
    return;
  }
  if (pages <= 1) {
    el.innerHTML = pages === 1 ? `<span class="pager-info">共 1 页</span>` : "";
    return;
  }
  el.innerHTML = `<button type="button" class="btn-secondary btn-sm pager-btn" data-p="prev" ${page<=1?"disabled":""}>上一页</button>
    <span class="pager-info">第 ${page} / ${pages} 页</span>
    <button type="button" class="btn-secondary btn-sm pager-btn" data-p="next" ${page>=pages?"disabled":""}>下一页</button>`;
  el.querySelectorAll("button").forEach(b => {
    b.onclick = () => {
      if (b.dataset.p === "prev") onChange(Math.max(1, page - 1));
      else onChange(Math.min(pages, page + 1));
    };
  });
}

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

  // 超时数量
  let timeoutCnt = 0;
  Object.keys(data.wrongBook).forEach(id => {
    const w = data.wrongBook[id];
    if ((w.consecutiveCorrect || 0) >= 2) return;
    if (w.timeout || (w.snapshot && w.snapshot.userAns === "(超时未答)")) timeoutCnt++;
  });

  // 渲染筛选标签
  filterEl.innerHTML = "";
  const addTag = (label, key, active) => {
    const tag = document.createElement("span");
    tag.className = `kp-tag ${active ? "active" : ""}`;
    tag.textContent = label;
    tag.onclick = () => { wrongFilterKp = key; wrongPage = 1; renderWrongList(); };
    filterEl.appendChild(tag);
  };
  addTag("全部", null, wrongFilterKp == null);
  addTag(`⏰ 超时 (${timeoutCnt})`, "__timeout__", wrongFilterKp === "__timeout__");
  Object.keys(kpMap).sort().forEach(kp => {
    addTag(`${kp} (${kpMap[kp]})`, kp, wrongFilterKp === kp);
  });

  const ids = Object.keys(data.wrongBook).filter(id => {
    const w = data.wrongBook[id];
    if ((w.consecutiveCorrect || 0) >= 2) return false;
    const isTo = !!(w.timeout || (w.snapshot && w.snapshot.userAns === "(超时未答)"));
    if (wrongFilterKp === "__timeout__") return isTo;
    if (wrongFilterKp && w.snapshot?.knowledgePoint !== wrongFilterKp) return false;
    return true;
  });

  document.getElementById("wrong-list-count").textContent = `(${ids.length})`;

  if (!ids.length) {
    list.innerHTML = "<p style='color:#94a3b8;text-align:center;padding:40px;'>太棒了，暂无待复习错题！🎉</p>";
    renderPager("wrong-pager", 1, 1, () => {});
    return;
  }

  const pages = Math.max(1, Math.ceil(ids.length / SUBPAGE_SIZE));
  if (wrongPage > pages) wrongPage = pages;
  const pageIds = ids.slice((wrongPage - 1) * SUBPAGE_SIZE, wrongPage * SUBPAGE_SIZE);
  renderPager("wrong-pager", wrongPage, pages, (p) => { wrongPage = p; renderWrongList(); });

  list.innerHTML = "";
  pageIds.forEach(id => {
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
  const all = data.history.slice().reverse();
  if (!all.length) {
    list.innerHTML = "<p style='color:#94a3b8;text-align:center;'>暂无训练记录</p>";
    renderPager("history-pager", 1, 1, () => {});
  } else {
    const pages = Math.max(1, Math.ceil(all.length / SUBPAGE_SIZE));
    if (historyPage > pages) historyPage = pages;
    const hist = all.slice((historyPage - 1) * SUBPAGE_SIZE, historyPage * SUBPAGE_SIZE);
    renderPager("history-pager", historyPage, pages, (p) => { historyPage = p; renderHistory(); });
    list.innerHTML = hist.map(h => {
      const d = new Date(h.date);
      const dateStr = `${d.getMonth() + 1}月${d.getDate()}日`;
      const modeStr = MODE_LABELS[h.mode] || "综合";
      const timeStr = h.duration != null ? formatDuration(h.duration) : "--";
      const bank = h.bankId || "";
      return `<div class="history-item">
        <span>${dateStr}</span>
        <span>${bank}</span>
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

function initSettingsTabs() {
  const bar = document.getElementById("settings-tabs");
  if (!bar || bar.dataset.bound) return;
  bar.dataset.bound = "1";
  bar.querySelectorAll(".tab-btn").forEach(btn => {
    btn.onclick = () => {
      bar.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      document.querySelectorAll("#settings-view .tab-panel").forEach(p => {
        p.classList.toggle("active", p.id === "settings-tab-" + tab);
      });
    };
  });
}


function renderSettingsProgress() {
  const el = document.getElementById("settings-progress");
  if (!el) return;
  const lv = getPlayerLevelInfo();
  const pct = Math.min(100, Math.round((lv.into / Math.max(1, lv.need)) * 100));
  const raceRem = typeof getRaceRemaining === "function" ? getRaceRemaining() : 3;
  const fixedRem = typeof getDailyFixedRemaining === "function" ? getDailyFixedRemaining() : 0;
  el.innerHTML = `<div><strong>${getUserName()}</strong> · Lv.${lv.level}</div>
    <div class="setting-hint">升级进度 ${lv.into} / ${lv.need} XP</div>
    <div class="bar"><i style="width:${pct}%"></i></div>
    <div>等级 <strong>Lv.${lv.level}</strong> · 进度 ${lv.into}/${lv.need} XP（${Math.round((lv.into/lv.need)*100)}%）</div>
    <div class="daily-checkin-bar" style="margin:6px 0 10px;"><i style="width:${Math.round((lv.into/Math.max(1,lv.need))*100)}%"></i></div>
    <div>累计 XP <strong>${lv.totalXp}</strong> · <span style="color:#86efac">B ${data.bytes||0}</span> · <span style="color:#93c5fd">KB ${data.kb||0}</span> · <span style="color:#fbbf24">MB ${data.mb||0}</span></div>
    <div class="setting-hint">日固定 Byte 额度 ${getDailyFixedByteCap()} · 剩余 ${getDailyFixedRemaining()}</div>
    <div class="setting-hint">今日 Byte 固定额度剩余 ${fixedRem} · 竞速剩余 ${raceRem}/3</div>
    <div class="setting-hint">训练次数 ${(data.stats&&data.stats.totalSessions)||0} · 错题待复习 ${Object.keys(data.wrongBook||{}).filter(id=>(data.wrongBook[id].consecutiveCorrect||0)<2).length}</div>`;
}
function loadSettingsToUI() {
  try { renderSettingsProgress(); } catch(e) {}
  initSettingsTabs();
  const gs = data.settings || defaultGlobalSettings();
  const nameInput = document.getElementById("input-user-name");
  if (nameInput) nameInput.value = data.userName || getConfig().userName || "";
  document.querySelectorAll('input[name="timePerQ"]').forEach(r => r.checked = +r.value === gs.timePerQ);
  document.querySelectorAll('input[name="qCount"]').forEach(r => r.checked = +r.value === gs.qCount);
  document.querySelectorAll('input[name="autoNext"]').forEach(r => r.checked = +r.value === gs.autoNext);
  document.querySelectorAll('input[name="sound"]').forEach(r => r.checked = (r.value === "1") === !!gs.sound);
  document.querySelectorAll('input[name="soundQuiz"]').forEach(r => r.checked = (r.value === "1") === (gs.soundQuiz !== false));
  document.querySelectorAll('input[name="soundUi"]').forEach(r => r.checked = (r.value === "1") === (gs.soundUi !== false));
  const volEl = document.getElementById("setting-sound-volume");
  const volLab = document.getElementById("sound-vol-label");
  if (volEl) {
    const pct = Math.round((gs.soundVolume != null ? gs.soundVolume : 0.7) * 100);
    volEl.value = String(pct);
    if (volLab) volLab.textContent = pct + "%";
    volEl.oninput = () => { if (volLab) volLab.textContent = volEl.value + "%"; };
  }
  document.querySelectorAll('input[name="anim"]').forEach(r => r.checked = (r.value === "1") === !!gs.anim);
  document.querySelectorAll('input[name="hatchAnim"]').forEach(r => r.checked = (r.value === "1") === (gs.hatchAnim !== false));
  const blessOn = gs.petBless !== false;
  document.querySelectorAll('input[name="petBless"]').forEach(r => r.checked = (r.value === "1") === blessOn);
  const focusOn = !!gs.focusMode;
  document.querySelectorAll('input[name="focusMode"]').forEach(r => r.checked = (r.value === "1") === focusOn);

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
  const sq = document.querySelector('input[name="soundQuiz"]:checked');
  const su = document.querySelector('input[name="soundUi"]:checked');
  if (sq) data.settings.soundQuiz = sq.value === "1";
  if (su) data.settings.soundUi = su.value === "1";
  const volEl2 = document.getElementById("setting-sound-volume");
  if (volEl2) data.settings.soundVolume = Math.max(0, Math.min(1, (+volEl2.value || 0) / 100));
  data.settings.anim = document.querySelector('input[name="anim"]:checked').value === "1";
  const ha = document.querySelector('input[name="hatchAnim"]:checked');
  if (ha) data.settings.hatchAnim = ha.value === "1";
  const blessEl = document.querySelector('input[name="petBless"]:checked');
  data.settings.petBless = blessEl ? blessEl.value === "1" : true;
  const focusEl = document.querySelector('input[name="focusMode"]:checked');
  data.settings.focusMode = focusEl ? focusEl.value === "1" : false;
  const strictEl = document.querySelector('input[name="strictMode"]:checked');
  data.settings.strictMode = strictEl ? strictEl.value === "1" : true;
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
    const trainIds = ids.filter(id => {
      const b = QUESTION_BANKS[id];
      if (!b) return false;
      if (b.specialMode || b.requiresUnlock || b.excludeFromDaily || id === "eval-mode") return false;
      return true;
    });
    bankSelect.innerHTML = trainIds.map(id => {
      const b = QUESTION_BANKS[id];
      const name = (b && b.name) || id;
      return `<option value="${id}">${name}</option>`;
    }).join("");
    bankSelect.value = trainIds.includes(cur) ? cur : (trainIds[0] || "printf-scanf");
  }
  bankSelect.onchange = () => setCurrentBank(bankSelect.value);
  setCurrentBank(bankSelect.value);
} else {
  refreshModeButtons();
}


(function(){
  const bs = document.getElementById("btn-suggest-start");
  if (bs) bs.onclick = () => {
    const sug = getTodaySuggestion();
    if (!sug) { uiToast("暂无建议", "info"); return; }
    setCurrentBank(sug.bankId);
    const sel = document.getElementById("bank-select");
    if (sel) sel.value = sug.bankId;
    currentMode = "mixed";
    try { refreshModeButtons(); } catch (e) {}
    startQuiz();
  };
  const bw = document.getElementById("btn-suggest-wrong");
  if (bw) bw.onclick = () => {
    const btn = document.getElementById("btn-wrong");
    if (btn) btn.click();
  };
})();
document.getElementById("btn-start").onclick = () => startQuiz();

const btnRace = document.getElementById("btn-race-start");
if (btnRace) btnRace.onclick = () => startRaceMode();
const raceBank = document.getElementById("race-bank");
const raceOnly5 = document.getElementById("race-only5");
if (raceBank) raceBank.onchange = () => refreshRaceMaxInfo();
if (raceOnly5) raceOnly5.onchange = () => refreshRaceMaxInfo();

const btnResetAll = document.getElementById("debug-reset-all");
if (btnResetAll) {
  btnResetAll.onclick = () => {
    if (!confirm("确定清空当前浏览器中的全部训练数据？此操作不可恢复！")) return;
    if (!confirm("再次确认：成就、错题、宠物、Byte、等级将全部清零。")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      STORAGE_LEGACY_KEYS.forEach(k => localStorage.removeItem(k));
    } catch (e) {}
    location.reload();
  };
}

const homePet = document.getElementById("home-pet");
if (homePet) homePet.onclick = () => { renderPetPage(); showView("pet-view"); };
document.getElementById("btn-pet").onclick = () => { renderPetPage(); showView("pet-view"); };
const btnChangelog = document.getElementById("btn-changelog");
if (btnChangelog) btnChangelog.onclick = () => {
  try {
    if (typeof openChangelogView === "function") openChangelogView();
    else if (typeof renderChangelogPage === "function") { showView("changelog-view"); renderChangelogPage(); }
    else uiToast("更新日志未加载，请强制刷新", "error");
  } catch (e) { try { uiToast("打开更新历史失败", "error"); } catch (x) {} }
};
const btnChangelogBack = document.getElementById("btn-changelog-back");
if (btnChangelogBack) btnChangelogBack.onclick = () => showView("home-view");
const btnRedeem = document.getElementById("btn-redeem-code");
if (btnRedeem) btnRedeem.onclick = () => {
  const input = document.getElementById("setting-activate-code");
  const code = input ? input.value : "";
  try {
    const r = typeof redeemActivationCode === "function" ? redeemActivationCode(code) : { ok:false, msg:"模块未加载" };
    uiToast(r.msg || (r.ok ? "成功" : "失败"), r.ok ? "success" : "error");
    if (r.ok && input) input.value = "";
    if (typeof refreshBankSelect === "function") refreshBankSelect();
    updateHome();
  } catch (e) { uiToast("兑换失败", "error"); }
};
const btnCodex = document.getElementById("btn-codex");
if (btnCodex) btnCodex.onclick = () => {
  try {
    if (typeof openCodexView === "function") openCodexView();
    else if (typeof uiToast === "function") uiToast("词条模块未加载，请强制刷新", "error");
  } catch (e) { if (typeof uiToast === "function") uiToast("打开词条失败", "error"); }
};
const btnCodexBack = document.getElementById("btn-codex-back");
if (btnCodexBack) btnCodexBack.onclick = () => {
  const leave = () => { showView("home-view"); updateHome(); };
  if (typeof requestCodexLeave === "function") requestCodexLeave(leave);
  else leave();
};
const btnMail = document.getElementById("btn-mail");
if (btnMail) btnMail.onclick = () => {
  try {
    soundUiClick();
    if (typeof openMailView === "function") {
      openMailView();
      return;
    }
    if (typeof showView === "function" && document.getElementById("mail-view")) {
      showView("mail-view");
      if (typeof renderMailPage === "function") renderMailPage();
      return;
    }
    uiToast("邮箱模块未加载，请刷新页面（Ctrl+F5）", "error");
  } catch (e) {
    uiToast("打开邮箱失败：" + (e && e.message || e), "error");
  }
};
const btnMailBack = document.getElementById("btn-mail-back");
if (btnMailBack) btnMailBack.onclick = () => { soundUiClick(); showView("home-view"); };
const btnMailAll = document.getElementById("btn-mail-allread");
if (btnMailAll) btnMailAll.onclick = () => {
  try {
    const mail = data.mail;
    if (!mail || !mail.inbox || !mail.inbox.length) {
      uiToast("收件箱是空的", "error");
      return;
    }
    mail.inbox.forEach(m => { m.read = true; });
    saveData(data);
    if (typeof renderMailPage === "function") renderMailPage();
    if (typeof updateMailBadges === "function") updateMailBadges();
    uiToast("已全部标为已读", "success");
    soundUiOk();
  } catch (e) {
    uiToast("操作失败", "error");
  }
};
document.getElementById("btn-achieve").onclick = () => {
  try {
    if (typeof renderAchievementsPage === "function") renderAchievementsPage();
    else if (typeof renderAchievePage === "function") renderAchievePage();
  } catch (e) {}
  showView("achieve-view");
};
document.getElementById("btn-achieve-back").onclick = () => { showView("home-view"); updateHome(); };
document.getElementById("btn-pet-back").onclick = () => { showView("home-view"); updateHome(); maybeShowPetBless(); };

document.getElementById("btn-settings").onclick = () => { loadSettingsToUI(); showView("settings-view"); };
document.getElementById("btn-save-settings").onclick = () => {
  saveSettingsFromUI();
  try { applyFocusModeUI(); } catch (e) {}
  showView("home-view");
  updateHome();
};
document.getElementById("btn-wrong").onclick = () => { wrongFilterKp = null; renderWrongList(); showView("wrong-view"); };
document.getElementById("btn-wrong-back").onclick = () => { showView("home-view"); updateHome(); maybeShowPetBless(); };
document.getElementById("btn-history").onclick = () => { renderHistory(); showView("history-view"); };
document.getElementById("btn-history-back").onclick = () => showView("home-view");
document.getElementById("btn-retry").onclick = () => startQuiz();
document.getElementById("btn-view-wrong").onclick = () => { wrongFilterKp = null; renderWrongList(); showView("wrong-view"); };
document.getElementById("btn-home").onclick = () => { showView("home-view"); updateHome(); maybeShowPetBless(); };

/* 初始化 */

/* ========== 版本号 + Esc 隐藏菜单 ========== */
function getAppVersion() {
  const cfg = getConfig();
  return (cfg && cfg.version) ? String(cfg.version) : "1.4.0";
}

function refreshVersionUI() {
  const v = "v" + getAppVersion();
  const fv = document.getElementById("footer-version");
  if (fv) fv.textContent = v;
  const dv = document.getElementById("debug-ver");
  if (dv) dv.textContent = v;
}

function isDebugAdmin() {
  try {
    const name = (typeof getDisplayName === "function" ? getDisplayName() : (data && data.userName)) || "";
    return String(name).trim().toLowerCase() === "admin";
  } catch (e) { return false; }
}
function toggleDebugPanel(force) {
  const panel = document.getElementById("debug-panel");
  if (!panel) return;
  const wantOpen = force != null ? force : panel.style.display === "none";
  if (wantOpen && !isDebugAdmin()) {
    // 静默拒绝：不提示、不播音效
    return;
  }
  const open = wantOpen;
  panel.style.display = open ? "flex" : "none";
  panel.setAttribute("aria-hidden", open ? "false" : "true");
  if (open) {
    renderDebugBankList();
    try {
      registerBuiltinDebugTests();
      renderDebugTestPanel();
    } catch (e) { console.warn(e); }
  }
}

function getAllBanksForDebug() {
  const banks = {};
  if (typeof QUESTION_BANKS !== "undefined") {
    Object.keys(QUESTION_BANKS).forEach(id => { banks[id] = QUESTION_BANKS[id]; });
  }
  if (window.GESP_BANKS) {
    Object.keys(window.GESP_BANKS).forEach(id => {
      banks[id] = Object.assign({}, banks[id] || {}, window.GESP_BANKS[id]);
    });
  }
  // 挂上 printf 静态题
  if (banks["printf-scanf"] && typeof STATIC_QUESTIONS !== "undefined") {
    banks["printf-scanf"].staticQuestions = STATIC_QUESTIONS;
  }
  return banks;
}

function renderDebugBankList() {
  const tabs = document.getElementById("debug-bank-tabs");
  const meta = document.getElementById("debug-bank-meta");
  const prev = document.getElementById("debug-preview");
  if (!tabs) return;
  const banks = getAllBanksForDebug();
  const ids = Object.keys(banks);
  if (!ids.length) {
    tabs.innerHTML = "";
    if (prev) prev.textContent = "未注册题库";
    return;
  }
  if (!window._debugBankId || !banks[window._debugBankId]) {
    window._debugBankId = ids[0];
  }
  tabs.innerHTML = ids.map(id => {
    const b = banks[id];
    const n = (b.staticQuestions && b.staticQuestions.length) || 0;
    const active = id === window._debugBankId ? "active" : "";
    return `<button type="button" class="tab-btn ${active}" data-bank="${id}" role="tab">${b.name || id} <small style="opacity:.75">(${n})</small></button>`;
  }).join("");
  tabs.querySelectorAll(".tab-btn").forEach(btn => {
    btn.onclick = () => {
      window._debugBankId = btn.dataset.bank;
      renderDebugBankList();
    };
  });
  renderDebugPreview(window._debugBankId);
}

function renderDebugPreview(bankId) {
  const banks = getAllBanksForDebug();
  const b = banks[bankId];
  const meta = document.getElementById("debug-bank-meta");
  const prev = document.getElementById("debug-preview");
  if (!b || !prev) return;
  const list = b.staticQuestions || [];
  const modes = (b.modes || []).map(m => m.label || m.id).join(" · ");
  if (meta) {
    meta.textContent = `id: ${bankId} · 静态 ${list.length} 题 · 模式: ${modes || "—"} · ${b.description || ""}`;
  }
  if (!list.length) {
    prev.textContent = "该题库无静态题列表（可能为动态出题）。";
    return;
  }
  prev.innerHTML = list.map((q, i) => {
    const star = "★".repeat(Math.min(5, q.difficulty || 3));
    const head = String(q.question || "").replace(/\n/g, " ↵ ").slice(0, 120);
    return `<div class="debug-q-item"><span class="qid">#${q.id != null ? q.id : i}</span>[${q.type || "?"}] ${star} ${q.knowledgePoint || ""}<br>${escapeHtml(head)}</div>`;
  }).join("");
}

function initDebugMenu() {
  refreshVersionUI();
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    // 输入框内不抢 Esc（让用户能取消输入）
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
      // 仍允许关闭已打开的调试面板
      const panel = document.getElementById("debug-panel");
      if (panel && panel.style.display !== "none") {
        e.preventDefault();
        toggleDebugPanel(false);
      }
      return;
    }
    e.preventDefault();
    toggleDebugPanel();
  });
  const closeBtn = document.getElementById("debug-close");
  const backdrop = document.getElementById("debug-backdrop");
  if (closeBtn) closeBtn.onclick = () => toggleDebugPanel(false);
  if (backdrop) backdrop.onclick = () => toggleDebugPanel(false);
  const clearBtn = document.getElementById("debug-clear-recent");
  if (clearBtn) {
    clearBtn.onclick = () => {
      if (data) {
        data.recentSigs = [];
        saveData(data);
        if (typeof showToast === "function") showToast("已清空近期去重记录");
        else alert("已清空近期去重记录");
      }
    };
  }
  const exportBtn = document.getElementById("debug-export-stats");
  const validateBtn = document.getElementById("debug-validate-bank");
  if (validateBtn) validateBtn.onclick = () => runBankSelfCheck();
  if (exportBtn) {
    exportBtn.onclick = () => {
      try {
        const payload = {
          version: getAppVersion(),
          exportedAt: new Date().toISOString(),
          userName: data && data.userName,
          totalXp: data && data.totalXp,
          stats: data && data.stats,
          historyLen: data && data.history && data.history.length,
          achievements: data && data.achievements
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "gesp-stats.json";
        a.click();
        URL.revokeObjectURL(a.href);
      } catch (err) {
        alert("导出失败");
      }
    };
  }
}


initDebugMenu();
initDailyCheckinPanel();
applyEntryNameFromUrl();
try { refreshUserDisplay(); } catch (e) {}
updateHome();
maybeShowPetBless();

// 供 system 模块调用的桥接
if (typeof window !== "undefined") {
  window.getUserName = getUserName;
window.getPlayerLevelInfo = getPlayerLevelInfo;
window.getBytes = () => (data && data.bytes) || 0;
  window.getConfig = getConfig;
  window.updateHome = updateHome;
  window.refreshUserDisplay = refreshUserDisplay;
window.getDisplayName = getDisplayName;
window.registerDebugTest = registerDebugTest;
const btnTestSound = document.getElementById("btn-test-sound");
if (btnTestSound) btnTestSound.onclick = () => {
  unlockAudio();
  if (!data.settings.sound) { uiToast("请先开启音效总开关", "error"); return; }
  soundCorrect();
  setTimeout(() => soundUiOk(), 300);
  uiToast("已播放试听", "success");
};


try { if (typeof initMailSystem === "function") initMailSystem(); } catch (e) {}
try { if (typeof unlockCodexProgress === "function") unlockCodexProgress(); } catch (e) {}
try { if (typeof refreshBankSelect === "function") refreshBankSelect(); } catch (e) {}
try { initHomeModeTabs(); } catch (e) {}
try { bindTopBackButtons(); } catch (e) {}
try {
  const btnEvalStart = document.getElementById("btn-eval-start");
  if (btnEvalStart) btnEvalStart.onclick = () => startEvalMode();
} catch (e) {}
try { if (typeof normalizeWallet === "function") normalizeWallet(); } catch (e) {}

}
