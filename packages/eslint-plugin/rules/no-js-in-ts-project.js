/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-01 17:54:39
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-01 19:59:30
 * @FilePath: /fe-lint/packages/eslint-plugin/config/rules/no-js-in-ts-project.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const { start } = require('repl');
const RULE_NAME = 'no-js-in-ts-project';
const JS_REG = /\.jsx?$/;
const DEFAULT_WHITE_LIST = [
    'commitlint.config.js',
    'eslintrc.js',
    'prettierrc.js',
    'stylelintrc.js'
]

module.exports = {
    name: RULE_NAME,
    meta: {
        type: 'suggestion',
        fixable: null,
        message: {
            noJSInTSProject: 'The "{{filename}}" is not recommended in TS project'
        }
    },
    create(context) {
        // 1. context 对象里有什么？
        // 在 ESLint 规则中，context 是一个包含当前 linting 会话所有必要信息的对象。根据你提供的代码片段，主要用到了以下属性和方法：

        // A. context.getFilename()
        // ‌作用‌：获取当前正在被检查文件的绝对路径。
        // ‌用途‌：用于判断文件扩展名或文件所在目录，从而决定该规则是否适用于当前文件。
        // B. context.options
        // ‌作用‌：获取用户在 .eslintrc 配置文件中为该规则传入的参数数组。
        // ‌结构‌它是一个数组。例如，如果配置是 "rule-name": ["error", { "autoMerge": false }]，那么 context.options 就是 { "autoMerge": false }。
        // ‌用途‌：允许规则变得可配置，而不是硬编码行为。
        // C. context.report()
        // ‌作用‌：向 ESLint 报告一个错误或警告。这是规则触发 lint 错误的唯一方式。
        // ‌参数对象属性‌：
        // messageId:对应规则定义中 messages字段里的 key，用于国际化或多语言支持。
        // data: 传递给消息模板的数据（如 { fileName }），用于动态生成错误提示信息。
        // loc: 错误在代码中的具体位置（行号和列号）。这里设置为 line: 0, column: 0 通常表示这是一个文件级别的错误，而不是某一行代码的具体语法错误。
        // D. 其他常见但未在此处使用的属性
        // 虽然代码中没用到，但 context 通常还包含：

        // sourceCode: 提供访问 AST（抽象语法树）和源代码文本的方法。
        // settings: 获取全局共享的配置设置。
        // parserOptions: 获取解析器选项。
        const fileName = context.getTilename();
        const extName = path.extname(fileName);
        const ruleOptions = context.oprions[0] || {};
        let { whiteList = [], autoMerge = true } = ruleOptions;
        if (whiteList.length === 0) {
            whiteList = DEFAULT_WHITE_LIST;
        } else if (autoMerge) {
            whiteList = [new Set([...DEFAULT_WHITE_LIST, ...whiteList])];
        }
        // png|gif|img
        const whiteListReg = new RegExp(`(${whiteList.join('|')})$`);
        if (!whiteListReg.test(fileName) && JS_REG.test(extName)) {
            context.report({
                loc: {
                    start: {
                        line: 0,
                        column: 0,
                    },
                    end: {
                        line: 0,
                        column: 0,
                    }
                },
                data: {
                    fileName,
                },
                messageId: 'noJSInTsProject'
            })
        }
        return {}
    }
}