import path from "path";
import { Configuration } from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode } from "./config/build/types/types";

interface EnvVariables {
  mode: BuildMode;
  port: number;
}

export default (env: EnvVariables): Configuration => {
  const paths = {
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    entry: path.resolve(__dirname, 'src', 'index.ts'),
  }
  
  const config: Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths: paths,
  });

  return config;
}