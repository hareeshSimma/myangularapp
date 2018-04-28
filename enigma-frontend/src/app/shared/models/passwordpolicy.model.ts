export class Passwordpolicy {
    constructor(public  passwordlength:string,
        public  uppercase:string,
        public  lowercase: string,
        public  number: string,
        public  non_alphanumeric :string,
        public  ownpassword?:string,
        public  password_expiration?:any,
        public  password_reuse?:any,
        public  resetpassword?:string
        
    ) {}
}