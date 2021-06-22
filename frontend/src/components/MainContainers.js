import styled from 'styled-components/macro'

// Main container with the background
export const Main = styled.main`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

export const LoaderMain = styled(Main)`
  height: 100vh;
  align-content: center;
  justify-content: center;
`

export const InnerMain = styled.section`
  margin: 0;
  padding: 0;
  align-content: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%
`

export const InnerMainLoggedIn = styled(InnerMain)`
  padding-top: 130px;
  /* justify-content: center; */
  align-content: center;
  @media (min-width: 768px) {
    padding-top: 200px;
  }
`

// Section containing illustration and text on start, log in and register page
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
padding: 20px 20px;
margin: 20px;
opacity: 100%;

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

export const StyledDivRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
`

export const ProfileInfoDiv = styled(StyledDivRow)`
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 185px;
  padding: 0 5px 0 5px;

  @media(min-width: 768px) {
    height: 195px;
  }

  @media(min-width: 1024px) {
    height: 200px;
  }

  @media(min-width: 1440px) {
    height: 205px;
  }
`