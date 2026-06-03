'use strict';

const configEslint = require('..');
const assert = require('assert').strict;

assert.strictEqual(configEslint(), 'Hello from configEslint');
console.info('configEslint tests passed');
