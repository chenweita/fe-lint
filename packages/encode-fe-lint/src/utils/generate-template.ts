/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-10 11:36:20
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-13 18:29:37
 * @FilePath: /fe-lint/packages/encode-fe-lint/src/utils/generate-template.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';
import glob from 'glob';
import ejs from 'ejs';
import {
  ESLINT_IGNORE_PATTERN,
  STYLELINT_FILE_EXT,
  STYLELINT_IGNORE_PATTERN,
  MARKDOWN_LINT_IGNORE_PATTERN,
} from './constants';


export default (cwd: string, data: Record<string, any>, vscode?: boolean) => {
    const templatePath = path.resolve(__dirname, '../config');
    const templates = glob.sync(`${vscode ? '_vscode' : '**'}/*.ejs`, {cwd: templatePath});
    for(const name of templates) {
        const filepath = path.resolve(cwd, name.replace(/\.ejs$/, '').replace(/^_/, '.'));
        let content = ejs.render(fs.readFileSync(path.resolve(templatePath, name), 'utf8'), {
            eslintIgnore: ESLINT_IGNORE_PATTERN,
            stylelintExt: STYLELINT_FILE_EXT,
            stylelintIgnores: STYLELINT_IGNORE_PATTERN,
            markdownLintIgnores: MARKDOWN_LINT_IGNORE_PATTERN,
            ...data
    })

    // 合并 vscode config
    if (/^_vscode/.test(name)) {
        content = mergeVSCodeConfig(filepath, content);
    }
    
    //跳过空文件
    if (!content.trim()) continue;

    fs.outputFileSync(filepath, content, 'utf8')
    
    }
}


/**
 * vscode 配置合并
 * @param filepath
 * @param content
 */
const mergeVSCodeConfig = (filepath: string, content: string) => {
    // 不需要 merge
    if (!fs.existsSync(filepath)) return content;
  
    try {
      const targetData = fs.readJSONSync(filepath);
      const sourceData = JSON.parse(content);
      return JSON.stringify(
        _.mergeWith(targetData, sourceData, (target, source) => {
          if (Array.isArray(target) && Array.isArray(source)) {
            return [...new Set(source.concat(target))];
          }
        }),
        null,
        2,
      );
    } catch (e) {
      return '';
    }
  };
  