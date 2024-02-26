import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../interceptor";
import { IComment } from "./interface";

export const GetAllFeedback = createAsyncThunk(
  "feedback/get-all",
  async (params: any, { rejectWithValue }) => {
    try {
      const resp = await api.get(`feedback`);
      return resp?.data;
    } catch (_err) {
      const error = _err as AxiosError;
      return rejectWithValue({ data: error.message });
    }
  }
);

export const PostComment = createAsyncThunk(
  "comment/post",
  async (params: IComment, { rejectWithValue }) => {
    try {
      const resp = await api.post(`comments/create`, {
        ...params
      });
      return resp?.data;
    } catch (_err) {
      const error = _err as AxiosError;
      return rejectWithValue({ data: error.message });
    }
  }
);

export const GetComments = createAsyncThunk(
  "comment/get",
  async (params: any, { rejectWithValue }) => {
    try {
      const resp = await api.get(`comments?feedback_id=${params}`);
      return resp?.data;
    } catch (_err) {
      const error = _err as AxiosError;
      return rejectWithValue({ data: error.message });
    }
  }
);
export const PostFeedback = createAsyncThunk(
  "feedback/post",
  async (params: any, { rejectWithValue }) => {
    try {
      const resp = await api.post(`feedback/create`, {
        ...params
      });
      return resp?.data;
    } catch (_err) {
      const error = _err as AxiosError;
      return rejectWithValue({ data: error.message });
    }
  }
);
