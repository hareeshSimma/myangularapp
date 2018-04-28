export class Group {
    constructor(public group_name: string,
                public description: string,
                public createdby?: string,
                public updatedby?: string,
                public _id?:string) {}
}