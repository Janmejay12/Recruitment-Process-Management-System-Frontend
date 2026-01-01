import { useEffect, useState } from "react";
import { getJobs } from "../../api/jobApis";
import JobCard from "../../components/jobs/Jobcard"
import Layout from "../../components/common/Layout";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const res = await getJobs();
    setJobs(res.data.data);
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Jobs</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard key={job.jobId} job={job} />
        ))}
      </div>
    </Layout>
  );
};

export default JobList;
