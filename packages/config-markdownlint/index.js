export default {
    "$schema": "https://raw.githubusercontent.com/DavidAnson/markdownlint/main/schema/markdownlint-config-schema.json",
    // 指定此配置文件遵循的 JSON Schema 定义，有助于编辑器和工具进行验证和智能提示
  
    "default": true,
    // 将所有未在此配置文件中明确指定的规则设置为启用状态，并采用其默认的严重性级别（通常为 "error"）
  
    "ul-style": {
      "style": "dash"
    },
    // 配置无序列表样式规则（MD004）
    // 强制要求所有无序列表项使用短横线（-）作为项目符号，禁止使用星号（*）或加号（+）
  
    "no-trailing-spaces": {
      "br_spaces": 0,
      "list_item_empty_lines": false
    },
    // 行尾不能有空格，两项之间不能有缩进
    // 配置行尾空格规则（MD009）
    // br_spaces: 0 - 完全禁止行尾存在任何空格（包括通常用于表示硬换行的两个空格）
    // list_item_empty_lines: false - 在列表项内部的空行中，不允许存在空格
  
    "list-marker-space": false,
    // 在列表标记后使用 ‌1个空格‌。
    // 禁用列表标记后空格检查规则（MD030）
    // markdownlint 将不再检查列表标记（如 -、1.）与后续内容之间的空格数量
  
    "line-length": false,
    // 禁用行长度检查规则（MD013）
    // 代码块、表格、标题等内容可以超过默认的80字符限制，不会被标记为问题
  
    "no-inline-html": false,
    // 允许在 Markdown 文档中使用内联 HTML 标签
    // 这在需要嵌入复杂样式、脚本或 Markdown 语法无法实现的元素时非常有用
  
    "no-duplicate-header": false,
    // 允许文档中出现内容完全相同的标题
    // 禁用此规则后，即使有多个标题的文字内容相同，也不会被报错
  
    "proper-names": {
      "names": [
        "JavaScript", "HTML", "CSS", "AJAX", "JSON", "DOM", "BOM", "Less", "Sass", "SCSS",
        "HTTP", "HTTPS", "WebSocket", "ECMAScript", "ECMAScript 2015", "ECMAScript 6", "ES6", "ES2015",
        "jQuery", "jQuery Mobile", "React", "React Native", "Bootstrap", "Gulp", "Grunt", "webpack", "Yeoman",
        "npm", "spm", "Babel", "Mocha", "Jasmine",
        "PHP", "Java", "Node.js", "NodeJS", "MySQL", "MongoDB", "Redis", "Apache", "Nginx", "NGINX",
        "GitHub", "GitLab", "GitCafe",
        "Chrome", "Firefox", "Safari", "Internet Explore", "IE", "IE 7", "Opera", "UC",
        "Android", "iOS", "Windows", "OS X", "Ubuntu", "Linux", "Debian", "PC", "Mobile", "H5",
        "MacBook", "MacBook Pro", "MacBook Air", "iMac", "Mac Pro", "iPad", "Mac mini", "iPad Air", "iPad Air 2", "iPad mini",
        "iPhone", "iPhone 6s", "iPhone 6s Plus", "Apple Watch",
        "Alibaba", "Taobao", "Google", "Alphabet", "Apple", "Microsoft", "Yahoo",
        "FPS", "UI", "URL", "URI", "URLs", "URIs", "Visual Studio Code"
      ],
      // 定义了一个专有名词正确拼写列表
      // 包含大量的技术术语、品牌名、产品名、编程语言、框架、工具、公司、操作系统、浏览器等
      // 文档中这些词的出现必须与列表中的大小写完全一致，否则会被标记
  
      "code_blocks": false
      // 不检查代码块（由反引号包裹的部分）中的专有名词大小写
      // 这避免了将代码中的变量名或字符串误判为格式错误
    }
  }
  
