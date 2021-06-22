import styled from 'styled-components/macro'

export const Header = styled.h1`
  color: #FF7460;
  font-family: 'Capriola', sans-serif;
  font-size: 35px;
  text-align: center;
  line-height: 1.2;
  @media (min-width: 768px) {
    font-size: 42px;
  }
  @media (min-width: 1024px) {
    font-size: 50px;
  }
  @media (min-width: 1800px) {
    font-size: 64px;
  }
`

export const HTwo = styled.h2`
  color: #0C4458;
  font-family: 'Quicksand', sans-serif;
  font-size: 26px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 32px;
  }
`

export const HThree = styled.h3`
  color: #0C4458;
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }

  @media (min-width: 1440px) {
    font-size: 25px;
  }

`

export const P = styled.p`
  color: #0C4458;
  font-family: 'Quicksand', sans-serif;
  size: 24px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 18px;
  }
  `