import styled from 'styled-components/macro'

// login form container
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 250px;
`
//signup form container
export const HeighForm = styled(Form)`
  height: 350px;
`

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
  @media(min-width: 768px) {
    flex-direction: row;
  }
`
