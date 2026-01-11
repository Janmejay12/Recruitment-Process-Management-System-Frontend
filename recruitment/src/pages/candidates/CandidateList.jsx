import { useEffect, useState } from "react";
import { getAllCandidates } from "../../api/candidateApi";
import { createReview } from "../../api/screeningApi";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);

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

  const sendToScreening = async (c) => {
    if (!window.confirm(`Send ${c.fullName} to screening?`)) return;

    try {
      setSendingId(c.candidateId);

      await createReview({
        candidateId: c.candidateId,
        jobId: c.jobId
      });

      alert("Candidate sent to screening successfully.");
    } catch (e) {
      alert(e.response?.data?.message || "Failed to create review");
    } finally {
      setSendingId(null);
    }
  };

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
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c) => {
              const isInPipeline =
                c.profileStatus === "Screening" ||
                c.profileStatus === "Interview";

              return (
                <tr key={c.candidateId} className="text-sm text-gray-700">
                  <td className="px-4 py-2 border">{c.fullName}</td>
                  <td className="px-4 py-2 border">{c.email}</td>

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

                  <td className="px-4 py-2 border text-center">
                    <button
                      disabled={sendingId === c.candidateId || isInPipeline}
                      onClick={() => sendToScreening(c)}
                      className="px-2 py-1 text-xs bg-green-600 text-white rounded disabled:opacity-50"
                    >
                      {isInPipeline
                        ? "In Pipeline"
                        : sendingId === c.candidateId
                        ? "Sending..."
                        : "Send to Screening"}
                    </button>
                  </td>
                </tr>
              );
            })}
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
