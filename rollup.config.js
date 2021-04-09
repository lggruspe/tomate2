export default {
  input: 'src/index.js',
  external: ['loulou'],
  output: {
    file: 'build/bundle.js',
    format: 'es',
    paths: {
      loulou: 'https://cdn.jsdelivr.net/npm/loulou@1.2.3/dist/index.esm.js'
    }
  }
}
