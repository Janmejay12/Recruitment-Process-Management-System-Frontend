// src/pages/jobs/UpdateJob.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobForm from "../../components/jobs/JobForm";
import api from "../../api/axios";
export default function UpdateJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`/job/${id}`).then((res) => {
      setJob(res.data.data);
    });
  }, [id]);

  const updateJob = async (data) => {
    try {
      await api.put(`/job/${id}`, data);
      navigate(`/jobs/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (!job) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <JobForm initialData={job} onSubmit={updateJob} />
    </div>
  );
}
