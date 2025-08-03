import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Doctor } from '../../types/index';

interface DoctorState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.doctors = action.payload;
      state.loading = false;
      state.error = null;
    },
    addDoctor: (state, action: PayloadAction<Doctor>) => {
      state.doctors.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setError, setDoctors, addDoctor, clearError } = doctorSlice.actions;
export default doctorSlice.reducer;