import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import { CardWrapperDiv } from '../components/MainContainers'


const TextContent = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  color: #0C4458;
  font-weight: 500px;
  margin: 40px 0 0 10px;
  padding: 5px;
  &:hover {
    background-color: #fafafa;
    cursor:pointer;
  }
`;

const Title = styled.div`
  font-size: 20px;
  margin: 0;
  margin-bottom: 10px;
  color: #0C4458
`;

const SubHeading = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  color: rgba(12, 68, 88, 0.6);
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;


const Image = styled.img`
  max-width: 100%;
`;

export const Dialog = ({ title, subheading, image, link, button1, button1Click, button2, button2Click }) => {
  return (
    <CardWrapperDiv>
      <TextContent>
        {title && <Title>{title}</Title>}
        {subheading && <SubHeading>{subheading}</SubHeading>}
      </TextContent>
      <ImageContainer>
        {image && <Image src={image}></Image>}
      </ImageContainer>
      <ButtonContainer>
        {link && <Link to={link}>{button1}</Link>}
        {button1 && <Button onClick={button1Click}>{button1}</Button>}
        {button2 && <Button onClick={button2Click}>{button2}</Button>}
      </ButtonContainer>
    </CardWrapperDiv>
  );
};
