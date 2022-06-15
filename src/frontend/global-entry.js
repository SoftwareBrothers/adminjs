/* eslint-disable import/first, import/no-extraneous-dependencies */
window.global = {}

import * as Lodash from 'lodash'
import React from 'react'
import Redux from 'redux'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import ReactRedux from 'react-redux'
import ReactRouter from 'react-router'
import ReactRouterDOM from 'react-router-dom'
import PropTypes from 'prop-types'
import * as styled from 'styled-components'
import Recharts from 'recharts'
import flat from 'flat'
import ReactDatepicker from 'react-datepicker'
import ReactSelectAsync from 'react-select/async'
import ReactSelectCreatable from 'react-select/creatable'
import * as ReactSelect from 'react-select'
import i18n from 'i18next'
import ReactI18Next from 'react-i18next'
import * as uuid from 'uuid'
import * as punycode from 'punycode/'

window.Lodash = Lodash
window.React = React
window.ReactDOM = ReactDOM
window.createRoot = createRoot
window.Redux = Redux
window.ReactRedux = ReactRedux
window.flat = flat
window.ReactRouter = ReactRouter
window.ReactRouterDOM = ReactRouterDOM
window.ReactDatepicker = ReactDatepicker
window.styled = styled
window.PropTypes = PropTypes
window.axios = axios
window.Recharts = Recharts
window.ReactSelect = ReactSelect
window.ReactSelectAsync = ReactSelectAsync
window.ReactSelectCreatable = ReactSelectCreatable
window.i18n = i18n
window.ReactI18Next = ReactI18Next
window.punycode = punycode
window.uuid = uuid

export {
  React,
  ReactDOM,
  ReactRedux,
}
