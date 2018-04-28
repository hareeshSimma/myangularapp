export class Privilege {
    constructor(public name: string,
                public description: string,
                public createdBy?:string,
                public createdOn?:Date,
                public updatedBy?:string,
                public updatedOn?:Date,
                public _id?:string) {}
}