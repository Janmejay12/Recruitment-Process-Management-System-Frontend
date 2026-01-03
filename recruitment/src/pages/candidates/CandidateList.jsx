import { useEffect, useState } from "react";
import { getAllCandidates } from "../../api/candidateApi";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const res = await getAllCandidates();
        setCandidates(res.data.data);
      } catch (err) {
        console.error("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };
    loadCandidates();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading candidates...</p>;
  }

  return (
    <div className="bg-white border rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Candidates
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-50 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Job Applied</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c) => (
              <tr key={c.candidateId} className="text-sm text-gray-700">
                <td className="px-4 py-2 border">{c.fullName}</td>
                <td className="px-4 py-2 border">{c.email}</td>

                {/* ✅ JOB TITLE */}
                <td className="px-4 py-2 border font-medium">
                  {c.jobTitle}
                </td>

                <td className="px-4 py-2 border">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                    {c.profileStatus}
                  </span>
                </td>

                <td className="px-4 py-2 border">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {candidates.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No candidates found
          </p>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
