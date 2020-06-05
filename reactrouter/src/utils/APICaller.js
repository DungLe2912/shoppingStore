import axios from 'axios';
import * as Config from '../constants/Config';

export default function callAPI(endpoint, method = 'GET', headers, body) {
  return axios(
    {
      method,
      url: `${Config.API_URL}/${endpoint}`,
      headers,
      data: body,
    },
  ).catch(() =>
    // eslint-disable-next-line no-console
    // eslint-disable-next-line implicit-arrow-linebreak
    ({
      err: 'ECONNREFUSED',
    }));
}
