import { bool, date, object, string, number, array } from "yup"

export default interface Clinic {
    id :string,
    doctorId :string,
    clinicName :string,
    appointmentTime: number;
    location :string,
    city: number,
    phone: number
}
const type = [0,1, 2, 3,4,5,6] as const;
type Day = typeof type[number];
export interface ClinicSchedule {
    day :Day,
    clinicId :string,
    from :number,
    to :number
}

const body = object({
    clinicName: string().required('clinic name is required'),
    location: string().required('location is required'),
    city: string().required('city id is required'),
    phone: string().matches(/^01[0125][0-9]{8}$/, 'clinic Phone number is not valid').required('phone is reqired'),
})
const  params =  object({
    id: string().required(' id is required')
})
export const createClinicSchema = object({
    body
});
export const updateClinicSchema = object({
    body,
    params
});
export const deleteClinicSchema = object({
    params
});
export const addClinicSchedule = object({
    body: object({

    }),
    params: object({
        day: number().min(0).max(6).required('day number is required'), 
        clinicId: string().required('clinicId is required')
    })
})

export const createScheduleSchema = object({
    body: object({
        days: array()
            .of( 
                object({
                    day: number().min(0).max(6).required('day is required'),
                    from: number().min(0).max(23).required('from hour is required'), 
                    to: number().min(0).max(23).required('to hour is required'), 
                })
            ),
    }),
    params: object({
        clinicId: string().required('clinicId is required')
    })
})
export const getScheduleSchema = object({
    params: object({
        clinicId: string().required('clinicId is required')
    })
})
export const updateDayToSchedule = object({
    body:object({
        body: object({
            from: number().min(0).max(23).required('from hour is required'), 
            to: number().min(0).max(23).required('to hour is required'), 
        })
    }),
    params: object({
        day: number().min(0).max(6).required('day number is required'), 
        clinicId: string().required('clinicId is required')
    })
})
export const deleteDayToSchedule = object({
    params: object({
        day: number().min(0).max(6).required('day number is required'), 
        clinicId: string().required('clinicId is required')
    })
})
export const getAvailableAppointmentsSchema = object({
    body: object({
        date: number().required('Please send the date ')
    }),
    params: object({
        clinicId: string().required('clinicId is required')
    })
})