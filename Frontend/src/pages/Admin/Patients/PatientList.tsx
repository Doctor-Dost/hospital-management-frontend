import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../../../redux/store';
import { patientService } from '../../../services/patientService';
import { setPatients, setLoading, setError } from '../../../redux/slices/patientSlice';


const PatientList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patients, loading, error } = useSelector((state: RootState) => state.patients);

  useEffect(() => {
    const fetchPatients = async () => {
      dispatch(setLoading(true));
      try {
        const res = await patientService.getAllPatients();
        dispatch(setPatients(res));
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to fetch patients'));
      }
    };
    fetchPatients();
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Patients</h1>
        <button
          onClick={() => navigate('/admin/patients/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Patient
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && patients.length === 0 && <p>No patients found.</p>}
      {!loading && patients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Age</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Gender</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Doctor</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Bed</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((p) => (
                <tr key={p.patient_id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.age}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.gender}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.contact}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.assignedDoctor?.name || '-'}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.assignedBed?.bed_number || '-'}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.status}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-600">
                    <Link to={`/admin/patients/${p.patient_id}`}>View</Link>
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

export default PatientList;


