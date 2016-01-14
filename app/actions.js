const SET_METAMASK_ACTIVE = 'SET_METAMASK_ACTIVE'
const TOGGLE_ACCOUNT_ACTIVE = 'TOGGLE_ACCOUNT_ACTIVE'
const SHOW_ACCOUNT_DETAIL = 'SHOW_ACCOUNT_DETAIL'
const SHOW_ACCOUNTS_PAGE = 'SHOW_ACCOUNTS_PAGE'

module.exports = {
  SET_METAMASK_ACTIVE: SET_METAMASK_ACTIVE,
  TOGGLE_ACCOUNT_ACTIVE: TOGGLE_ACCOUNT_ACTIVE,
  SHOW_ACCOUNT_DETAIL: SHOW_ACCOUNT_DETAIL,
  SHOW_ACCOUNTS_PAGE: SHOW_ACCOUNTS_PAGE,
  setMetamaskActive: setMetamaskActive,
  selectActiveAccount: selectActiveAccount,
  showAccountDetail: showAccountDetail,
  showAccountsPage: showAccountsPage,
}

function setMetamaskActive(value) {
  return {
    type: SET_METAMASK_ACTIVE,
    value: value,
  }
}

function selectActiveAccount(address) {
  return {
    type: TOGGLE_ACCOUNT_ACTIVE,
    value: address,
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