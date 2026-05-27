export const API_BASE = "/api";

export const API_PATHS = {
  AUTH: {
    REGISTER: `${API_BASE}/auth/register`,
    LOGIN: `${API_BASE}/auth/login`,
    GET_PROFILE: `${API_BASE}/auth/profile`,
  },

  IMAGE: {
    UPLOAD_IMAGE: `${API_BASE}/auth/upload-image`,
  },

  AI: {
    GENERATE_QUESTIONS: `${API_BASE}/ai/generate-questions`,
    GENERATE_EXPLANATION: `${API_BASE}/ai/generate-explanation`,
  },

  SESSION: {
    CREATE: `${API_BASE}/sessions/create`,
    GET_ALL: `${API_BASE}/sessions/my-sessions`,
    GET_ONE: (id) => `${API_BASE}/sessions/${id}`,
    DELETE: (id) => `${API_BASE}/sessions/${id}`,
  },

  QUESTION: {
    ADD_TO_SESSION: `${API_BASE}/questions/add`,
    PIN: (id) => `${API_BASE}/questions/${id}/pin`,
    UPDATE_NOTE: (id) => `${API_BASE}/questions/${id}/note`,
  },
};
