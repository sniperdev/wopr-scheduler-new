import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { selectToken, selectCompanyId } from './userSlice.ts';
import { RootState } from '../store.ts';

export interface CalendarState {
  data: {
    id: number | null;
    start: string;
    end: string;
    title: string;
    user_id: number | null;
    color: string;
    date: string;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  data: [],
  loading: false,
  error: null,
};

export const getCalendar = createAsyncThunk(
  'calendar/fetchCalendar',
  async (_, { getState }) => {
    const companyId = selectCompanyId(getState() as RootState);
    const token = selectToken(getState() as RootState);
    const response = await fetch(
      `http://localhost:3000/AdminUsersWorkShifts/${companyId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      },
    );
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('token', result.jwt);
    }
    return result;
  },
);

const calendarReducer = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCalendar.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(getCalendar.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
        loading: false,
      }))
      .addCase(getCalendar.rejected, (state, action) => ({
        ...state,
        error: action.error?.message || null,
        loading: false,
      }));
  },
});

export const selectCalendar = (state: { calendar: CalendarState }) => state.calendar.data;

export default calendarReducer.reducer;
