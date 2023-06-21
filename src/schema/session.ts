import { number, object, string, mixed } from "yup";

export default interface Session {
    id : string;
    userId : string;
    userType: string;
    valid : boolean;
    userAgent : string;
    createdAt : number;
    lastAccess : number;
}
export const createUserSessionSchema = object({
    body: object({
        userType: mixed().required('userType is required')
                .oneOf([1,2,3,4,'1','2','3','4']) ,
        password: string().min(6,'password has to be at least 6 digits')
                .max(20,'password must be less than 20 digits')
                .required('password is required'),

        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
    }),
});   