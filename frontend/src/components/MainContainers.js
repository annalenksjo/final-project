import styled from 'styled-components/macro'


// main container with the background
export const Main = styled.main`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
`

export const InnerMain = styled.section`
  background: linear-gradient(179.96deg, #CBECFE 0.04%, rgba(243, 249, 252, 0) 194.85%);
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const InnerMainLoggedIn = styled(InnerMain)`
  padding-top: 200px;
`

// section containing illustration and text on start, log in and register page
export const AboutSection = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`
// Wrapper for Dialog to use onClick functionality
export const OnClickDiv = styled.div`
  border: none;
  :hover {
    cursor:pointer
  }
`