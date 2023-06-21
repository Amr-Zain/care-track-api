import { Request } from 'express'
/* import { Doctor, Nurse } from "../schema";
export interface searchDoctorsResult {
    data: Doctor[],
    count: number
}
export interface searchDoctorFilter {
    specialization: string;
    name: string;
    city: string;
    limit:number;
    page:number;
    gender:[0,1,2];
    sort:[0,1,2,3];
    day:[0,1,2];
}

export interface searchNerseResultsResult {
    data: Nurse[],
    count: number
}
export interface searchNersesFilter {
    name: string;
    city: string;
    limit:number;
    page:number;
    gender:[0,1,2];
    sort:[0,1,2,3];
    day:[0,1,2];
} */

import { User } from "../schema";

const type = [1, 2, 3,4,] as const;
export type UserType = typeof type[number];

export interface RequestWithUserSession extends Request
{
    user :User & {sessionId :string};
}