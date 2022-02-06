import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // for active or available users
  active: [],
  //for active users on wed
  wed: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    activate: (state, action) => {
      state.active = action.payload;
    },
    deaActivate: (state, action) => {
      state.active = [];
    },
    setWed: (state, action) => {
      state.wed = action.payload;
    },
    unsetWed: (state, action) => {
      state.wed = [];
    },
  },
});

export const { activate, deaActivate, setWed, unsetWed } = userSlice.actions;

// The function below is called a selector and allows us to select a value from the state. or send export the state value
export const selectActive = (state) => state.user.active;
export const selectWed = (state) => state.user.wed;

export default userSlice.reducer;
