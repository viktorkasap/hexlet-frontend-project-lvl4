import axios from 'axios';

import routes from '../routes/routes';

const fetchAll = async (getAuthHeader) => {
  const response = await axios.get(routes.data(), { headers: getAuthHeader() });
  return response.data;
};

export default fetchAll;
