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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
        <button
          onClick={() => navigate('/admin/doctors/add')}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition duration-200"
        >
          Add New Doctor
        </button>
      </div>
      {loading && <p>Loading...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && doctors.length === 0 && <p>No doctors found.</p>}
      {!loading && doctors.length > 0 && (
        <div className="overflow-x-auto border-2 border-gray-300 rounded-xl shadow-xl bg-white">
          <table className="min-w-full text-left text-gray-800">
            <thead className="bg-gray-50 border-b">
              <tr className='bg-gray-100 rounded-t-xl'>
                <th className="px-6 py-3 text-sm font-semibold text-black-700">Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-black-700">Email</th>
                <th className="px-6 py-3 text-sm font-semibold text-black-700">Specialization</th>
                <th className="px-6 py-3 text-sm font-semibold text-black-700">Contact</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {doctors.map((doc) => (
                <tr key={doc.doctor_id}>
                  <td className="px-6 py-4">{doc.name}</td>
                  <td className="px-6 py-4 text-blue-500">{doc.user?.email || doc.email}</td>
                  <td className="px-6 py-4 text-blue-500">{doc.specialization}</td>
                  <td className="px-6 py-4 ">{doc.contact_number || '-'}</td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/doctors/${doc.doctor_id}`} 
                        className="text-blue-500 hover:underline text-sm font-medium">
                       View
                    </Link>
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