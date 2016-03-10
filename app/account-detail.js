const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const copyToClipboard = require('copy-to-clipboard')
const actions = require('./actions')
const AccountPanel = require('./components/account-panel')

module.exports = connect(mapStateToProps)(AccountDetailScreen)

function mapStateToProps(state) {
  return {
    identities: state.metamask.identities,
    accounts: state.metamask.accounts,
    address: state.appState.currentView.context,
  }
}

inherits(AccountDetailScreen, Component)
function AccountDetailScreen() {
  Component.call(this)
}


AccountDetailScreen.prototype.render = function() {
  var state = this.props
  var identity = state.identities[state.address]
  var account = state.accounts[state.address]
  return (

    h('.account-detail-section.flex-column.flex-grow', [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
          onClick: this.navigateToAccounts.bind(this),
        }),
        h('h2.page-subtitle', 'Account Detail'),
      ]),

      // account summary, with embedded action buttons
      h(AccountPanel, {
        showFullAddress: true,
        identity: identity,
        account: account,
      }, [
        h('.flex-row.flex-space-around', [
          h('button', 'GET ETH'),
          h('button', {
            onClick: function(){
              copyToClipboard(identity.address)
            },
          }, 'COPY ADDR'),
          h('button', 'EXPORT'),
        ]),
      ]),

      // transaction table
      h('section.flex-column', [
        h('span', 'your transaction history will go here.'),
      ]),
    ])
  )
}

AccountDetailScreen.prototype.navigateToAccounts = function(event){
  event.stopPropagation()
  this.props.dispatch(actions.showAccountsPage())
}
