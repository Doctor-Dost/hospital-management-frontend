import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '../../../services/doctorService';
import { roomService } from '../../../services/roomService';
import { patientService } from '../../../services/patientService';
import { addPatient } from '../../../redux/slices/patientSlice';
interface PatientForm {
  name: string;
  age: number | '';
  gender: 'Male' | 'Female' | 'Other' | '';
  contact: string;
  address: string;
  reasonForAdmittance: string;
  assignedDoctorId: string;
  assignedRoomId: string;
  assignedBedId: string;
}
const AddPatient: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [availableBeds, setAvailableBeds] = useState<any[]>([]);
  const [formData, setFormData] = useState<PatientForm>({
    name: '',
    age: '' as any,
    gender: '' as any,
    contact: '',
    address: '',
    reasonForAdmittance: '',
    assignedDoctorId: '',
    assignedRoomId: '',
    assignedBedId: '',
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docList, roomList] = await Promise.all([
          doctorService.getAllDoctors(),
          roomService.getAllRooms(),
        ]);
        setDoctors(docList);
        setRooms(roomList);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchBeds = async () => {
      if (!formData.assignedRoomId) {
        setAvailableBeds([]);
        return;
      }
      try {
        const beds = await roomService.getAvailableBeds(formData.assignedRoomId);
        setAvailableBeds(beds);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchBeds();
  }, [formData.assignedRoomId]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setDocuments(Array.from(e.target.files));
  };
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.age) errs.age = 'Age is required';
    if (!formData.gender) errs.gender = 'Gender is required';
    if (!formData.contact.trim()) errs.contact = 'Contact is required';
    if (!formData.reasonForAdmittance.trim()) errs.reasonForAdmittance = 'Reason is required';
    if (!formData.assignedDoctorId) errs.assignedDoctorId = 'Doctor is required';
    if (!formData.assignedRoomId) errs.assignedRoomId = 'Room is required';
    if (!formData.assignedBedId) errs.assignedBedId = 'Bed is required';
    return errs;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      return setErrors(errs);
    }
    setLoading(true);
    setErrorMsg(null);
    try {
       
      const payload: any = {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        contact: formData.contact,
        address: formData.address,
        reasonForAdmittance: formData.reasonForAdmittance,
        assignedDoctorId: formData.assignedDoctorId,
        assignedBedId: formData.assignedBedId,
        admissionDate: new Date().toISOString(),
      };
      const newPatient = await patientService.createPatient(payload, documents);
      dispatch(addPatient(newPatient));
      navigate('/admin/patients');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to register patient');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Add Patient</h1>
      {errorMsg && <div className="text-red-600 mb-3">{errorMsg}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.age && <p className="text-xs text-red-600">{errors.age}</p>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-xs text-red-600">{errors.gender}</p>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.contact && <p className="text-xs text-red-600">{errors.contact}</p>}
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Reason for Admittance</label>
          <textarea
            name="reasonForAdmittance"
            value={formData.reasonForAdmittance}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.reasonForAdmittance && (
            <p className="text-xs text-red-600">{errors.reasonForAdmittance}</p>
          )}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Assign Doctor</label>
          <select
            name="assignedDoctorId"
            value={formData.assignedDoctorId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select doctor</option>
            {doctors.map((doc) => (
               
              <option key={doc.doctor_id} value={doc.doctor_id}>
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>
          {errors.assignedDoctorId && (
            <p className="text-xs text-red-600">{errors.assignedDoctorId}</p>
          )}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Select Room</label>
          <select
            name="assignedRoomId"
            value={formData.assignedRoomId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select room</option>
            {rooms.map((room) => (
              <option key={room.room_id} value={room.room_id}>
                {room.room_number} - {room.ward_name}
              </option>
            ))}
          </select>
          {errors.assignedRoomId && (
            <p className="text-xs text-red-600">{errors.assignedRoomId}</p>
          )}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Select Bed</label>
          <select
            name="assignedBedId"
            value={formData.assignedBedId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            disabled={!formData.assignedRoomId || availableBeds.length === 0}
          >
            <option value="">Select bed</option>
            {availableBeds.map((bed) => (
              <option key={bed.bed_id} value={bed.bed_id}>
                {bed.bed_number}
              </option>
            ))}
          </select>
          {errors.assignedBedId && (
            <p className="text-xs text-red-600">{errors.assignedBedId}</p>
          )}
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Upload Documents (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
            className="w-full"
          />
        </div>
        <div className="col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddPatient;