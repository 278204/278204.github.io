var fs = require('fs')
const { build } = require('esbuild')

const src = './src'
const dest = './public'

fs.readdirSync(src)
    .filter(e => !e.endsWith('.js'))
    .forEach(file => copyFile(src + '/' + file, dest + '/' + file))

build({
  entryPoints: [src + '/jff-table.js'],
  outfile: dest + '/jff-table.js',
  minify: true,
  bundle: true,
  platform: 'browser',
}).catch(() => process.exit(1))

function copyFile(src, dest) {
    var data = fs.readFileSync(src)
    fs.writeFileSync(dest, data)
}