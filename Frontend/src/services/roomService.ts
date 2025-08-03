import api from '../utils/api';
import type { Room, Bed, CreateRoomData } from '../types';

export const roomService = {
  getAllRooms: async (): Promise<Room[]> => {
    const response = await api.get('/rooms');
    return response.data;
  },

  createRoom: async (data: CreateRoomData): Promise<Room> => {
    const response = await api.post('/rooms/add', data);
    return response.data;
  },

  getRoomById: async (roomId: string): Promise<Room> => {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  },

  deleteRoom: async (roomId: string) => {
    const response = await api.put(`/rooms/soft-delete/${roomId}`);
    return response.data;
  },

  addBed: async (roomId: string, bedNumber: string): Promise<Bed> => {
    const response = await api.post('/beds/add', {
      room_id: roomId,
      bed_number: bedNumber,
    });
    return response.data;
  },

  getBedsByRoom: async (roomId: string): Promise<Bed[]> => {
    const response = await api.get(`/beds/room/${roomId}`);
    return response.data;
  },

  getAvailableBeds: async (roomId: string): Promise<Bed[]> => {
    const response = await api.get(`/beds/room/${roomId}/available`);
    return response.data;
  },

  assignBed: async (bedId: string, patientId: string) => {
    const response = await api.post('/beds/assign', {
      bed_id: bedId,
      patient_id: patientId,
    });
    return response.data;
  },

  dischargePatient: async (patientId: string) => {
    const response = await api.put(`/beds/discharge/${patientId}`);
    return response.data;
  },
};