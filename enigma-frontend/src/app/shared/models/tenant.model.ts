

export class Newtenant{
  constructor(
    public username:string,
    public email:string,
    public location:string,
    public bio:string,
    public subscript:string,
    public adminid:string,
    public adminemail:string,
    public  createdby?:string,
    public  createdAt?:Date,
    public  UpdatedAt?:Date,
    public  AccessKeys?:string,
    public cloudservice?:string,
    public  secretKey?:string){}
    
}