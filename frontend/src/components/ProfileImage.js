import React, { useState } from 'react'
import styled from 'styled-components'


  

const Picture = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
`

const Image = styled.div`
  width: 25%;
  height: 0;
  padding-top: 25%;
  background-image: url('https://uc2de770eec3ca2134141417726f.previews.dropboxusercontent.com/p/thumb/ABM1_5Ir7sO9NjOF4FxNLMTWfgXsxDtdrPVodqQF8MTYNb10sdrzNPDiSunuWfY3HIY8f0YkXgW5TZc8G4v0c1iLf9tfNjOFxFcVOcVsYhlGXD5mydj-SVDY9QfTfGEsWezrwaDWC-u_-Nimx6u3lTLUIjoexMBAQ63_6_AEjyoQAF2mbnyAFZZHKJ4qf_NtMQGzytCon8tyjY6uW5mzitbt-IXG5HReJMTriFwBF6lK9rRRKbjqVMt_DFNaLsyr_Oj-o5a3L3-QY75g9TdVGtI9y76yTCLP0u2xuHiOyyV3FYdjWVmFZesR65s1W4BkweNu2kI7QwIR9rgDoHBWw6ENU2zpnzw1QCMMivkfOsvX-g/p.png?fv_content=true&size_mode=5');
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`
//${({ backgroundUrl }) => `url("${backgroundUrl}")`};
export const ProfileImage = () => {
  const [avatarList, setAvatarList] = useState('') 

  const fetchAvatars = () => {
    fetch ('http://localhost:8090/avatars')
      .then(res => res.json())
      .then (data => setAvatarList(data))
      .catch(err => console.error(err))
  }
  fetchAvatars()
  
  
  return (
    <>
    {avatarList.map((avatar) => (
    <div>
      <p>{avatar.name}</p>
    </div>
    ))}
    </>
  )
}

//<img src="https://uc2de770eec3ca2134141417726f.previews.dropboxusercontent.com/p/thumb/ABM1_5Ir7sO9NjOF4FxNLMTWfgXsxDtdrPVodqQF8MTYNb10sdrzNPDiSunuWfY3HIY8f0YkXgW5TZc8G4v0c1iLf9tfNjOFxFcVOcVsYhlGXD5mydj-SVDY9QfTfGEsWezrwaDWC-u_-Nimx6u3lTLUIjoexMBAQ63_6_AEjyoQAF2mbnyAFZZHKJ4qf_NtMQGzytCon8tyjY6uW5mzitbt-IXG5HReJMTriFwBF6lK9rRRKbjqVMt_DFNaLsyr_Oj-o5a3L3-QY75g9TdVGtI9y76yTCLP0u2xuHiOyyV3FYdjWVmFZesR65s1W4BkweNu2kI7QwIR9rgDoHBWw6ENU2zpnzw1QCMMivkfOsvX-g/p.png?fv_content=true&size_mode=5"/>


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