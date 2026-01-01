import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import api from "../../api/axios";

export default function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    department: "",
    minExperience: "",
    level: "",
    salaryRange: "",
    employmentType: "",
    numberOfPositions: 1,
    applicationDeadline: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      department: form.department.trim(),
      minExperience: Number(form.minExperience),
      level: form.level,
      salaryRange: form.salaryRange || null,
      employmentType: form.employmentType,
      numberOfPositions: Number(form.numberOfPositions),
      applicationDeadline: form.applicationDeadline || null,
      skills: []
    };

    console.log("CREATE JOB PAYLOAD:", payload);

    try {
      await api.post("/job", payload);
      navigate("/jobs");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create job. Check console for details.");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Create New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              minLength={5}
              className="input"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              minLength={10}
              rows={4}
              className="input"
            />
          </div>

          {/* Location + Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div>
              <label className="label">Department</label>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          </div>

          {/* Experience + Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Minimum Experience (years)</label>
              <input
                type="number"
                name="minExperience"
                value={form.minExperience}
                onChange={handleChange}
                min={0}
                max={50}
                required
                className="input"
              />
            </div>

            <div>
              <label className="label">Job Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select level</option>
                <option value="Junior">Junior</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Principal">Principal</option>
              </select>
            </div>
          </div>

          {/* Salary + Employment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Salary Range</label>
              <input
                name="salaryRange"
                value={form.salaryRange}
                onChange={handleChange}
                className="input"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="label">Employment Type</label>
              <select
                name="employmentType"
                value={form.employmentType}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select employment</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          {/* Positions + Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Number of Positions</label>
              <input
                type="number"
                name="numberOfPositions"
                value={form.numberOfPositions}
                onChange={handleChange}
                min={1}
                max={100}
                required
                className="input"
              />
            </div>

            <div>
              <label className="label">Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={form.applicationDeadline}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-medium"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
