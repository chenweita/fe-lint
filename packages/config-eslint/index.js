javascript
module.exports = {
  // 设置默认的错误级别为 'warning'（警告）。
  // 这意味着除非规则单独指定了 severity，否则所有违规都只会显示警告，不会导致构建失败。
  defaultSeverity: 'warning',

  // 引入 'stylelint-scss' 插件。
  // 这个插件提供了专门用于校验 SCSS/Sass 语法的额外规则。
  plugins: ['stylelint-scss'],

  rules: {
    /**
     * Possible errors (可能的错误)
     * 这些规则旨在捕捉可能导致 CSS 解析错误或意外行为的代码问题。
     * @link https://stylelint.io/user-guide/rules/#possible-errors
     */

    // 禁用原生的 'at-rule-no-unknown' 规则。
    // 原因：原生规则不认识 SCSS 特有的 @mixin, @include 等指令，会报错。
    'at-rule-no-unknown': null,

    // 启用 SCSS 插件提供的 '@规则未知检查'。
    // 它能正确识别 SCSS 特有的语法，同时捕获真正的错误 @规则。
    'scss/at-rule-no-unknown': true,

    // 禁用 'block-no-empty'（禁止空代码块）。
    // 原因：在某些场景下（如媒体查询占位或调试）允许存在空块。
    'block-no-empty': null,

    // 禁止无效的十六进制颜色值（如 #ff00g1）。
    'color-no-invalid-hex': true,

    // 禁止空注释。
    'comment-no-empty': true,

    // 禁止在声明块中出现重复的属性。
    // 配置例外：允许连续出现的重复属性且值不同（常用于 fallback 兼容写法，如 display: flex; display: grid;）。
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],

    // 禁止简写属性覆盖之前的相关长手属性。
    // 例如：先写 margin-top: 10px，再写 margin: 20px，这会覆盖前面的设置，通常被视为潜在错误。
    'declaration-block-no-shorthand-property-overrides': true,

    // 禁止字体家族名称重复。
    'font-family-no-duplicate-names': true,

    // 禁止 calc() 函数中运算符周围缺少空格。
    // 正确：calc(100% - 10px)；错误：calc(100%-10px)。
    'function-calc-no-unspaced-operator': true,

    // 禁止 linear-gradient 中使用非标准的方向关键词。
    'function-linear-gradient-no-nonstandard-direction': true,

    // 禁止在关键帧（keyframes）声明中使用 !important。
    'keyframe-declaration-no-important': true,

    // 禁止未知的媒体功能名称（如 @media (unknow: 10px)）。
    'media-feature-name-no-unknown': true,

    // 禁用 'no-descending-specificity'（禁止特异性递减）。
    // 原因：实际项目中经常需要利用 CSS 优先级覆盖样式，且大多数开发者熟悉优先级规则，强制检查会带来过多噪音。
    'no-descending-specificity': null, 

    // 禁止重复的 @import 规则。
    'no-duplicate-at-import-rules': true,

    // 禁止重复的选择器。
    'no-duplicate-selectors': true,

    // 禁用 'no-empty-source'（禁止空源文件）。
    // 原因：允许存在空的样式文件（可能作为占位或入口）。
    'no-empty-source': null,

    // 禁止多余的分号。
    'no-extra-semicolons': true,

    // 禁止无效的双斜杠注释（在非 SCSS/Less 环境下，双斜杠注释是非法的，但在 SCSS 中合法，此处配合 SCSS 使用）。
    'no-invalid-double-slash-comments': true,

    // 禁止未知的属性名（拼写错误检查）。
    'property-no-unknown': true,

    // 禁止未知的伪类选择器。
    // 配置例外：忽略 'global', 'local', 'export'，这些通常是 CSS Modules 或特定框架使用的伪类。
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'export'],
      },
    ],

    // 禁止未知的伪元素选择器（如 ::colon 误写）。
    'selector-pseudo-element-no-unknown': true,

    // 禁止字符串中出现换行符。
    'string-no-newline': true,

    // 禁止未知的单位。
    // 配置例外：忽略 'rpx'，这是微信小程序等移动端开发常用的响应式像素单位。
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],

    /**
     * Stylistic issues (风格问题)
     * 这些规则不涉及代码正确性，只关乎代码格式和一致性。
     * @link https://stylelint.io/user-guide/rules/list#stylistic-issues
     */

    // 缩进为 2 个空格。
    indentation: 2,

    // 多行代码块的右大括号前必须换行。
    'block-closing-brace-newline-before': 'always-multi-line',

    // 单行代码块的右大括号前必须有一个空格。
    'block-closing-brace-space-before': 'always-single-line',

    // 多行代码块的左大括号后必须换行。
    'block-opening-brace-newline-after': 'always-multi-line',

    // 左大括号前必须有一个空格（适用于所有情况）。
    'block-opening-brace-space-before': 'always',

    // 单行代码块的左大括号后必须有一个空格。
    'block-opening-brace-space-after': 'always-single-line',

    // 十六进制颜色值必须小写（如 #fff 而不是 #FFF）。
    'color-hex-case': 'lower',

    // 十六进制颜色值尽可能使用简写（如 #fff 而不是 #ffffff）。
    'color-hex-length': 'short',

    // 注释内容内部两侧必须有空格（/* content */ 而不是 /*content*/）。
    'comment-whitespace-inside': 'always',

    // 声明冒号前不允许有空格（color: red 而不是 color : red）。
    'declaration-colon-space-before': 'never',

    // 声明冒号后必须有一个空格（color: red 而不是 color:red）。
    'declaration-colon-space-after': 'always',

    // 单行声明块中最多只能有 1 个声明。
    // 强制将多个属性换行书写，提高可读性。
    'declaration-block-single-line-max-declarations': 1,

    // 声明块末尾必须加分号。
    // 特别配置：将此规则的严重性提升为 'error'，即使全局默认是 warning，漏写分号也会导致报错。
    'declaration-block-trailing-semicolon': [
      'always',
      {
        severity: 'error',
      },
    ],

    // 长度为 0 时禁止加单位（如 0px 应写为 0）。
    // 配置例外：忽略自定义属性（CSS Variables），因为 var(--size) 可能是 0px，直接写 0 可能会破坏逻辑。
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],

    // 每行最大长度限制为 100 个字符。
    'max-line-length': 100,

    // 禁止使用 ID 选择器（特异性太高，不利于维护）。
    'selector-max-id': 0,

    // 值列表逗号后在单行情况下必须有一个空格（如 padding: 10px, 20px）。
    'value-list-comma-space-after': 'always-single-line',

    /**
     * stylelint-scss rules (SCSS 专用规则)
     * @link https://www.npmjs.com/package/stylelint-scss
     */

    // SCSS 双斜杠注释内部两侧必须有空格（// content 而不是 //content）。
    'scss/double-slash-comment-whitespace-inside': 'always',
  },

  // 忽略以下类型的文件，不对其进行样式检查。
  // 因为 stylelint 主要针对 CSS/SCSS/Less，JS/TS 文件中嵌入的样式通常由其他工具（如 eslint-plugin-css）处理。
  ignoreFiles: ['&zwnj;**/*.js', '**&zwnj;/*.jsx', '&zwnj;**/*.ts', '**&zwnj;/*.tsx'],
};
