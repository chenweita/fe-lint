/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-09 16:09:34
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-09 16:31:57
 * @FilePath: /fe-lint/packages/encode-fe-lint/__tests__/src/lints/markdownlint/getMarkdownlintConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path';
import glob from 'glob';
import markdownLint from 'markdownlint';
import markdownLintConfig from 'encode-fe-markdownlint-config';
import type { ScanOptions, PKG, Config } from '../../types';

type lintOptions = markdownLint.Options & {fix?: boolean}

export function getMarkdownlintConfig(opts: ScanOptions, pkg: PKG, config: Config) {
    const { cwd } = opts;
    const lintConfig: lintOptions = {
        fix: Boolean(opts.fix),
        resultVersion: 3
    }

    if (config.markdownlintOptions) {
        Object.assign(lintConfig, config.markdownlintOptions)
    } else {
        const lintConfigFiles = glob.sync('markdownlint(.@(yaml|yml|json))', { cwd });
        if (lintConfigFiles.length === 0) {
            lintConfig.config = markdownLintConfig
        } else {
            lintConfig.config = markdownLint.readConfigSync(path.resolve(cwd, lintConfigFiles[0]))
        }
    }

    return lintConfig
}