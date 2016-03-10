var actions = {
  // remote state
  UPDATE_METAMASK_STATE: 'UPDATE_METAMASK_STATE',
  updateMetamaskState: updateMetamaskState,
  // intialize screen
  CREATE_NEW_VAULT_IN_PROGRESS: 'CREATE_NEW_VAULT_IN_PROGRESS',
  SHOW_CREATE_VAULT: 'SHOW_CREATE_VAULT',
  SHOW_RESTORE_VAULT: 'SHOW_RESTORE_VAULT',
  SHOW_INIT_MENU: 'SHOW_INIT_MENU',
  SHOW_NEW_VAULT_SEED: 'SHOW_NEW_VAULT_SEED',
  SHOW_INFO_PAGE: 'SHOW_INFO_PAGE',
  unlockMetamask: unlockMetamask,
  showCreateVault: showCreateVault,
  showRestoreVault: showRestoreVault,
  showInitializeMenu: showInitializeMenu,
  createNewVault: createNewVault,
  createNewVaultInProgress: createNewVaultInProgress,
  showNewVaultSeed: showNewVaultSeed,
  showInfoPage: showInfoPage,
  // unlock screen
  UNLOCK_IN_PROGRESS: 'UNLOCK_IN_PROGRESS',
  UNLOCK_FAILED: 'UNLOCK_FAILED',
  UNLOCK_METAMASK: 'UNLOCK_METAMASK',
  LOCK_METAMASK: 'LOCK_METAMASK',
  tryUnlockMetamask: tryUnlockMetamask,
  lockMetamask: lockMetamask,
  unlockInProgress: unlockInProgress,
  // accounts screen
  SET_SELECTED_ACCOUNT: 'SET_SELECTED_ACCOUNT',
  SHOW_ACCOUNT_DETAIL: 'SHOW_ACCOUNT_DETAIL',
  SHOW_ACCOUNTS_PAGE: 'SHOW_ACCOUNTS_PAGE',
  SHOW_CONF_TX_PAGE: 'SHOW_CONF_TX_PAGE',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
  setSelectedAddress: setSelectedAddress,
  sendTx: sendTx,
  cancelTx: cancelTx,
  completedTx: completedTx,
  txError: txError,
  // app messages
  showAccountDetail: showAccountDetail,
  showAccountsPage: showAccountsPage,
  showConfTxPage: showConfTxPage,
  // config screen
  SHOW_CONFIG_PAGE: 'SHOW_CONFIG_PAGE',
  SET_RPC_TARGET: 'SET_RPC_TARGET',
  showConfigPage: showConfigPage,
  setRpcTarget: setRpcTarget,
  // hacky - need a way to get a reference to account manager
  _setAccountManager: _setAccountManager,
}

module.exports = actions


var _accountManager = null
function _setAccountManager(accountManager){
  _accountManager = accountManager
}

// async actions

function tryUnlockMetamask(password) {
  return (dispatch) => {
    dispatch(this.unlockInProgress())
    _accountManager.submitPassword(password, (err) => {
      if (err) {
        dispatch(this.unlockFailed())
      } else {
        dispatch(this.unlockMetamask())
      }
    })
  }
}

function createNewVault(password) {
  return (dispatch) => {
    dispatch(this.createNewVaultInProgress())
    _accountManager.createNewVault(password, (err, result) => {
      dispatch(this.showNewVaultSeed(result))
    })
  }
}

function showInfoPage() {
  return {
    type: this.SHOW_INFO_PAGE,
  }
}

function setSelectedAddress(address) {
  return (dispatch) => {
    _accountManager.setSelectedAddress(address)
  }
}

function sendTx(txData) {
  return (dispatch) => {
    _accountManager.approveTransaction(txData.id, (err) => {
      if (err) {
        alert(err.message)
        dispatch(this.txError(err))
        return console.error(err.message)
      }
      dispatch(this.completedTx(txData.id))
    })
  }
}

function completedTx(id) {
  return {
    type: this.COMPLETED_TX,
    id,
  }
}

function txError(err) {
  return {
    type: this.TRANSACTION_ERROR,
    message: err.message,
  }
}

function cancelTx(txData){
  return (dispatch) => {
    _accountManager.cancelTransaction(txData.id)
    dispatch(this.showAccountsPage())
  }
}

//
// initialize screen
//


function showCreateVault() {
  return {
    type: this.SHOW_CREATE_VAULT,
  }
}

function showRestoreVault() {
  return {
    type: this.SHOW_RESTORE_VAULT,
  }
}

function showInitializeMenu() {
  return {
    type: this.SHOW_INIT_MENU,
  }
}

function createNewVaultInProgress() {
  return {
    type: this.CREATE_NEW_VAULT_IN_PROGRESS,
  }
}

function showNewVaultSeed(seed) {
  return {
    type: this.SHOW_NEW_VAULT_SEED,
    value: seed,
  }
}

//
// unlock screen
//

function unlockInProgress() {
  return {
    type: this.UNLOCK_IN_PROGRESS,
  }
}

function unlockFailed() {
  return {
    type: this.UNLOCK_FAILED,
  }
}

function unlockMetamask() {
  return {
    type: this.UNLOCK_METAMASK,
  }
}

function updateMetamaskState(newState) {
  return {
    type: this.UPDATE_METAMASK_STATE,
    value: newState,
  }
}

function lockMetamask() {
  _accountManager.setLocked()
  return {
    type: this.LOCK_METAMASK,
  }
}

function showAccountDetail(address) {
  return {
    type: this.SHOW_ACCOUNT_DETAIL,
    value: address,
  }
}

function showAccountsPage() {
  return {
    type: this.SHOW_ACCOUNTS_PAGE,
  }
}

function showConfTxPage() {
  return {
    type: this.SHOW_CONF_TX_PAGE,
  }
}

function showConfigPage() {
  return {
    type: this.SHOW_CONFIG_PAGE,
  }
}

//
// config
//

function setRpcTarget(newRpc) {
  _accountManager.setRpcTarget(newRpc)
  return {
    type: this.SET_RPC_TARGET,
    value: newRpc,
  }
}
