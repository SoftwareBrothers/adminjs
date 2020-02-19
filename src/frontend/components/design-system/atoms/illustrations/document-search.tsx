import React from 'react'
import { Props } from './props.type'

export const DocumentSearch: React.FC<Props> = (props) => {
  const { width, height, theme } = props
  const svgWidth = width || '152px'
  const svgHeight = height || '169px'

  return (
    <svg width={svgWidth} height={svgHeight} viewBox="0 0 152 169" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)" stroke={theme.colors.primary60} strokeWidth="3">
          <path d="M74,126.060611 L74,158.723567 C74,162.037275 71.3137085,164.723567 68,164.723567 C66.9452118,164.723567 65.9090627,164.445504 64.995996,163.917406 L6.67495026,130.185774 L6.67495026,130.185774 C2.54398439,127.796512 1.42108547e-14,123.386278 1.42108547e-14,118.614125 L1.42108547e-14,48.436129 C1.42108547e-14,43.6639756 2.54398439,39.2537412 6.67495026,36.8644799 L67.3072083,1.79609278 C71.4477337,-0.598697595 76.5522663,-0.598697595 80.6927917,1.79609278 L141.32505,36.8644799 C145.456016,39.2537412 148,43.6639756 148,48.436129 L148,118.614125 C148,123.386278 145.456016,127.796512 141.32505,130.185774 L92.2812226,158.551663" id="Path-Copy-4" strokeLinecap="round" />
          <path d="M106,120.263384 C106,121.093743 106,122.339282 106,124 C106,125.104569 105.104569,126 104,126 L74,126" id="Path" strokeLinecap="round" />
          <path d="M55,42.2162102 L55,54 C55,55.1045695 54.1045695,56 53,56 L41.1644979,56" id="Path" fill={theme.colors.primary20} />
          <path d="M56.5220968,126 L43,126 C41.8954305,126 41,125.104569 41,124 L41,55.6898628 L54.6898628,42 L104,42 C105.104569,42 106,42.8954305 106,44 C106,75.6283541 106,96.8054529 106,107.531297" id="Path" strokeLinecap="round" />
          <circle id="Oval" fill={theme.colors.primary20} cx="76" cy="84" r="18" />
          <circle id="Oval-Copy-2" fill={theme.colors.white} cx="76" cy="84" r="10" />
          <rect id="Rectangle" fill={theme.colors.primary20} transform="translate(105.316743, 113.185977) rotate(-315.000000) translate(-105.316743, -113.185977) " x="91.8167434" y="108.685977" width="27" height="9" rx="2" />
          <line x1="88.5" y1="96.5" x2="95.4689509" y2="103.468951" id="Line-3" />
        </g>
      </g>
    </svg>
  )
}

export default DocumentSearch
