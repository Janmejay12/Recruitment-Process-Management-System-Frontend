import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadCandidateResume } from "../../api/candidateApi";
import JobSelect from "../../components/jobs/JobSelect";

const UploadResume = () => {
  const [jobId, setJobId] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadCandidateResume(formData, jobId);
      alert("Resume uploaded successfully");
      navigate("/candidates");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow p-6 max-w-xl">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Upload Resume
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <JobSelect value={jobId} onChange={setJobId} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resume File
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700">
            Upload Resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadResume;
