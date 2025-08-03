import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Patient } from '../../types/index';

interface PatientState {
  patients: Patient[];
  assignedPatients: Patient[];
  currentPatient: Patient | null;
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  patients: [],
  assignedPatients: [],
  currentPatient: null,
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setLoading: (state : any , action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) state.error = null;
    },
    setError: (state:any, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPatients: (state:any, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAssignedPatients: (state:any, action: PayloadAction<Patient[]>) => {
      state.assignedPatients = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentPatient: (state:any, action: PayloadAction<Patient>) => {
      state.currentPatient = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPatient: (state:any, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state: any, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex((p: Patient) => p.patient_id === action.payload.patient_id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    clearError: (state: any) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setPatients,
  setAssignedPatients,
  setCurrentPatient,
  addPatient,
  updatePatient,
  clearError,
} = patientSlice.actions;

export default patientSlice.reducer;