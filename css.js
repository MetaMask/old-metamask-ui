const fs = require('fs')

module.exports = bundleCss

var cssFiles = {
  'fonts.css': fs.readFileSync(__dirname+'/app/css/fonts.css', 'utf8'),
  'reset.css': fs.readFileSync(__dirname+'/app/css/reset.css', 'utf8'),
  'lib.css': fs.readFileSync(__dirname+'/app/css/lib.css', 'utf8'),
  'index.css': fs.readFileSync(__dirname+'/app/css/index.css', 'utf8'),
}

function bundleCss() {
  var cssBundle = Object.keys(cssFiles).reduce(function(bundle, fileName){
    var fileContent = cssFiles[fileName]
    var output = String()
    
    output += '/*========== '+fileName+' ==========*/\n\n'
    output += fileContent
    output += '\n\n'

    return bundle+output
  }, String())

  return cssBundle
}
