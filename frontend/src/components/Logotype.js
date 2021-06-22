import React from 'react'
import styled from 'styled-components'

const LogotypeImage = styled.img`
  width: 200px;
  margin: 20px 0 20px 10px;

  @media (min-width: 768px) {
    width: 250px;
    margin: 25px 0 25px 25px;
  }

  @media(min-width: 1024px) {
    width: 300px;
    margin: 25px 0 25px 25px;
  }

  @media(min-width: 1440px) {
    width: 300px;
    margin: 25px 0 25px 25px;
  }
`

export const Logotype = () => {
  return (
    <LogotypeImage src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></LogotypeImage>
  )
} 