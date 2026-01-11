import api from "./axios";

export const getJobs = () => api.get("/job");
export const getJobById = (id) => api.get(`/job/${id}`);
export const getSkills = (id) => api.get("/job");

export const createJob = (data) => api.post("/job", data);
export const updateJob = (id, data) => api.put(`/job/${id}`, data);

export const holdJob = (id, data) => api.put(`/job/${id}/hold`, data);
export const resumeJob = (id) => api.put(`/job/${id}/resume`);
export const closeJob = (id, data) => api.put(`/job/${id}/close`, data);
export const closeWithCandidate = (id, data) =>
  api.put(`/job/${id}/close-with-candidate`, data);

