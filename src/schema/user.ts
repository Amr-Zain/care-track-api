import { object, string, date, mixed, number, bool } from "yup";
import { UserType } from "../types/util";

export default interface User {
    id : string;
    userType : UserType;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    city: string;
    age: number;
    img: string;
    gender: boolean;
    birthday: Date;
    password: string;
    createdAt: number;
}
export const createUserSchema = object({/* date validation not working errors not sent back to the user */
    body:object({
        firstName: string().required('firstName is required'),
        lastName: string().required('lastName is required'),
        email : string().email('must be a valid email').required('email is reqired'),
        phone: string().matches(/^01[0125][0-9]{8}$/, 'Phone number is not valid').required('phone is reqired'),
        city: string().required('city is required'),
        birthday: number().required('birthday is required'),
        password: string().min(6,'password has to be at least 6 digits').max(20,'password must be less than 20 digits').required('password is required'),
        userType:  mixed().required('userType is required')
        .oneOf([1,2,3,4,'1','2','3','4']) ,
        gender: bool().required('gender is required')
    })
}) 