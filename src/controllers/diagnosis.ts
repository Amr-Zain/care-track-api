import { RequestWithUserSession } from "../types/util";
import Datastore from '../datastore/services/index';
import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { Diagnosis, Medicine, Receptionsit, User } from "../schema";
import { calcDiagnoisDate } from "../utill"
import { randomUUID } from "crypto";
import { pool } from '../datastore/connect';

const datastore = new Datastore(pool);

export const listDiagnosis = async (req: RequestWithUserSession, res: Response) => {
    
    const spec = req.body.specializations;
    const date = calcDiagnoisDate(req.body.date);
    const diagnosis = await datastore.listPatientDiagnosis(spec, date, req.body.isOwnDoctorDiagnois, req.user.id);
    res.status(StatusCodes.OK).json({ data: diagnosis });
}

export const postDiagnois = async (req: RequestWithUserSession, res: Response) => {
    
    const diagnosis: Diagnosis = {
        id: randomUUID(),
        date: Date.now(),
        doctorId: req.user.id,
        description: req.body.description,
        patientId: req.body.patientId,
        clinicId: req.body.clinicId,
        medicines: req.body.medicines.map(med => ({ ...med, id: randomUUID(), diagnosisId: diagnosis.id }))
    }
    await datastore.createDiagnosis(diagnosis);
    res.status(StatusCodes.OK).json({ data: diagnosis });
}
export const getDiagnosis = async (req: RequestWithUserSession, res: Response) => {

    const diagnosis = await datastore.getDiagnosisById(req.params.diagnosisId);
    if (!diagnosis)
        res.status(StatusCodes.NOT_FOUND).json({ message: 'diagnosis not found' })
    if (diagnosis.patientId !== req.params.patientId)
        res.status(StatusCodes.FORBIDDEN).json({ message: 'not allowed to access' })
    res.status(StatusCodes.OK).json({ data: diagnosis });
}
export const updateMedicine = async (req: RequestWithUserSession, res: Response) => {

    const medicine = await datastore.getMedicine(req.params.medicineId);
    if (!medicine) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'medicine not found' })
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (medicine.doctorId !== req.user.id) {
        res.status(StatusCodes.FORBIDDEN).json('not authrized to alter this filed')
    }
    const med: Medicine= {
        id: req.body.id,
        dose: req.body.dose,
        name: req.body.name,
        duration: req.body.duration,
        description: req.body.description,
        diagnosisId: ' '
    }
    await datastore.updateMedicine(med)
    res.status(StatusCodes.OK).json({ message: 'medicine modifyed' });
}
export const deleteMedicine = async (req: RequestWithUserSession, res: Response) => {
    const medicine = await datastore.getMedicine(req.params.medicineId);
    if (!medicine) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'medicine not found' })
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (medicine.doctorId !== req.user.id) {
        res.status(StatusCodes.FORBIDDEN).json('not authrized to alter this filed')
    }
    await datastore.deleteMedicine(req.params.medicineId)
    res.status(StatusCodes.OK).json({ message: 'medicine delete' });
}