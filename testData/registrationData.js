const registrationData = {
  withoutName: {
    email: 'testUser@example.com',
    password: '123456',
    confirmedPassword: '123456',
  },
  withoutEmail: {
    name: 'Test Name',
    password: '123456',
    confirmedPassword: '123456',
  },
  withoutPassword: {
    name: 'Test Name',
    email: 'testUser@example.com',
  },
  unmatchingPassword: {
    name: 'Test Name',
    email: 'testUser@example.com',
    password: '123456',
    confirmedPassword: '234567',
  },

  correctData: {
    name: 'Test Name',
    email: 'testUser@example.com',
    password: '123456',
    confirmedPassword: '123456',
  },
};

module.exports = registrationData;
