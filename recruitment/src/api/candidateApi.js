import api from "./axios";

export const createCandidateManual = (payload) => {
  return api.post("/Candidate/manual", payload);
};

export const uploadCandidateResume = (formData, jobId) => {
  return api.post(`/Candidate/upload-resume?jobId=${jobId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAllCandidates = () => {
  return api.get("/Candidate");
};
