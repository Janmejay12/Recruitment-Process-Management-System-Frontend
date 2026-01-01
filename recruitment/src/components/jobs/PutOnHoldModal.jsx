// src/components/jobs/PutOnHoldModal.jsx
import { useState } from "react";
import api from "../../api/axios";

export default function PutOnHoldModal({ jobId, onClose, onSuccess }) {
  const [reason, setReason] = useState("");

  const submit = async () => {
    await api.put(`/job/${jobId}/hold`, { reason });
    onSuccess();
    onClose();
  };

  return (
    <div className="modal">
      <h2 className="text-lg font-semibold">Put Job On Hold</h2>

      <textarea
        className="input mt-3"
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose} className="btn-secondary">Cancel</button>
        <button onClick={submit} className="btn-warning">Confirm</button>
      </div>
    </div>
  );
}
