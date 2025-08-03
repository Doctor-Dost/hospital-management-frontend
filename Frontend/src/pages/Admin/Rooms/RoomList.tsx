import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../../../redux/store';
import { roomService } from '../../../services/roomService';
import { setRooms, setLoading, setError } from '../../../redux/slices/roomSlice';
const RoomList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms, loading, error } = useSelector((state: RootState) => state.rooms);
  useEffect(() => {
    const fetchRooms = async () => {
      dispatch(setLoading(true));
      try {
        const res = await roomService.getAllRooms();
        dispatch(setRooms(res));
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to fetch rooms'));
      }
    };
    fetchRooms();
  }, [dispatch]);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Rooms & Beds</h1>
        <button
          onClick={() => navigate('/admin/rooms/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Room
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && rooms.length === 0 && <p>No rooms found.</p>}
      {!loading && rooms.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Room No.</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ward Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Room Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Beds</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Available</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Occupied</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map(room => {
                const total = room.beds ? room.beds.length : 0;
                const available = room.beds ? room.beds.filter(b => b.status === 'Available').length : 0;
                const occupied = total - available;
                return (
                  <tr key={room.room_id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{room.room_number}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{room.ward_name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{room.room_type}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{total}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{available}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{occupied}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-600">
                      <Link to={`/admin/rooms/${room.room_id}`}>View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default RoomList;