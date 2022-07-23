import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channels';
import messagesReducer from './messages';
import modalReducer from './modal';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
