import api from "./axios";

export const getReviewsByJob = (jobId) => {
  return api.get(`/Screening/job/${jobId}`);
};

export const getReviewDetails = (reviewId) => {
  return api.get(`/Screening/${reviewId}`);
};

export const saveSkillEvaluation = (reviewId, payload) => {
  return api.put(`/Screening/${reviewId}/skills`, payload);
};

export const addReviewComment = (reviewId, payload) => {
  return api.post(`/Screening/${reviewId}/comment`, payload);
};

export const assignReviewer = (reviewId, payload) => {
  return api.put(`/Screening/${reviewId}/assign-reviewer`, payload);
};

export const shortlistCandidate = (reviewId, payload) => {
  return api.put(`/Screening/${reviewId}/shortlist`, payload);
};

export const rejectCandidate = (reviewId) => {
  return api.put(`/Screening/${reviewId}/reject`);
};