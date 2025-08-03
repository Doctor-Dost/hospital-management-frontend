import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '../../services/doctorService';
import type { Patient } from '../../types';


const DoctorDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignedPatients = async () => {
      try {
        const res = await doctorService.getAssignedPatients();
        setPatients(res);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch patients');
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedPatients();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">My Patients</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && patients.length === 0 && <p>No patients assigned.</p>}
      {!loading && patients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Age</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Gender</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Bed</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map(p => (
                <tr key={p.patient_id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.age}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.gender}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{p.contact}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                    {p.assignedBed ? `Room ${p.assignedBed.room?.room_number}, Bed ${p.assignedBed.bed_number}` : '-'}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-600">
                    <button onClick={() => navigate(`/doctor/patients/${p.patient_id}`)}>View</button>
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

export default DoctorDashboard;