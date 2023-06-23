import { Router } from 'express';
import requireUser from '../middleware/requireUser';
import validateRequest from '../middleware/validateRequest';
import { createDiagnosisSchema, deleteDiagnosisMedicineSchema, getDiagnosisSchema, listDiagnosisSchema, updateDiagnosisMedicineSchema } from '../schema/diagnosis';
import { listDiagnosis, postDiagnois, getDiagnosis, updateMedicine, deleteMedicine } from '../controllers/diagnosis';
import checkUserType from '../middleware/checkUserType';
import { checkDoctorAuth } from '../middleware/checkDoctorAuthToPatient';


const patientRouter = Router();

patientRouter.route('/:patientId/diagnosis')
        .get([requireUser, validateRequest(listDiagnosisSchema)],
                checkDoctorAuth, listDiagnosis)//list patient diagnosis with some filters
        .post([requireUser, checkUserType([2]),
                checkDoctorAuth, validateRequest(createDiagnosisSchema)], postDiagnois);//diagnosis

patientRouter.route('/:patientId/diagnosis/:diagnosisId')
        .get([requireUser, checkUserType([1, 2]), checkDoctorAuth, validateRequest(getDiagnosisSchema)], getDiagnosis)/* patient himsilf or a doctor with an appoin */
        .patch([requireUser, checkUserType([2]), validateRequest(updateDiagnosisMedicineSchema)], updateMedicine)
        .delete([requireUser, checkUserType([2]), validateRequest(deleteDiagnosisMedicineSchema)], deleteMedicine);//delete diagnosis




patientRouter.route('/:patientId/medicines').get();
patientRouter.route('/:patientId/diseases').get();




export default patientRouter;