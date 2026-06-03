/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-01 17:49:27
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-03 13:40:40
 * @FilePath: /fe-lint/packages/eslint-plugin/rules/no-http-url.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const RULE_NAME = 'no-http-url';

module.exports = {
    name: RULE_NAME,
    meta: {
        type: 'suggestion',
        fixable: null,
        messages: {
            noHttpUrl: 'Recommended "{{url}}" switch to HTTPS'
        }
    },
    create(context) {
        return {
            Literal: function handleRequires(node) {
                if (node.value && typeof node.value === 'string' && node.value.indexOf('http:') === 0) {
                    context.report({
                        node,
                        messagesId: 'noHttpUrl',
                        data: {
                            url: node.value
                        }
                    })
                }
            }
        }
    }
}