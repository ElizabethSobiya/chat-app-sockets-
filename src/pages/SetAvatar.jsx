import React from 'react'
import {  useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import loader from '../assets/loader.gif'
import { useEffect, useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { setAvatarRoute } from '../utilities/ApiRoutes'
import {Buffer} from 'buffer'


function SetAvatar() {

    const api = 'https://api.multiavatar.com/45678945'
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }
    
    const setProfilePicture = async() => {};

        useEffect(() => {
            const data = [];
            for( let i= 0; i < 4; i++){
                const fetchPosts = async () => {
                const image = await axios.get(`
                ${api}/${Math.round(Math.random()*1000)}`)
                console.log(image)
                const buffer = new Buffer(image.data)
                data.push(buffer.toString('base64'))
                
            }
            setAvatars(data)
            setIsLoading(false)
            fetchPosts();
        };
       
        },[])
     
        

  return (
    <>
    <Container>
        <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
            {
                 avatars.map((avatar, index)=> {
                     return (
                        <div key={index} className={`avatar  ${selectedAvatar === index  ? 'selected' : '' }`}>
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                            onClick={() => {setSelectedAvatar(index)}}
                            />
                        </div>
                     )
                 })
            }
        </div>
    </Container>
    <ToastContainer/>
    </>
  )
}

const Container = styled.div`
height: 100vh;
width : 100vw;
display: flex;
flex-direction : column;
justify-content: center;
gap : 3rem;
align-items: center;
background-color: #131324;
.loader{
    max-inline-size: 100%;
}
.title-container{
    h1{
        color:white;
    }
}

.avatars{
    display: flex;
    gap: 2rem;
    .avatar{
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
       display: flex;
       justify-content: center;
       align-items: center;
       transition: 0.5s ease-in-out;

       img{
        height: 6rem;
       }
    }
    .selected{
        border: 0.4rem solid #4e0eff;
    }
}
`;

export default SetAvatar