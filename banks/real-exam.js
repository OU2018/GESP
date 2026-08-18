/**
 * banks/real-exam.js
 * GESP C++ 一级 · 近年真题风格客观题（选择/判断）
 * 依据公开网络解析与考点整理（2025–2026 多场认证常见题型），
 * 用于课堂刷题；非官方原卷扫描件完整复刻。
 */
(function (global) {
  "use strict";

  const REAL_EXAM_QUESTIONS = [
    // —— 2025.12 风格：运算符优先级 ——
    {
      id: "re202512_01", type: "choice", difficulty: 4, knowledgePoint: "运算符优先级",
      question: "【真题风格·2025.12】C++ 表达式 2 + 3 * 4 % 5 的值为？",
      options: ["4", "6", "2", "14"],
      answer: 0,
      explanation: "先算 3*4=12，再 12%5=2，最后 2+2=4。* 与 % 同级、高于 +，自左向右。"
    },
    {
      id: "re202512_02", type: "judge", difficulty: 4, knowledgePoint: "循环次数",
      question: "【真题风格·2025.12】代码 for(int i=0;i<100;i++) cnt+=1; 执行后 cnt 为 99，因为 i<100 取不到 100。（ ）",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "i 取 0..99 共 100 次，cnt=100。差一错误是常见陷阱。"
    },
    {
      id: "re202512_03", type: "choice", difficulty: 4, knowledgePoint: "printf %%",
      question: "【真题风格·2025.12】int N=3,M=7; printf(\"%%(N+M)=%d\", N+M); 输出是？",
      options: ["%(N+M)=10", "%%(N+M)=10", "(N+M)=10", "编译错误"],
      answer: 0,
      explanation: "格式串中 %% 输出一个 % 字符；%d 输出 N+M 的值 10。"
    },
    {
      id: "re202512_04", type: "choice", difficulty: 3, knowledgePoint: "关键字",
      question: "【真题风格·2025.12】下列哪个是 C++ 关键字？",
      options: ["for", "cin", "endl", "abs"],
      answer: 0,
      explanation: "for 是关键字；cin/endl 是标准库对象/操纵符；abs 是函数名。"
    },
    {
      id: "re202512_05", type: "choice", difficulty: 4, knowledgePoint: "赋值结合性",
      question: "【真题风格·2025.12】int a=1,b=2; b=a=4; 之后 a、b 的值是？",
      options: ["a=4,b=4", "a=1,b=4", "a=4,b=2", "编译错误"],
      answer: 0,
      explanation: "赋值运算符右结合：先 a=4，表达式值为 4，再 b=4。"
    },
    // —— 2025.09 ——
    {
      id: "re202509_01", type: "choice", difficulty: 3, knowledgePoint: "人工智能常识",
      question: "【真题风格·2025.09】人们常说的「大模型」最贴切是指？",
      options: ["大电脑模型", "大规模智能单位", "智能的计量单位", "大语言模型等大规模深度学习模型"],
      answer: 3,
      explanation: "大模型通常指参数规模很大的深度学习模型，尤其是大语言模型。"
    },
    {
      id: "re202509_02", type: "choice", difficulty: 4, knowledgePoint: "break",
      question: "【真题风格·2025.09】int i; for(i=1;i<5;i++){ if(i%3==0) break; printf(\"%d#\",i);} 输出是？",
      options: ["1#2#", "1#2#END", "1#2", "1#2#3#4#"],
      answer: 0,
      explanation: "i=1,2 输出；i=3 时 break，不会输出 3#，也不会继续到 4。"
    },
    {
      id: "re202509_03", type: "choice", difficulty: 4, knowledgePoint: "scanf 空白",
      question: "【真题风格·2025.09】int N,M; scanf(\"%d\",&N); scanf(\"%d\",&M); printf(\"{%d}\",N+M); 若输入 10、制表符、20，输出？",
      options: ["{30}", "1020", "{N+M}", "继续等待输入"],
      answer: 0,
      explanation: "scanf %d 会跳过空白（含制表符），读入 10 与 20，和为 30。"
    },
    {
      id: "re202509_04", type: "judge", difficulty: 3, knowledgePoint: "变量命名",
      question: "【真题风格·2025.09】变量名可以用汉语拼音，例如 string XingMing; 是合法的。（ ）",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "标识符可由字母、数字、下划线组成，拼音字母合法；不能以数字开头。"
    },
    // —— 2025.06 ——
    {
      id: "re202506_01", type: "choice", difficulty: 3, knowledgePoint: "输入设备",
      question: "【真题风格·2025.06】机器人上的传感器向计算机传递数据，其作用更接近？",
      options: ["输出设备", "存储器", "输入设备", "仅电源模块"],
      answer: 2,
      explanation: "传感器采集外界信息送入系统，功能类似输入设备。"
    },
    {
      id: "re202506_02", type: "choice", difficulty: 4, knowledgePoint: "运算符",
      question: "【真题风格·2025.06】表达式 14 - 3 * 3 % 2 的值是？",
      options: ["13", "11", "1", "22"],
      answer: 0,
      explanation: "3*3=9，9%2=1，14-1=13。"
    },
    {
      id: "re202506_03", type: "choice", difficulty: 4, knowledgePoint: "变量大小写",
      question: "【真题风格·2025.06】定义了 int first=10; 却写 printf(\"%d\", First); 结果通常是？",
      options: ["输出 10", "输出 0", "编译错误（First 未定义）", "输出 first"],
      answer: 2,
      explanation: "C++ 区分大小写，First 与 first 不是同一标识符。"
    },
    {
      id: "re202506_04", type: "choice", difficulty: 4, knowledgePoint: "交换变量",
      question: "【真题风格·2025.06】int x=10,y=20; x=x+y; y=x-y; x=x-y; 之后 x、y 为？",
      options: ["x=20,y=10", "x=10,y=20", "x=30,y=10", "x=20,y=20"],
      answer: 0,
      explanation: "经典无临时变量交换：最终 x 与 y 对调。"
    },
    {
      id: "re202506_05", type: "choice", difficulty: 3, knowledgePoint: "格式化输出",
      question: "【真题风格·2025.06】printf(\"%02d\", 3); 的输出是？",
      options: ["3", "03", " 3", "003"],
      answer: 1,
      explanation: "%02d 表示宽度至少 2，不足左侧补 0。"
    },
    // —— 2025.03 ——
    {
      id: "re202503_01", type: "choice", difficulty: 3, knowledgePoint: "人工智能常识",
      question: "【真题风格·2025.03】关于 DeepSeek 与电影《哪吒 2》的描述，更合理的是？",
      options: [
        "《哪吒2》是新型操作系统",
        "DeepSeek 是深海钻探软件",
        "《哪吒2》可以直接生成新软件",
        "大模型类 AI 可根据电影场景生成剧情脚本"
      ],
      answer: 3,
      explanation: "大模型具备文本生成能力；其余选项不符合基本事实。"
    },
    {
      id: "re202503_02", type: "choice", difficulty: 4, knowledgePoint: "printf 宽度",
      question: "【真题风格·2025.03】printf(\"%02d%2d\", 3, 22); 输出更接近？",
      options: ["0322", " 322", "03022", "3 22"],
      answer: 0,
      explanation: "%02d→03；%2d 对 22 宽度已够→22；合起来 0322。"
    },
    {
      id: "re202503_03", type: "judge", difficulty: 4, knowledgePoint: "scanf 浮点读入整型",
      question: "【真题风格·2025.03】int N; scanf(\"%d\",&N); 输入 3.6 后执行 N/3*5，结果一定是 6。（ ）",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "%d 只读整数部分 3；3/3*5=5（整数除法）。"
    },
    {
      id: "re202503_04", type: "choice", difficulty: 3, knowledgePoint: "关键字",
      question: "【真题风格·2025.03】下列哪个是 C++ 关键字？",
      options: ["abs", "cin", "do", "endl"],
      answer: 2,
      explanation: "do 用于 do-while；cin/endl 属标准库；abs 是函数。"
    },
    // —— 2024.12 / 循环陷阱 ——
    {
      id: "re202412_01", type: "choice", difficulty: 5, knowledgePoint: "continue与break",
      question: "【真题风格·2024.12】int tnt=0,i; for(i=5;i<100;i+=5){ if(i%2==0) continue; tnt+=1; if(i>=50) break; } 最终 tnt？",
      options: ["10", "9", "6", "5"],
      answer: 2,
      explanation: "偶数 continue 会跳过 break；i=50 被跳过，直到 i=55 计数后 break，tnt=6。"
    },
    {
      id: "re202412_02", type: "choice", difficulty: 4, knowledgePoint: "整数除法",
      question: "【真题风格·2024.12】N=2 时，cout<<(N/3+N%3) 输出？",
      options: ["2", "1", "0", "2.666"],
      answer: 0,
      explanation: "2/3=0，2%3=2，0+2=2。"
    },
    {
      id: "re202412_03", type: "choice", difficulty: 4, knowledgePoint: "温度转换概念",
      question: "【真题风格·编程题考点】摄氏度 C 转华氏 F 常用公式接近？",
      options: ["F=C*1.8+32", "F=C+32", "F=C*32", "F=(C-32)/1.8"],
      answer: 0,
      explanation: "常见公式 F = C × 1.8 + 32（注意浮点）。"
    },
    // —— 综合高频 ——
    {
      id: "re_gen_01", type: "choice", difficulty: 4, knowledgePoint: "括号优先级",
      question: "表达式 10 - 3 * (2 + 1) % 10 的值是？",
      options: ["1", "7", "9", "0"],
      answer: 0,
      explanation: "(2+1)=3，3*3=9，9%10=9，10-9=1。"
    },
    {
      id: "re_gen_02", type: "judge", difficulty: 3, knowledgePoint: "标识符",
      question: "变量名可以以数字开头，例如 2count 是合法标识符。（ ）",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "标识符不能以数字开头。"
    },
    {
      id: "re_gen_03", type: "choice", difficulty: 4, knowledgePoint: "取模",
      question: "判断整数 n 是否为偶数，常用条件是？",
      options: ["n%2==0", "n/2==0", "n%2==1", "n=2"],
      answer: 0,
      explanation: "能被 2 整除则偶数：n%2==0。"
    },
    {
      id: "re_gen_04", type: "choice", difficulty: 4, knowledgePoint: "质数逻辑",
      question: "统计 1..N 中能整除 N 的个数，判断质数时应在 if 中填？",
      options: ["N%i==0", "N%i", "N/i==0", "N/i"],
      answer: 0,
      explanation: "因数判定用 N%i==0；质数恰好有 2 个正因数。"
    },
    {
      id: "re_gen_05", type: "choice", difficulty: 3, knowledgePoint: "数据类型",
      question: "存储带小数的运算结果，更合适的类型是？",
      options: ["int", "double", "char", "bool"],
      answer: 1,
      explanation: "浮点常用 float/double；一级真题也常考保留小数输出。"
    },
    {
      id: "re_gen_06", type: "judge", difficulty: 4, knowledgePoint: "整除",
      question: "在 C++ 中，5/2 的结果是 2.5。（ ）",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "两个 int 相除结果仍为 int，向 0 截断得 2。"
    },
    {
      id: "re_gen_07", type: "choice", difficulty: 4, knowledgePoint: "循环边界",
      question: "for(int i=1;i<=n;i++) 当 n=5 时循环体执行次数是？",
      options: ["5", "4", "6", "0"],
      answer: 0,
      explanation: "i=1,2,3,4,5 共 5 次。"
    },
    {
      id: "re_gen_08", type: "choice", difficulty: 5, knowledgePoint: "continue",
      question: "for(int i=1;i<=5;i++){ if(i==3) continue; printf(\"%d\",i);} 输出？",
      options: ["1245", "12345", "12", "345"],
      answer: 0,
      explanation: "i=3 时 continue 跳过打印，输出 1245。"
    },
    {
      id: "re_gen_09", type: "choice", difficulty: 3, knowledgePoint: "输入输出",
      question: "从键盘读入一个整数到变量 n，scanf 正确写法是？",
      options: ["scanf(\"%d\", &n);", "scanf(\"%d\", n);", "scanf(n);", "scanf(\"%d\");"],
      answer: 0,
      explanation: "需要格式串与地址 &n。"
    },
    {
      id: "re_gen_10", type: "judge", difficulty: 3, knowledgePoint: "布尔",
      question: "关系表达式 a>b 的结果只能是 true 或 false 一类逻辑值。（ ）",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "关系运算产生布尔结果（或可转为 0/1）。"
    },
    {
      id: "re_gen_11", type: "choice", difficulty: 4, knowledgePoint: "多重赋值",
      question: "int a,b,c; a=b=c=0; 的效果是？",
      options: ["a、b、c 都为 0", "仅 c 为 0", "语法错误", "仅 a 为 0"],
      answer: 0,
      explanation: "右结合连续赋值，三者均为 0。"
    },
    {
      id: "re_gen_12", type: "choice", difficulty: 4, knowledgePoint: "自增",
      question: "int x=5; printf(\"%d\", ++x); 输出？",
      options: ["6", "5", "7", "4"],
      answer: 0,
      explanation: "前置 ++ 先自增再取用，输出 6。"
    },
    {
      id: "re_gen_13", type: "judge", difficulty: 3, knowledgePoint: "注释",
      question: "C++ 中 // 后面到行末的内容是注释，不参与编译执行。（ ）",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "单行注释基本常识。"
    },
    {
      id: "re_gen_14", type: "choice", difficulty: 4, knowledgePoint: "逻辑与",
      question: "条件「成绩 score 在 0 到 100 之间（含边界）」应写成？",
      options: ["score>=0 && score<=100", "score>=0 || score<=100", "0<=score<=100", "score=0 && score=100"],
      answer: 0,
      explanation: "需用逻辑与连接两个关系式；0<=score<=100 在 C++ 中含义不同。"
    },
    {
      id: "re_gen_15", type: "choice", difficulty: 5, knowledgePoint: "模拟执行",
      question: "int s=0; for(int i=1;i<=4;i++) s+=i; printf(\"%d\",s); 输出？",
      options: ["10", "4", "6", "9"],
      answer: 0,
      explanation: "1+2+3+4=10。"
    }
  ];

  global.GESP_BANKS = global.GESP_BANKS || {};
  global.GESP_BANKS["real-exam"] = {
    id: "real-exam",
    name: "近年真题风格（一级客观题）",
    shortName: "真题",
    description: "依据 2025–2026 公开解析整理的客观题风格练习，覆盖运算、循环、printf/scanf、常识等",
    staticQuestions: REAL_EXAM_QUESTIONS,
    hasFill: false,
    hasDynamic: false,
    modes: [{ id: "mixed", label: "综合训练" }]
  };
})(typeof window !== "undefined" ? window : globalThis);
