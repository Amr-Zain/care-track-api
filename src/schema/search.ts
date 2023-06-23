import { number, object, string } from "yup";

export default interface Session {
    id : string;
    userId : string;
    valid : boolean;
    userAgent : string;
    createdAt : number;
    lastAccess : number;
}
export const searchSchema = object({
    params: object({
        type: string().required()
                .oneOf(['doctor','nurse','donation_request','donator']),
        city: string().required('city is required')
    }),
    query: object({ 
        name: string(), 
        specialization: string(), 
        gender: number().oneOf([0,1,2]),//0 male ,1 female, 2 both  
        availability:number().oneOf([0,1,2]), // 1 today, 2 tomorrow, 0 any
        sort:number().oneOf([0,1,2,3]),//0 best match,1 Top Rating 2 low price ,3 high price
        bloodType:string().oneOf(['A+','A-','B+','B-','O-','AB+','AB-','All'])
    })
})