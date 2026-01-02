const CandidateSkillsForm = ({ skills, setSkills }) => {
  const addSkill = () => {
    setSkills([
      ...skills,
      { skillId: "", yearsExperience: 0, proficiencyLevel: "" },
    ]);
  };

  const updateSkill = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <h2 className="font-medium text-gray-700 mb-3">Skills</h2>

      {skills.map((skill, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3"
        >
          <input
            placeholder="Skill ID"
            className="input"
            onChange={(e) =>
              updateSkill(index, "skillId", e.target.value)
            }
          />
          <input
            placeholder="Years Experience"
            className="input"
            onChange={(e) =>
              updateSkill(index, "yearsExperience", e.target.value)
            }
          />
          <input
            placeholder="Proficiency Level"
            className="input"
            onChange={(e) =>
              updateSkill(index, "proficiencyLevel", e.target.value)
            }
          />
          <button
            type="button"
            onClick={() => removeSkill(index)}
            className="text-red-600 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        className="text-blue-600 text-sm font-medium"
      >
        + Add Skill
      </button>
    </div>
  );
};

export default CandidateSkillsForm;
