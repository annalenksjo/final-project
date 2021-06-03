import React from 'react'
import styled from 'styled-components'


const Picture = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 50%;
`

const Image = styled.div`
  width: 25%;
  height: 0;
  padding-top: 25%;
  background-image: url('https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGFuaW1hbHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`
//${({ backgroundUrl }) => `url("${backgroundUrl}")`};
export const ProfileImage = () => {
  return (
    <Picture>
      <Image/>
    </Picture>
  )
}




// export const ProfileImage = styled.img`
// display: inline;
// background-position: center center;
// background-size: cover;
//   margin-top: 0px;
//   margin-left: -25%; //centers the image
//   margin-bottom: 0px;
//   height: 100%;
//   width: auto:

//   //background-image: url('');
// `
// import myImage from '../../assets/image.png';
// change the url to something like this ${myImage} 