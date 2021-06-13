import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { StyledButton } from '../components/Button'
import { NavLink } from '../components/NavBar'
import '../index.css'

export const Main = styled.main`
  background-color: lightgrey;
  padding: 40px;
  width: 100vw;
  height: 100%;
`

export const InnerMain = styled.main`
  //background-color: #C3E9D8;
  background: #B7E4C7;
  border-radius: 80px;
  padding: 120px 60px;
  margin-top: 150px;
`
const StartHeader = styled.header`
display: flex;
flex-direction: row;
justify-content: space-between;
`
const Links = styled.div`
display: flex;
`

const StartImage = styled.img`
  max-width: 50%;
  border-radius: 10px;
  margin-right: 20px;
`

const AboutSection = styled.section`
  display: flex;
  flex-direction: row;
  margin: 60px 20px 20px 20px;
`

const Title = styled.h1`
  font-size: 30px;
  margin-left: 20px;
`

export const StartPage = () => {
  const errorMessage = useSelector(store => store.user.errors)

  const history = useHistory()

  return (
    <Main>
      <InnerMain>
       <StartHeader>
          <Title>Fågelspaning 👀</Title>
          <Links>
            <NavLink onClick={() => history.push('/loggain')}>Logga in</NavLink>
            <NavLink onClick={() => history.push('skapakonto')}>Skapa konto</NavLink>
          </Links>
        </StartHeader>      
        <AboutSection>        
          <StartImage className="placeholder-image" src="https://landetsfria.nu/wp-content/uploads/sites/2/2020/02/f4382a109815c3a9508917f55ca9425b-1036x700.jpg"></StartImage>
          <div>
            <h3>Trädgårdens fåglar</h3>
            <p>Denna app listar de vanligaste trädgårdsfåglarna som förekommer i Sverige. Här kan du markera vilka fåglar du sett i din trädgård eller omgivning. Det finns också plats att fylla på med egna mera ovanliga arter.</p>
          </div>
          {errorMessage ? <p>{errorMessage.message}</p> : ''}  
        </AboutSection>
      </InnerMain>
    </Main>  
  )
}

