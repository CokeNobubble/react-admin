import { IPage } from '@/interface';

export interface IUpdateUserData {
  nickname: string,
  sex: string,
  phone: string
}


export interface ISearchUserData extends IPage {
  keyword: string
}

export interface IExportData {
  ids: number[] | []
}
