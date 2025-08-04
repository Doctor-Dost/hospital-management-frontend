import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { doctorService } from '../../../services/doctorService';
import { setDoctors } from '../../../redux/slices/doctorSlice';

const DoctorDetails: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const dispatch = useDispatch();
  const { doctors } = useSelector((state: RootState) => state.doctors);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<any | null>(null);

  useEffect(() => {
    if (!doctorId) return;
    const existing = doctors.find(d => d.doctor_id === doctorId);
    if (existing) {
      setDoctor(existing);
    } else {
      // fetch doctors list if not present
      const fetchDoctors = async () => {
        setLoading(true);
        try {
          const res = await doctorService.getAllDoctors();
          dispatch(setDoctors(res));
          const doc = res.find(d => d.doctor_id === doctorId);
          setDoctor(doc || null);
        } catch (err: any) {
          setError(err.message || 'Failed to load doctor');
        } finally {
          setLoading(false);
        }
      };
      fetchDoctors();
    }
  }, [doctorId, doctors, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!doctor) return <p>Doctor not found.</p>;

  return (
    <div className="space-y-4">
      <Link to="/admin/doctors" className="text-orange-600 hover:underline">&larr; Back to list</Link>
      <h1 className="text-2xl font-semibold text-black-800">Doctor Details</h1>
      <div className="bg-white p-4 rounded-md shadow-sm space-y-2">
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Email:</strong> {doctor.user?.email || doctor.email}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Contact:</strong> {doctor.contact_number || '-'}</p>
        <p><strong>Address:</strong> {doctor.address || '-'}</p>
      </div>
    </div>
  );
};

export default DoctorDetails;