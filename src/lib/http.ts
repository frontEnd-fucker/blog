import axios from "axios";
import { toast } from "sonner";

const http = axios.create();

function httpErrorHandler(error: Error) {
  if (axios.isAxiosError(error)) {
    //here we have a type guard check, error inside this if will be treated as AxiosError
    const response = error.response;
    const request = error.request;
    const config = error.config; //here we have access the config used to make the api call (we can make a retry using this conf)
    const isSilent = !!config?.silent;

    // if (error.code === 'ERR_NETWORK') {
    //   console.log('connection problems..')
    // } else if (error.code === 'ERR_CANCELED') {
    //   console.log('connection canceled..')
    // }

    if (response) {
      //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
      const statusCode = response?.status;
      if (statusCode === 404) {
        console.log(
          "The requested resource does not exist or has been deleted",
        );
      } else if (statusCode === 401) {
        console.log("Please login to access this resource");
        //redirect user to login
      } else {
        !isSilent && toast(response.data.message ?? error.message);
        return Promise.reject(response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      !isSilent && toast.error(error.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      !isSilent && toast.error(error.message);
    }

    return Promise.reject(error);
  }
  //Something happened in setting up the request and triggered an Error
  return Promise.reject(error);
}

http.interceptors.response.use(
  (response) => {
    const data = response?.data;

    return data;
  },
  (error) => {
    const config = error?.config;
    if (config.raw) {
      return error;
    }
    return httpErrorHandler(error);
  },
);

export default http;
