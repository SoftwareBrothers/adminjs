/* eslint-disable import/first, import/no-extraneous-dependencies */
window.global = {}

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import * as Redux from 'redux'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import * as ReactRedux from 'react-redux'
import ReactRouter from 'react-router'
import ReactRouterDOM from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactSelectAsync from 'react-select/async'
import ReactSelectCreatable from 'react-select/creatable'
import * as ReactSelect from 'react-select'
import * as FeatherIcons from 'react-feather'

window.React = React
window.ReactDOM = ReactDOM
window.createRoot = createRoot
window.Redux = Redux
window.ReactRedux = ReactRedux
window.ReactRouter = ReactRouter
window.ReactRouterDOM = ReactRouterDOM
window.PropTypes = PropTypes
window.ReactSelect = ReactSelect
window.ReactSelectAsync = ReactSelectAsync
window.ReactSelectCreatable = ReactSelectCreatable
window.FeatherIcons = FeatherIcons

export {
  React,
  ReactDOM,
  Redux,
  ReactRedux,
}
