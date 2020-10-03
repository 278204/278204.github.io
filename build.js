var fs = require('fs')
const { build } = require('esbuild')

const src = './src'
const dest = './public'

handleDir('')
function handleDir(path) {
  fs.readdirSync(src + path, { withFileTypes: true }).forEach(e => {
    const filepath = path + '/' + e.name
    if (e.isFile()) {
      if (e.name.endsWith('.js')) {
        esbuild(filepath)
      } else {
        copyFile(filepath)
      }
    } else {
      handleDir(filepath)
    }
  })
}

function esbuild(file) {
  build({
    entryPoints: [src + '/' + file],
    outfile: dest + '/' + file,
    minify: false,
    bundle: true,
    platform: 'browser',
  }).catch(() => process.exit(1))
}

function copyFile(file) {
    var data = fs.readFileSync(src + '/' + file)
    fs.writeFileSync(dest + '/' + file, data)
}