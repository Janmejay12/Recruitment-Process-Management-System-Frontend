import { Link } from "react-router-dom";

const CandidateHome = () => {
  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Candidate Management
      </h1>
      <p className="text-gray-500 mb-6">
        Manage candidates, upload resumes, and track applicant profiles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create Candidate */}
        <div className="border rounded-lg p-5 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Add Candidate Manually
          </h2>
          <p className="text-gray-600 mb-4">
            Create a candidate profile by entering personal details and skills.
          </p>
          <Link
            to="/candidates/create"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Create Candidate
          </Link>
        </div>

        {/* Upload Resume */}
        <div className="border rounded-lg p-5 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Upload Candidate Resume
          </h2>
          <p className="text-gray-600 mb-4">
            Upload a resume file and automatically create a candidate profile.
          </p>
          <Link
            to="/candidates/upload-resume"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
          >
            Upload Resume
          </Link>
        </div>

        {/* Candidate List */}
        <div className="border rounded-lg p-5 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            View Candidates
          </h2>
          <p className="text-gray-600 mb-4">
            View and manage all candidates added to the system.
          </p>
          <Link
            to="/candidates/list"
            className="inline-block px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900"
          >
            Candidate List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateHome;
