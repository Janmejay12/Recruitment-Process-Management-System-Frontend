import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getReviewDetails,
  saveSkillEvaluation,
  addReviewComment,
  rejectCandidate,
  assignReviewer,
  shortlistCandidate,
} from "../../api/screeningApi";
import AssignReviewerModal from "../../components/screening/AssignReviewerModal";
import ShortlistModal from "../../components/screening/ShortlistModal";

const ReviewDetails = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showShortlistModal, setShowShortlistModal] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getReviewDetails(reviewId);
      setData(res.data.data);
    } catch (err) {
      alert("Failed to load review details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [reviewId]);

  const handleSkillSave = async (skillId, years) => {
    try {
      await saveSkillEvaluation(reviewId, {
        skillId,
        yearsExperience: Number(years),
      });
      await load();
    } catch {
      alert("Failed to save skill evaluation");
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      await addReviewComment(reviewId, { commentText: comment });
      setComment("");
      await load();
    } catch {
      alert("Failed to add comment");
    }
  };

  const handleReject = async () => {
    if (!window.confirm("Are you sure you want to reject this candidate?")) return;
    try {
      await rejectCandidate(reviewId);
      navigate("/screening");
    } catch {
      alert("Failed to reject candidate");
    }
  };

  const handleAssignReviewer = async (userId) => {
    try {
      await assignReviewer(reviewId, { reviewerUserId: userId });
      setShowAssignModal(false);
      await load();
    } catch {
      alert("Failed to assign reviewer");
    }
  };

  const handleShortlist = async (userId) => {
    try {
      await shortlistCandidate(reviewId, { interviewerUserId: userId });
      setShowShortlistModal(false);
      navigate("/screening");
    } catch {
      alert("Failed to shortlist candidate");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!data) return null;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white border rounded-lg shadow p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {data.candidate.fullName}
            </h1>
            <p className="text-gray-600">{data.candidate.email}</p>
            <p className="text-gray-600">
              Job: <span className="font-medium">{data.job.title}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-700">
              {data.currentStage}
            </span>
            <p className="text-sm text-gray-500 mt-2">
              Reviewer: {data.assignedReviewerName || "Not assigned"}
            </p>
            <p className="text-sm text-gray-500">
              Interviewer: {data.assignedInterviewerName || "-"}
            </p>
          </div>
        </div>

        {data.hasPreviousHistory && (
          <div className="mt-4 p-3 border border-yellow-300 bg-yellow-50 text-yellow-800 rounded">
            ⚠️ This candidate has previous screening/interview history.
          </div>
        )}
      </div>

      {/* RESUME */}
      {data.candidate.cvPath && (
        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="font-semibold text-gray-800 mb-2">Resume</h2>
          <a
            href={data.candidate.cvPath}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View / Download Resume
          </a>
        </div>
      )}

      {/* SKILLS */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h2 className="font-semibold text-gray-800 mb-4">
          Skill Evaluation
        </h2>

        <table className="min-w-full border">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="border px-3 py-2">Skill</th>
              <th className="border px-3 py-2">Mandatory</th>
              <th className="border px-3 py-2">Years</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.jobRequiredSkills.map((skill) => (
              <tr key={skill.skillId} className="text-sm">
                <td className="border px-3 py-2">
                  {skill.skillName}
                </td>
                <td className="border px-3 py-2">
                  {skill.isMandatory ? "Yes" : "No"}
                </td>
                <td className="border px-3 py-2">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    className="input w-24"
                    defaultValue={
                      data.verifiedSkills.find(v => v.skillId === skill.skillId)?.yearsExperience || 0
                    }
                    id={`skill-${skill.skillId}`}
                  />
                </td>
                <td className="border px-3 py-2">
                  <button
                    onClick={() =>
                      handleSkillSave(
                        skill.skillId,
                        document.getElementById(`skill-${skill.skillId}`).value
                      )
                    }
                    className="px-3 py-1 text-xs rounded bg-blue-600 text-white"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COMMENTS */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Comments</h2>

        <div className="space-y-3 mb-4">
          {data.comments.map((c, idx) => (
            <div key={idx} className="border rounded p-3 bg-gray-50">
              <p className="text-sm text-gray-800">{c.commentText}</p>
              <p className="text-xs text-gray-500 mt-1">
                — {c.commentedBy} ({c.roleAtTime}) •{" "}
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          {data.comments.length === 0 && (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>

        <textarea
          className="input"
          rows="3"
          placeholder="Add comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end mt-2">
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            Add Comment
          </button>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="bg-white border rounded-lg shadow p-6 flex justify-between">
        <div className="flex gap-3">
          <button
            onClick={() => setShowAssignModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Assign Reviewer
          </button>

          <button
            onClick={() => setShowShortlistModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Shortlist
          </button>
        </div>

        <button
          onClick={handleReject}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Reject
        </button>
      </div>

      {/* MODALS */}
      {showAssignModal && (
        <AssignReviewerModal
          onClose={() => setShowAssignModal(false)}
          onAssign={handleAssignReviewer}
        />
      )}

      {showShortlistModal && (
        <ShortlistModal
          onClose={() => setShowShortlistModal(false)}
          onShortlist={handleShortlist}
        />
      )}

    </div>
  );
};

export default ReviewDetails;
