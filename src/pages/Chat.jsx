import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { allUsersRoute } from '../utilities/ApiRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';

function Chat() {

  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined)

  
 useEffect(()=>{
    if(!localStorage.getItem('chat-app')){ 
      navigate('/login')
    }else{
      async function drive(){
      setCurrentUser(await JSON.parse(localStorage.getItem('chat-app')))
    }
    drive()
    }
  
  },[navigate])
  
  // userData()

useEffect(()=>{
    if(currentUser){
       if(currentUser.isAvatarImageSet){
        async function retrive(){
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data)
        console.log(data)
      }
      retrive()
       }else{
        navigate('/setAvatar')
       }
     
    }
  },[currentUser, navigate])
 
const handleChatChange = (chat) => {
  setCurrentChat = chat
}

  return (
    <Container>
    <div className='container'>
         <Contacts contacts ={contacts} currentUser ={currentUser} changeChat = {handleChatChange} />  
    </div>
    <Welcome currentUser ={currentUser}/>
    </Container>
  )
}

const Container = styled.div
`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
align-items:center;
background-color: #131324;
.container{
  height: 85vh;
  width:85vw;
  background-color:#00000076;
  display:grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width:1080px){
    grid-template-columns: 35% 65%;
  }
}

`

export default Chat