import axios from 'axios';
import * as Config from '../constants/Config';

export default function callAPI(endpoint, method = 'GET', body) {
  return axios(
    {
      method,
      url: `${Config.API_URL}/${endpoint}`,
      data: body,
    },
  ).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
}
