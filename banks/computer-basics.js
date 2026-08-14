/**
 * 题库：计算机基础与编程环境（GESP C++ 一级考纲）
 * 考点：计算机组成、存储单位、操作系统、程序编译运行、IDE
 * 题型：选择 / 判断
 */
(function () {
  const Q = [
    {
      id: 2001, type: "choice", category: "hardware", difficulty: 3, knowledgePoint: "计算机组成",
      question: "下列属于计算机输入设备的是？",
      options: ["显示器", "音箱", "键盘", "打印机"],
      answer: 2,
      explanation: "键盘、鼠标属于输入设备；显示器、音箱、打印机属于输出设备。"
    },
    {
      id: 2002, type: "choice", category: "hardware", difficulty: 3, knowledgePoint: "计算机组成",
      question: "CPU 的中文含义通常是？",
      options: ["中央处理器", "内存条", "硬盘", "显卡"],
      answer: 0,
      explanation: "CPU（Central Processing Unit）是中央处理器，负责运算与控制。"
    },
    {
      id: 2003, type: "choice", category: "storage", difficulty: 3, knowledgePoint: "存储单位",
      question: "1 KB 等于多少字节（Byte）？",
      options: ["1000", "1024", "512", "8"],
      answer: 1,
      explanation: "在计算机中通常 1 KB = 1024 B（2^10）。"
    },
    {
      id: 2004, type: "choice", category: "storage", difficulty: 3, knowledgePoint: "存储单位",
      question: "存储容量从小到大排列正确的是？",
      options: ["GB < MB < KB < B", "B < KB < MB < GB", "MB < B < KB < GB", "KB < B < MB < GB"],
      answer: 1,
      explanation: "B < KB < MB < GB < TB。"
    },
    {
      id: 2005, type: "judge", category: "storage", difficulty: 3, knowledgePoint: "位与字节",
      question: "1 个字节（Byte）等于 8 个二进制位（bit）。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "1 Byte = 8 bit。"
    },
    {
      id: 2006, type: "choice", category: "hardware", difficulty: 3, knowledgePoint: "存储器",
      question: "程序运行时，正在执行的数据和指令主要存放在？",
      options: ["硬盘", "内存（RAM）", "光盘", "U 盘"],
      answer: 1,
      explanation: "运行中的程序在内存中；硬盘等是外存，速度较慢。"
    },
    {
      id: 2007, type: "choice", category: "os", difficulty: 3, knowledgePoint: "操作系统",
      question: "下列哪个是操作系统？",
      options: ["Word", "Windows", "Chrome", "Dev-C++"],
      answer: 1,
      explanation: "Windows、Linux 等是操作系统；Word 是应用软件。"
    },
    {
      id: 2008, type: "judge", category: "os", difficulty: 3, knowledgePoint: "操作系统",
      question: "操作系统负责管理计算机的硬件与软件资源。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "这是操作系统的基本作用。"
    },
    {
      id: 2009, type: "choice", category: "process", difficulty: 4, knowledgePoint: "编译运行",
      question: "用 C++ 写好源程序后，要先经过哪一步才能生成可执行程序？",
      options: ["直接双击运行", "编译（和链接）", "只保存文件即可", "上传到网上"],
      answer: 1,
      explanation: "源代码需编译、链接后才能得到可执行文件。"
    },
    {
      id: 2010, type: "choice", category: "process", difficulty: 3, knowledgePoint: "源程序",
      question: "C++ 源程序文件常见的扩展名是？",
      options: [".exe", ".cpp", ".doc", ".jpg"],
      answer: 1,
      explanation: "源文件常用 .cpp；.exe 是可执行文件。"
    },
    {
      id: 2011, type: "choice", category: "ide", difficulty: 3, knowledgePoint: "IDE",
      question: "Dev-C++ 属于？",
      options: ["操作系统", "集成开发环境（IDE）", "浏览器", "杀毒软件"],
      answer: 1,
      explanation: "Dev-C++ 是常用的 C++ 集成开发环境。"
    },
    {
      id: 2012, type: "judge", category: "ide", difficulty: 3, knowledgePoint: "调试",
      question: "调试可以帮助发现并定位程序中的错误。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "调试是查错、改错的重要手段。"
    },
    {
      id: 2013, type: "choice", category: "history", difficulty: 4, knowledgePoint: "计算机历史",
      question: "被广泛认为是第一台电子数字计算机的是？",
      options: ["ENIAC", "iPhone", "Windows", "Internet"],
      answer: 0,
      explanation: "ENIAC 是早期著名的电子数字计算机。"
    },
    {
      id: 2014, type: "choice", category: "hardware", difficulty: 4, knowledgePoint: "输出设备",
      question: "下列都属于输出设备的一组是？",
      options: ["键盘、鼠标", "显示器、打印机", "内存、硬盘", "CPU、主板"],
      answer: 1,
      explanation: "显示器、打印机输出信息；键盘鼠标是输入。"
    },
    {
      id: 2015, type: "judge", category: "process", difficulty: 4, knowledgePoint: "程序执行",
      question: "C++ 源程序不需要编译，计算机可以直接理解并执行。",
      options: ["正确", "错误"],
      answer: 1,
      explanation: "C++ 是编译型语言，需先编译再执行。"
    },
    {
      id: 2016, type: "choice", category: "storage", difficulty: 4, knowledgePoint: "存储单位换算",
      question: "1 MB 大约等于？",
      options: ["1024 B", "1024 KB", "1000 GB", "8 bit"],
      answer: 1,
      explanation: "1 MB = 1024 KB。"
    },
    {
      id: 2017, type: "choice", category: "hardware", difficulty: 3, knowledgePoint: "I/O",
      question: "麦克风主要属于？",
      options: ["输入设备", "输出设备", "存储设备", "运算设备"],
      answer: 0,
      explanation: "麦克风将声音输入计算机。"
    },
    {
      id: 2018, type: "judge", category: "os", difficulty: 3, knowledgePoint: "Linux",
      question: "Linux 也是一种常见的操作系统。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "Linux 与 Windows 都是操作系统。"
    },
    {
      id: 2019, type: "choice", category: "process", difficulty: 4, knowledgePoint: "注释",
      question: "在 C++ 中，单行注释常用？",
      options: ["/* 注释 */ 只能单行", "// 注释内容", "# 注释内容", "<!-- 注释 -->"],
      answer: 1,
      explanation: "// 是单行注释；/* */ 可多行；HTML 才用 <!-- -->。"
    },
    {
      id: 2020, type: "judge", category: "process", difficulty: 3, knowledgePoint: "main",
      question: "一个 C++ 程序中必须有且通常只有一个 main 函数作为入口。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "程序从 main 开始执行。"
    },
    {
      id: 2021, type: "choice", category: "hardware", difficulty: 5, knowledgePoint: "冯·诺依曼",
      question: "现代计算机普遍遵循的体系结构思想与谁关系最密切？",
      options: ["冯·诺依曼", "仅与比尔·盖茨有关", "仅与乔布斯有关", "与计算机无关"],
      answer: 0,
      explanation: "冯·诺依曼体系结构是现代计算机的重要基础。"
    },
    {
      id: 2022, type: "choice", category: "storage", difficulty: 4, knowledgePoint: "RAM",
      question: "关于内存（RAM）说法较合理的是？",
      options: ["断电后数据一般会丢失", "容量通常远大于硬盘", "不能被 CPU 访问", "只用来装系统不能装程序"],
      answer: 0,
      explanation: "RAM 是易失性存储器，断电数据消失。"
    },
    {
      id: 2023, type: "judge", category: "ide", difficulty: 3, knowledgePoint: "保存编译",
      question: "在 IDE 中修改代码后，一般需要重新编译再运行才能看到最新效果。",
      options: ["正确", "错误"],
      answer: 0,
      explanation: "改源码后应重新编译运行。"
    },
    {
      id: 2024, type: "choice", category: "hardware", difficulty: 3, knowledgePoint: "应用",
      question: "下列哪项最能体现计算机在现代社会中的应用？",
      options: ["只能用来打游戏", "可用于办公、学习、通讯、科研等", "不能联网", "不需要软件"],
      answer: 1,
      explanation: "计算机应用非常广泛。"
    }
  ];

  window.GESP_BANKS = window.GESP_BANKS || {};
  window.GESP_BANKS["computer-basics"] = {
    id: "computer-basics",
    name: "计算机基础",
    exam: "GESP C++ 一级",
    description: "计算机组成、存储、操作系统、编译与 IDE",
    staticQuestions: Q,
    settings: { allowFill: false, allowDynamic: false },
    modes: [
      { id: "mixed", label: "综合训练" },
      { id: "hardware", label: "组成与设备" },
      { id: "storage", label: "存储单位" },
      { id: "process", label: "编译与程序" },
      { id: "judge", label: "判断题" }
    ]
  };
})();
