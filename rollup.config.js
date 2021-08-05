import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

import packageJson from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'cjs',
      file: packageJson.main,
      sourcemap: true,
      globals: { vue: 'Vue' }
    },
    {
      format: 'esm',
      file: packageJson.module,
      sourcemap: true,
      globals: { vue: 'Vue' }
    }
  ],
  plugins: [peerDepsExternal(), resolve(), typescript(), vue(), commonjs()],
  external: ['vue']
}
