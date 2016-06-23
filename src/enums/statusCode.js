const StatusCode ={
  Success: 0,
  NoData: 1,

  // Register
  registerExist: 202,

  // CheckCode
  registerCodeExpired: 204,
  registerCodeFail: 205,

  // Login
  unRegister: 222,
  loginFail: 223,
  unCheckEMail: 224,

  // DeckE
  DeckKindIsNull : 261,
  DeckNameIsNull = 262,
  DeckBanIsNull = 263,
  DeckNameLimit = 264,

  BanDateExist: 241
};

export default StatusCode;
