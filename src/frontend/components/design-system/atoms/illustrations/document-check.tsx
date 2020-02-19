import React from 'react'
import { Props } from './props.type'

export const DocumentCheck: React.FC<Props> = (props) => {
  const { width, height, theme } = props
  const svgWidth = width || '152px'
  const svgHeight = height || '169px'
  return (
    <svg width={svgWidth} height={svgHeight} viewBox="0 0 152 169" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)" stroke={theme.colors.primary60} strokeWidth="3">
          <path d="M74,126.060611 L74,158.723567 C74,162.037275 71.3137085,164.723567 68,164.723567 C66.9452118,164.723567 65.9090627,164.445504 64.995996,163.917406 L6.67495026,130.185774 L6.67495026,130.185774 C2.54398439,127.796512 1.42108547e-14,123.386278 1.42108547e-14,118.614125 L1.42108547e-14,48.436129 C1.42108547e-14,43.6639756 2.54398439,39.2537412 6.67495026,36.8644799 L67.3072083,1.79609278 C71.4477337,-0.598697595 76.5522663,-0.598697595 80.6927917,1.79609278 L141.32505,36.8644799 C145.456016,39.2537412 148,43.6639756 148,48.436129 L148,118.614125 C148,123.386278 145.456016,127.796512 141.32505,130.185774 L92.2812226,158.551663" id="Path-Copy-5" strokeLinecap="round" />
          <path d="M105,70.0296545 C105,87.5771932 105,100.077741 105,107.531297 L105,120.263384 C105,121.093743 105,122.339282 105,124 C105,125.104569 104.104569,126 103,126 L73.9676297,126" id="Path" strokeLinecap="round" />
          <path d="M54,42.2162102 L54,54 C54,55.1045695 53.1045695,56 52,56 L40.1644979,56" id="Path-Copy-9" fill={theme.colors.primary20} />
          <path d="M58.7460443,126 L42,126 C40.8954305,126 40,125.104569 40,124 L40,55.6898628 L53.6898628,42 C63.9564524,42 71.6563946,42 76.7896894,42" id="Path" strokeLinecap="round" />
          <line x1="58.5" y1="89.5" x2="86.8715634" y2="89.5" id="Line-4" strokeLinecap="round" />
          <line x1="58.5" y1="104.5" x2="86.8715634" y2="104.5" id="Line-4-Copy" strokeLinecap="round" />
          <circle id="Oval" fill={theme.colors.primary20} cx="92" cy="55" r="20" />
          <polyline id="Path" strokeLinecap="round" strokeLinejoin="round" points="103.727922 49 91 61.7279221 83.8715634 54.5994855" />
        </g>
      </g>
    </svg>
  )
}

export default DocumentCheck
