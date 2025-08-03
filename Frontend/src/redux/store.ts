import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import patientSlice from './slices/patientSlice';
import doctorSlice from './slices/doctorSlice';
import roomSlice from './slices/roomSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    patients: patientSlice,
    doctors: doctorSlice,
    rooms: roomSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;