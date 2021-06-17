import styled from 'styled-components'

export const cardContainer = styled.div`
  position: relative;
  background-color: lightgray;
  height: 500px;
`

export const Card = styled.div`
  position: absolute;  
  border: 1px solid darkgray;
  background-color: white;
  padding: 15px 15 px 60px 15px;
  box-shadow: 5px 10px 10px darkgray;
  border-radius: 4px;

/*   border: 1px solid black;
  border-radius: 4px;
  background-color: rgb(245,245,245, 0.6);
  padding: 10px;
  margin: 14px;
  display: flex;
  justify-content: space-between;
  /* @media (min-width: 768px){
    flex-direction: row;
  } */
`