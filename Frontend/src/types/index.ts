
export interface User {
  id: string;
  email: string;
  role: 'Admin' | 'Doctor';
}

export interface Patient {
  patient_id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  address: string;
  reason_for_admittance: string;
  admitted_at: string;
  status: 'Admitted' | 'Discharged';
  discharged_at: string | null;
  assigned_doctor_id: string | null;
  assigned_bed_id: string | null;
  assignedDoctor?: Doctor;
  assignedBed?: Bed;
  documents?: PatientDocument[];
  clinicalNotes?: ClinicalNote[];
}

export interface Doctor {
  doctor_id: string;
  user_id: string;
  email:string;
  name: string;
  specialization: string;
  contact_number: string;
  address: string;
  created_at: string;
  user?: User;
}

export interface Room {
  room_id: string;
  room_number: string;
  ward_name: string;
  room_type: string;
  beds?: Bed[];
}

export interface Bed {
  bed_id: string;
  room_id: string;
  bed_number: string;
  status: 'Available' | 'Occupied';
  room?: Room;
  assignedPatient?: Patient;
}

export interface PatientDocument {
  document_id: string;
  patient_id: string;
  document_name: string;
  document_path: string;
  uploaded_at: string;
}

export interface ClinicalNote {
  note_id: string;
  patient_id: string;
  doctor_id: string;
  note_content: string;
  created_at: string;
  doctor?: Doctor;
}

export interface CreatePatientData {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  address: string;
  reasonForAdmittance: string;
  assignedDoctorId: string;
  assignedBedId: string;
  admissionDate: string;
}

export interface CreateDoctorData {
  name: string;
  email: string;
  specialization: string;
  contact_number: string;
  address: string;
}

export interface CreateRoomData {
  room_number: string;
  ward_name: string;
  room_type: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface DashboardStats {
    totalPatients:number;
    admittedPatients:number;
    dischargedPatients:number;
    totalDoctors: number; // Will need to implement doctor count API
    totalBeds: number;
    occupiedBeds:number;
    availableBeds: number
    totalRooms:number;
}