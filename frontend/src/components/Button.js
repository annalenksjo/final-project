import styled from 'styled-components/macro'

export const StyledButton = styled.button`
  width: 300px;
  font-size: 16px;
  color: #0C4458;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  padding: 12px 20px;
  background-color: #FAE5A2;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media(min-width: 768px) {
    max-width: 240px;
    font-size: 18px;
  }
  @media(min-width: 1440px) {
    font-size: 20px;
    max-width: 250px;
  }
`