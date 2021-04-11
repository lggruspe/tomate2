export default {
  input: 'src/index.js',
  external: ['loulou'],
  output: {
    file: 'build/bundle.js',
    format: 'es',
    paths: {
      loulou: 'https://cdn.jsdelivr.net/npm/loulou@1.2.4/dist/index.esm.js'
    }
  }
}
