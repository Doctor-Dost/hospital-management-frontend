import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '../../../services/doctorService';
import { addDoctor } from '../../../redux/slices/doctorSlice';

interface FormData {
  name: string;
  email: string;
  specialization: string;
  contact_number: string;
  address: string;
}

const AddDoctor: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    specialization: '',
    contact_number: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.specialization.trim()) errs.specialization = 'Specialization is required';
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
      const newDoctor = await doctorService.registerDoctor(formData);
      // update store
      dispatch(addDoctor(newDoctor));
      navigate('/admin/doctors');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to register doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-10">
      <h1 className="text-3xl font-semibold mb-5 text-center">Add Doctor</h1>
      {errorMsg && <div className="text-red-600 mb-3">{errorMsg}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 ">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter Full Name'
            className="w-md bg-gray-200 p-4 rounded-xl"
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter Email'
            className="w-md bg-gray-200 p-3 rounded-xl"
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder='Enter Specialization'
            className="w-md bg-gray-200 p-3 rounded-xl"
          />
          {errors.specialization && <p className="text-xs text-red-600">{errors.specialization}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Number</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            placeholder='Enter Contact Number'
            className="w-md bg-gray-200 p-3 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder='Enter Address'
            className="w-md bg-gray-200 p-3 rounded-xl"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-3xl"
          >
            {loading ? 'Saving...' : 'Add Doctor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;