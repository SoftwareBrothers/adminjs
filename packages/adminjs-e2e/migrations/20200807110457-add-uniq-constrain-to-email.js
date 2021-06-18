

module.exports = {
  // up: () => Promise.resolve(true),
  up: queryInterface => queryInterface.addConstraint('ExternalEmployees', {
    fields: ['email'],
    type: 'unique',
    name: 'external_employees_email_unique_constraint',
  }),

  down: queryInterface => queryInterface.removeConstraint(
    'ExternalEmployees', 'external_employees_email_unique_constraint',
  ),
}
