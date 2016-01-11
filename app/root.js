const inherits = require('util').inherits
const React = require('react')
const Component = require('react').Component
const Provider = require('react-redux').Provider
const h = require('react-hyperscript')
const configureStore = require('./store')
const App = require('./app')
const store = configureStore()
window._store = store

module.exports = Root
inherits(Root, Component)
function Root() { Component.call(this) }

Root.prototype.render = function() {
  return (
    h(Provider, { store: store }, [
      h(App),
    ])
  )
}
