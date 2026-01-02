import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function CreateJob() {
  const navigate = useNavigate();

  // ================= EXISTING FORM STATE (UNCHANGED)
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    department: "",
    minExperience: "",
    level: "Junior",
    employmentType: "Full-time",
    numberOfPositions: "",
    salaryRange: "",
    applicationDeadline: ""
  });

  // ================= SKILLS (NEW – APPENDED ONLY)
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const res = await api.get("/skill");
    setAllSkills(res.data.data);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.post("/job", {
        ...form,
        minExperience: Number(form.minExperience),
        numberOfPositions: Number(form.numberOfPositions),
        skills
      });

      navigate("/jobs");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border rounded-lg shadow-sm p-6">

          {/* ================= ORIGINAL UI (UNCHANGED) ================= */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Create Job
          </h1>

          <form onSubmit={submit} className="space-y-6">

            {/* BASIC INFO – AS YOU HAD IT */}
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
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <label className="form-label">Level</label>
                <select name="level" value={form.level} onChange={handleChange} className="form-input">
                  <option>Junior</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                  <option>Lead</option>
                  <option>Principal</option>
                </select>
              </div>

              <div>
                <label className="form-label">Min Experience</label>
                <input type="number" name="minExperience" value={form.minExperience} onChange={handleChange} className="form-input" />
              </div>

              <div>
                <label className="form-label">Positions</label>
                <input type="number" name="numberOfPositions" value={form.numberOfPositions} onChange={handleChange} className="form-input" />
              </div>

              <div>
                <label className="form-label">Deadline</label>
                <input type="date" name="applicationDeadline" value={form.applicationDeadline} onChange={handleChange} className="form-input" />
              </div>

              <div className="md:col-span-2">
                <label className="form-label">Salary Range</label>
                <input name="salaryRange" value={form.salaryRange} onChange={handleChange} className="form-input" />
              </div>
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea rows="5" name="description" value={form.description} onChange={handleChange} className="form-input" required />
            </div>

            {/* ================= SKILLS (APPENDED BELOW – NO UI CHANGE ABOVE) ================= */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Job Skills
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setSkills([
                      ...skills,
                      { skillId: "", isMandatory: true, priority: 1, notes: "" }
                    ])
                  }
                  className="text-blue-600 hover:underline text-sm"
                >
                  + Add Skill
                </button>
              </div>

              <div className="space-y-3">
                {skills.map((s, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <select className="form-input" value={s.skillId}
                      onChange={e => {
                        const copy = [...skills];
                        copy[i].skillId = Number(e.target.value);
                        setSkills(copy);
                      }}>
                      <option value="">Select Skill</option>
                      {allSkills.map(sk => (
                        <option key={sk.skillId} value={sk.skillId}>{sk.skillName}</option>
                      ))}
                    </select>

                    <select className="form-input" value={s.isMandatory}
                      onChange={e => {
                        const copy = [...skills];
                        copy[i].isMandatory = e.target.value === "true";
                        setSkills(copy);
                      }}>
                      <option value="true">Mandatory</option>
                      <option value="false">Optional</option>
                    </select>

                    <select className="form-input" value={s.priority}
                      onChange={e => {
                        const copy = [...skills];
                        copy[i].priority = Number(e.target.value);
                        setSkills(copy);
                      }}>
                      <option value={1}>High</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
                    </select>

                    <input className="form-input" placeholder="Notes"
                      value={s.notes}
                      onChange={e => {
                        const copy = [...skills];
                        copy[i].notes = e.target.value;
                        setSkills(copy);
                      }}
                    />

                    <button type="button"
                      onClick={() => setSkills(skills.filter((_, x) => x !== i))}
                      className="text-red-600 text-sm">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= SUBMIT (UNCHANGED) ================= */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {saving ? "Creating..." : "Create Job"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
}
