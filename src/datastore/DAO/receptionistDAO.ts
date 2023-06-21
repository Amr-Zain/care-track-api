import { Receptionsit } from "../../schema";

export default interface ReceptionsitDAO  {
    getReceptionsit: (clinicId: string, receptionsitId: string)=>Promise<Receptionsit>;
    listReceptionsits: (clinicId: string, doctorId :string)=>Promise<Receptionsit[]>;
    createReceptionsit: (clinicId: string, receptionsitId: string, doctorId: string)=>Promise<void>;
    deleteReceptionsit: (clinicId: string, receptionsitId: string)=>Promise<void>;
    isReceptionsitOfDoctor:( doctorId: string, receptionsitId: string )=> Promise<Receptionsit| null>;

}