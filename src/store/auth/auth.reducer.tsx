import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./auth.action";
import { STATUS_CODE } from "../../constant";
import { string } from "yup";
import { ICommentShow, IFeedbackState } from "./interface";

const initialState: IFeedbackState = {
  feedbacks: [],
  count: 0,
  comments: []
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(actions.login.fulfilled, (state, action) => {
      const { outcomeCode , message } = action.payload?._metadata;

      if (outcomeCode === STATUS_CODE.OK) {
        const { token,user } = action.payload.records;
        localStorage.setItem('userToken',token)
        localStorage.setItem('user',JSON.stringify(user))
      }
    });
    builder.addCase(actions.signup.fulfilled, (state, action) => {
      const { outcomeCode , message } = action.payload?._metadata;
      if (outcomeCode === STATUS_CODE.OK) {
        const { token,user } = action.payload.records;
        localStorage.setItem('userToken',token)
        localStorage.setItem('user',JSON.stringify(user))
      }
    });
  },
});

export default authSlice;
export const AuthActions = authSlice.actions;
