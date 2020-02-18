/* eslint-disable @typescript-eslint/camelcase */

const translations = {
  actions: {
    new: 'Create new',
    edit: 'Edit',
    show: 'Show',
    delete: 'Delete',
    bulkDelete: 'Delete all',
    list: 'List',
  },
  buttons: {
    save: 'Save',
    filter: 'Filter',
    applyChanges: 'Apply changes',
    resetFilter: 'Reset',
    confirmRemovalMany: 'Confirm the removal of {{count}} record',
    confirmRemovalMany_plural: 'Confirm the removal of {{count}} records',
    logout: 'Log out',
    seeTheDocumentation: 'See: <1>the documentation</1>',
    createFirstRecord: 'Create First Record',
  },
  labels: {
    navigation: 'Navigation',
    pages: 'Pages',
    selectedRecords: 'Selected ({{selected}})',
    filters: 'Filters',
    adminVersion: 'Admin: {{version}}',
    appVersion: 'App: {{version}}',
  },
  properties: {

  },
  resources: {

  },
  messages: {
    successfullyBulkDeleted: 'successfully removed {{count}} record',
    successfullyBulkDeleted_plural: 'successfully removed {{count}} records',
    successfullyDeleted: 'Successfully deleted given record',
    successfullyUpdated: 'Successfully updated given record',
    thereWereValidationErrors: 'There are validation errors - check them out below',
    successfullyCreated: 'Successfully created a new record',
    bulkDeleteError: 'There was an error deleting records, Check out console to see more information',
    errorFetchingRecords: 'There was an error fetching records, Check out console to see more information',
    errorFetchingRecord: 'There was an error fetching record, Check out console to see more information',
    noRecordsSelected: 'You have not selected any records',
    theseRecordsWillBeRemoved: 'Following record will be removed',
    theseRecordsWillBeRemoved_plural: 'Following records will be removed',
    pickSomeFirstToRemove: 'In order to remove records, you have to pick them first',
    error404Resource: 'Resource of given id: {{resourceId}} cannot be found',
    error404Action: 'Resource of given id: {{resourceId}} does not have an action with name: {{actionName}}',
    error404Record: 'Resource of given id: {{resourceId}} does not have a record with id: {{recordId}}',
    seeConsoleForMore: 'See development console for more details...',
    noActionComponent: 'You have to implement action component for your Action',
    noRecordsInResource: 'There are no records in this resource',
    confirmDelete: 'Do you really want to remove this item?',
  },
}

export default {
  language: 'en',
  translations,
}
