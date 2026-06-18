module.exports = {
    printWidth: 100,      // 每行最大长度
    tabWidth: 2,          // 缩进空格数
    useTabs: false,       // 使用空格而不是 Tab 键
    semi: true,           // 句尾分号
    singleQuote: true,    // 使用单引号
    trailingComma: 'all', // 多行时尽可能打印尾随逗号
    bracketSpacing: true, // 对象字面量大括号间有空格: { foo: bar }
    arrowParens: 'always',// 箭头函数参数始终加括号
    endOfLine: 'lf',      // 换行符使用 LF (Unix/Linux/Mac 标准)，避免 Windows CRLF 导致的 Git 冲突
};