/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-03 13:34:27
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-03 13:40:37
 * @FilePath: /fe-lint/packages/eslint-plugin/test/rules/no-secret-info.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const rule = require('../../rules/no-secret-info');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('no-secret-info', rule, {
    valid: [
        {
            code: 'var accessKeySecret = process.env.ACCESS_KEY_SECRET;'
        },
        {
            code: 'var password = "";'
        },
        {
            code: `
            var client = {
                accessKeyToken: process.env.ACCESS_KEY_SECRET;
            }`
        }
    ],
    invalid: [
        {
            code: "var accessKeySecret = 'xxxx';",
            errors: [
                {
                    message: 'Detect that the "XXX" might be a secret token, Please check!'
                }
            ]
        },
        {
            code: `
          var client ={
            accessKeyToken: 'xxxx'
          };
          `,
            errors: [
              {
                message: 'Detect that the "xxxx" might be a secret token, Please check!',
              },
            ],
          },
    ]
})