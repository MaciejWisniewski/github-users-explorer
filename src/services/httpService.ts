import axios from 'axios';

axios.interceptors.response.use(undefined, (ex) => {
  const expectedError =
    ex.response && ex.response.status >= 400 && ex.response.status < 500;

  if (!expectedError && !axios.isCancel(ex)) {
    console.error('An unexpected error has occurred');
  }

  return Promise.reject(ex);
});

export function getSource() {
  return axios.CancelToken.source();
}

export function isHttpCancelled(ex: Error) {
  return axios.isCancel(ex);
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  getSource,
  isHttpCancelled,
};

export default http;
