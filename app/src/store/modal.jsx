import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
  channelId: null,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, { payload }) => {
      const draft = state;
      draft.isOpen = true;
      draft.type = payload;
    },
    close: (state) => {
      const draft = state;
      draft.isOpen = false;
      draft.type = null;
    },
    setChannelId: (state, { payload }) => {
      const draft = state;
      draft.channelId = payload;
    },
  },
});

export const { open, close, setChannelId } = modal.actions;
export default modal.reducer;
