const inherits = require('util').inherits
const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../actions')

module.exports = connect(mapStateToProps)(RestoreVaultScreen)


inherits(RestoreVaultScreen, Component)
function RestoreVaultScreen() {
  Component.call(this)
}

function mapStateToProps(state) {
  return {}
}


RestoreVaultScreen.prototype.render = function() {
  var state = this.props
  return (

    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
          onClick: this.showInitializeMenu.bind(this),
        }),
        h('h2.page-subtitle', 'Restore Vault'),
      ]),


      h('h3', 'Coming soon....'),
      // h('textarea.twelve-word-phrase', {
      //   value: 'hey ho what the actual hello rubber duck bumbersnatch crumplezone frankenfurter',
      // }),

    ])

  )
}

RestoreVaultScreen.prototype.showInitializeMenu = function() {
  this.props.dispatch(actions.showInitializeMenu())
}
