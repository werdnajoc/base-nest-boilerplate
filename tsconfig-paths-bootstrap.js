// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsConfig = require('./tsconfig.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});