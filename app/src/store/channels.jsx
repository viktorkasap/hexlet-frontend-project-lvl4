import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter
  .getInitialState(
    { currentChannelId: null, defaultChannelId: 1 },
  );

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannelId: ((state, action) => {
      state.currentChannelId = action.payload;
    }),
    setDefaultChannelId: ((state, action) => {
      if (!action.payload) {
        state.currentChannelId = state.defaultChannelId;
      }
    }),
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  addChannel,
  addChannels,
  renameChannel,
  removeChannel,
  setCurrentChannelId,
  setDefaultChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
