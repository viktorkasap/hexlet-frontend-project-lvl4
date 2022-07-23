import axios from 'axios';

import { routes } from '../routes';
import { getAuthHeader } from '../utils';

export const fetchAll = async () => {
  const response = await axios.get(routes.data(), { headers: getAuthHeader() });
  return response.data;
};
