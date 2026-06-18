/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-10 11:36:20
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-13 18:34:03
 * @FilePath: /fe-lint/packages/encode-fe-lint/src/lints/markdownlint/doMarkdownlint.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fg from 'fast-glob';
import { readFile, writeFile } from 'fs-extra';
import markdownlint, { LintError } from 'markdownlint';
import markdownlintRuleHelpers from 'markdownlint-rule-helpers';
import { extname, join } from 'path';
import { Config, PKG, ScanOptions } from '../../types';
import { MARKDOWN_LINT_FILE_EXT, MARKDOWN_LINT_IGNORE_PATTERN } from '../../utils/constants';
import { formatMarkdownlintResults } from './fotmatMarkdownlintResults';
import { getMarkdownlintConfig } from './getMarkdownlintConfig';

export interface DoMarkdownlintOptions extends ScanOptions {
  pkg: PKG;
  config?: Config;
}

export async function doMarkdownlint(options: DoMarkdownlintOptions) {
  let files: string[];
  if (options.files) {
    files = options.files.filter((name) => MARKDOWN_LINT_FILE_EXT.includes(extname(name)));
  } else {
    const pattern = join(
      options.include,
      `**/*.{${MARKDOWN_LINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`,
    );
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: MARKDOWN_LINT_IGNORE_PATTERN,
    });
  }
  const results = await markdownlint.promises.markdownlint({
    ...getMarkdownlintConfig(options, options.pkg, options.config),
    files,
  });
  // 修复
  if (options.fix) {
    await Promise.all(
      Object.keys(results).map((filename) => formatMarkdownFile(filename, results[filename])),
    );
    for (const file in results) {
      if (!Object.prototype.hasOwnProperty.call(results, file)) continue;
    }
  }
  return formatMarkdownlintResults(results, options.quiet);
}

async function formatMarkdownFile(filename: string, errors: LintError[]) {
  const fixes = errors?.filter((error) => error.fixInfo);

  if (fixes?.length > 0) {
    const originalText = await readFile(filename, 'utf8');
    const fixedText = markdownlintRuleHelpers.applyFixes(originalText, fixes);
    if (originalText !== fixedText) {
      await writeFile(filename, fixedText, 'utf8');
      return errors.filter((error) => !error.fixInfo);
    }
  }
  return errors;
}
