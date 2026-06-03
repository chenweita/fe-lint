module.exports = {
  // 设置默认的错误严重级别为 'warning'（警告），除非规则中单独指定了 severity
  defaultSeverity: 'warning',

  // 引入 stylelint-scss 插件，以支持 SCSS 语法的特定规则检查
  plugins: ['stylelint-scss'],

  rules: {
    /**
     * Possible errors (潜在错误类规则)
     * 这类规则主要用于捕捉可能导致 CSS/SCSS 解析错误或渲染异常的问题。
     * @link https://stylelint.io/user-guide/rules/#possible-errors
     */

    // 关闭原生 CSS 的未知 @ 规则检查。因为使用了 SCSS，原生的检查会误报 SCSS 特有的 @ 规则（如 @mixin, @include）
    'at-rule-no-unknown': null,
    
    // 启用 SCSS 插件提供的未知 @ 规则检查，确保只使用合法的 SCSS @ 规则
    'scss/at-rule-no-unknown': true, 

    // 关闭空代码块检查。允许存在空的 {} 块（有时用于占位或后续填充）
    'block-no-empty': null,

    // 禁止无效的十六进制颜色值（如 #fffz, #123456789 等）
    'color-no-invalid-hex': true,

    // 禁止空注释。注释内容不能为空，必须包含实际文字
    'comment-no-empty': true,

    // 禁止声明块中出现重复属性。
    // 配置项：忽略“连续出现且值不同”的重复属性（常用于 CSS fallback 兼容写法，如先写 px 再写 rem）
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],

    // 禁止简写属性覆盖之前的详细属性声明（例如：先写了 padding-left，后面又写了 padding，会导致前者失效）
    'declaration-block-no-shorthand-property-overrides': true,

    // 禁止字体家族名称重复（如 font-family: "Arial", "Arial";）
    'font-family-no-duplicate-names': true,

    // 禁止 calc() 函数中运算符周围缺少空格（如 calc(10px+20px) 是错的，应为 calc(10px + 20px)）
    'function-calc-no-unspaced-operator': true,

    // 禁止 linear-gradient 中使用非标准的方向关键词（如 to top left 应改为 to top left 的标准写法或角度）
    'function-linear-gradient-no-nonstandard-direction': true,

    // 禁止在关键帧（keyframes）声明中使用 !important
    'keyframe-declaration-no-important': true,

    // 禁止未知的媒体查询特性名称（如 @media (unknown-feature: value)）
    'media-feature-name-no-unknown': true,

    // 关闭“选择器特异性降序”检查。
    // 原因：实际项目中经常需要利用特异性优先级覆盖样式，且大多数开发者熟悉 CSS 优先级规则，强制升序会降低开发效率
    'no-descending-specificity': null, 

    // 禁止重复的 @import 规则（避免重复加载相同的样式文件）
    'no-duplicate-at-import-rules': true,

    // 禁止重复的选择器（在同一样式表中，同一个选择器不应出现多次，建议合并）
    'no-duplicate-selectors': true,

    // 关闭空源文件检查。允许文件为空（某些入口文件可能暂时为空）
    'no-empty-source': null,

    // 禁止多余的分号（如 color: red;;）
    'no-extra-semicolons': true,

    // 禁止无效的双斜杠注释。在标准 CSS 中 // 是非法的，但在 SCSS 中合法。此规则通常配合 parser 使用，确保注释格式正确
    'no-invalid-double-slash-comments': true,

    // 禁止未知的 CSS 属性名（防止拼写错误，如 colr: red）
    'property-no-unknown': true,

    // 禁止未知的伪类选择器。
    // 配置项：忽略 'global', 'local', 'export'，这些通常是 CSS Modules 或特定框架使用的伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'export'],
      },
    ],

    // 禁止未知的伪元素选择器（如 ::test，应为 ::before, ::after 等标准伪元素）
    'selector-pseudo-element-no-unknown': true,

    // 禁止字符串中出现换行符（字符串应保持单行，多行内容应使用转义或拼接）
    'string-no-newline': true,

    // 禁止未知的单位。
    // 配置项：忽略 'rpx' 单位，这是微信小程序等移动端开发常用的响应式像素单位
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],

    /**
     * Stylistic issues (风格规范类规则)
     * 这类规则不影响代码运行，仅用于统一代码风格，提高可读性。
     * @link https://stylelint.io/user-guide/rules/list#stylistic-issues
     */

    // 缩进：使用 2 个空格
    indentation: 2,

    // 多行代码块的右大括号前必须换行
    'block-closing-brace-newline-before': 'always-multi-line',

    // 单行代码块的右大括号前必须有一个空格
    'block-closing-brace-space-before': 'always-single-line',

    // 多行代码块的左大括号后必须换行
    'block-opening-brace-newline-after': 'always-multi-line',

    // 左大括号前必须有一个空格（如 .class { ）
    'block-opening-brace-space-before': 'always',

    // 单行代码块的左大括号后必须有一个空格（如 .class { color: red; } ）
    'block-opening-brace-space-after': 'always-single-line',

    // 十六进制颜色值必须小写（如 #ff0000 而不是 #FF0000）
    'color-hex-case': 'lower',

    // 十六进制颜色值尽可能使用简写形式（如 #fff 而不是 #ffffff）
    'color-hex-length': 'short',

    // 注释内部两侧必须有空格（如 /* comment */ 而不是 /*comment*/）
    'comment-whitespace-inside': 'always',

    // 声明冒号前不允许有空格（如 color:red 或 color: red，但不能 color :red）
    'declaration-colon-space-before': 'never',

    // 声明冒号后必须有一个空格（如 color: red）
    'declaration-colon-space-after': 'always',

    // 单行声明块中最多只能有 1 个属性（强制单行样式简洁，超过则需换行）
    'declaration-block-single-line-max-declarations': 1,

    // 声明块末尾必须加分号。
    // 配置项：将此规则的严重级别提升为 'error'，即使全局默认是 warning，漏写分号也会报错
    'declaration-block-trailing-semicolon': [
      'always',
      {
        severity: 'error',
      },
    ],

    // 长度为 0 的值禁止带单位（如 margin: 0px 应写为 margin: 0）。
    // 配置项：忽略自定义属性（CSS Variables），因为 var(--my-var) 中的 0 可能需要单位取决于上下文
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],

    // 每行最大长度限制为 100 个字符，超过需换行
    'max-line-length': 100,

    // 禁止使用 ID 选择器（ID 特异性太高，不利于维护和复用，建议多用 class）
    'selector-max-id': 0,

    // 单行值列表中，逗号后必须有一个空格（如 margin: 10px, 20px）
    'value-list-comma-space-after': 'always-single-line',

    /**
     * stylelint-scss rules (SCSS 插件特有规则)
     * @link https://www.npmjs.com/package/stylelint-scss
     */

    // SCSS 双斜杠注释内部两侧必须有空格（如 // comment 而不是 //comment）
    'scss/double-slash-comment-whitespace-inside': 'always',
  },

  // 忽略以下类型的文件，stylelint 不会检查它们
  ignoreFiles: ['&zwnj;**/*.js', '**&zwnj;/*.jsx', '&zwnj;**/*.ts', '**&zwnj;/*.tsx'],
};
