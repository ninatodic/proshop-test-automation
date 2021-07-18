module.exports = {
  timeout: 600 * 1000,
  reporter: 'mocha-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mocha-junit-reporter, spec',
    mochaJunitReporterReporterOptions: {
      mochaFile: './reports/testResults.xml',
    },
  },
};
