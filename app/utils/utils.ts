import string from "@adonisjs/core/helpers/string"

export interface  UserData={

  nom:string,
  password:string,
  role :string,
  role: string,

}

export interface TachesData={

  etat:string,
  user_id:number,
  projet_id:number,
  taches:string,
}


export interface ProjetData={

  projet:string,
  etat:string,

}

