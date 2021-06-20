import styled from 'styled-components/macro'

export const StyledButton = styled.button`
  width: 100%;
  font-size: 16px;
  color: #0C4458;
  padding: 10px 20px;
  background-color: #FAE5A2;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media(min-width: 768px) {
    max-width: 240px;
    padding: 8px 22px;
    font-size: 18px;
  }
`