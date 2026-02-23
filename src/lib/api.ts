import axios from "axios";

const api = axios.create({
  withCredentials: true, // MUST be true to send/receive cookies
});

api.interceptors.response.use(
  (response) => response, // If request works, do nothing
  async (error) => {
    const originalRequest = error.config;

    // If error is 403 (or 401) and we haven't tried to refresh yet
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post("/api/moderator/refresh-token"); 
        return api(originalRequest); 
      } catch (refreshError) {
        window.location.href = "/admin/admin/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;