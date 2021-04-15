import PrivateRoute from './PrivateRoute';

// eslint-disable-next-line no-shadow
enum R {
  DASHBOARD = '/dashboard',
  LOGIN = '/login',
  VERIFY_EMAIL = '/verify_email',
  TEMPLATE = '/template',
  LOG = '/log',
  SETTINGS = '/settings'
}

export { PrivateRoute, R };
