import { useState } from "react";
import CandidateSkillsForm from "./CandidateSkillForm";
import JobSelect from "../jobs/JobSelect";

const CandidateForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    jobId: "",
    fullName: "",
    email: "",
    phone: "",
    profileStatus: "Applied",
    skills: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Job */}
      <div className="bg-gray-50 border rounded-md p-4">
        <JobSelect
          value={form.jobId}
          onChange={(jobId) => setForm({ ...form, jobId })}
        />
      </div>

      {/* Candidate Info */}
      <div className="bg-gray-50 border rounded-md p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Candidate Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="fullName"
            placeholder="Full Name"
            className="input"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            className="input"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Skills */}
      <CandidateSkillsForm
        skills={form.skills}
        setSkills={(skills) => setForm({ ...form, skills })}
      />

      <div className="flex justify-end">
        <button
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Candidate"}
        </button>
      </div>
    </form>
  );
};

export default CandidateForm;
