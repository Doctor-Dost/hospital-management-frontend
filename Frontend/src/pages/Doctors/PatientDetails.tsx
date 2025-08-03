import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorService } from '../../services/doctorService';
import type { Patient, ClinicalNote, PatientDocument } from '../../types';

/**
 * DoctorPatientDetails displays information about a single assigned patient. It
 * includes patient demographics, assigned bed information, uploaded documents and
 * the history of clinical notes. Doctors can add new clinical notes and download
 * documents directly from this page.
 */
const DoctorPatientDetails: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [documents, setDocuments] = useState<PatientDocument[]>([]);
  const [notes, setNotes] = useState<ClinicalNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingNote, setAddingNote] = useState(false);

  // Fetch patient details and notes on mount
  useEffect(() => {
    const id = patientId as string;
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await doctorService.getPatientDetails(id);
        setPatient(data.patient || data); // backend might return {patient, documents}
        // Extract documents if present
        if (data.documents) {
          setDocuments(data.documents);
        } else if (data.patient && data.patient.documents) {
          setDocuments(data.patient.documents);
        }
        // Fetch notes separately
        const fetchedNotes = await doctorService.getClinicalNotes(id);
        setNotes(fetchedNotes);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch patient');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [patientId]);

  const handleDownloadDoc = async (doc: PatientDocument) => {
    try {
      const blob = await doctorService.downloadDocument(doc.patient_id, doc.document_id);
      const url = window.URL.createObjectURL(new Blob([blob]));
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

  const handleAddNote = async () => {
    const trimmed = newNote.trim();
    if (!trimmed) return;
    if (!patient) return;
    setAddingNote(true);
    setError(null);
    try {
      const note = await doctorService.addClinicalNote(patient.patient_id, trimmed);
      setNotes(prev => [...prev, note]);
      setNewNote('');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to add note');
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading patient...</div>;
  }
  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }
  if (!patient) {
    return <div className="p-4">Patient not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Patient: {patient.name}</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline text-sm"
        >
          &larr; Back
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <p className="font-medium text-gray-600">Bed:</p>
            <p className="text-gray-900">
              {patient.assignedBed ? `Room ${patient.assignedBed.room?.room_number}, Bed ${patient.assignedBed.bed_number}` : '-'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Documents</h2>
        {documents.length === 0 ? (
          <p>No documents uploaded.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {documents.map(doc => (
              <li key={doc.document_id} className="flex items-center justify-between">
                <span>{doc.document_name}</span>
                <button
                  onClick={() => handleDownloadDoc(doc)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Clinical Notes</h2>
        {notes.length === 0 ? (
          <p>No clinical notes yet.</p>
        ) : (
          <ul className="space-y-2">
            {notes.map(note => (
              <li key={note.note_id} className="border border-gray-200 rounded-md p-2">
                <p className="text-sm text-gray-700">{note.note_content}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(note.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 space-y-2">
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Add a clinical note"
          />
          <button
            onClick={handleAddNote}
            disabled={addingNote || newNote.trim().length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {addingNote ? 'Adding...' : 'Add Note'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDetails;