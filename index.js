const React = require('react')
const render = require('react-dom').render
const h = require('react-hyperscript')
const Root = require('./app/root')


var container = document.getElementById('app-content')

render(h(Root), container)

