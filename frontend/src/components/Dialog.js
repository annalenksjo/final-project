import React from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom'

const Container = styled.div`
  margin-top: 20px;
  border-radius: 24px;
  border: 2px solid #0C4458;
  text-align: left;
  padding: 20px;
  opacity: 100%;
  width: 220px;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
`;

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

export const Dialog = ({ title, subheading, image, link, button1, button2 }) => {
  return (
    <Container>
      <TextContent>
        {title && <Title>{title}</Title>}
        {subheading && <SubHeading>{subheading}</SubHeading>}
      </TextContent>
      <ImageContainer>
        {image && <Image src={image}></Image>}
      </ImageContainer>
      <ButtonContainer>
        {link && <Link to={link}>{button1}</Link>}
        {button1 && <Button>{button1}</Button>}
        {button2 && <Button>{button2}</Button>}
      </ButtonContainer>
    </Container>
  );
};
