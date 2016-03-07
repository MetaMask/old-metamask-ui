const inherits = require('util').inherits
const React = require('react')
const Component = require('react').Component
const PropTypes = require('react').PropTypes
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const extend = require('xtend')
const actions = require('./actions')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')
// init
const InitializeMenuScreen = require('./first-time/init-menu')
const CreateVaultScreen = require('./first-time/create-vault')
const CreateVaultCompleteScreen = require('./first-time/create-vault-complete')
const RestoreVaultScreen = require('./first-time/restore-vault')
// unlock
const UnlockScreen = require('./unlock')
// accounts
const AccountsScreen = require('./accounts')
const AccountDetailScreen = require('./account-detail')
const ConfirmTxScreen = require('./conf-tx')
// other views
const ConfigScreen = require('./config')

module.exports = connect(mapStateToProps)(App)


inherits(App, Component)
function App() { Component.call(this) }

function mapStateToProps(state) {
  return {
    // state from plugin
    isInitialized: state.metamask.isInitialized,
    isUnlocked: state.metamask.isUnlocked,
    currentView: state.appState.currentView,
    activeAddress: state.appState.activeAddress,
  }
}

App.prototype.render = function() {
  // const { selectedReddit, posts, isFetching, lastUpdated } = this.props
  var state = this.props
  var view = state.currentView.name
  return (

    h('.flex-column.flex-grow.full-height', [

      // top row
      h('.app-header.flex-column.flex-center', [
        h('h1', 'MetaMask'),
      ]),

      // panel content
      h('.app-primary.flex-grow', [
        h(ReactCSSTransitionGroup, {
          transitionName: "main",
          transitionAppear: true,
          transitionEnterTimeout: 300,
          transitionLeaveTimeout: 300,
        }, [
          this.renderPrimary(),
        ]),
      ]),

      // footer
      h('.app-footer.flex-row.flex-space-around', {
        style: {
          alignItems: 'center',
        }
      }, [

        // settings icon
        h('i.fa.fa-cog.fa-lg' + (view  === 'config' ? '.active' : '.cursor-pointer'), {
          style: {
            opacity: state.isUnlocked ? '1.0' : '0.0',
            transition: 'opacity 200ms ease-in',
            //transform: `translateX(${state.isUnlocked ? '0px' : '-100px'})`,
          },
          onClick: function(ev) {
            state.dispatch(actions.showConfigPage())
          },
        }),

        // toggle
        onOffToggle({
          toggleMetamaskActive: this.toggleMetamaskActive.bind(this),
          isUnlocked: state.isUnlocked,
        }),

        // help
        h('i.fa.fa-question.fa-lg.cursor-pointer'),
      ]),

    ])

  )
}

App.prototype.toggleMetamaskActive = function(){
  if (!this.props.isUnlocked) {
    // currently inactive: redirect to password box
    var passwordBox = document.querySelector('input[type=password]')
    if (!passwordBox) return
    passwordBox.focus()
  } else {
    // currently active: deactivate
    this.props.dispatch(actions.lockMetamask(false))
  }
}

App.prototype.renderPrimary = function(state){
  var state = this.props

  // show initialize screen
  if (!state.isInitialized) {

    // show current view
    switch (state.currentView.name) {

      case 'createVault':
        return h(CreateVaultScreen, {key: 'create-vault'})

      case 'restoreVault':
        return h(RestoreVaultScreen, {key: 'restore-vault'})

      default:
        return h(InitializeMenuScreen, {key: 'initialize-menu'})

    }

  }

  // show unlock screen
  if (!state.isUnlocked) {
    return h(UnlockScreen, {key: 'unlocked'})
  }

  // show current view
  switch (state.currentView.name) {

    case 'createVaultComplete':
      return h(CreateVaultCompleteScreen, {key: 'created-vault'})

    case 'accounts':
      return h(AccountsScreen, {key: 'accounts'})

    case 'accountDetail':
      return h(AccountDetailScreen, {key: 'account-detail'})

    case 'confTx':
      return h(ConfirmTxScreen, {key: 'confirm-tx'})

    case 'config':
      return h(ConfigScreen, {key: 'config'})

    default:
      return h(AccountsScreen, {key: 'accounts'})

  }

}

function onOffToggle(state){
  var buttonSize = '50px';
  var lockWidth = '20px';
  return (
    h('.app-toggle.flex-row.flex-center.lock' + (state.isUnlocked ? '.unlocked' : '.locked'), {
      width: buttonSize,
      height: buttonSize,
    }, [
      h('div', {
        onClick: state.toggleMetamaskActive,
        style: {
          width: lockWidth,
          height: '' + parseInt(lockWidth) * 1.5 + 'px',
          position: 'relative',
        }
      }, [
        h('img.lock-top', {
          src: 'images/lock-top.png',
          style: {
            width: lockWidth,
            position: 'absolute',
          }
        }),
        h('img', {
          src: 'images/lock-base.png',
          style: {
            width: lockWidth,
            position: 'absolute',
          }
        }),
      ])
    ])

  )
}
