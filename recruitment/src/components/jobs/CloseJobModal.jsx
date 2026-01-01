// src/components/jobs/CloseJobModal.jsx
import { useState } from "react";
import api from "../../api/axios";

export default function CloseJobModal({ jobId, onClose, onSuccess }) {
  const [reason, setReason] = useState("");

  const submit = async () => {
    await api.put(`/job/${jobId}/close`, { reason });
    onSuccess();
    onClose();
  };

  return (
    <div className="modal">
      <h2 className="text-lg font-semibold">Close Job</h2>

      <textarea
        className="input mt-3"
        placeholder="Closure reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose} className="btn-secondary">Cancel</button>
        <button onClick={submit} className="btn-danger">Close Job</button>
      </div>
    </div>
  );
}
