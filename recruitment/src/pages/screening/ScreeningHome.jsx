import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobSelect from "../../components/jobs/JobSelect";
import { getReviewsByJob } from "../../api/screeningApi";

const ScreeningHome = () => {
  const [jobId, setJobId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadPipeline = async (selectedJobId) => {
    try {
      setLoading(true);
      const res = await getReviewsByJob(selectedJobId);
      setReviews(res.data.data || []);
    } catch (err) {
      console.error("Failed to load screening pipeline");
      alert("Failed to load screening pipeline");
    } finally {
      setLoading(false);
    }
  };

  const handleJobChange = (id) => {
    setJobId(id);
    if (id) {
      loadPipeline(id);
    } else {
      setReviews([]);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Screening Pipeline
        </h1>
        <p className="text-gray-500">
          Select a job to view candidates in the screening pipeline.
        </p>
      </div>

      {/* Job Selector */}
      <div className="max-w-md mb-6">
        <JobSelect value={jobId} onChange={handleJobChange} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-50 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Candidate</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Stage</th>
              <th className="px-4 py-2 border">Reviewer</th>
              <th className="px-4 py-2 border">Interviewer</th>
              <th className="px-4 py-2 border">Created</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Loading pipeline...
                </td>
              </tr>
            )}

            {!loading && reviews.length === 0 && jobId && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No candidates in pipeline for this job.
                </td>
              </tr>
            )}

            {reviews.map((r) => (
              <tr key={r.reviewId} className="text-sm text-gray-700">
                <td className="px-4 py-2 border font-medium">
                  {r.candidateName}
                </td>
                <td className="px-4 py-2 border">
                  {r.candidateEmail}
                </td>
                <td className="px-4 py-2 border">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                    {r.currentStage}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {r.reviewerName || "-"}
                </td>
                <td className="px-4 py-2 border">
                  {r.interviewerName || "-"}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => navigate(`/screening/review/${r.reviewId}`)}
                    className="px-3 py-1 text-sm rounded bg-gray-800 text-white hover:bg-black"
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!jobId && (
          <p className="text-center text-gray-500 py-6">
            Please select a job to view screening pipeline.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScreeningHome;
