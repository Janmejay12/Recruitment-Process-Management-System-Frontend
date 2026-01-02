export default function JobSkillRow({
  skill,
  index,
  allSkills,
  onChange,
  onRemove
}) {
  return (
    <div className="grid grid-cols-5 gap-3 items-center border p-3 rounded bg-gray-50">
      
      {/* Skill */}
      <select
        className="input"
        value={skill.skillId}
        onChange={e =>
          onChange(index, { ...skill, skillId: Number(e.target.value) })
        }
      >
        <option value="">Select Skill</option>
        {allSkills.map(s => (
          <option key={s.skillId} value={s.skillId}>
            {s.skillName}
          </option>
        ))}
      </select>

      {/* Mandatory */}
      <select
        className="input"
        value={skill.isMandatory}
        onChange={e =>
          onChange(index, {
            ...skill,
            isMandatory: e.target.value === "true"
          })
        }
      >
        <option value="true">Mandatory</option>
        <option value="false">Optional</option>
      </select>

      {/* Priority */}
      <select
        className="input"
        value={skill.priority}
        onChange={e =>
          onChange(index, {
            ...skill,
            priority: Number(e.target.value)
          })
        }
      >
        <option value={1}>High</option>
        <option value={2}>Medium</option>
        <option value={3}>Low</option>
      </select>

      {/* Notes */}
      <input
        className="input"
        placeholder="Notes"
        value={skill.notes || ""}
        onChange={e =>
          onChange(index, { ...skill, notes: e.target.value })
        }
      />

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-600 hover:underline text-sm"
      >
        Remove
      </button>
    </div>
  );
}
