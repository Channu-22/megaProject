// import axios from "axios";

// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//     axiosInstance({
//         method: `${method}`,
//         url:  `${url}`,
//         data: bodyData ? bodyData : null,
//         headers: headers ? headers : null,
//         params: params ? params : null
//     })
// }
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const apiConnector = (
  method,
  url,
  data = null,
  headers = {},
  params = {}
) => {
  return axiosInstance({
    method,
    url,
    data,
    headers,
    params,
  });
};
