import { bool, number, object, string } from "yup";
import { User } from ".";

export interface DoctorData {
    userId: string
    fees: number;
    description: string;
    appointmentTime: number;
    specialization: string;
}
export interface NurseData {
    userId: string
    fees: number;
    description: string;
    location: string;
}
export interface DoctorSchedule {
    day: [0, 1, 2, 3, 4, 5, 6];
    DoctorId: string;
    from: TimeRanges;
    to: TimeRanges;
}

export interface Rating {
    ratedId: string,
    patientId: string,
    value: number,
    comment: string
}
export interface DoctorFullData extends DoctorData, User { }
export interface NurseFullData extends NurseData, User { }
const body = object({
    description: string().required('description is required'),
    specialization: string().required('description is required'),
    appointmentTime: number().required('appointmentTime is required'),
    fees: number().required('fees field is required')
});


export const postDoctorDataSchema = object({
    body
});
export const postNurseDataSchema = object({
    body: object({
        description: string().required('description is required'),
        location: string().required('location is required'),
        fees: number()
    }),
});
export const getDoctorNurseSchema = object({
    params: object({
        id: string().required('id is required'),
    })
});
export const updateDoctorDataSchema = object({
    body
})
/* 
export const createPatientSchema = object({
    body:object({
        firstName: string().required('firstName is required'),
        lastName: string().required('lastName is required'),
        email : string().email('must be a valid email').required('email is reqired'),
        phone: string().matches(/^01[0125][0-9]{8}$/, 'Phone number is not valid').required('phone is reqired'),
        city: string().required('city is required'),
        fees: string().required('fees is required'),
        description: string().required('city is required'),
        location: string().required('city is required'),
        specialization: string().required('specialization is required'),
        gender: bool().required('gender is required'),
        password: string().required('password is required')
    })
}); */
export const getDoctorAppointmentsSchema = object({
    body: object({
        date: number().required('date of the Appointments is required'),
        clinicId: string().required('clinicId is required')
    }),
    params: object({
        id: string()
    })
})
export const createAppointentSchema = object({
    body: object({
        patientEmail: string().required('patientEmail is required'),
        appointmentDate: number().required('appointmentDate is required'),
    })
})