/* eslint-disable import/first, import/no-extraneous-dependencies */
window.global = {}

import React from 'react'
import Redux from 'redux'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import ReactRedux from 'react-redux'
import ReactRouter from 'react-router'
import ReactRouterDOM from 'react-router-dom'
import PropTypes from 'prop-types'
import * as styled from 'styled-components'
import ReactSelectAsync from 'react-select/async'
import ReactSelectCreatable from 'react-select/creatable'
import * as ReactSelect from 'react-select'

window.React = React
window.ReactDOM = ReactDOM
window.createRoot = createRoot
window.Redux = Redux
window.ReactRedux = ReactRedux
window.ReactRouter = ReactRouter
window.ReactRouterDOM = ReactRouterDOM
window.PropTypes = PropTypes
window.styled = styled
window.ReactSelect = ReactSelect
window.ReactSelectAsync = ReactSelectAsync
window.ReactSelectCreatable = ReactSelectCreatable

export {
  React,
  ReactDOM,
  ReactRedux,
}
