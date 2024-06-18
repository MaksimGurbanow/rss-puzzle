import {Configuration} from 'webpack';

export function buildResolver(): Configuration['resolve'] {
  return {
    extensions: ['.ts', '.js'],
  }
}