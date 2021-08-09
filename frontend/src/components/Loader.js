import React from 'react'
import styled, { keyframes } from 'styled-components/macro'

import { SubTitle } from './Text'
import { LoaderMain } from './MainContainers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SpinnLoader = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);  
  border-top: 4px solid lightgrey;
  border-right: 4px solid lightgrey;
  border-bottom: 4px solid lightgrey;
  border-left: 4px solid grey;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

export const Loader = () => {
  return (
    <LoaderMain>
      <Container>
        <SubTitle>
          Laddar..
        </SubTitle>    
        <SpinnLoader>
        </SpinnLoader>
      </Container>
    </LoaderMain>
  )
}
