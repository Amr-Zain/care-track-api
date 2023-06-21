import { bool, number, object, string } from "yup"
import { User } from ".";

export default interface Receptionsit extends User{
    userId :string;
    clinicId :string;
    doctorId :string
}

const body = object({
    firstName: string().required('firstName is required'),
    lastName: string().required('lastName is required'),
    email : string().email('must be a valid email').required('email is reqired'),
    phone: string().matches(/^01[0125][0-9]{8}$/, 'Phone number is not valid').required('phone is reqired'),
    city: string().required('city is required'),
    clinicId: string().required('clinicId is required'),
    birthday: number().required('birthday is required'), 
    gender: bool().required('gender is required')
})
export const createReceptionsitSchema = object({
    body,
    params: object({
        clinicId: string().required('clinicId is required')
    })
});
export const updateReceptionsitSchema = object({
    body
})
export const getReceptionsitSchema = object({
    params :object({
        receptionsitId: string().required('receptionsitId is required')
    })
})
export const deleteReceptionsitSchema = object({
    params :object({
        id: string().required('clinicId is required'),
        receptionsitId: string().required('receptionsitId is required')
    })
})