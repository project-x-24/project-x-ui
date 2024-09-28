import axios from 'axios';
import { API_ENDPOINT } from '../constants/common';

export const apiCall = async (payload) => {
  const { url } = payload;

  const API_URL = `${'https://150.230.238.192/api/'}${url}`;

  const apiParams = {
    ...payload,
    url: API_URL,
  };

  try {
    const apiResponse = await axios(apiParams);

    if (apiResponse?.data) {
      return apiResponse?.data;
    }
  } catch (error) {
    //API FAILURE
    console.log('api failed', error);

    return error;
  }
};
