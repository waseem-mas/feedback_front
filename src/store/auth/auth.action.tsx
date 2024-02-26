import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../interceptor";
import { IComment } from "./interface";

export const login = createAsyncThunk(
  "auth/login",
  async (params: any, { rejectWithValue }) => {
    try {
      const resp = await api.post(`login`, {
        ...params
      });
      return resp?.data;
    } catch (_err) {
      const error = _err as AxiosError;
      return rejectWithValue({ data: error.message });
    }
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (params: any, { rejectWithValue }) => {
    try {
      const resp = await api.post(`register`, {
        ...params
      });
      return resp?.data;
    } catch (_err) {
      const error = _err as AxiosError;
      return rejectWithValue({ data: error.message });
    }
  }
);
