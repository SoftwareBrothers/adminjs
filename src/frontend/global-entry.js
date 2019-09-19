/* eslint-disable import/first, import/no-extraneous-dependencies */


window.global = {}

import React from 'react'
import * as Redux from 'redux'
import axios from 'axios'
import ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router'
import * as ReactRouterDOM from 'react-router-dom'
import * as PropTypes from 'prop-types'
import * as styled from 'styled-components'
import * as Recharts from 'recharts'

window.React = React
window.ReactDOM = ReactDOM
window.ReactRedux = ReactRedux
window.ReactRouter = ReactRouter
window.ReactRouterDOM = ReactRouterDOM
window.Redux = Redux
window.PropTypes = PropTypes
window.axios = axios
window.styled = styled
window.Recharts = Recharts

export {
  React,
  ReactDOM,
  ReactRedux,
}
