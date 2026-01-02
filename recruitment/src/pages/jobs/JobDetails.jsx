import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

import PutOnHoldModal from "../../components/jobs/PutOnHoldModal";
import CloseJobModal from "../../components/jobs/CloseJobModal";
import CloseWithCandidateModal from "../../components/jobs/CloseWithCandidateModal";
import Layout from "../../components/common/Layout";

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

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-16 text-gray-500">Loading job...</div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="text-center mt-16 text-red-500">Job not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= HEADER CARD ================= */}
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {job.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {job.department} • {job.location}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-medium
                ${job.status === "Open" && "bg-green-100 text-green-700"}
                ${job.status === "OnHold" && "bg-yellow-100 text-yellow-700"}
                ${job.status === "Closed" && "bg-red-100 text-red-700"}
              `}
            >
              {job.status}
            </span>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* ================= DETAILS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              Job Information
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              <div><b>Level:</b> {job.level}</div>
              <div><b>Employment Type:</b> {job.employmentType}</div>
              <div><b>Minimum Experience:</b> {job.minExperience} years</div>
              <div><b>Positions:</b> {job.numberOfPositions}</div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              Timeline
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              <div><b>Created At:</b> {new Date(job.createdAt).toLocaleDateString()}</div>
              <div><b>Updated At:</b> {new Date(job.updatedAt).toLocaleDateString()}</div>

              {job.onHoldAt && (
                <div className="text-yellow-700">
                  <b>On Hold:</b> {job.onHoldReason}
                </div>
              )}

              {job.closedAt && (
                <div className="text-red-700">
                  <b>Closed:</b> {job.closedReason}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg shadow-sm p-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">
    Required Skills
  </h2>

  {job.skills.length === 0 ? (
    <p className="text-gray-500 text-sm">
      No skills mapped to this job.
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {job.skills.map(skill => (
        <div
          key={skill.skillId}
          className="border rounded p-3 bg-gray-50"
        >
          <div className="flex justify-between">
            <span className="font-medium text-gray-800">
              {skill.skillName}
            </span>

            <span className={`text-xs px-2 py-1 rounded
              ${skill.isMandatory
                ? "bg-red-100 text-red-700"
                : "bg-gray-200 text-gray-700"}
            `}>
              {skill.isMandatory ? "Mandatory" : "Optional"}
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Category: {skill.category}
          </p>

          <p className="text-xs text-gray-500">
            Priority: {skill.priority}
          </p>

          {skill.notes && (
            <p className="text-xs text-gray-600 mt-2">
              {skill.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  )}
</div>

        {/* ================= ACTION BAR ================= */}
        {(hasRole("Admin") || hasRole("Recruiter") || hasRole("HR")) && (
          <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-wrap gap-3">

            {job.status === "Open" && (
              <button
                onClick={() => setShowHold(true)}
                className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Put On Hold
              </button>
            )}

            {job.status === "OnHold" && (
              <button
                onClick={resumeJob}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Resume Job
              </button>
            )}

            {job.status !== "Closed" && (
              <button
                onClick={() => setShowClose(true)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Close Job
              </button>
            )}

            {(hasRole("Admin") || hasRole("HR")) && job.status !== "Closed" && (
              <button
                onClick={() => setShowCloseWithCandidate(true)}
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Close With Candidate
              </button>
            )}

            {(hasRole("Admin") || hasRole("Recruiter")) && (
              <Link
                to={`/jobs/${job.jobId}/edit`}
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Edit Job
              </Link>
            )}
          </div>
        )}

        {/* ================= MODALS ================= */}
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
    </Layout>
  );
}
