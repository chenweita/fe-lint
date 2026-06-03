/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-01 19:59:47
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-01 20:26:45
 * @FilePath: /fe-lint/packages/eslint-plugin/config/rules/no-secret-info.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const RULE_NAME = 'no-secret-info';

const DEFAULT_DANGEROUS_KEYS = ['secret', 'token', 'password'];

module.exports = {
    meta: {
        type: 'problem',
        fixable: null,
        message: {
            noSecretInfo: 'Detect that the "{{secret}}" might be a secret token, please check!'
        }
    },
    create(context) {
        const ruleOptions = context.options[0] || {};
        let { dangerousKeys = [], autoMerge = true } =ruleOptions;
        if (dangerousKeys.length === 0) {
            dangerousKeys = DEFAULT_DANGEROUS_KEYS
        } else {
            dangerousKeys = [...new Set([...DEFAULT_DANGEROUS_KEYS, ...dangerousKeys])]
        }

        const rep = new RegExp(dangerousKeys.join('|'));
        // 简单来说，它在抓“命名不规范导致泄露密钥”的情况，比如 const apiKey = "12345" 或 config: { password: "abc" }。

        // 下面逐层拆解这个判断逻辑：

        // 1. 前置安全检查
        // javascript
        // node.value && node.parent
        // ‌node.value‌: 确保当前节点（通常是一个字面量，如字符串 "my-secret-key"）确实有一个值。如果没有值，后续检查无意义。
        // ‌node.parent‌: 确保当前节点有父节点。因为我们要通过父节点来判断这个值是被赋值给了谁（变量还是属性）。
        // 2. 核心判断逻辑（两种场景）
        // 代码使用 || 连接了两种常见的赋值场景，只要满足其中一种，且名称匹配正则，就触发报错。

        // 场景一：变量声明 (VariableDeclarator)
        // javascript
        // node.parent.type === 'VariableDeclarator' &&
        // node.parent.id &&
        // node.parent.id.name &&
        // reg.test(node.parent.id.name.toLocaleLowerCase())
        // ‌背景‌：处理类似 const myToken = "secret"; 的代码。
        // ‌node.parent.type === 'VariableDeclarator'‌: 确认父节点是变量声明器。在 AST（抽象语法树）中，const a = 1 的结构是：VariableDeclaration -> VariableDeclarator (id: a, init: 1)。这里的 node 是 init（即 "secret"），其父节点就是 VariableDeclarator。
        // ‌node.parent.id‌: 获取变量的标识符节点（即 myToken 这部分）。
        // ‌node.parent.id.name‌: 获取变量名的字符串（即 "myToken"）。
        // ‌reg.test(...)‌: 用正则表达式测试变量名。
        // ‌.toLocaleLowerCase()‌: 将变量名转为小写，实现‌不区分大小写‌的匹配。例如，正则如果是 /key/，它能同时匹配 apiKey、APIKey、apikey。
        // 场景二：对象属性 (Property)
        // javascript
        // node.parent.type === 'Property' &&
        // node.parent.key &&
        // node.parent.key.name &&
        // reg.test(node.parent.key.name.toLocaleLowerCase())
        // ‌背景‌：处理类似 obj: { password: "secret" } 的代码。
        // ‌node.parent.type === 'Property'‌: 确认父节点是对象的属性键值对。
        // ‌node.parent.key‌: 获取属性的键（Key）节点（即 password 这部分）。
        // ‌node.parent.key.name‌: 获取属性名的字符串（即 "password"）。
        // 注意：这里假设属性名是标识符（Identifier）。如果是计算属性或字符串键（如 ["pass-word"]: "val"），key.name 可能不存在，代码做了 && 短路保护，不会报错。
        // ‌reg.test(...)‌: 同样测试属性名是否匹配敏感词正则。

        return {
            Literal: function handleRequires(node) {
                if (
                    node.value &&
                    node.parent &&
                    (
                        node.parent.type === 'VariableDeclarator' &&
                        node.parent.id && 
                        node.parent.id.name && 
                        reg.test( node.parent.id.name.toLocaleLowerCase())
                    ) || (
                        node.parent.type === 'Property' &&
                        node.parent.key && 
                        node.parent.key.name && 
                        reg.test(node.parent.key.name.toLocaleLowerCase())
                    )
                ) {
                    context.report({
                        node,
                        messageId: 'noSecretInfo',
                        data: {
                            secret: node.value
                        }
                    })
                }
            }
        }

    }
}