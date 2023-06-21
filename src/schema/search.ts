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
        type: string().required('type field is required with value of ("doctor","nurse","donation_request","donator")')
                .oneOf(['doctor','nurse','donation_request','donator']),
        city: string().required('city is required')
    }),
    query: object({ 
        name: string(), 
        specialization: string(), 
        gender: number().oneOf([0,1,2]),  
        availability:number().oneOf([0,1,2]), 
        sort:number().oneOf([0,1,2,3]),
        bloodType:string().oneOf(['A+','A-','B+','B-','O-','AB+','AB-','All'])
    })
})