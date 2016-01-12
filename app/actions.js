const SET_METAMASK_ACTIVE = 'SET_METAMASK_ACTIVE'
const SELECT_ACTIVE_ACCOUNT = 'SELECT_ACTIVE_ACCOUNT'
const SHOW_ACCOUNT_DETAIL = 'SHOW_ACCOUNT_DETAIL'

module.exports = {
  SET_METAMASK_ACTIVE: SET_METAMASK_ACTIVE,
  SELECT_ACTIVE_ACCOUNT: SELECT_ACTIVE_ACCOUNT,
  SHOW_ACCOUNT_DETAIL: SHOW_ACCOUNT_DETAIL,
  setMetamaskActive: setMetamaskActive,
  selectActiveAccount: selectActiveAccount,
  showAccountDetail: showAccountDetail,
}

function setMetamaskActive(value) {
  return {
    type: SET_METAMASK_ACTIVE,
    value: value,
  }
}

function selectActiveAccount(address) {
  return {
    type: SELECT_ACTIVE_ACCOUNT,
    value: address,
  }
}

function showAccountDetail(address) {
  return {
    type: SHOW_ACCOUNT_DETAIL,
    value: address,
  }
}