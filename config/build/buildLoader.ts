import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildLoader({mode}: BuildOptions): ModuleOptions['rules'] {
  const isDev = mode === "development"
  
  const assetLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024,
      },
    },
    generator: {
      filename: 'images/[name][ext]',
    },
  };

  const audioLoader = {
    test: /\.mp3$/,
    use: {
      loader: 'file-loader',
      options: {
      },
    },
  };

  const scssLoader = {
    test: /\.(css|s[ac]ss)$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
          },
        },
      },
      'sass-loader'
    ],
  }

  const tsLoader = {
    test: /\.(js|tsx?)/i,
    use: 'ts-loader',
    exclude: /node_modules/,
  }
  return [
    audioLoader,
    assetLoader,
    scssLoader,
    tsLoader,
  ];
}
