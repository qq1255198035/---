const API_BASE_URL = 'http://localhost:8000/'
const api = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  //模拟接口

  IssHomeTable: API_BASE_URL + 'Issuer/index/table.json',
  IssHomePie: API_BASE_URL + 'Issuer/index/pie.json',
  IssHomeMsg: API_BASE_URL + 'Issuer/index/msg.json',
  IssHomeNum: API_BASE_URL + 'Issuer/index/number.json',
  IssHdglCard: API_BASE_URL + 'Issuer/hdgl/active.json',
  IssHomeMsg1: API_BASE_URL + 'Issuer/index/msg1.json'
}
export default api
