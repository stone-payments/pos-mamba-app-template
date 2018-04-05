const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { resolve } = require('path')
const webpack = require('webpack')

const IS_PROD = process.env.NODE_ENV === 'production'
const IS_ANALYZING_BUNDLE = !!process.env.ANALYZING_BUNDLE

/** Current project working directory */
const PROJECT_ROOT = resolve(__dirname, '..')
/** Current project 'dist' directory */
const DIST_PATH = resolve(PROJECT_ROOT, 'dist')

/** Webpack plugins to be used while building */
let plugins = [
  new CleanWebpackPlugin([DIST_PATH], { root: PROJECT_ROOT }),
  new CopyWebpackPlugin([
    { from: './assets/', to: resolve(DIST_PATH, 'assets') },
  ]),
  /** Order the modules and chunks by occurrence for smaller bundle size */
  new webpack.optimize.OccurrenceOrderPlugin(),
]

/** If building for production... */
if (IS_PROD) {
  plugins = plugins.concat(
    /** Minifiy the bundle */
    new UglifyJsPlugin({
      cache: true, // Enables file caching
      parallel: true, // Use multiple CPUs if available,
      sourceMap: true, // Enables sourcemap,
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
    /**
     * In production build, replace required 'prop-types' with a empty module stub.
     *
     * We can do this because all @mamba/components wrap their propTypes
     * with a if(process.env.NODE_ENV === 'production') which is removed when evaluated to false by the uglify process.
     *
     * This is a little bit dangerous if there's any other external module requesting PropTypes.properties in bundle.
     **/
    new webpack.NormalModuleReplacementPlugin(
      /prop-?types$/i,
      resolve(PROJECT_ROOT, '__mocks__', 'moduleStub.js'),
    ),
    /** Generate hashes based on module's relative path */
    new webpack.HashedModuleIdsPlugin(),
    /** Separate 'entry.lib' packages from the app chunk */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib',
      minChunks: Infinity,
    }),
    /** Separate webpack bootstrap code from the app chunk  */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'webpack.bootstrap',
      minChunks: Infinity,
    }),
  )

  if (!IS_ANALYZING_BUNDLE) {
    plugins.push(
      /**
       * For scope hoisting.
       * @see https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f
       * */
      new webpack.optimize.ModuleConcatenationPlugin(),
    )
  }
}

/** Webpack configuration used for bulding */
module.exports = merge(require('./webpack.config.js'), {
  entry: {
    lib: ['preact', 'preact-compat'],
  },
  devtool: 'source-map',
  plugins,
})
