const apiPath = 'api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  data: () => [apiPath, 'data'].join('/'),
  homePage: () => '/',
  notFoundPage: () => '*',
  loginPage: () => '/login',
  signupPage: () => '/signup',
};

export default routes
