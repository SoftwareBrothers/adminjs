"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable @typescript-eslint/camelcase */
const translations = {
  actions: {
    new: 'Create new',
    edit: 'Edit',
    show: 'Show',
    delete: 'Delete',
    bulkDelete: 'Delete all',
    list: 'List'
  },
  buttons: {
    save: 'Save',
    addNewItem: 'Add New Item',
    filter: 'Filter',
    applyChanges: 'Apply changes',
    resetFilter: 'Reset',
    confirmRemovalMany: 'Confirm the removal of {{count}} record',
    confirmRemovalMany_plural: 'Confirm the removal of {{count}} records',
    logout: 'Log out',
    login: 'Log in',
    seeTheDocumentation: 'See: <1>the documentation</1>',
    createFirstRecord: 'Create First Record'
  },
  labels: {
    navigation: 'Navigation',
    pages: 'Pages',
    selectedRecords: 'Selected ({{selected}})',
    filters: 'Filters',
    adminVersion: 'Admin: {{version}}',
    appVersion: 'App: {{version}}',
    loginWelcome: 'Welcome'
  },
  properties: {
    length: 'Length',
    from: 'From',
    to: 'To'
  },
  resources: {},
  messages: {
    successfullyBulkDeleted: 'successfully removed {{count}} record',
    successfullyBulkDeleted_plural: 'successfully removed {{count}} records',
    successfullyDeleted: 'Successfully deleted given record',
    successfullyUpdated: 'Successfully updated given record',
    thereWereValidationErrors: 'There are validation errors - check them out below',
    forbiddenError: 'You cannot perform action {{actionName}} on {{resourceId}}',
    anyForbiddenError: 'You cannot perform given action',
    successfullyCreated: 'Successfully created a new record',
    bulkDeleteError: 'There was an error deleting records, Check out console to see more information',
    errorFetchingRecords: 'There was an error fetching records, Check out console to see more information',
    errorFetchingRecord: 'There was an error fetching record, Check out console to see more information',
    noRecordsSelected: 'You have not selected any records',
    theseRecordsWillBeRemoved: 'Following record will be removed',
    theseRecordsWillBeRemoved_plural: 'Following records will be removed',
    pickSomeFirstToRemove: 'In order to remove records, you have to pick them first',
    error404Resource: 'Resource of given id: {{resourceId}} cannot be found',
    error404Action: 'Resource of given id: {{resourceId}} does not have an action with name: {{actionName}} or you are not authorized to use it!',
    error404Record: 'Resource of given id: {{resourceId}} does not have a record with id: {{recordId}} or you are not authorized to use it!',
    seeConsoleForMore: 'See development console for more details...',
    noActionComponent: 'You have to implement action component for your Action',
    noRecordsInResource: 'There are no records in this resource',
    noRecords: 'No records',
    confirmDelete: 'Do you really want to remove this item?',
    welcomeOnBoard_title: 'Welcome on Board!',
    welcomeOnBoard_subtitle: 'Now you are one of us! We prepared a few tips for you to start:',
    loginWelcome: 'To AdminJS - the best admin framework for Node.js apps, based on React.',
    addingResources_title: 'Adding Resources',
    addingResources_subtitle: 'How to add new resources to the sidebar',
    customizeResources_title: 'Customize Resources',
    customizeResources_subtitle: 'Defining behavior, adding properties and more...',
    customizeActions_title: 'Customize Actions',
    customizeActions_subtitle: 'Modifying existing actions and adding new',
    writeOwnComponents_title: 'Write Components',
    writeOwnComponents_subtitle: 'How to modify the Look and Feel of AdminJS',
    customDashboard_title: 'Custom Dashboard',
    customDashboard_subtitle: 'How to modify this view and add new Pages on the sidebar',
    roleBasedAccess_title: 'Role-Based Access Control',
    roleBasedAccess_subtitle: 'Create user roles and permissions in AdminJS',
    community_title: 'Join the slack community',
    community_subtitle: 'Talk with the creators of AdminJS and other AdminJS users',
    foundBug_title: 'Found a Bug? need improvement?',
    foundBug_subtitle: 'Raise an issue on our GitHub repo',
    needMoreSolutions_title: 'Need more advanced solutions?',
    needMoreSolutions_subtitle: 'We are here to provide you a beautiful UX/UI design and tailor made software based (not only) on AdminJS',
    invalidCredentials: 'Wrong email and/or password'
  }
};
var _default = {
  language: 'en',
  translations
};
exports.default = _default;