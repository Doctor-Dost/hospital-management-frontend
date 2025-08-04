import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import type { Patient, PatientDocument } from '../../../types';
import { patientService } from '../../../services/patientService';
import { roomService } from '../../../services/roomService';
import { setPatients, updatePatient } from '../../../redux/slices/patientSlice';


const AdminPatientDetails: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { patients } = useSelector((state: RootState) => state.patients);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [documents, setDocuments] = useState<PatientDocument[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discharging, setDischarging] = useState(false);

  useEffect(() => {
    const id = patientId as string;
    if (!id) return;
    const existing = patients.find(p => p.patient_id === id);
    if (existing) {
      setPatient(existing);
    } else {
 
      const fetchPatients = async () => {
        try {
          const list = await patientService.getAllPatients();
          dispatch(setPatients(list));
          const found = list.find(x => x.patient_id === id) || null;
          setPatient(found);
        } catch (err: any) {
          setError(err.response?.data?.message || err.message || 'Failed to fetch patient');
        }
      };
      fetchPatients();
    }
  }, [patientId, patients, dispatch]);

  useEffect(() => {
    const id = patientId as string;
    if (!id) return;
    const fetchDocs = async () => {
      setDocsLoading(true);
      try {
        const docs = await patientService.getPatientDocuments(id);
        setDocuments(docs);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch patient documents');
      } finally {
        setDocsLoading(false);
      }
    };
    fetchDocs();
  }, [patientId]);
 
  const handleDownloadDoc = async (doc: PatientDocument) => {
    try {
      const blobData = await patientService.downloadDocument(doc.patient_id, doc.document_id);
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.document_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      console.error(err);
      setError('Failed to download document');
    }
  };
 
  const handleDischarge = async () => {
    if (!patient) return;
    const confirm = window.confirm('Are you sure you want to discharge this patient?');
    if (!confirm) return;
    setDischarging(true);
    setError(null);
    try {
      const dischargeDate = new Date().toISOString();
      const updated = await patientService.updatePatientStatus(
        patient.patient_id,
        'Discharged',
        dischargeDate
      );
      // free the bed
      await roomService.dischargePatient(patient.patient_id);
      // Update state and redux store
      setPatient(prev => (prev ? { ...prev, status: 'Discharged', discharged_at: dischargeDate } : prev));
      dispatch(updatePatient(updated));
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to discharge patient');
    } finally {
      setDischarging(false);
    }
  };

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!patient) {
    return <div className="p-4">Loading patient...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Patient Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-orange-600 hover:underline text-sm"
        >
          &larr; Back
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-600">Name:</p>
            <p className="text-gray-900">{patient.name}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Age:</p>
            <p className="text-gray-900">{patient.age}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Gender:</p>
            <p className="text-gray-900">{patient.gender}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Contact:</p>
            <p className="text-gray-900">{patient.contact}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium text-gray-600">Address:</p>
            <p className="text-gray-900">{patient.address || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium text-gray-600">Reason for Admittance:</p>
            <p className="text-gray-900">{patient.reason_for_admittance}</p>
          </div>
        </div>
      </div>

       <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Assigned Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-600">Doctor:</p>
            <p className="text-gray-900">
              {patient.assignedDoctor ? (
                <>{patient.assignedDoctor.name} ({patient.assignedDoctor.specialization})</>
              ) : (
                '-'
              )}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Bed:</p>
            <p className="text-gray-900">
              {patient.assignedBed ? `Room ${patient.assignedBed.room?.room_number || ''}, Bed ${patient.assignedBed.bed_number}` : '-'}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Status:</p>
            <p className="text-gray-900">{patient.status}</p>
          </div>
          {patient.status === 'Discharged' && patient.discharged_at && (
            <div>
              <p className="font-medium text-gray-600">Discharged At:</p>
              <p className="text-gray-900">{new Date(patient.discharged_at).toLocaleString()}</p>
            </div>
          )}
        </div>
        {patient.status === 'Admitted' && (
          <div className="mt-4">
            <button
              onClick={handleDischarge}
              disabled={discharging}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {discharging ? 'Discharging...' : 'Discharge Patient'}
            </button>
          </div>
        )}
      </div>

       <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Documents</h2>
        {docsLoading ? (
          <p>Loading documents...</p>
        ) : documents.length === 0 ? (
          <p>No documents uploaded.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {documents.map(doc => (
              <li key={doc.document_id} className="flex items-center justify-between">
                <span>{doc.document_name}</span>
                <button
                  onClick={() => handleDownloadDoc(doc)}
                  className="text-orange-600 hover:underline text-sm"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPatientDetails;
