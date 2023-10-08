import React, { useEffect, useState } from 'react'
import Messages from './Messages';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, userName, room }) {
    const [currentmessaage, setcurrentmessage] = useState("");
    const [msgList, setmsgList] = useState([]);
    const sendmsg = async () => {
        if (currentmessaage) {
            const msgData = {
                room: room,
                sender: userName,
                message: currentmessaage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds(),
            };
            setmsgList((list) => [...list, msgData]);
            await socket.emit('send_msg', msgData);
            setcurrentmessage('');  
        };
    };
    useEffect(() => {
        const handleRecieveMessage = (data) => {
            setmsgList((list) => [...list, data]);
        };

        socket.on('recieve message', handleRecieveMessage);

        return() => {
            socket.off('recieve message', handleRecieveMessage);
        };
    }, [socket]);
    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {msgList.map((msgCont, index) => {
                        return(
                            <Messages
                                key = {index} 
                                msgCont={msgCont}
                                userName={userName}
                            />
                        )
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type='text'
                    placeholder='Type a message...'
                    value={currentmessaage}
                    onChange={(event) => setcurrentmessage(event.target.value)}
                    onKeyDown={(event) => {event.key === "Enter" && sendmsg();
                    }}
                />
                <button
                    onClick={sendmsg}
                >
                    &#9658;
                </button>
            </div>
        </div>
    )
}

export default Chat