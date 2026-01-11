import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    department: "",
    minExperience: "",
    level: "",
    employmentType: "",
    numberOfPositions: "",
    salaryRange: "",
    applicationDeadline: ""
  });

  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    loadJob();
    loadAllSkills();
  }, [id]);

  const loadAllSkills = async () => {
    const res = await api.get("/skill");
    setAllSkills(res.data.data || []);
  };

  const loadJob = async () => {
    try {
      const res = await api.get(`/job/${id}`);
      const job = res.data.data;

      setForm({
        title: job.title,
        description: job.description,
        location: job.location,
        department: job.department,
        minExperience: job.minExperience,
        level: job.level,
        employmentType: job.employmentType,
        numberOfPositions: job.numberOfPositions,
        salaryRange: job.salaryRange || "",
        applicationDeadline: job.applicationDeadline
          ? job.applicationDeadline.substring(0, 10)
          : ""
      });

      // ✅ FIXED: casing safe skillId
      setSkills(
        job.skills.map(s => ({
          skillId: s.skillId ?? s.SkillId,
          isMandatory: s.isMandatory,
          priority: s.priority,
          notes: s.notes || ""
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/job/${id}`, {
        ...form,
        minExperience: Number(form.minExperience),
        numberOfPositions: Number(form.numberOfPositions),
        skills
      });

      navigate(`/jobs/${id}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-20 text-gray-500">
          Loading job details...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border rounded-lg shadow-sm p-6">

          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Job
          </h1>

          <form onSubmit={submit} className="space-y-6">

            {/* ================= BASIC INFO ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="form-label">Job Title</label>
                <input name="title" value={form.title} onChange={handleChange} className="form-input" required />
              </div>

              <div>
                <label className="form-label">Department</label>
                <input name="department" value={form.department} onChange={handleChange} className="form-input" required />
              </div>

              <div>
                <label className="form-label">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="form-input" required />
              </div>

              <div>
                <label className="form-label">Employment Type</label>
                <select name="employmentType" value={form.employmentType} onChange={handleChange} className="form-input">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="form-label">Level</label>
                <select name="level" value={form.level} onChange={handleChange} className="form-input">
                  <option value="Junior">Junior</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                  <option value="Principal">Principal</option>
                </select>
              </div>

              <div>
                <label className="form-label">Minimum Experience</label>
                <input type="number" name="minExperience" value={form.minExperience} onChange={handleChange} className="form-input" />
              </div>

              <div>
                <label className="form-label">Number of Positions</label>
                <input type="number" name="numberOfPositions" value={form.numberOfPositions} onChange={handleChange} className="form-input" />
              </div>

              <div>
                <label className="form-label">Application Deadline</label>
                <input type="date" name="applicationDeadline" value={form.applicationDeadline} onChange={handleChange} className="form-input" />
              </div>

              <div className="md:col-span-2">
                <label className="form-label">Salary Range</label>
                <input name="salaryRange" value={form.salaryRange} onChange={handleChange} className="form-input" />
              </div>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div>
              <label className="form-label">Job Description</label>
              <textarea name="description" rows="5" value={form.description} onChange={handleChange} className="form-input" required />
            </div>

            {/* ================= SKILLS ================= */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Job Skills</h2>
                <button
                  type="button"
                  onClick={() => setSkills([...skills, { skillId: "", isMandatory: true, priority: 1, notes: "" }])}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Add Skill
                </button>
              </div>

              <div className="space-y-3">
                {skills.map((s, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

                    <select
                      className="form-input"
                      value={s.skillId}
                      onChange={e => {
                        const copy = [...skills];
                        copy[i].skillId = Number(e.target.value);
                        setSkills(copy);
                      }}
                    >
                      <option value="">Select Skill</option>
                      {allSkills.map(sk => {
                        const id = sk.skillId ?? sk.SkillId;
                        const name = sk.skillName ?? sk.SkillName;
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="form-input"
                      value={s.isMandatory}
                      onChange={e => {
                        const copy = [...skills];
                        copy[i].isMandatory = e.target.value === "true";
                        setSkills(copy);
                      }}
                    >
                      <option value="true">Mandatory</option>
                      <option value="false">Optional</option>
                    </select>

                    <select
                      className="form-input"
                      value={s.priority}
                      onChange={e => {
                        const copy = [...skills];
                        copy[i].priority = Number(e.target.value);
                        setSkills(copy);
                      }}
                    >
                      <option value={1}>High</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
                    </select>

                    <input
                      className="form-input"
                      placeholder="Notes"
                      value={s.notes}
                      onChange={e => {
                        const copy = [...skills];
                        copy[i].notes = e.target.value;
                        setSkills(copy);
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                      className="text-red-600 text-sm"
                    >
                      Remove
                    </button>

                  </div>
                ))}
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded bg-gray-200">
                Cancel
              </button>

              <button type="submit" disabled={saving} className="px-6 py-2 rounded bg-blue-600 text-white">
                {saving ? "Saving..." : "Update Job"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
}
