import axios from "axios";

const secureAxiosInstance = axios.create({
  baseURL: "https://funime-backend.cyclic.app",
  // baseURL: "http://localhost:9000",
});

// Add a response interceptor
secureAxiosInstance.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location = "/";
      localStorage.clear();
      localStorage.setItem("key", "true");
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { secureAxiosInstance };
