const {
  PS_BASE_URL,
  PS_ADMIN_NAME,
  PS_ADMIN_EMAIL,
  PS_ADMIN_PASSWORD,
  PS_USER_NAME,
  PS_USER_EMAIL,
  PS_USER_PASSWORD,
} = process.env;

const config = {
  browser: 'chrome',
  spec: 'register.spec.js',
  suite: 'ui',
  headless: false,
  baseUrl: PS_BASE_URL,
  adminName: PS_ADMIN_NAME,
  adminEmail: PS_ADMIN_EMAIL,
  adminPassword: PS_ADMIN_PASSWORD,
  userName: PS_USER_NAME,
  userEmail: PS_USER_EMAIL,
  userPassword: PS_USER_PASSWORD,
};

module.exports = config;
