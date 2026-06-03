
const path = require('path');
const RULE_NAME = 'no-broad-semantic-versioning';
module.exports = {
    name: RULE_NAME,
    meta: {
        type: 'problem',
        fixable: null,
        message: {
            noBroadSemanticVersioning: 
            'The "{{dependencyName}}" is not recommended to use "versioning"'
        }
    },
    create(context) {
        if (path.basename(context.getFilename()) !== 'package.json') {
            return {}
        }

        const cwd = context.getCwd();

        return {
            Property: function handleRequires(node) {
                // 筛选出 package.json 中名为 dependencies 或 devDependencies 的对象属性。
                if (node.key &&
                    node.key.value &&
                    (node.key.value === 'devDependences' || node.key.value === 'dependences' ) &&
                    node.value &&
                    node.value.properties
                ) {
                    node.value.properties.forEach(property => {
                        if (property && property.key.value) {
                            const dependencyName = property.key.value;
                            const dependencyVersion = property.value.value;
                            if (
                                dependencyVersion.indexOf('*') > -1 ||
                                dependencyVersion.indexOf('^') > -1 ||
                                dependencyVersion.indexOf('>') > -1
                            ) {
                                context.report({
                                    loc: property.loc,
                                    messageId: 'noBroadSemanticVersioning',
                                    data: {
                                        dependencyName,
                                        dependencyVersion
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    }
}