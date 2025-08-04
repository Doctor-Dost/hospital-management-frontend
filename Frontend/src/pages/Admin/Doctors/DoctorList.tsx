import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../../../redux/store';
import { doctorService } from '../../../services/doctorService';
import { setDoctors, setLoading, setError } from '../../../redux/slices/doctorSlice';


const DoctorList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctors, loading, error } = useSelector((state: RootState) => state.doctors);

  useEffect(() => {
    const fetchDoctors = async () => {
      dispatch(setLoading(true));
      try {
        const res = await doctorService.getAllDoctors();
        dispatch(setDoctors(res));
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to fetch doctors'));
      }
    };
    fetchDoctors();
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Doctors</h1>
        <button
          onClick={() => navigate('/admin/doctors/add')}
          className="bg-orange-600 text-white px-4 py-2 rounded-"
        >
          + Add Doctor
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && doctors.length === 0 && <p>No doctors found.</p>}
      {!loading && doctors.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-700">Specialization</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-700">Contact</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map((doc) => (
                <tr key={doc.doctor_id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">{doc.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">{doc.user?.email || doc.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">{doc.specialization}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">{doc.contact_number || '-'}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-orange-700">
                    <Link to={`/admin/doctors/${doc.doctor_id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorList;