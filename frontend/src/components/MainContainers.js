import styled from 'styled-components/macro'


// main container with the background
export const Main = styled.main`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`

export const InnerMain = styled.section`
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
  @media(min-width: 768px) {
    flex-direction: row;
  }
`
export const CardWrapperDiv = styled.div`
box-sizing: border-box;
border-radius: 24px;
border: 2px solid #0C4458;
display: flex;
flex-direction: column;
align-items: center;
padding: 30px 30px;
opacity: 100%;
margin: 20px;
&:hover {
background-color: rgb(255,244,241, 0.4);
}
`

// Wrapper for Dialog to use onClick functionality
export const OnClickDiv = styled.div`
  border: none;
  :hover {
    cursor:pointer
  }
`