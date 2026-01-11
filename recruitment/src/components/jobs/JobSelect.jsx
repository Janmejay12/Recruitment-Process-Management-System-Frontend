import { useEffect, useState } from "react";
import { getJobs } from "../../api/jobApis";

const JobSelect = ({ value, onChange }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await getJobs();
        console.log("JOBS API:", res.data);

        const allJobs = res.data.data || res.data;

        // ✅ FILTER: only active & non-closed jobs
        const openJobs = allJobs.filter(
          (job) => job.IsActive && job.Status !== "Closed"
        );

        setJobs(openJobs);
      } catch (err) {
        console.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Job
      </label>
      <select
        className="input"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={loading}
        required
      >
        <option value="">
          {loading ? "Loading jobs..." : "Select Job"}
        </option>

        {jobs.map((job) => (
          <option key={job.jobId} value={job.jobId}>
            {job.title} — {job.department}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobSelect;
