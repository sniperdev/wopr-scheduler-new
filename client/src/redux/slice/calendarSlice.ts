import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CalendarState {
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk(
  "user",
  async (formData: LoginCredentials) => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("token", result.jwt);
    }

    return result;
  },
);

const userReducer = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(getUser.fulfilled, (state, action) => {
        return {
          ...state,
          user: action.payload,
          loading: false,
        };
      })
      .addCase(getUser.rejected, (state, action) => {
        return {
          ...state,
          error: action.error?.message || null,
          loading: false,
        };
      });
  },
});

export const selectUser = (state: { user: UserState }) => state.user.user.data;
export const selectIsAdmin = (state: { user: UserState }) =>
  state.user.user.data.isAdmin;
export const selectToken = (state: { user: UserState }) => state.user.user?.jwt;
export default userReducer.reducer;
