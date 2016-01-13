const React = require('react')
const render = require('react-dom').render
const h = require('react-hyperscript')
const Root = require('./app/root')

module.exports = launchApp

function launchApp(opts) {

  // parse opts
  var container = opts.container

  // start app
  render(h(Root), container)

  // return api object
  return {}

}