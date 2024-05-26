// listenerMiddleware.js
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { getUser } from '../slice/userSlice.ts';
import { getCalendar } from '../slice/calendarSlice.ts';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(getUser.fulfilled),
  effect: async (_action, listenerApi) => {
    await listenerApi.dispatch(getCalendar());
  },
});
