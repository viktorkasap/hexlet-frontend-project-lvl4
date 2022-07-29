import { createSlice } from '@reduxjs/toolkit';
/* eslint  no-param-reassign: 0 */

const initialState = {
  type: null,
  channelId: null,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.id;
    },
    close: (state) => {
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { open, close } = modal.actions;
export default modal.reducer;
