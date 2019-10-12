import React from 'react'
import styled from 'styled-components'

import { Column, Columns } from '../ui'

const DashboardWrapper = styled.section`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }): string => theme.sizes.padding};
`

const InfoBox = styled.section.attrs({
  className: 'content',
})`
  width: 540px;
`

const SoftwareBrothers = styled.div`
  padding: 10px 0;
  border-top: 1px solid ${({ theme }): string => theme.colors.love};

  img {
    float: left;
    padding: 10px 15px 10px 0;
    width: 140px;
  }

  a {
    color: ${({ theme }): string => theme.colors.love};
  }
`

const Dashboard: React.FC = () => (
  <DashboardWrapper>
    <InfoBox>
      <h1>Welcome on board!</h1>
      <p>
        Thank you for trying out
        <b> AdminBro.</b>
      </p>
      <p>Next, you might want to check out the following tutorials:</p>
      <Columns>
        <Column width={6}>
          <ul>
            <li><a href="https://softwarebrothers.github.io/admin-bro-dev/tutorial-03-passing-resources.html">Adding Resources</a></li>
            <li><a href="https://softwarebrothers.github.io/admin-bro-dev/tutorial-04-customizing-resources.html">Customising resources</a></li>
            <li><a href="https://softwarebrothers.github.io/admin-bro-dev/tutorial-05-actions.html">Customising Actions</a></li>
          </ul>
        </Column>
        <Column width={6}>
          <ul>
            <li><a href="https://softwarebrothers.github.io/admin-bro-dev/tutorial-06-writing-react-components.html">Writing your own components</a></li>
            <li><a href="https://softwarebrothers.github.io/admin-bro-dev/tutorial-07-custom-dashboard.html">Customising Dashboard</a></li>
          </ul>
        </Column>
      </Columns>
      <p>
        In case you found any errors,
        <a href="https://github.com/SoftwareBrothers/admin-bro/issues"> raise an issue </a>
        on our GitHub account.
      </p>
      <p>
        For the latest information about AdminBro and more -
        <a href="https://softwarebrothers.co/blog/"> check out our blog.</a>
      </p>
      <SoftwareBrothers>
        <img src="https://softwarebrothers.co/assets/images/software-brothers-logo-full.svg" alt="SoftwareBrothers" />
        <p>
          Want to add advanced fields like Google Maps,
          enrich interface with custom graphs or simply look for professional help? You can always
          <a href="https://softwarebrothers.co/services"> work with us!</a>
        </p>
      </SoftwareBrothers>
    </InfoBox>
  </DashboardWrapper>
)

export default Dashboard
