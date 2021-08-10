const glob = require('glob-promise');

const getFiles = async (pattern) => {
  try {
    return await glob(pattern);
  } catch (error) {
    console.log('nije dobra funkcija');
  }
};

module.exports = getFiles;
