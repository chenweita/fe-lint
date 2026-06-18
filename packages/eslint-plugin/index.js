/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2023-10-18 21:31:48
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-05-30 22:39:57
 * @FilePath: /fe-spec/packages/eslint-plugin/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const requireAll = require('require-all');

exports.rules = requireAll({
  dirname: path.resolve(__dirname, 'rules'),
});

exports.configs = requireAll({
  dirname: path.resolve(__dirname, 'configs'),
});

exports.processors = {
  '.json': {
    preprocess(text) {
      // As JS file 自定义插件入口
      return [`module.exports = ${text}`];
    },
  },
};
