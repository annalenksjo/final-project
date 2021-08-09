import React from 'react'
import styled from 'styled-components/macro'

import { CardWrapperDiv } from '../components/MainContainers'

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 10px 0;
  font-family: 'Quicksand', sans-serif;
`

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Tag = styled.div`
  border: none;
  background-color: inherit;
  color: #0C4458;
  font-weight: 500px;
  margin: 40px 0 0 10px;
  padding: 5px;
  }
`

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 10px;
  color: #0C4458;
  @media(min-width: 768px) {
    font-size: 30px;
  }
  @media(min-width: 1024px) {
    font-size: 34px;
  }
`

const SubHeading = styled.div`
  font-size: 18px;
  font-weight: 300;
  margin: 0;
  color: rgba(12, 68, 88, 0.6);
  @media(min-width: 768px) {
    font-size: 26px;
  }
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Image = styled.img`
  max-width: 100%;
`
const Image2 = styled.img`
  width: 50%;
  @media(min-width: 768px) {
    width: 70%;
  }
  @media(min-width: 1440px) {
    width: 220px;
  }
`

export const Dialog = ({ title, subheading, image, image2, tag1, tag2 }) => {
  return (
    <CardWrapperDiv>
      <TextContent>
        {title && <Title>{title}</Title>}
        {subheading && <SubHeading>{subheading}</SubHeading>}
      </TextContent>
      <ImageContainer>
        {image && <Image src={image}></Image>}
      </ImageContainer>
      <ImageContainer>
        {image2 && <Image2 src={image2}></Image2>}
      </ImageContainer>
      <TagContainer>
        {<Tag>{tag1}</Tag>}
        {tag2 && <Tag>{tag2}</Tag>}
      </TagContainer>
    </CardWrapperDiv>
  )
}