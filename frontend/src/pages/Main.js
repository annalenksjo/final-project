import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { NavLink } from '../components/NavBar'
import { Header } from '../components/Header'
import { Subtext } from '../components/Subtext'
import '../index.css'

export const Main = styled.main`
  background: linear-gradient(179.96deg, #CBECFE 0.04%, rgba(243, 249, 252, 0) 194.85%);
  padding: 40px;
  width: 100vw;
  height: 100%;
`

export const InnerMain = styled.main`
  //background: #90e0ef;
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

export const AboutSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 60px 20px 20px 20px;
`

const Title = styled.h1`
  font-size: 30px;
  margin-left: 20px;
  color: #023e8a;
`

export const StartPage = () => {
  const history = useHistory()

  return (
    <Main>
      <InnerMain>
       <StartHeader>
          <Title>Fågelspanarna</Title>
          <Links>
            <NavLink onClick={() => history.push('/loggain')}>Logga in</NavLink>
            <NavLink onClick={() => history.push('skapakonto')}>Skapa konto</NavLink>
          </Links>
        </StartHeader>      
        <AboutSection>        
          <StartImage className="placeholder-image" src="https://landetsfria.nu/wp-content/uploads/sites/2/2020/02/f4382a109815c3a9508917f55ca9425b-1036x700.jpg"></StartImage>
          <div>
            <Header>Trädgårdens fåglar</Header>
            <Subtext>Denna app listar de vanligaste trädgårdsfåglarna som förekommer i Sverige. Här kan du markera vilka fåglar du sett i din trädgård eller omgivning. Det finns också plats att fylla på med egna mera ovanliga arter.</Subtext>
          </div>
        </AboutSection>
      </InnerMain>
    </Main>  
  )
}

