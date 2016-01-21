const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const copyToClipboard = require('copy-to-clipboard')
const actions = require('./actions')
const AccountPanel = require('./components/account-panel')
const valuesFor = require('./util').valuesFor
const addressSummary = require('./util').addressSummary
const formatBalance = require('./util').formatBalance
const dataSize = require('./util').dataSize

module.exports = connect(mapStateToProps)(ConfirmTxScreen)

function mapStateToProps(state) {
  return {
    identities: state.metamask.identities,
    selectedAddress: state.metamask.selectedAddress,
    unconfTxs: state.metamask.unconfTxs,
    index: state.appState.currentView.context,
  }
}

inherits(ConfirmTxScreen, Component)
function ConfirmTxScreen() {
  Component.call(this)
}


ConfirmTxScreen.prototype.render = function() {
  var state = this.props
  var unconfTxList = valuesFor(state.unconfTxs)
  var txData = unconfTxList[state.index]
  var txParams = txData.txParams
  var address =  txParams.from || state.selectedAddress
  var identity = state.identities[address]
  console.log(txParams.from, state.selectedAddress, address)
  return (

    h('.account-detail-section.flex-column.flex-grow', [

      // subtitle and nav
      h('.flex-row.flex-center', [
        h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
          onClick: this.navigateToAccounts.bind(this),
        }),
        h('h2.page-subtitle', 'Confirm Transaction'),
      ]),

      // account that will sign
      h(AccountPanel, {
        showFullAddress: true,
        identity: identity,
      }),

      // tx data
      h('.tx-data.flex-column.flex-justify-center.flex-grow.select-none', [
        
        h('.flex-row.flex-space-between', [
          h('label.font-small', 'ADDRESS'),
          h('span.font-small.cursor-pointer', addressSummary(txParams.to)),
        ]),
        
        h('.flex-row.flex-space-between', [
          h('label.font-small', 'AMOUNT'),
          h('span.font-small', formatBalance(txParams.value)),
        ]),

        h('.flex-row.flex-space-between', [
          h('label.font-small', 'DATA SIZE'),
          h('span.font-small', dataSize(txParams.data)),
        ]),

      ]),

      // password
      h('input', {
        disabled: true,
        type: 'password',
        id: 'password-box',
        // onKeyPress: this.onKeyPress.bind(this),
        // onInput: this.inputChanged.bind(this),
      }),

      // confirm cancel
      h('.flex-row', [        
        h('button', {
          disabled: true,
        }, 'Cancel'),
        h('button', {
          onClick: this.sendTransaction.bind(this, txData),
        }, 'Send'),
      ]),

    ])
    
  )
}

ConfirmTxScreen.prototype.sendTransaction = function(txData, event){
  event.stopPropagation()
  this.props.dispatch(actions.confirmTx('password_goes_here', txData))
}

ConfirmTxScreen.prototype.navigateToAccounts = function(event){
  event.stopPropagation()
  this.props.dispatch(actions.showAccountsPage())
}
