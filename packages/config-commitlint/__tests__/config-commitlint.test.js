'use strict';

const configCommitlint = require('..');
const assert = require('assert').strict;

assert.strictEqual(configCommitlint(), 'Hello from configCommitlint');
console.info('configCommitlint tests passed');
