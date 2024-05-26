import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  lazy, ReactNode, Suspense, useState,
} from 'react';
import { useAppSelector } from './redux/hooks.ts';
import { selectUser } from './redux/slice/userSlice.ts';
import { User } from './utils/interfaces/UserInterface.ts';

const LazyAuthPage = lazy(() => import('./pages/AuthPage/AuthPage.tsx'));
const LazyHomePage = lazy(() => import('./pages/HomePage/HomePage.tsx'));
const LazyAdminPage = lazy(() => import('./pages/AdminPage/AdminPage.tsx'));

export type UserData = Pick<User, 'data'>['data'];

interface ProtectedRouteProps {
  user: UserData;
  children: ReactNode;
}

function ProtectedRouteApp({ user, children }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function ProtectedRouteAdmin({ user, children }: ProtectedRouteProps) {
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  // const [user, setUser] = useState<User>();
  const user = useAppSelector(selectUser);
  const [calendarToggle, setCalendarToggle] = useState<boolean>(true);

  return (
    <Routes>
      <Route
        path="/app"
        element={(
          <ProtectedRouteApp user={user}>
            <Suspense fallback={<h1>Ładowanie...</h1>}>
              <LazyHomePage
                user={user!}
                calendarToggle={calendarToggle}
                setCalendarToggle={setCalendarToggle}
              />
            </Suspense>
          </ProtectedRouteApp>
        )}
      />
      <Route
        path="/admin"
        element={(
          <ProtectedRouteAdmin user={user}>
            <Suspense fallback={<h1>Ładowanie...</h1>}>
              <LazyAdminPage
                user={user!}
                calendarToggle={calendarToggle}
                setCalendarToggle={setCalendarToggle}
              />
            </Suspense>
          </ProtectedRouteAdmin>
        )}
      />
      <Route
        path="/"
        element={(
          <Suspense fallback={<h1>Ładowanie...</h1>}>
            <LazyAuthPage />
          </Suspense>
        )}
      />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
