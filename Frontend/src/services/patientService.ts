import api from '../utils/api';
import type { Patient, CreatePatientData } from '../types';

export const patientService = {
  getAllPatients: async (): Promise<Patient[]> => {
    const response = await api.get('/patient/get-patients');
    return response.data;
  },

  getAssignedPatients: async (): Promise<Patient[]> => {
    const response = await api.get('/patient/doctor/patients');
    return response.data;
  },

  createPatient: async (data: CreatePatientData, files: File[]): Promise<Patient> => {
    const formData = new FormData();
    
    // Append patient data
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    
    // Append files
    files.forEach((file) => {
      formData.append('documents', file);
    });

    const response = await api.post('/patient/register-patients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.patient;
  },

  updatePatientStatus: async (patientId: string, status: 'Admitted' | 'Discharged', dischargeDate?: string) => {
    const response = await api.patch(`/patient/patients/${patientId}/status`, {
      status,
      dischargeDate,
    });
    return response.data.patient;
  },

  addClinicalNote: async (patientId: string, note: string) => {
    const response = await api.post(`/patient/patients/${patientId}/notes`, { note });
    return response.data.note;
  },

  getPatientDocuments: async (patientId: string) => {
    const response = await api.get(`/patient/patients/${patientId}/documents`);
    return response.data;
  },

  downloadDocument: async (patientId: string, documentId: string) => {
    const response = await api.get(`/patient/patients/${patientId}/documents/${documentId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};