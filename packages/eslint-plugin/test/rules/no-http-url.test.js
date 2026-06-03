/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-01 23:50:10
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-03 00:12:48
 * @FilePath: /fe-lint/packages/eslint-plugin/test/rules/no-http-url.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';

const rule = require('../../rules/no-http-url');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('no-http-url', rule, {
    valid: [
        {
            code: "var test = 'https://huahua.com';"
        }
    ],
    invalid: [
        {
            code: "var test = 'http://huahua.com';",
            output: "var test = 'http://huahua.com';",
            errors: [
                {
                    message: 'Recommended "http://huahua.com" switch to HTTPS'
                }
            ]
        }, 
        {
            code: "<img src = 'http://huahua.com' />",
            output: "<img src = 'http://huahua.com' />",
            parserOptions: {
                ecmaFeature: {
                    jsx: true,
                }
            },
            errors: [
                {
                    message: 'Recommended "http://huahua.com" switch to HTTPS'
                }
            ]
        }
    ]
})