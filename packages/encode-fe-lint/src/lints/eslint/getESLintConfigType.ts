import glob from 'glob';
import { PKG } from "../../types";


/**
 *
 * 场景	Language	DSL	生成的路径
 * 纯 JS React 项目	''	'react'	encode-fe-eslint-config/react
 * TS React 项目	'typescript'	'react'	encode-fe-eslint-config/typescript/react
 * 纯 JS Vue 项目	''	'vue'	encode-fe-eslint-config/vue
 * TS Vue 项目	'typescript'	'vue'	encode-fe-eslint-config/typescript/vue
 * 纯 JS 无框架项目	''	''	encode-fe-eslint-config/index
 * TS 无框架项目	'typescript'	''	encode-fe-eslint-config/typescript/index
 *
 * @export
 * @param {string} cwd
 * @param {PKG} pkg
 * @return {*}  {string}
 */
export function getESLintConfigType(cwd: string, pkg: PKG): string {
    const tsFiles = glob.sync('./!(node_modules)/**/*.@(ts|tsx)', { cwd });
    const reactFiles = glob.sync('./!(node_modules)/**/*.@(jsx|tsx)', { cwd });
    const vueFiles = glob.sync('./!(node_modules)/**/*.vue', { cwd });
    const dependencies = Object.keys(pkg.dependencies || {});
    const language = tsFiles.length > 0 ? 'typescript' : '';
    let dsl = '';

    // dsl判断
    if (reactFiles.length > 0 || dependencies.some(name => /^react(-|$)/.test(name))) {
        dsl = 'react'
    } else if (vueFiles.length > 0 || dependencies.some(name => /^vue(-|$)/.test(name))) {
        dsl = 'vue'
    } else if (dependencies.some(name => /^rax(-|$)/.test(name))) {
        dsl = 'rax'
    }

    return (
        'encode-fe-eslint-config/' + `${language}/${dsl}`.replace(/\$/, '/index').replace(/^\//, '')
    )

}