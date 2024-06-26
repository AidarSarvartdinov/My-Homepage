import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/script.ts',
    output: {file: 'dist/bundle.js'},
    plugins: [
        typescript(),
        nodeResolve({browser: true}),
        terser(),
    ]
}