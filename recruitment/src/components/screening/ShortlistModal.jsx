import { useEffect, useState } from "react";
import { getUsersByRole } from "../../api/userApi";

const ShortlistModal = ({ onClose, onShortlist }) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await getUsersByRole("Interviewer");
      setUsers(res.data.data || res.data);
    };
    load();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Assign Interviewer & Shortlist
        </h2>

        <select
          className="input"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select Interviewer</option>
          {users.map((u) => (
            <option key={u.userId} value={u.userId}>
              {u.fullName} ({u.email})
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            disabled={!selected}
            onClick={() => onShortlist(Number(selected))}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Shortlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortlistModal;
