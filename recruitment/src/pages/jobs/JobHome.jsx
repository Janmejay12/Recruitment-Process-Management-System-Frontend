import { Link } from "react-router-dom";
import JobList from "./JobList";
import { useAuth } from "../../context/AuthContext";

export default function JobHome() {
  const { hasRole } = useAuth();

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Job Management
        </h1>

        {(hasRole("Admin") || hasRole("Recruiter")) && (
          <Link
            to="/jobs/create"
            className="btn-primary"
          >
            Create Job
          </Link>
        )}
      </div>

      {/* Job list */}
      <JobList />
    </div>
  );
}
