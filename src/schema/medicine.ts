import { object, string } from "yup";

export default interface Medicine {
    id: string;
    diagnosisId: string;
    name: string;
    dose: string;
    duration: string;
    description: string
}
export const getCurentMedicinesSchema = object({
    body: object({
        patientId: string().required('patientId is required'),
    }),
});
