/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-01 15:05:31
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-01 16:20:27
 * @FilePath: /fe-lint/packages/config-stylelint/__test__/rules-validate.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const assert = require('assert');
const stylelint =  require('stylelint');
const path = require('path');
describe('test/rules-validate.test.js', () => {
  it ('Validate default', async() => {
    const filePaths = [path.join(__dirname, './fixture/index.css')];

    const result = await styleling.lint({
      configFile: path.join(__dirname, '../index.js'),
      files: filePaths,
      fix: false
    })

    if(result && result.errored) {
      const fileResult = JSON.parse(result.output || '[]') || [];
      fileResult.forEach(fileResult => {
        console.log(fileResult.warnings)
      })
    }

    assert.ok(filePaths.length !== 0)
    
  })

  it('Validate sass', async() => {
    const filePaths = [path.join(__dirname, './fixtures/sass-test.scss')];

    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'),
      files: filePaths,
      fix: false
    })

    if(result && result.errored) {
      const fileResult = JSON.parse(result.output || '[]') || [];
      fileResult.forEach(fileResult => {
        console.log(fileResult.warnings)
      })
    }

    assert.ok(filePaths.length !== 0)
  })

  it('Validate less', async() => {
    const filePaths = [path.join(__dirname, './fixtures/less-test.less')];

    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'),
      files: filePaths,
      fix: false
    })

    if(result && result.errored) {
      const fileResult = JSON.parse(result.output || '[]') || [];
      fileResult.forEach(fileResult => {
        console.log(fileResult.warnings)
      })
    }

    assert.ok(filePaths.length !== 0)
  })

  it('Validate css-module', async() => {
    const filePaths = [path.join(__dirname, './fixtures/css-module.scss')];

    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'),
      files: filePaths,
      fix: false
    })

    if(result && result.errored) {
      const fileResult = JSON.parse(result.output || '[]') || [];
      fileResult.forEach(fileResult => {
        console.log(fileResult.warnings)
      })
    }

    assert.ok(filePaths.length === 0)
  })
})