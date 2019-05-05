import React from 'react'
import styled from 'styled-components'

import StyledButton from '../ui/styled-button'

const DashboardWrapper = styled.section`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`

const InfoBox = styled.section.attrs({
  className: 'content',
})`
  text-align: center;
  width: 540px;
`

const Svg = () => (
  <svg className="welcome-img" xmlns="http://www.w3.org/2000/svg" width="163" height="184" viewBox="0 0 163 184">
    <g fill="none" fillRule="nonzero" stroke="#C9D1F6" strokeWidth="2">
      <path strokeLinecap="round" d="M81.5 164.676v13.396a4 4 0 0 1-6 3.464l-69.107-39.9a10 10 0 0 1-5-8.66V52.024a10 10 0 0 1 5-8.66L76.5 2.886a10 10 0 0 1 10 0l70.107 40.476a10 10 0 0 1 5 8.66v80.953a10 10 0 0 1-5 8.66l-61.566 35.546" />
      <path fill="#FFF" strokeLinejoin="round" d="M101.994 61.522l1.835-3.67a2 2 0 0 1 3.578 0l1.834 3.67a19 19 0 0 1 2.006 8.497v74.076a1 1 0 0 1-1 1h-9.259a1 1 0 0 1-1-1V70.02a19 19 0 0 1 2.006-8.497zM53.759 61.522l1.834-3.67a2 2 0 0 1 3.578 0l1.835 3.67a19 19 0 0 1 2.006 8.497v74.076a1 1 0 0 1-1 1h-9.26a1 1 0 0 1-1-1V70.02a19 19 0 0 1 2.007-8.497z" />
      <path fill="#F0F1F9" strokeLinejoin="round" d="M74.557 29.824l3.65-5.295a4 4 0 0 1 6.587 0l3.649 5.295a39.325 39.325 0 0 1 6.943 22.313v63.686H67.614V52.137c0-7.97 2.421-15.75 6.943-22.313z" />
      <path fill="#F0F1F9" d="M88.575 139.355h24.008a1 1 0 0 0 .982-1.187l-.792-4.157a21.68 21.68 0 0 0-5.562-10.855l-3.298-3.48A44.737 44.737 0 0 1 93 99.83L89.64 86.492l-1.065 52.863zM74.425 139.355H50.417a1 1 0 0 1-.982-1.187l.792-4.157a21.68 21.68 0 0 1 5.562-10.855l3.298-3.48A44.737 44.737 0 0 0 70 99.83l3.361-13.338 1.065 52.863z" />
      <path fill="#FFF" strokeLinejoin="round" d="M74.947 68.616l2.122-4.059a5 5 0 0 1 8.862 0l2.122 4.059a24 24 0 0 1 2.73 11.118v65.142H72.217V79.734a24 24 0 0 1 2.73-11.118z" />
      <path fill="#FFF" d="M75.446 132.96a7.072 7.072 0 0 0-7.073 7.072v7.073h26.254v-7.073a7.072 7.072 0 0 0-7.073-7.072H75.446z" />
      <path fill="#F0F1F9" strokeLinecap="round" d="M81.5 123.484v27.72" />
    </g>
  </svg>
)

const Dashboard = () => (
  <DashboardWrapper>
    <InfoBox>
      <Svg />
      <h1>Welcome on board!</h1>
      <p>
          Thank you for choosing our platform, now you are one of us!
          Bear in mind that this is a Beta version and we are still working on it.
      </p>
      <p>
          Now check out the documentation page on github and modify your AdminBro.
      </p>
      <div>
        <StyledButton
          as="a"
          className="button is-primary"
          href="https://github.com/SoftwareBrothers/admin-bro"
        >
          <span className="icon">
            <i className="fab fa-github" />
          </span>
          <span className="btn-text">
              Checkout the documentation
          </span>
        </StyledButton>
      </div>
    </InfoBox>
  </DashboardWrapper>
)

export default Dashboard
