import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';
import {getUser} from '../slice/userSlice.ts';
import {getAdminShifts, getScheduledShifts, getUserShifts, setScheduledShifts} from '../slice/calendarSlice.ts';


export const listenerMiddleware1 = createListenerMiddleware();
export const listenerMiddleware2 = createListenerMiddleware();

listenerMiddleware1.startListening({
  matcher: isAnyOf(getUser.fulfilled),
  effect: async (_action, listenerApi) => {
    await listenerApi.dispatch(getAdminShifts());
    await listenerApi.dispatch(getScheduledShifts());
    await listenerApi.dispatch(getUserShifts());
  },
});

listenerMiddleware2.startListening({
  matcher: isAnyOf(setScheduledShifts.fulfilled),
  effect: async (_action, listenerApi) => {
    await listenerApi.dispatch(getScheduledShifts());
  },
});

