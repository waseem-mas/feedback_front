import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./feedback.action";
import { STATUS_CODE } from "../../constant";
import { string } from "yup";
import { ICommentShow, IFeedbackState } from "./interface";

const initialState: IFeedbackState = {
  feedbacks: [],
  count: 0,
  comments: []
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: initialState,
  reducers: {
    doReplyOnComment(state, action) {
      const commentId: number = action.payload;
      const comments = JSON.parse(JSON.stringify(state.comments));
      state.comments = comments.map((comment: ICommentShow) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isReply: true,
          }
        }
        return {
            ...comment,
            isReply: false,
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.GetAllFeedback.fulfilled, (state, action) => {
      const { totalRecords, outcomeCode } = action.payload?._metadata;
      const { feedbacks } = action.payload.records;

      if (outcomeCode === STATUS_CODE.OK) {
        state.count = totalRecords;
        state.feedbacks = feedbacks;
      } else if (outcomeCode === STATUS_CODE.No_Content) {
        state.feedbacks = [];
        state.count = 0;
      }
    });
    builder.addCase(actions.PostComment.fulfilled, (state, action) => {
    });
    builder.addCase(actions.GetComments.fulfilled, (state, action) => {
      const { outcomeCode } = action.payload?._metadata;
      const { comments } = action.payload.records;

      if (outcomeCode === STATUS_CODE.OK) {
        state.comments = comments?.map((comment: any) => {
          return {
            ...comment,
            isReply: false,
          }
        });
      } else if (outcomeCode === STATUS_CODE.No_Content) {
        state.comments = [];
      }
    });
    builder.addCase(actions.PostFeedback.fulfilled, (state, action) => {
      const { outcomeCode , message } = action.payload?._metadata;
      if (outcomeCode === STATUS_CODE.OK) {
        const { token,user } = action.payload.records;
        console.log('token',token)
      }
    });
  },
});

export default feedbackSlice;
export const FeedbackActions = feedbackSlice.actions;
