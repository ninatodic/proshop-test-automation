const {
  PS_BASE_URL,
  PS_ADMIN_EMAIL,
  PS_ADMIN_PASSWORD,
  PS_CUSTOMER_EMAIL,
  PS_CUSTOMER_PASSWORD,
} = process.env;

const config = {
  browser: 'chrome',
  baseUrl: PS_BASE_URL,
  adminEmail: PS_ADMIN_EMAIL,
  adminPassword: PS_ADMIN_PASSWORD,
  customerEmail: PS_CUSTOMER_EMAIL,
  customerPassword: PS_CUSTOMER_PASSWORD,
};

module.exports = config;
