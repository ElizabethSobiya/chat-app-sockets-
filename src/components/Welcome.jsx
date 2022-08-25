import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'


function Welcome({ currentUser}) {
  return (
    <Container>
        <img src={Robot} alt="robot" />
        <h1>Welcome, <span>{currentUser.username}</span></h1>
        <h3>Please start a chat to Start Messaging</h3>
    </Container>
  )
}

export default Welcome

const Container = styled.div
`
`