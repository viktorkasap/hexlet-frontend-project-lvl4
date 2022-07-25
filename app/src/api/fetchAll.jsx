import axios from 'axios';

import routes from '../routes/routes';
import getAuthHeader from '../utils/getRequestHeaders';

const fetchAll = async () => {
  const response = await axios.get(routes.data(), { headers: getAuthHeader() });
  return response.data;
};

export default fetchAll;
