import {Route, Routes} from 'react-router-dom';
import {AuthLayout} from '@/layouts/AuthLayout';
import {
  authRoutes,
  fullScreenRoutes,
  inAppRoutes,
  resetPasswordRoutes,
} from './Routes';
import {DashboardLayout} from '@/layouts/DashboardLayout';
import {ResetPasswordLayout} from '@/layouts/ResetPasswordLayout';
import Page404 from '@/pages/Page404';
import FullScreenLayout from '@/layouts/FullScreenLayout';

const renderRoutes = (layout, routes) => (
  <Routes>
    <Route element={layout}>
      {routes.map(({path, element}) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Route>
    <Route path="*" element={<Page404 />} />
  </Routes>
);

const RouterComponent = () => (
  <Routes>
    <Route
      path="/auth/*"
      element={renderRoutes(<AuthLayout />, authRoutes)}
    />
    <Route
      path="/reset-password/*"
      element={renderRoutes(<ResetPasswordLayout />, resetPasswordRoutes)}
    />
    {fullScreenRoutes.map(({path, element}) => (
      <Route
        key={path}
        path={path}
        element={
          <FullScreenLayout showLogout={path.includes('onboarding')}>
            {element}
          </FullScreenLayout>
        }
      />
    ))}
    <Route
      path="/*"
      element={renderRoutes(<DashboardLayout />, inAppRoutes)}
    />
  </Routes>
);

export default RouterComponent;
