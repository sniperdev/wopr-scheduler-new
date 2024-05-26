import React, {
  lazy, Suspense, useEffect, useState,
} from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NavbarComponent from '../HomePage/components/NavbarComponent.tsx';
import AdminCalendarComponent from './components/AdminCalendarComponent.tsx';
import './AdminPage.css';
import ShiftListComponent from './components/ShiftListComponent.tsx';
import { AdminShiftItem } from '../../utils/interfaces/AdminShiftItem.ts';
import ReadyShiftsCalendarComponent from '../HomePage/components/ReadyShiftsCalendarComponent.tsx';
import HelpOffcanvasComponent from '../../shared/components/HelpOffcanvasComponent.tsx';
import { UserData } from '../../App.tsx';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getUser } from '../../redux/slice/userSlice.ts';
import {
  CalendarState,
  selectAdminShifts,
  selectScheduledShifts,
  selectScheduledShiftsError, selectScheduledShiftsLoading,
} from '../../redux/slice/calendarSlice.ts';

interface Props {
  user: UserData;
  calendarToggle: boolean;
  setCalendarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPanelModal = lazy(
  () => import('./components/SettingsPanelModal.tsx'),
);

function AdminPage({ user, calendarToggle, setCalendarToggle }: Props) {
  const scheduledShiftsError = useAppSelector(selectScheduledShiftsError);
  const scheduledShiftsLoading = useAppSelector(selectScheduledShiftsLoading);

  const listEvents = useAppSelector(selectAdminShifts);
  // const [listEvents, setListEvents] = useState<AdminShiftItem[]>([]);

  const calendarEvents = useAppSelector(selectScheduledShifts);
  // const [calendarEvents, setCalendarEvents] = useState<AdminShiftItem[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  // TESTOWO
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser({ email: 'wrona@gmail.com', password: '12345678' }));
  }, []);

  return (
    <div className="vh-100">
      <NavbarComponent
        setCalendarToggle={setCalendarToggle}
        calendarToggle={calendarToggle}
        saveShiftsMutation={null}
        // saveShiftsMutation={saveShiftsMutation}
        setShowModal={setShowModal}
        setShowCanvas={setShowCanvas}
      />
      <div className="d-flex mx-2 mt-3 calendar gap-3">
        {calendarToggle && (
        <div className="w-25">
          {scheduledShiftsError ? (
            <div>Błąd</div>
          ) : scheduledShiftsLoading ? (
            <div>Ładowanie...</div>
          ) : (
            <ShiftListComponent />
          )}
        </div>
        )}

        {calendarToggle ? (
          <div className="w-75">
            <AdminCalendarComponent />
          </div>
        ) : (
          <div className="w-100">
            {/* <ReadyShiftsCalendarComponent */}
            {/*  isPending={isPending} */}
            {/*  isError={isError} */}
            {/*  data={data} */}
            {/* /> */}
          </div>
        )}
        <Suspense fallback={<div>Ładowanie ustawień...</div>}>
          {showModal && (
            <SettingsPanelModal
              showModal={showModal}
              setShowModal={setShowModal}
              user={user}
            />
          )}
        </Suspense>
        <HelpOffcanvasComponent
          showCanvas={showCanvas}
          setShowCanvas={setShowCanvas}
        />
      </div>
    </div>
  );
}

export default AdminPage;
