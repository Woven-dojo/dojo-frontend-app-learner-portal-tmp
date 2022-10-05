const { getBaseConfig } = require('@edx/frontend-build');
const withDojoPreset = require('@woven-dojo/dojo-frontend-common/configs/eslint');

const config = withDojoPreset(getBaseConfig('eslint'));

if (!config.rules) config.rules = {};

const noExtraneousDependencies = config.rules['import/no-extraneous-dependencies'] || [
  'error',
  { devDependencies: [] },
];

// Change the eslint extends from string value to array still using the @edx/eslint-config.
// /node_modules/@edx/frontend-build/config/.eslintrc.js
config.extends = ['@edx/eslint-config', 'prettier'];

// This module is only used in tests, so it's allowed to use dev dependencies
noExtraneousDependencies[1].devDependencies.push('src/utils/tests/*');

config.rules['import/no-extraneous-dependencies'] = noExtraneousDependencies;
// https://github.com/eslint/eslint/issues/10930
config.rules['indent'] = 'off';

module.exports = config;
