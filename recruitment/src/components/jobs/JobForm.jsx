// src/components/jobs/JobForm.jsx
import { useState, useEffect } from "react";

const emptyJob = {
  title: "",
  description: "",
  location: "",
  department: "",
  minExperience: 0,
  level: "Junior",
  salaryRange: "",
  employmentType: "Full-time",
  numberOfPositions: 1,
  applicationDeadline: ""
};

export default function JobForm({ initialData, onSubmit, loading }) {
  const [job, setJob] = useState(emptyJob);

  useEffect(() => {
    if (initialData) {
      setJob({
        ...initialData,
        applicationDeadline: initialData.applicationDeadline
          ? initialData.applicationDeadline.split("T")[0]
          : ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(job);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {initialData ? "Update Job" : "Create Job"}
      </h2>

      <input
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
        className="input"
        required
      />

      <textarea
        name="description"
        placeholder="Job Description"
        value={job.description}
        onChange={handleChange}
        className="input"
        rows={4}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={job.department}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <input
          type="number"
          name="minExperience"
          placeholder="Min Experience"
          value={job.minExperience}
          onChange={handleChange}
          className="input"
        />

        <select
          name="level"
          value={job.level}
          onChange={handleChange}
          className="input"
        >
          <option>Junior</option>
          <option>Mid-Level</option>
          <option>Senior</option>
          <option>Lead</option>
          <option>Principal</option>
        </select>

        <select
          name="employmentType"
          value={job.employmentType}
          onChange={handleChange}
          className="input"
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="salaryRange"
          placeholder="Salary Range"
          value={job.salaryRange}
          onChange={handleChange}
          className="input"
        />

        <input
          type="date"
          name="applicationDeadline"
          value={job.applicationDeadline}
          onChange={handleChange}
          className="input"
        />
      </div>

      <input
        type="number"
        name="numberOfPositions"
        value={job.numberOfPositions}
        onChange={handleChange}
        className="input"
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
