import esbuild from 'esbuild';
import pkg from 'esbuild-plugin-external-global';
import * as pj from "./package.json" assert { type: 'json' };
console.log(pj.default);

const {externalGlobalPlugin} = pkg;

console.log("Building");
esbuild.build({
    logLevel: "info",
    entryPoints: ['src/URLChangerNew.tsx'],
    bundle: true,
    outfile: 'build/urlchanger_ng.' + pj.default.version + '.js',
    format:"esm",
    external:["React"],
    plugins: [
      externalGlobalPlugin({
        'react': 'window.boomi.flow.React'
      })
    ]
  });