/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-10 11:36:20
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-13 18:08:18
 * @FilePath: /fe-lint/packages/encode-fe-lint/src/lints/eslint/formatESLintResults.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ESLint } from 'eslint';
import type { ScanResult } from '../../types';


/**
 *  将 ESLint 的原始检查结果转换为更结构化、易于处理的格式，并支持根据 quiet 参数过滤掉警告信息。
 *
 * @export
 * @param {ESLint.lintResult[]} result
 * @param {boolean} quiet
 * @param {ESLint} eslint
 * @return {*}  {ScanResult[]}
 */
export function formatESLintResults(results: ESLint.LintResult[], quiet: boolean, eslint: ESLint): ScanResult[] {
    const rulesMeta = eslint.getRulesMetaForResults(results);

    return results
           .filter(({warningCount, errorCount}) => errorCount || warningCount)
           .map(
            ({
                filePath,
                messages,
                errorCount,
                warningCount,
                fixableErrorCount,
                fixableWarningCount,
            }) => ({
                filePath,
                errorCount,
                warningCount: quiet ? 0 : warningCount,
                fixableErrorCount,
                fixableWarningCount: quiet ? 0 : fixableWarningCount,
                messages: messages
                  .map(({ line = 0, column = 0, ruleId, message, fatal, severity }) => {
                    return {
                      line,
                      column,
                      rule: ruleId,
                      url: rulesMeta[ruleId]?.docs?.url || '',
                      message: message.replace(/([^ ])\.$/u, '$1'),
                      errored: fatal || severity === 2,
                    };
                  }) // dont check ruleId, which can be null
                  // https://eslint.org/docs/developer-guide/nodejs-api.html#-lintmessage-type
                  .filter(({ errored }) => (quiet ? errored : true)),
            })
           )
}