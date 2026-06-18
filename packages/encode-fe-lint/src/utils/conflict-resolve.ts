/*
 * @Author: chenweita 1320673491@qq.com
 * @Date: 2026-06-05 16:45:53
 * @LastEditors: chenweita 1320673491@qq.com
 * @LastEditTime: 2026-06-09 12:18:34
 * @FilePath: /fe-lint/packages/encode-fe-lint/__tests__/src/utils/conflict-resolve.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import inquirer from 'inquirer';
import log from './log';
import { PKG_NAME } from './constants';
import type { PKG } from '../types';

// 精确移除依赖
const packageNamesToRemove = [
    '@babel/eslint-parser',
    'commitlint/cli',
    '@iceworks/spec',
    'babel-eslint',
    'eslint',
    'husky',
    'markdownlint',
    'prettier',
    'stylelint',
    'tslint'
]

// 按前缀移除依赖
const packagePrefixesToRemove = [
    '@commit-lint/',
    '@commit-lint-/',
    '@eslint-',
    '@markdownlint-',
    'stylelint-',
    '@typescript-eslint/'
]

/**
 * 待删除无用的配置
 * @param {string} cwd
 * @return {*}  {string[]}
 */
const checkUselessConfig = (cwd: string): string[] => {
    return []
        .concat(glob.sync('eslintrc?(@(yaml|yml|json))', { cwd }))
        .concat(glob.sync('stylelintrc?(@(yaml|yml|json))', { cwd }))
        .concat(glob.sync('markdownlint@(rc|.@(yaml|yml|json))', { cwd }))
        .concat(
            glob.sync('prettierrc?(.@(cjs|config.js|config.cjs|yaml|yml|json|json5|toml))', { cwd })
        )
        .concat(glob.sync('.tslint.@((yaml|yml|json))', { cwd }))
        .concat(glob.sync('.kylerc?(.@(yaml|yml|json))', { cwd }));
}


/**
 * 待重写的配置
 * @param {string} cwd
 * @return {*} 
 */
const checkRewriteConfig = (cwd: string) => {
    return glob
    .sync('**/*.ejs', { cwd: path.resolve(__dirname, '../config')})
    .map(name => name.replace(/^_/, '.').replace(/\.ejs$/, '')) //在 npm 包或某些文件系统中，以 . 开头的文件（如 .eslintrc）有时会被隐藏或忽略，或者为了区分模板源文件和目标文件，开发者习惯在模板名前加 _。
    .filter(filename => fs.existsSync(path.resolve(cwd, filename)))  // 检查这些“目标文件名”在用户的项目目录（cwd）中是否‌真实存在‌。
}

export default async(cwd: string, rewriteConfig?: boolean) => {
    const pkgPath = path.resolve(cwd, 'package.json');
    const pkg: PKG = fs.readJSONSync(pkgPath);
    const dependencies = [].concat(
        Object.keys(pkg.dependencies || []),
        Object.keys(pkg.devDependencies || []),
    )
    const willRemovePackage = dependencies.filter(
        name => 
            packageNamesToRemove.includes(name) ||
            packagePrefixesToRemove.some(prefix => name.startsWith(prefix))
    )
    const uselessConfig = checkUselessConfig(cwd); //lintrc等文件
    const reWriteConfig = checkRewriteConfig(cwd); //ejs
    const willChangeCount = willRemovePackage.length + uselessConfig.length + reWriteConfig.length;

    //提示是否移除原配置
    if (willChangeCount > 0) {
        log.warn(`检测到项目中存在可能与 ${PKG_NAME} 冲突的依赖和配置，为保证正常运行将`);

        if (willRemovePackage.length) {
            log.warn('删除以下依赖：');
            log.warn(JSON.stringify(willRemovePackage, null, 2));
        }

        if (uselessConfig.length) {
            log.warn('删除以下配置文件：');
            log.warn(JSON.stringify(uselessConfig, null, 2));
        }

        if (reWriteConfig.length > 0) {
            log.warn('覆盖以下配置文件：');
            log.warn(JSON.stringify(reWriteConfig, null, 2));
        }

        if (typeof reWriteConfig === 'undefined') {
            const { isOverWrite } = await inquirer.prompt({
                type: 'confirm',
                name: 'isOverWrite',
                message: '请确认是否继续：'
            })

            if (!isOverWrite) process.exit(0);
        } else if (!reWriteConfig) {
            process.exit(0);
        }

    }

    // 删除配置文件
    for(const name of uselessConfig) {
        fs.removeSync(path.resolve(cwd, name))
    }

    // 修正package.json
    delete pkg.eslintConfig;
    delete pkg.eslintIgnore;
    delete pkg.stylelint;
    for(const name of willRemovePackage) {
        delete (pkg.dependencies || {})[name];
        delete (pkg.devdependencies || {})[name]
    }
    fs.writeFileSync(path.resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8');

    return pkg;
}