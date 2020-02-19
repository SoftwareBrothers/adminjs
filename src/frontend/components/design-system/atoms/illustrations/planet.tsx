import React from 'react'
import { Props } from './props.type'

export const Planet: React.FC<Props> = (props) => {
  const { width, height, theme } = props
  const svgWidth = width || '152px'
  const svgHeight = height || '169px'
  return (
    <svg width={svgWidth} height={svgHeight} viewBox="0 0 152 169" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Group" transform="translate(2.000000, 2.000000)" stroke={theme.colors.primary60} strokeWidth="3">
          <path d="M74,117.371134 L74,158.723567 C74,162.037275 71.3137085,164.723567 68,164.723567 C66.9452118,164.723567 65.9090627,164.445504 64.995996,163.917406 L6.67495026,130.185774 L6.67495026,130.185774 C2.54398439,127.796512 1.42108547e-14,123.386278 1.42108547e-14,118.614125 L1.42108547e-14,48.436129 C1.42108547e-14,43.6639756 2.54398439,39.2537412 6.67495026,36.8644799 L67.3072083,1.79609278 C71.4477337,-0.598697595 76.5522663,-0.598697595 80.6927917,1.79609278 L141.32505,36.8644799 C145.456016,39.2537412 148,43.6639756 148,48.436129 L148,118.614125 C148,123.386278 145.456016,127.796512 141.32505,130.185774 L92.2812226,158.551663" id="Path" strokeLinecap="round" />
          <path d="M108.882866,90.7418658 C109.714261,87.6976379 110.158112,84.4934359 110.158112,81.185567 C110.158112,61.2008302 93.9572813,45 73.9725445,45 C53.9878077,45 37.7869775,61.2008302 37.7869775,81.185567 C37.7869775,97.3610095 48.4003337,111.05757 63.0430857,115.691287" id="Path" strokeLinecap="round" />
          <path d="M73.9725445,117.371134 C77.5908988,117.371134 81.0852119,116.840051 84.3817866,115.851582 C89.8928309,114.19911 94.8512468,111.268362 98.9127122,107.40366" id="Path" strokeLinecap="round" />
          <circle id="Oval-Copy" fillOpacity="0.196268575" fill={theme.colors.primary60} cx="104.127184" cy="99.2783505" r="9.64948454" />
          <path d="M120.255984,85.4659665 C128.43855,89.8418956 133.002057,93.9015871 132.226834,96.7947568 C131.38817,99.9246931 124.455699,101.112837 113.853361,100.515516" id="Path" strokeLinecap="round" />
          <path d="M94.0573111,98.0477535 C86.8513781,96.7649447 79.0016836,95.0204726 70.8507066,92.8364249 C38.6777508,84.2157074 13.9941115,72.0109683 15.718255,65.5763772 C16.4982546,62.6653791 22.5493576,61.4340187 31.9215354,61.7565326" id="Path" strokeLinecap="round" />
          <line x1="96.5" y1="22.5" x2="96.5" y2="35.5278784" id="Line-6" strokeLinecap="round" />
          <line x1="96.5" y1="22.5" x2="96.5" y2="35.5278784" id="Line-6-Copy" strokeLinecap="round" transform="translate(96.500000, 29.000000) rotate(-270.000000) translate(-96.500000, -29.000000) " />
          <line x1="38.5" y1="38.3" x2="38.5" y2="46.1167271" id="Line-6" strokeLinecap="round" />
          <line x1="38.4916365" y1="38.2916365" x2="38.4916365" y2="46.1083635" id="Line-6-Copy" strokeLinecap="round" transform="translate(38.491636, 42.200000) rotate(-270.000000) translate(-38.491636, -42.200000) " />
          <line x1="98" y1="122.266667" x2="98" y2="129.214868" id="Line-6" strokeLinecap="round" />
          <line x1="97.9925658" y1="122.259232" x2="97.9925658" y2="129.207434" id="Line-6-Copy" strokeLinecap="round" transform="translate(97.992566, 125.733333) rotate(-270.000000) translate(-97.992566, -125.733333) " />
          <line x1="40.5" y1="122.433333" x2="40.5" y2="133.724161" id="Line-6" strokeLinecap="round" />
          <line x1="40.4879193" y1="122.421253" x2="40.4879193" y2="133.712081" id="Line-6-Copy" strokeLinecap="round" transform="translate(40.487919, 128.066667) rotate(-270.000000) translate(-40.487919, -128.066667) " />
        </g>
      </g>
    </svg>
  )
}
export default Planet
