const {
  PS_BASE_URL,
  PS_ADMIN_EMAIL,
  PS_ADMIN_PASSWORD,
  PS_USER_EMAIL,
  PS_USER_PASSWORD,
} = process.env;

const config = {
  browser: 'chrome',
  baseUrl: PS_BASE_URL,
  adminEmail: PS_ADMIN_EMAIL,
  adminPassword: PS_ADMIN_PASSWORD,
  userEmail: PS_USER_EMAIL,
  userPassword: PS_USER_PASSWORD,
};

module.exports = config;
