const inherits = require('util').inherits
const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('./actions')

module.exports = connect(mapStateToProps)(CreateVaultCompleteScreen)


inherits(CreateVaultCompleteScreen, Component)
function CreateVaultCompleteScreen() {
  Component.call(this)
}

function mapStateToProps(state) {
  return {
    seed: state.appState.currentView.context,
  }
}

CreateVaultCompleteScreen.prototype.render = function() {
  var state = this.props
  return (
    
    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('h2.page-subtitle', 'Vault Created'),
      ]),


      h('h3', 'Wallet Seed'),
      h('textarea.twelve-word-phrase', {
        value: state.seed,
      }),

      h('button.btn-thin', {
        onClick: this.showAccounts.bind(this),
      }, 'I\'ve copied it somewhere safe.'),

      h('h4', 'Important'),
      h('pre', 'These 12 words can recreate all of your MetaMask accounts for this vault.\nKeep them private and save them!'),

    ])

  ) 
}

CreateVaultCompleteScreen.prototype.showAccounts = function() {
  this.props.dispatch(actions.showAccountsPage())
}
