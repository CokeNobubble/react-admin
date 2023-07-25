export interface Login_Reg_Data {
  username: string,
  password: string,
  captcha: string
}


export interface ICaptchaData {
  width: number,
  height: number
}


export interface IAvatarData {
  user_pic: string
}

export interface IRemoveData {
  id: number
}
