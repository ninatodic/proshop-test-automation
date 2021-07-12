const loginCredentials = {
  adminCredentials: {
    email: 'admin@example.com',
    password: '123456',
  },
  customerCredentials: {
    email: 'customer@example.com',
    password: '123456',
  },
  noEmailCredentials: {
    password: '123456',
  },
  noPasswordCredentials: {
    email: 'customer@example.com',
  },
};

module.exports = { loginCredentials };
