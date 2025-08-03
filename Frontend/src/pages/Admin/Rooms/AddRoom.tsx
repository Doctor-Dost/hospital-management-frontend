import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { roomService } from '../../../services/roomService';
import { addRoom, setRooms } from '../../../redux/slices/roomSlice';
const AddRoom: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    room_number: '',
    ward_name: '',
    room_type: '',
    bedCount: 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'bedCount' ? Number(value) : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.room_number.trim()) errs.room_number = 'Room number is required';
    if (!form.ward_name.trim()) errs.ward_name = 'Ward name is required';
    if (!form.room_type.trim()) errs.room_type = 'Room type is required';
    if (form.bedCount < 1) errs.bedCount = 'At least one bed is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
 
      const room = await roomService.createRoom({
        room_number: form.room_number,
        ward_name: form.ward_name,
        room_type: form.room_type,
      });
      
      for (let i = 1; i <= form.bedCount; i++) {
        const bedNumber = i.toString();
        await roomService.addBed(room.room_id, bedNumber);
      }
      
      dispatch(addRoom({ ...room, beds: [] }));
      navigate('/admin/rooms');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to create room');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Add Room</h1>
      {errorMsg && <div className="text-red-600 mb-3">{errorMsg}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Room Number</label>
          <input
            type="text"
            name="room_number"
            value={form.room_number}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.room_number && <p className="text-xs text-red-600">{errors.room_number}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ward Name</label>
          <input
            type="text"
            name="ward_name"
            value={form.ward_name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.ward_name && <p className="text-xs text-red-600">{errors.ward_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Room Type</label>
          <input
            type="text"
            name="room_type"
            value={form.room_type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.room_type && <p className="text-xs text-red-600">{errors.room_type}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Beds</label>
          <input
            type="number"
            name="bedCount"
            min={1}
            value={form.bedCount}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.bedCount && <p className="text-xs text-red-600">{errors.bedCount}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Add Room'}
        </button>
      </form>
    </div>
  );
};
export default AddRoom;
