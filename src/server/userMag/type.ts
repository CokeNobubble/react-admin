import { IPage } from '@/interface';

export interface IUpdateUserData {
  id: number,
  nickname: string,
  sex: string,
  phone: string
}


export interface ISearchUserData extends IPage {
  keyword: string
}
