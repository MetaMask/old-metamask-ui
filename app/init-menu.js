const inherits = require('util').inherits
const EventEmitter = require('events').EventEmitter
const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const getCaretCoordinates = require('textarea-caret')
const Mascot = require('./components/mascot')
const actions = require('./actions')

module.exports = connect(mapStateToProps)(InitializeMenuScreen)


inherits(InitializeMenuScreen, Component)
function InitializeMenuScreen() {
  Component.call(this)
  this.animationEventEmitter = new EventEmitter()
}

function mapStateToProps(state) {
  return {
    // state from plugin
    currentView: state.appState.currentView,
  }
}



InitializeMenuScreen.prototype.render = function() {
  var state = this.props

  switch (state.currentView.name) {
    
    case 'createVault':
      return h(CreateVaultPage)
    
    case 'createVaultComplete':
      return this.renderCreateVaultComplete()
    
    case 'restoreVault':
      return this.renderRestoreVault()
    
    default:
      return this.renderMenu()

  }

}

// InitializeMenuScreen.prototype.componentDidMount = function(){
//   document.getElementById('password-box').focus()
// }

InitializeMenuScreen.prototype.renderMenu = function() {
  var state = this.props
  return (
    
    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      h('h2.page-subtitle', 'Welcome!'),

      h(Mascot, {
        animationEventEmitter: this.animationEventEmitter,
      }),

      h('button.btn-thin', {
        onClick: this.showCreateVault.bind(this),
      }, 'Create New Vault'),
      
      h('.flex-row.flex-center.flex-grow', [
        h('hr'),
        h('div', 'OR'),
        h('hr'),
      ]),

      h('button.btn-thin', {
        onClick: this.showRestoreVault.bind(this),
      }, 'Restore Existing Vault'),

    ])

  ) 
}

InitializeMenuScreen.prototype.renderCreateVault = function() {
  var state = this.props
  return (
    
    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
          onClick: this.showInitializeMenu.bind(this),
        }),
        h('h2.page-subtitle', 'Create Vault'),
      ]),

      // password
      h('label', {
        htmlFor: 'password-box',
      }, 'New Password (min 8 chars):'),

      h('input', {
        type: 'password',
        id: 'password-box',
        // onKeyPress: this.onKeyPress.bind(this),
        // onInput: this.inputChanged.bind(this),
      }),

      // confirm password
      h('label', {
        htmlFor: 'password-box-confirm',
      }, 'Confirm Password:'),

      h('input', {
        type: 'password',
        id: 'password-box-confirm',
        onKeyPress: this.onMaybeCreate.bind(this),
        // onInput: this.inputChanged.bind(this),
      }),

      // submit
      h('button.create-vault.btn-thin', {
        onClick: this.createNewVault.bind(this),
      }, 'OK'),

      this.props.warning && (
        
        h('span', this.props.warning)

      ),

    ])

  ) 
}

InitializeMenuScreen.prototype.renderCreateVaultComplete = function() {
  var state = this.props
  return (
    
    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('h2.page-subtitle', 'Vault Created'),
      ]),


      h('h3', 'Wallet Seed'),
      h('textarea.twelve-word-phrase', {
        value: 'hey ho what the actual hello rubber duck bumbersnatch crumplezone frankenfurter',
      }),

      h('button.btn-thin', {
        onClick: this.showAccounts.bind(this),
      }),

      h('h4', 'Important'),
      h('pre', 'These 12 words can recreate all of your MetaMask accounts for this vault.\nKeep them private and save them!'),

    ])

  ) 
}

InitializeMenuScreen.prototype.renderRestoreVault = function() {
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

// InitializeMenuScreen.prototype.splitWor = function() {
//   this.props.dispatch(actions.showInitializeMenu())
// }

InitializeMenuScreen.prototype.showInitializeMenu = function() {
  this.props.dispatch(actions.showInitializeMenu())
}

InitializeMenuScreen.prototype.showCreateVault = function() {
  this.props.dispatch(actions.showCreateVault())
}

InitializeMenuScreen.prototype.showRestoreVault = function() {
  this.props.dispatch(actions.showRestoreVault())
}

InitializeMenuScreen.prototype.showAccounts = function() {
  this.props.dispatch(actions.showAccountsPage())
}

// create vault

InitializeMenuScreen.prototype.onMaybeCreate = function(event) {
  if (event.key === 'Enter') {
    this.createNewVault()
  }
}

InitializeMenuScreen.prototype.createNewVault = function(){
  var passwordBox = document.getElementById('password-box')
  var password = passwordBox.value
  var passwordConfirmBox = document.getElementById('password-box-confirm')
  var passwordConfirm = passwordConfirmBox.value
  if (password.length < 8) {
    this.props.warning = 'password not long enough'
    return
  }
  if (password !== passwordConfirm) {
    this.props.warning = 'passwords dont match'
    return
  }
  this.props.dispatch(actions.createNewVault(password))
}

InitializeMenuScreen.prototype.submitPassword = function(event){
  var element = event.target
  var password = element.value
  element.value = ''
  this.props.submitPassword(password)
}

InitializeMenuScreen.prototype.inputChanged = function(event){
  // tell mascot to look at page action
  var element = event.target
  var boundingRect = element.getBoundingClientRect()
  var coordinates = getCaretCoordinates(element, element.selectionEnd)
  this.animationEventEmitter.emit('point', {
    x: boundingRect.left + coordinates.left - element.scrollLeft,
    y: boundingRect.top + coordinates.top - element.scrollTop,
  })
}

InitializeMenuScreen.prototype.emitAnim = function(name, a, b, c){
  this.animationEventEmitter.emit(name, a, b, c)
}