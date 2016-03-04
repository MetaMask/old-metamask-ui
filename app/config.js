const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('./actions')

module.exports = connect(mapStateToProps)(ConfigScreen)

function mapStateToProps(state) {
  return {
    rpc: state.appState.activeRpcTarget,
  }
}

inherits(ConfigScreen, Component)
function ConfigScreen() {
  Component.call(this)
}


ConfigScreen.prototype.render = function() {
  var state = this.props
  var rpc = state.rpc

  return (
    h('.flex-column.flex-grow', [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
          onClick: (event) => {
            state.dispatch(actions.showAccountsPage())
          }
        }),
        h('h2.page-subtitle', 'Configuration'),
      ]),

      // conf view
      h('.flex-column.flex-justify-center.flex-grow.select-none', [

        h('h3', null, 'Current RPC:')
        h('p', null, rpc)

      ]),
    ])
  )
}

