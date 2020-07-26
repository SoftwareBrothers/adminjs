/* eslint-disable import/first, import/no-extraneous-dependencies */


window.global = {}

import React from 'react'
import Redux from 'redux'
import axios from 'axios'
import ReactDOM from 'react-dom'
import ReactRedux from 'react-redux'
import ReactRouter from 'react-router'
import ReactRouterDOM from 'react-router-dom'
import PropTypes from 'prop-types'
import * as styled from 'styled-components'
import StyledSystem from 'styled-system'
import Recharts from 'recharts'
import flat from 'flat'
import ReactDatepicker from 'react-datepicker'
import ReactSelect from 'react-select/lib/Async'
import i18n from 'i18next'
import ReactI18Next from 'react-i18next'

window.React = React
window.ReactDOM = ReactDOM
window.Redux = Redux
window.ReactRedux = ReactRedux
window.flat = flat
window.ReactRouter = ReactRouter
window.ReactRouterDOM = ReactRouterDOM
window.ReactDatepicker = ReactDatepicker
window.styled = styled
window.StyledSystem = StyledSystem
window.PropTypes = PropTypes
window.axios = axios
window.Recharts = Recharts
window.ReactSelect = ReactSelect
window.i18n = i18n
window.ReactI18Next = ReactI18Next

export {
  React,
  ReactDOM,
  ReactRedux,
}
