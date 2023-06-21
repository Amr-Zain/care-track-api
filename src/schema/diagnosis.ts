import { object, string, array, mixed, number, bool } from "yup";
import  Medicine  from'./medicine'
export default interface Diagnosis {
    id: string;
    patientId: string;
    doctorId: string;
    clinicId: string;
    description: string;
    date: number;
    medicines: Medicine[];
}
const  body = object({
    patientId: string().required('patientId is required'),
    description: string().required('description is required'),
    clinicId: string().required('clinicId is required'),
    medicines: array()
            .of(object({
                name: string().required('medicine name is required'),
                dose: string().required('medicine dosage aday is required'),
                dutation: string().required('medicine dutation in weeds is required'),
                description: string().required('description for the midicine is required')
            })),
})
export const listDiagnosisSchema = object({
    params: object({
        patientId: string().required('patientId is required'),
    }),
    body: object({
        specializations : mixed().oneOf([array().of(string()),string()]), 
        date: number().required('date field is required with value of (0,1,2,3)').oneOf([0,1,2,3]),
        isOwnDoctorDiagnois: bool().default(false),
    })
});
export const getDiagnosisSchema = object({
    params: object({
        diagnosisId: string().required('diagnosisId is required'),
        patientId: string().required('diagnosisId is required'),

    })
});
export const getDiagnosisSpecializationsSchema = object({
    body: object({
        patientId: string().required('patientId is required'),
    }),
});
export const createDiagnosisSchema = object({
    body
});
export const updateDiagnosisMedicineSchema = object({
    body: object({
        id: string().required('medicine id is required'),
        name: string().required('medicine name is required'),
        dose: string().required('medicine dosage aday is required'),
        dutation: string().required('medicine dutation in weeds is required'),
        description: string().required('description for the midicine is required')
    })
});
export const deleteDiagnosisMedicineSchema = object({
    params: object({
        diagnosisId: string().required('diagnosisId is required'),
        medicineId:  string().required('medicineId is required'),
    })
});