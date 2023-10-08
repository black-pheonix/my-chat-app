import React from 'react'

function Messages({ msgCont, userName }) {
    console.log(msgCont);
  return (
    <div className= "message" id = {userName === msgCont.sender ? 'you' : 'other'}>
        <div className='message-content'>
            <p>{msgCont.message}</p>
        </div>
        <div className='message-meta'>
            <h4 style={{ display: 'flex' }}>
                <p style={{ marginRight: '6px' }}>{msgCont.sender}</p>
                <p>{msgCont.time}</p>
            </h4>
        </div>
    </div>
    
  )
}

export default Messages