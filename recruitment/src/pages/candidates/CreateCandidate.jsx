import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateForm from "../../components/candidates/CandidateForm";
import { createCandidateManual } from "../../api/candidateApi";

const CreateCandidate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await createCandidateManual(data);
      alert("Candidate created successfully");
      navigate("/candidates");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Create Candidate
      </h1>

      <CandidateForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateCandidate;
