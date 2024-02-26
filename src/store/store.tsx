import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import feedbackSlice from "./feedback/feedback.reducer";
import authSlice from "./auth/auth.reducer";

export const store = configureStore({
  reducer: {
    feedback: feedbackSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
