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

      // wallet seed entry
      h('h3', 'Wallet Seed'),
      h('textarea.twelve-word-phrase', {
        placeholder: 'Enter your secret twelve word phrase here to restore your vault.'
      }),

      // password
      h('label', {
        htmlFor: 'password-box',
      }, 'New Password (min 8 chars):'),

      h('input', {
        type: 'password',
        id: 'password-box',
      }),

      // confirm password
      h('label', {
        htmlFor: 'password-box-confirm',
      }, 'Confirm Password:'),

      h('input', {
        type: 'password',
        id: 'password-box-confirm',
        onKeyPress: this.onMaybeCreate.bind(this),
      }),

      (this.warning) && (

        h('span.in-progress-notification', this.warning)

      ),

      // submit
      h('button.btn-thin', {
        onClick: this.restoreVault.bind(this),
      }, 'I\'ve double checked the 12 word phrase.'),

    ])

  )
}

RestoreVaultScreen.prototype.showInitializeMenu = function() {
  this.props.dispatch(actions.showInitializeMenu())
}

RestoreVaultScreen.prototype.onMaybeCreate = function(event) {
  if (event.key === 'Enter') {
    this.restoreVault()
  }
}

RestoreVaultScreen.prototype.restoreVault = function(){
  // check password
  var passwordBox = document.getElementById('password-box')
  var password = passwordBox.value
  var passwordConfirmBox = document.getElementById('password-box-confirm')
  var passwordConfirm = passwordConfirmBox.value
  if (password.length < 8) {
    this.warning = 'password not long enough'
    return
  }
  if (password !== passwordConfirm) {
    this.warning = 'passwords dont match'
    return
  }
  // check seed
  var seedBox = document.querySelector('textarea.twelve-word-phrase')
  var seed = seedBox.value
  if (seed.split(' ').length !== 12) {
    this.warning = 'passwords dont match'
    return
  }
  // submit
  this.warning = null
  this.props.dispatch(actions.recoverFromSeed(password, seed))
}
