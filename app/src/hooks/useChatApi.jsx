import { useContext } from 'react';

import { ChatApiContext } from '../context/ChatApiContext';

export const useChatApi = () => useContext(ChatApiContext);
