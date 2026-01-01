import { useAuth } from "../../context/AuthContext";
import {
  holdJob,
  resumeJob,
  closeJob
} from "../../api/jobApi";

const JobActions = ({ job, refresh }) => {
  const { hasRole } = useAuth();

  const canManage =
    hasRole("Admin") || hasRole("Recruiter") || hasRole("HR");

  if (!canManage || job.status === "Closed") return null;

  return (
    <div className="mt-6 flex gap-3">
      {job.status === "Open" && (
        <button
          onClick={() => holdJob(job.jobId, { reason: "Paused" }).then(refresh)}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Put On Hold
        </button>
      )}

      {job.status === "OnHold" && (
        <button
          onClick={() => resumeJob(job.jobId).then(refresh)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Resume
        </button>
      )}

      <button
        onClick={() => closeJob(job.jobId, { reason: "Closed manually" }).then(refresh)}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Close Job
      </button>
    </div>
  );
};

export default JobActions;
