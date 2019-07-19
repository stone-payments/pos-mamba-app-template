// ! This file will merge with SDK Webpack DefinePlugin
// This allow you to control app build target, feature flags, versions for production...
// Then you can use inside you code to control application features and behaviors.
// For more information access https://webpack.js.org/plugins/define-plugin/

/*
! Important note for use:
- If the value is a string it will be used as a code fragment.
- If the value isn't a string, it will be stringified (including functions).
- If the value is an object all keys are defined the same way.
- If you prefix typeof to the key, it's only defined for typeof calls.
- Can be user with `cross-env` or `export` statement
*/

const packageJson = require('./package.json');

module.exports = {
  VERSION: JSON.stringify(packageJson.version),
  // TARGET: process.env.TARGET, // ex: export TARGET="'string value'"; npm run start
  //
  // ... write any environment you want
  // 'FEATURE': JSON.stringify('my-awesome-feature')
  // 'NICE_FEATURE': JSON.stringify(true),
  // 'EXPERIMENTAL_FEATURE': JSON.stringify(false)
};
