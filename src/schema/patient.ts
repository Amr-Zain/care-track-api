import { object, string, array, mixed, SchemaOf, number, date } from "yup";

export default interface Patient {
    id : string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    city: string |number;
    age: number;
    img: string;
}

export const createPatient = object({
    body:object({
        firstName: string().required('firstName is required'),
        lastName: string().required('lastName is required'),
        email : string().email('must be a valid email').required('email is reqired'),
        phone: string().matches(/^01[0125][0-9]{8}$/, 'Phone number is not valid').required('phone is reqired'),
        city: string().required('city is required'),
        birthDay: date().required('birthDay is required'),
        password: string().required('password is required'),
    })
})
export const getPatienAppointmentsSchema = object({
    
})
export const createAppointmentSchema = object({
    body: object({
        doctorId: string().required('doctorId is required'),
        appointmentDate: number().required('appointentDate is required'),
    })
})
export const getDiseasesSchema = object({//it is not it's place I still thinking about the strucure of it
    params: object({
        patientId : string().required('patientId is required')
    })
})

/*
-patient 
search style 
blood bank style
medical history => diseases
footer

-doctor nurse receptionsit  
dashboard (date cards of patient add patient delete patient)
-chat 


*/