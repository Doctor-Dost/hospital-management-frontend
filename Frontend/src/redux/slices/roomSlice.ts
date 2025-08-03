

import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Room, Bed } from '../../types/index';

interface RoomState {
  rooms: Room[];
  beds: Bed[];
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  beds: [],
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
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
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
      state.loading = false;
      state.error = null;
    },
    setBeds: (state, action: PayloadAction<Bed[]>) => {
      state.beds = action.payload;
      state.loading = false;
      state.error = null;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    },
    addBed: (state, action: PayloadAction<Bed>) => {
      state.beds.push(action.payload);
    },
    updateBed: (state, action: PayloadAction<Bed>) => {
      const index = state.beds.findIndex(b => b.bed_id === action.payload.bed_id);
      if (index !== -1) {
        state.beds[index] = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setRooms,
  setBeds,
  addRoom,
  addBed,
  updateBed,
  clearError,
} = roomSlice.actions;

export default roomSlice.reducer;