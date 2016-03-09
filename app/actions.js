const CREATE_NEW_VAULT_IN_PROGRESS = 'CREATE_NEW_VAULT_IN_PROGRESS'
const SHOW_NEW_VAULT_SEED = 'SHOW_NEW_VAULT_SEED'
const UNLOCK_METAMASK = 'UNLOCK_METAMASK'
const UNLOCK_IN_PROGRESS = 'UNLOCK_IN_PROGRESS'
const UNLOCK_FAILED = 'UNLOCK_FAILED'
const UPDATE_METAMASK_STATE = 'UPDATE_METAMASK_STATE'
const LOCK_METAMASK = 'LOCK_METAMASK'
const SET_SELECTED_ACCOUNT = 'SET_SELECTED_ACCOUNT'
const SHOW_ACCOUNT_DETAIL = 'SHOW_ACCOUNT_DETAIL'
const SHOW_ACCOUNTS_PAGE = 'SHOW_ACCOUNTS_PAGE'
const SHOW_INFO_PAGE = 'SHOW_INFO_PAGE'
const SHOW_CONF_TX_PAGE = 'SHOW_CONF_TX_PAGE'
const SHOW_CREATE_VAULT = 'SHOW_CREATE_VAULT'
const SHOW_RESTORE_VAULT = 'SHOW_RESTORE_VAULT'
const SHOW_INIT_MENU = 'SHOW_INIT_MENU'
const SET_RPC_TARGET = 'SET_RPC_TARGET'
const SHOW_CONFIG_PAGE = 'SHOW_CONFIG_PAGE'

module.exports = {
  // remote state
  UPDATE_METAMASK_STATE: UPDATE_METAMASK_STATE,
  updateMetamaskState: updateMetamaskState,
  // intialize screen
  CREATE_NEW_VAULT_IN_PROGRESS: CREATE_NEW_VAULT_IN_PROGRESS,
  SHOW_CREATE_VAULT: SHOW_CREATE_VAULT,
  SHOW_RESTORE_VAULT: SHOW_RESTORE_VAULT,
  SHOW_INIT_MENU: SHOW_INIT_MENU,
  SHOW_NEW_VAULT_SEED: SHOW_NEW_VAULT_SEED,
  SHOW_INFO_PAGE: SHOW_INFO_PAGE,
  showCreateVault: showCreateVault,
  showRestoreVault: showRestoreVault,
  showInitializeMenu: showInitializeMenu,
  createNewVault: createNewVault,
  createNewVaultInProgress: createNewVaultInProgress,
  showNewVaultSeed: showNewVaultSeed,
  showInfoPage: showInfoPage,
  // unlock screen
  UNLOCK_IN_PROGRESS: UNLOCK_IN_PROGRESS,
  UNLOCK_FAILED: UNLOCK_FAILED,
  UNLOCK_METAMASK: UNLOCK_METAMASK,
  LOCK_METAMASK: LOCK_METAMASK,
  tryUnlockMetamask: tryUnlockMetamask,
  lockMetamask: lockMetamask,
  // accounts screen
  SET_SELECTED_ACCOUNT: SET_SELECTED_ACCOUNT,
  SHOW_ACCOUNT_DETAIL: SHOW_ACCOUNT_DETAIL,
  SHOW_ACCOUNTS_PAGE: SHOW_ACCOUNTS_PAGE,
  SHOW_CONF_TX_PAGE: SHOW_CONF_TX_PAGE,
  setSelectedAddress: setSelectedAddress,
  sendTx: sendTx,
  cancelTx: cancelTx,
  // app messages
  showAccountDetail: showAccountDetail,
  showAccountsPage: showAccountsPage,
  showConfTxPage: showConfTxPage,
  // config screen
  SHOW_CONFIG_PAGE: SHOW_CONFIG_PAGE,
  SET_RPC_TARGET: SET_RPC_TARGET,
  showConfigPage: showConfigPage,
  setRpcTarget: setRpcTarget,
  // hacky - need a way to get a reference to account manager
  _setAccountManager: _setAccountManager,
}


var _accountManager = null
function _setAccountManager(accountManager){
  _accountManager = accountManager
}

// async actions

function tryUnlockMetamask(password) {
  return function(dispatch) {
    dispatch(unlockInProgress())
    _accountManager.submitPassword(password, function(err){
      if (err) {
        dispatch(unlockFailed())
      } else {
        dispatch(unlockMetamask())
      }
    })
  }
}

function createNewVault(password) {
  return function(dispatch) {
    dispatch(createNewVaultInProgress())
    _accountManager.createNewVault(password, function(err, result){
      dispatch(showNewVaultSeed(result))
    })
  }
}

function showInfoPage() {
  return {
    type: SHOW_INFO_PAGE,
  }
}

function setSelectedAddress(address) {
  return function(dispatch) {
    _accountManager.setSelectedAddress(address)
  }
}

function sendTx(txData){
  return function(dispatch) {
    _accountManager.approveTransaction(txData.id, function(err){
      if (err) return console.error(err.message)
      // dispatch(showAccountsPage())
    })
  }
}

function cancelTx(txData){
  return function(dispatch) {
    _accountManager.cancelTransaction(txData.id)
    dispatch(showAccountsPage())
  }
}

//
// initialize screen
//


function showCreateVault() {
  return {
    type: SHOW_CREATE_VAULT,
  }
}

function showRestoreVault() {
  return {
    type: SHOW_RESTORE_VAULT,
  }
}

function showInitializeMenu() {
  return {
    type: SHOW_INIT_MENU,
  }
}

function createNewVaultInProgress() {
  return {
    type: CREATE_NEW_VAULT_IN_PROGRESS,
  }
}

function showNewVaultSeed(seed) {
  return {
    type: SHOW_NEW_VAULT_SEED,
    value: seed,
  }
}

//
// unlock screen
//

function unlockInProgress() {
  return {
    type: UNLOCK_IN_PROGRESS,
  }
}

function unlockFailed() {
  return {
    type: UNLOCK_FAILED,
  }
}

function unlockMetamask() {
  return {
    type: UNLOCK_METAMASK,
  }
}

function updateMetamaskState(newState) {
  return {
    type: UPDATE_METAMASK_STATE,
    value: newState,
  }
}

function lockMetamask() {
  _accountManager.setLocked()
  return {
    type: LOCK_METAMASK,
  }
}

function showAccountDetail(address) {
  return {
    type: SHOW_ACCOUNT_DETAIL,
    value: address,
  }
}

function showAccountsPage() {
  return {
    type: SHOW_ACCOUNTS_PAGE,
  }
}

function showConfTxPage() {
  return {
    type: SHOW_CONF_TX_PAGE,
  }
}

function showConfigPage() {
  return {
    type: SHOW_CONFIG_PAGE,
  }
}

//
// config
//

function setRpcTarget(newRpc) {
  _accountManager.setRpcTarget(newRpc)
  return {
    type: SET_RPC_TARGET,
    value: newRpc,
  }
}
