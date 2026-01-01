import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

import PutOnHoldModal from "../../components/jobs/PutOnHoldModal";
import CloseJobModal from "../../components/jobs/CloseJobModal";
import CloseWithCandidateModal from "../../components/jobs/CloseWithCandidateModal";

export default function JobDetails() {
  const { id } = useParams();
  const { hasRole } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showHold, setShowHold] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [showCloseWithCandidate, setShowCloseWithCandidate] = useState(false);

  const loadJob = async () => {
    try {
      const res = await api.get(`/job/${id}`);
      setJob(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJob();
  }, [id]);

  const resumeJob = async () => {
    await api.put(`/job/${id}/resume`);
    loadJob();
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!job) return <p className="text-center mt-8">Job not found</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6">
      {/* Job Header */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {job.title}
            </h1>
            <p className="text-gray-500">
              {job.department} • {job.location}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded text-sm font-medium
              ${job.status === "Open" && "bg-green-100 text-green-700"}
              ${job.status === "OnHold" && "bg-yellow-100 text-yellow-700"}
              ${job.status === "Closed" && "bg-red-100 text-red-700"}
            `}
          >
            {job.status}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{job.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
          <div>Level: {job.level}</div>
          <div>Employment: {job.employmentType}</div>
          <div>Min Experience: {job.minExperience} years</div>
          <div>Positions: {job.numberOfPositions}</div>
        </div>
      </div>

      {/* Action Buttons */}
      {(hasRole("Admin") || hasRole("Recruiter") || hasRole("HR")) && (
        <div className="bg-white p-4 rounded shadow flex gap-3 flex-wrap">
          {job.status === "Open" && (
            <button
              onClick={() => setShowHold(true)}
              className="btn-warning"
            >
              Put On Hold
            </button>
          )}

          {job.status === "OnHold" && (
            <button
              onClick={resumeJob}
              className="btn-success"
            >
              Resume Job
            </button>
          )}

          {job.status !== "Closed" && (
            <button
              onClick={() => setShowClose(true)}
              className="btn-danger"
            >
              Close Job
            </button>
          )}

          {(hasRole("Admin") || hasRole("HR")) &&
            job.status !== "Closed" && (
              <button
                onClick={() => setShowCloseWithCandidate(true)}
                className="btn-success"
              >
                Close With Candidate
              </button>
            )}

          {(hasRole("Admin") || hasRole("Recruiter")) &&
            job.status !== "Closed" && (
              <Link
                to={`/jobs/${job.jobId}/edit`}
                className="btn-secondary"
              >
                Edit Job
              </Link>
            )}
        </div>
      )}

      {/* Modals */}
      {showHold && (
        <PutOnHoldModal
          jobId={id}
          onClose={() => setShowHold(false)}
          onSuccess={loadJob}
        />
      )}

      {showClose && (
        <CloseJobModal
          jobId={id}
          onClose={() => setShowClose(false)}
          onSuccess={loadJob}
        />
      )}

      {showCloseWithCandidate && (
        <CloseWithCandidateModal
          jobId={id}
          onClose={() => setShowCloseWithCandidate(false)}
          onSuccess={loadJob}
        />
      )}
    </div>
  );
}
