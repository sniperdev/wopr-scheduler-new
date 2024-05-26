import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice.ts';
import calendarReducer from './slice/calendarSlice.ts';
import {listenerMiddleware1, listenerMiddleware2} from './middleware/listenerMiddleware.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    adminCalendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    listenerMiddleware1.middleware,
    listenerMiddleware2.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
