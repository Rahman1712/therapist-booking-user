import axios from 'axios';
axios.defaults.withCredentials = true
import { authActions } from '../store/auth-slice';
import { sidebarActions } from '../store/sidebar-slice';

let isRefreshing = false;
let refreshSubscribers = [];

let store;
export const injectStore = _store => {
  store = _store
}

const createInstance = (baseURL, loginPath) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const access_token = store.getState().auth.access_token;
      
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        // if the response is a 401 unauthorized, initiate token refresh
        const originalRequest = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          // Perform token refresh
          try {
            const response = await axios.post(`${baseURL}/api/v1/auth/refresh-token`, {
              withCredentials: true,
            });

            const newAccessToken = response.data.access_token;
            store.dispatch(authActions.setAccessToken({ access_token: newAccessToken }));

            // update the original request with the new access_token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Retry the original request
            return axios(originalRequest);
          } catch (refreshError) {
            store.dispatch(authActions.logout()); // redux auth logout
            store.dispatch(sidebarActions.resetValue()); // redux sidebar reset
            // window.location.href = loginPath; //window.location.href = "/login";
            // Handle token refresh error
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        } else {
          // if a refresh request is already in progress, pause the original request and await it
          return new Promise((resolve) => {
            refreshSubscribers.push((access_token) => {
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
              resolve(axios(originalRequest));
            });
          });
        }
      }

      // for other response errors, reject the request with the error
      return Promise.reject(error);
    }
  );

  return instance;
};

// export const userAxiosApi = createInstance('http://localhost:8080');
export const userAxiosApi = createInstance(import.meta.env.VITE_USER_BASE_URL, "/login");
export const therapistsAxiosApi = createInstance(import.meta.env.VITE_THERAPIST_BASE_URL, "/vendor/login");
export const chatsAxiosApi = createInstance(import.meta.env.VITE_CHAT_BASE_URL, "/login");
// export const anotherAxiosApi = createInstance('http://another-api-url.com', '');
// Add more instances with different base URLs as needed
