import Patient from "./patient";

export default interface BloodDonator extends Patient {
    bloodType: ['A+','A-','B+','B-','O-','AB+','AB-','All'],
    preferredDate: number,
}