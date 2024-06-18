import { Configuration } from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoader } from './buildLoader';
import { buildPlugins } from './buildPlugin';
import { buildResolver } from './buildResolver';
import { BuildOptions } from './types/types';


export function buildWebpack(options: BuildOptions): Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoader(options),
    },
    resolve: buildResolver(),
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}