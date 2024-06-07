import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectToken, selectCompanyId } from './userSlice.ts';
import { RootState } from '../store.ts';
import { AdminShiftItem } from '../../utils/interfaces/AdminShiftItem.ts';

export interface CalendarState {
  adminShifts: {
    item: AdminShiftItem[];
    loading: boolean;
    success: boolean;
    error: string | null;
  }
  scheduledShifts: {
    item: AdminShiftItem[];
    loading: boolean;
    success: boolean;
    error: string | null;
  }
  addScheduledShifts: {
    loading: boolean;
    success: boolean;
    error: string | null;
  }
}

const initialState: CalendarState = {
  adminShifts: {
    item: [],
    loading: false,
    success: false,
    error: null,
  },
  scheduledShifts: {
    item: [],
    loading: false,
    success: false,
    error: null,
  },
  addScheduledShifts: {
    loading: false,
    success: false,
    error: null,
  },
};

export const getAdminShifts = createAsyncThunk(
  'adminCalendar/fetchAdminShifts',
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

export const getScheduledShifts = createAsyncThunk(
  'adminCalendar/fetchScheduledShifts',
  async (_, { getState }) => {
    const companyId = selectCompanyId(getState() as RootState);
    const token = selectToken(getState() as RootState);
    const response = await fetch(
      `http://localhost:3000/ScheduledWorkShifts/${companyId}`,
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

export const setScheduledShifts = createAsyncThunk(
  'adminCalendar/setScheduledShifts',
  async (_, { getState }) => {
    const companyId = selectCompanyId(getState() as RootState);
    const token = selectToken(getState() as RootState);
    const events = selectScheduledShifts(getState() as RootState);
    const response = await fetch('http://localhost:3000/AdminUsersWorkShifts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({
        events,
        company_id: companyId,
      }),
    });
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
  reducers: {
    addAdminShifts: (state, action: PayloadAction<AdminShiftItem>) => {
      state.adminShifts.item.push(action.payload);
    },
    deleteAdminShifts: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        adminShifts: {
          ...state.adminShifts,
          item: state.adminShifts.item.filter((e) => e.id !== action.payload),
        }
      }
    },
    addScheduledShifts: (state, action) => {
      state.scheduledShifts.item.push(action.payload);
    },
    deleteScheduledShift: (state, action: PayloadAction<number>) => {
      return {...state,
        scheduledShifts: {
        ...state.scheduledShifts,
          item: state.scheduledShifts.item.filter((e) => Number(e.id) !== action.payload),
        },
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAdminShifts.pending, (state) => ({
        ...state,
        adminShifts: {
          ...state.adminShifts,
          loading: true,
          error: null,
        },
      }))
      .addCase(getAdminShifts.fulfilled, (state, action) => ({
        ...state,
        adminShifts: {
          item: action.payload,
          loading: false,
          success: true,
          error: null,
        },
      }))
      .addCase(getAdminShifts.rejected, (state, action) => ({
        ...state,
        adminShifts: {
          ...state.adminShifts,
          error: action.error?.message || null,
          loading: false,
          success: false,
        },
      }))

      .addCase(getScheduledShifts.pending, (state) => ({
        ...state,
        scheduledShifts: {
          ...state.scheduledShifts,
          loading: true,
          error: null,
        },
      }))
      .addCase(getScheduledShifts.fulfilled, (state, action) => ({
        ...state,
        scheduledShifts: {
          item: action.payload,
          loading: false,
          success: true,
          error: null,
        },
      }))
      .addCase(getScheduledShifts.rejected, (state, action) => ({
        ...state,
        scheduledShifts: {
          ...state.scheduledShifts,
          error: action.error?.message || null,
          loading: false,
          success: false,
        },
      }))

      .addCase(setScheduledShifts.pending, (state) => ({
        ...state,
        addScheduledShifts: {
          ...state.addScheduledShifts,
          loading: true,
          success: false,
          error: null,
        },
      }))
      .addCase(setScheduledShifts.fulfilled, (state) => ({
        ...state,
        addScheduledShifts: {
          loading: false,
          success: true,
          error: null,
        },
      }))
      .addCase(setScheduledShifts.rejected, (state, action) => ({
        ...state,
        addScheduledShifts: {
          loading: false,
          success: false,
          error: action.error?.message || null,
        },
      }));
  },
});

export const {
  addAdminShifts, deleteAdminShifts, addScheduledShifts, deleteScheduledShift,
} = calendarReducer.actions;

export const selectAdminShifts = (state: { adminCalendar: CalendarState }) => state.adminCalendar.adminShifts.item;
export const selectAdminShiftsLoading = (state: { adminCalendar: CalendarState }) => state.adminCalendar.adminShifts.loading;
export const selectAdminShiftsSuccess = (state: { adminCalendar: CalendarState }) => state.adminCalendar.adminShifts.success;
export const selectAdminShiftsError = (state: { adminCalendar: CalendarState }) => state.adminCalendar.adminShifts.error;

export const selectScheduledShifts = (state: { adminCalendar: CalendarState }) => state.adminCalendar.scheduledShifts.item;
export const selectScheduledShiftsLoading = (state: { adminCalendar: CalendarState }) => state.adminCalendar.scheduledShifts.loading;
export const selectScheduledShiftsSuccess = (state: { adminCalendar: CalendarState }) => state.adminCalendar.scheduledShifts.success;
export const selectScheduledShiftsError = (state: { adminCalendar: CalendarState }) => state.adminCalendar.scheduledShifts.error;

export const selectAddScheduledShiftsLoading = (state: { adminCalendar: CalendarState }) => state.adminCalendar.addScheduledShifts.loading;
export const selectAddScheduledShiftsSuccess = (state: { adminCalendar: CalendarState }) => state.adminCalendar.addScheduledShifts.success;
export const selectAddScheduledShiftsError = (state: { adminCalendar: CalendarState }) => state.adminCalendar.addScheduledShifts.error;

export default calendarReducer.reducer;
