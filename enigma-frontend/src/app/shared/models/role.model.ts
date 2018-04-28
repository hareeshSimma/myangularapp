export class Role {
    constructor(public role_name: string,
                public description: string,
                public canCreate?:any[],
                public createdBy?:string,
                public privilege?: any[],
                public _id?: string,
                public createdAt?: Date,
                public updatedAt?: Date) {}
}