/* eslint-disable import/first, import/no-extraneous-dependencies */


window.global = {}

import React from 'react'
import * as Redux from 'redux'
import axios from 'axios'
import ReactDOM from 'react-dom'
import ReactRedux from 'react-redux'
import ReactRouter from 'react-router'
import ReactRouterDOM from 'react-router-dom'
import PropTypes from 'prop-types'
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
