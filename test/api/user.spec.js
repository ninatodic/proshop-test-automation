const UserApi = require('../../apiHelpers/UserApi');
const registrationData = require('../../testData/registrationData');
const expect = require('chai').expect;

const api = new UserApi();

describe('User api suite', () => {
  let id;

  it('should not register user without a name', async () => {
    const response = await api.registerUser(
      registrationData.withoutName,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'User validation failed: name: Path `name` is required.'
    );
  });

  it('should not register user without a email', async () => {
    const response = await api.registerUser(
      registrationData.withoutEmail,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'User validation failed: email: Path `email` is required.'
    );
  });

  it('should not register user without a password', async () => {
    const response = await api.registerUser(
      registrationData.withoutPassword,
      false
    );
    expect(response.status).to.equal(500);
    expect(response.data.message).to.equal(
      'User validation failed: password: Path `password` is required.'
    );
  });

  it('should register a user', async () => {
    const response = await api.registerUser(registrationData.correctData);
    expect(response.status).to.equal(201);
    expect(response.data._id).to.not.be.undefined;
    expect(response.data.name).to.equal(registrationData.correctData.name);
    expect(response.data.email).to.equal(registrationData.correctData.email);
    expect(response.data.isAdmin).to.be.false;
    id = response.data._id;
  });

  it('should not register user with existing email', async () => {
    const response = await api.registerUser(
      registrationData.correctData,
      false
    );
    expect(response.status).to.equal(400);
    expect(response.data.message).to.equal('User already exists');
  });

  it('should delete a user', async () => {
    await api.loginAdmin();
    const response = await api.deleteUser(id);
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('User removed');
  });
});
