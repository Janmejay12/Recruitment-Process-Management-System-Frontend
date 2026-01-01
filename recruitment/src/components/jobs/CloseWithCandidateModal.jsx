// src/components/jobs/CloseWithCandidateModal.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function CloseWithCandidateModal({
  jobId,
  onClose,
  onSuccess
}) {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({
    candidateId: "",
    selectionDate: "",
    reason: "",
    notes: ""
  });

  useEffect(() => {
    // Candidates linked/applied to this job
    api.get(`/candidate/by-job/${jobId}`).then(res => {
      setCandidates(res.data.data);
    });
  }, [jobId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await api.put(`/job/${jobId}/close-with-candidate`, form);
    onSuccess();
    onClose();
  };

  return (
    <div className="modal">
      <h2 className="text-lg font-semibold mb-3">
        Close Job With Selected Candidate
      </h2>

      <select
        name="candidateId"
        value={form.candidateId}
        onChange={handleChange}
        className="input"
        required
      >
        <option value="">Select Candidate</option>
        {candidates.map(c => (
          <option key={c.candidateId} value={c.candidateId}>
            {c.fullName} ({c.email})
          </option>
        ))}
      </select>

      <input
        type="date"
        name="selectionDate"
        value={form.selectionDate}
        onChange={handleChange}
        className="input mt-3"
        required
      />

      <textarea
        name="reason"
        placeholder="Reason for selection"
        value={form.reason}
        onChange={handleChange}
        className="input mt-3"
        required
      />

      <textarea
        name="notes"
        placeholder="Additional notes (optional)"
        value={form.notes}
        onChange={handleChange}
        className="input mt-3"
      />

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>
        <button onClick={submit} className="btn-success">
          Close & Select
        </button>
      </div>
    </div>
  );
}
