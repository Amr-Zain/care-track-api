import { bool, object, string } from "yup";

export const createNurseSchema = object({
    body:object({
        firstName: string().required('firstName is required'),
        lastName: string().required('lastName is required'),
        email : string().email('must be a valid email').required('email is reqired'),
        phone: string().matches(/^01[0125][0-9]{8}$/, 'Phone number is not valid'),
        city: string().required('city is required'),
        fees: string().required('fees is required'),
        description: string().required('city is required'),
        location: string().required('city is required'),
        gender: bool().required('geder is required'),
        password: string().required('password is required')
    })
})