/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-10 11:36:20
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-13 18:30:18
 * @FilePath: /fe-lint/packages/encode-fe-lint/src/utils/npm-type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { sync as commandExistsSync } from 'command-exists';

/**
 * npm 类型
 */
const promise: Promise<'npm' | 'pnpm'> = new Promise((resolve) => {
  if (!commandExistsSync('pnpm')) return resolve('npm');

  resolve('pnpm');
});

export default promise;
