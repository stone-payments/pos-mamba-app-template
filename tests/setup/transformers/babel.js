/**
 * Create a custom transformer to use a shared '.babelrc.js' between all workspaces
 * */

const babelConfig = require('../../../.babelrc.js');

module.exports = require('babel-jest').createTransformer(babelConfig);
