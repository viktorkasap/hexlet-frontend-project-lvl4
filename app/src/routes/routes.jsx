const apiPath = 'api/v1';

export const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  data: () => [apiPath, 'data'].join('/'),
  homePage: () => '/',
  notFoundPage: () => '*',
  loginPage: () => '/login',
  signupPage: () => '/signup',
};
