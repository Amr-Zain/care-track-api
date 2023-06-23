import { bool, number, object, string } from "yup"
import Patient from "./patient";



export default interface BloodRequest {
    bloodType: ['A+', 'A-', 'B+', 'B-', 'O-', 'AB+', 'AB-', 'All'];
    isRequest: boolean;
    id: string;
    date: number;
    city: string | number;
    patientId: string;
    describtion: string;
}
export interface BloodDonator extends Patient, BloodRequest {

}
const body = object({
    isRequest: bool().required('isRequest is Required'),
    bloodType: string()
        .oneOf(['A+', 'A-', 'B+', 'B-', 'O-', 'AB+', 'AB-', 'All'])
        .required('bloodType is required'),
    date: number().required('date for the request is required'),
    city: number().required('city id is required')
})
const params = object({
    requestId: string().required('request id is required')
});
export const getBloodRequestSchema = object({
    params
});
export const createBloodRequestSchema = object({
    body
});
export const updateBloodRequestSchema = object({
    body,
    params
});
export const deleteBloodRequestSchema = object({
    params
});