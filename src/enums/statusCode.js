const StatusCode ={
  Success: 0,
  NoData: 1,
  IsExist: 3,

  // Register
  registerExist: 202,

  // CheckCode
  registerCodeExpired: 204,
  registerCodeFail: 205,

  // Login
  unRegister: 222,
  loginFail: 223,
  unCheckEMail: 224,

  // Deck
  DeckKindIsNull : 261,
  DeckNameIsNull : 262,
  DeckBanIsNull : 263,
  DeckNameLimit : 264,
  DeckDescriptonLimit : 265,
  DeckTypeIsNull : 266,
  DeckNoUpdateData : 267,


  BanDateExist: 241

  // Pack
};

export default StatusCode;
