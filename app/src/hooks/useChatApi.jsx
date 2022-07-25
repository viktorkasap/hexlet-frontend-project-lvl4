import { useContext } from 'react';

import { ChatApiContext } from '../context/ChatApiContext';

const useChatApi = () => useContext(ChatApiContext);

export default useChatApi;
