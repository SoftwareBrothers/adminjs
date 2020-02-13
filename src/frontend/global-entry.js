/* eslint-disable import/first, import/no-extraneous-dependencies */


window.global = {}

import React from 'react'
import * as Redux from 'redux'
import axios from 'axios'
import ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router'
import * as ReactRouterDOM from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as StyledSystem from 'styled-system'
import * as Recharts from 'recharts'
import flat from 'flat'
import ReactDatepicker from 'react-datepicker'
import ReactSelect from 'react-select/lib/Async'
import * as CarbonIcons from '@carbon/icons-react'

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
window.CarbonIcons = CarbonIcons
window.ReactSelect = ReactSelect

export {
  React,
  ReactDOM,
  ReactRedux,
}
