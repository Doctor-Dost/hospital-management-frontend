import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roomService } from '../../../services/roomService';
import type { Room, Bed } from '../../../types';
const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [bedNumber, setBedNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const id = roomId as string;
    if (!id) return;
    const fetchRoom = async () => {
      try {
        const fetchedRoom = await roomService.getRoomById(id);
        setRoom(fetchedRoom);
        const bedList = await roomService.getBedsByRoom(id);
        setBeds(bedList);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch room');
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);
  const handleAddBed = async () => {
    if (!room) return;
    if (!bedNumber.trim()) {
      setError('Bed number is required');
      return;
    }
    setAdding(true);
    setError(null);
    try {
      const newBed = await roomService.addBed(room.room_id, bedNumber.trim());
      setBeds(prev => [...prev, newBed]);
      setBedNumber('');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to add bed');
    } finally {
      setAdding(false);
    }
  };
  const handleDeleteRoom = async () => {
    if (!room) return;
    const confirm = window.confirm('Are you sure you want to remove this room?');
    if (!confirm) return;
    setDeleting(true);
    setError(null);
    try {
      await roomService.deleteRoom(room.room_id);
      navigate('/admin/rooms');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete room');
    } finally {
      setDeleting(false);
    }
  };
  if (loading) {
    return <div className="p-4">Loading room...</div>;
  }
  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }
  if (!room) {
    return <div className="p-4">Room not found.</div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Room {room.room_number} Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-orange-600 hover:underline text-sm"
        >
          &larr; Back
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Room Information</h2>
        <p><strong>Room Number:</strong> {room.room_number}</p>
        <p><strong>Ward:</strong> {room.ward_name}</p>
        <p><strong>Type:</strong> {room.room_type}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Beds</h2>
        {beds.length === 0 ? (
          <p>No beds found for this room.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Bed Number</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Assigned Patient</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {beds.map(bed => (
                  <tr key={bed.bed_id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{bed.bed_number}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{bed.status}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                      {bed.assignedPatient ? bed.assignedPatient.name : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Add Bed</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={bedNumber}
              onChange={e => setBedNumber(e.target.value)}
              placeholder="Bed number"
              className="border border-gray-300 p-2 rounded-md"
            />
            <button
              onClick={handleAddBed}
              disabled={adding}
              className="px-4 py-2 bg-orange-600 text-white rounded-md disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add Bed'}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
        <button
          onClick={handleDeleteRoom}
          disabled={deleting}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? 'Removing...' : 'Remove Room'}
        </button>
      </div>
    </div>
  );
};
export default RoomDetails;
