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

      state.isOpen = true;
      state.type = payload;

},
    close: (state) => {

      state.isOpen = false;
      state.type = null;

},
    setChannelId: (state, { payload }) => {

      state.channelId = payload;

},
  },
});

export const { open, close, setChannelId } = modal.actions;
export default modal.reducer;
