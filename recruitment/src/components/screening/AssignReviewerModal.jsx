import { useEffect, useState } from "react";
import { getUsersByRole } from "../../api/userApi";

const AssignReviewerModal = ({ onClose, onAssign }) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getUsersByRole("Reviewer");
        setUsers(res.data?.data || res.data || []);
      } catch {
        alert("Failed to load reviewers");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Assign Reviewer</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading reviewers...</p>
        ) : (
          <select
            className="input"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select Reviewer</option>
            {users.map((u) => (
              <option key={u.userId} value={u.userId}>
                {u.fullName} ({u.email})
              </option>
            ))}
          </select>
        )}

        {!loading && users.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">
            No reviewers found.
          </p>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            disabled={!selected}
            onClick={() => onAssign(Number(selected))}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignReviewerModal;
