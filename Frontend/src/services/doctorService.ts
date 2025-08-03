import api from '../utils/api';
import type { Doctor, CreateDoctorData } from '../types';

export const doctorService = {
  getAllDoctors: async (): Promise<Doctor[]> => {
    const response = await api.get('/doctor/doctors');
    return response.data;
  },

  registerDoctor: async (data: CreateDoctorData): Promise<Doctor> => {
    const response = await api.post('/auth/register-doctor', data);
    return response.data.doctor;
  },

  getAssignedPatients: async () => {
    const response = await api.get('/doctor/patients');
    return response.data;
  },

  getPatientDetails: async (patientId: string) => {
    const response = await api.get(`/doctor/patient/${patientId}`);
    return response.data;
  },

  addClinicalNote: async (patientId: string, note: string) => {
    const response = await api.post(`/doctor/patient/${patientId}/clinical-notes`, { note });
    return response.data;
  },

  getClinicalNotes: async (patientId: string) => {
    const response = await api.get(`/doctor/patient/${patientId}/clinical-notes`);
    return response.data;
  },

  downloadDocument: async (patientId: string, documentId: string) => {
    const response = await api.get(`/doctor/patient/${patientId}/document/${documentId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};