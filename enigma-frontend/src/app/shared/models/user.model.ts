
export class User {
    constructor(public  first_name:string,
                public  last_name:string,
                public  username: string,
                public  email: string,
                public  secondry_email:string,
                public  role:string,
                public  groupid:string,
                public  rolePrivileges?:string,
                public  id?:string,
                public  token?:string,
                public  parentid?: string,
                public  createdby?: string,
                public  createdAt?:Date,
                public  UpdatedAt?:Date,
                public  twf?:Boolean,
                public  secret?:string,
                ) {}
}
