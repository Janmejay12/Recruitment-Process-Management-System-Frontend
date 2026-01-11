import api from "./axios";

export const getUsersByRole = (role) => {
  return api.get(`/User?role=${role}`);
};
