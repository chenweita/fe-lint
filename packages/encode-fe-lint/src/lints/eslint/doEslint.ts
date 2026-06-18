/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-10 11:36:20
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-13 18:07:58
 * @FilePath: /fe-lint/packages/encode-fe-lint/src/lints/eslint/doEslint.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Config, PKG, ScanOptions } from '../../types';
import { ESLINT_FILE_EXT, ESLINT_IGNORE_PATTERN } from "../../utils/constants";
import { extname } from "path";
import fg from 'fast-glob';
import { ESLint } from 'eslint';
import { getESLintConfig } from "./getESLintConfig";
import { formatESLintResults } from './formatESLintResults'

export interface DoESLintOptions extends ScanOptions {
    pkg: PKG;
    config?: Config;
}
  
export async function doESLint(options: DoESLintOptions) {
    let files: string[];
    if (options.files) {
        files = options.files.filter(name => ESLINT_FILE_EXT.includes(extname(name)));
    } else {
        files = await fg(`**/*.{${ESLINT_FILE_EXT.map(t => t.replace(/^\./, '')).join(',')}}`, {
            cwd: options.cwd,
            ignore: ESLINT_IGNORE_PATTERN
        });
    }

    const eslint = new ESLint(getESLintConfig(options, options.pkg, options.config));
    const reports = await eslint.lintFiles(files);
    if (options.fix) {
        await ESLint.outputFixes(reports)
    }

    return formatESLintResults(reports, options.quiet, eslint)
}