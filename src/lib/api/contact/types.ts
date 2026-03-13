
export interface ICreateContactParams {
  firstname: string;
  lastname: string;
  email: string;
  profession: string;
  phone?: string;
}

export interface IUpdateContactParams extends Partial<ICreateContactParams>{

}


export interface IContactResponse {
  id: number
  firstname: string;
  lastname: string;
  email: string;
  profession: string;
  phone?: string;
}