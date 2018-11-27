const { basename } = require('path');
const svelte = require('svelte');
const deasync = require('deasync');
const svelteConfig = require('../../../svelte.config.js');

exports.process = (src, filename) => {
  let compiled;

  svelteConfig.preprocess.filename = filename;
  svelte
    .preprocess(src, svelteConfig.preprocess)
    .then(processed => {
      const result = svelte.compile(processed.toString(), {
        ...svelteConfig,
        format: 'cjs',
        filename,
      });

      compiled = {
        code: result.js ? result.js.code : result.code,
        map: result.js ? result.js.map : result.map,
      };
    })
    .catch(e => {
      compiled = null;
      throw new Error(
        `Couldn't compile the component "${basename(filename)}".\n${e}`,
      );
    });

  deasync.loopWhile(() => typeof compiled === 'undefined');

  return compiled;
};
