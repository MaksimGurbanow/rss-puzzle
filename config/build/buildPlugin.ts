import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BuildOptions } from './types/types';


export function buildPlugins({mode, paths}: BuildOptions): Configuration['plugins'] {
  const isProd = mode === "production";
  return [
    new HtmlWebpackPlugin({ template: paths.html }),
    isProd && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    })
  ].filter(Boolean);
}