/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-08 21:19:47
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-09 00:49:33
 * @FilePath: /fe-lint/packages/encode-fe-lint/__tests__/src/utils/getESLintConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Config, PKG, ScanOptions } from '../../types'
import { ESLint } from 'eslint';
import { ESLINT_FILE_EXT } from '../../utils/constants';
import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import  { getESLintConfigType } from './getESLintConfigType';

export function getESLintConfig(opts: ScanOptions, pkg: PKG, config: Config) {
    const { cwd, fix, ignore } = opts;
    const lintConfig: ESLint.Options = {
        cwd,
        fix,
        ignore,
        extensions: ESLINT_FILE_EXT,
        errorOnUnmatchedPattern: false
    }

    if (config.eslintOptions) {
        // 若用户传入了 eslintOptions，则用用户的
        Object.assign(lintConfig, config.eslintOptions)
    } else {
        // 根据扫描目录下有无lintrc文件，若无则使用默认的 lint 配置 
        const lintConfigFiles = glob.sync('.eslintrc?(@(js|yaml|yml|json))', { cwd });
        if (lintConfigFiles.length === 0 && !pkg.eslintConfig) {
            lintConfig.resolvePluginsRelativeTo = path.resolve(__dirname, '../../');
            lintConfig.useEslintrc = false;
            lintConfig.baseConfig = {
                extends: [
                    getESLintConfigType(cwd, pkg),
                    ...(config.enablePrettier ? ['prettier'] : []),
                ]
            }
        }

        // 根据扫描目录下有无lintignore文件，若无则使用默认的 ignore 配置
        const lintIgnoreFile = path.resolve(cwd, '.eslintignore');
        if (!fs.existsSync(lintIgnoreFile) && !pkg.eslintIgnore) {
            lintConfig.ignorePath = path.resolve(__dirname, '../config/_eslintignore.ejs');
        }
    }
    
    return lintConfig;
}