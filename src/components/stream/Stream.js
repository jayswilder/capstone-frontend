// import Paper from '@material-ui/core/Paper';
import Webcam from './Camera';
import { connect } from 'react-redux';
import { Button, Paper, TextField } from '@material-ui/core';
import db from '../../util/firebase';
import { useState, useEffect, useRef } from 'react';
import { uuid } from 'uuidv4';
import firebase from 'firebase';
import Message from '../chat/Message';


function Stream(props) {

    let lessonContent = document.getElementById('render-content')
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([]);
    const endOfMessages = useRef(null);

    const scrollToEndOfMessages = () => { endOfMessages.current.scrollIntoView({ behavior: "smooth" }) }


    useEffect(() => {
        db.
            collection('streamchat')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => doc.data()))
            )
    }, [])

    useEffect(scrollToEndOfMessages, [messages]);


    const sendMessage = (event) => {
        event.preventDefault()

        console.log(props.user.credentials.firstName, " ", props.user.credentials.lastName, " ", props.user.credentials.userId)

        db.collection('streamchat').add({
            userId: props.user.credentials.userId,
            message: input,
            user: `${props.user.credentials.firstName} ${props.user.credentials.lastName}`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('')
        scrollToEndOfMessages()
    }

    return (
        <>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    overflowY: 'scroll',
                    paddingRight: '10px',
                    width: '100%',
                }}>

                {props.user.lessons.map((lesson) => {

                    if (lesson.isPublished === false) {

                        return (
                            <Button
                                variant="contained"
                                color="primary"
                                key={lesson.id}
                                style={{
                                    width: '110px',
                                    height: '60px',
                                    color: 'white',
                                    fontSize: 'x-small',
                                    margin: '10px'
                                }}
                                onClick={() => {
                                    lessonContent.innerHTML = `${lesson.content}`
                                }}
                            >
                                {lesson.title}
                            </Button>
                        )
                    }
                })}

            </div>
            <div style={{ display: 'flex', maxHeight: '100%' }}>
                <Paper
                    id="render-content"
                    elevation={15}
                    style={{
                        width: '70%',
                        margin: 'auto',
                        backgroundColor: "#ffffff",
                        padding: '25px',
                        height: '720px',
                        overflowY: 'scroll'
                    }} />
                {/* backgroundColor: '#8692D5', */}
                <div style={{ width: '420px' }}>
                    <Paper
                        elevation={10}
                        style={{
                            overflowY: 'hidden',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '400px',
                            backgroundColor: "#ffffff",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23e8fff4'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.03'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
                            backgroundAttachment: 'fixed',
                            backgroundSize: 'cover',
                            padding: '15px',
                            marginLeft: '20px',
                            marginBottom: '20px',
                        }}>
                        <div className="chat__messages" style={{ overflowY: 'scroll', width: "95%", marginBottom: '15px' }}>
                            {messages.map((message) => (
                                <Message
                                    key={uuid()}
                                    currentUserId={props.user.credentials.userId}
                                    userId={message.userId}
                                    timestamp={message.timestamp}
                                    user={message.user}
                                    message={message.message}
                                />
                            ))}
                            <div ref={endOfMessages} />

                        </div>

                        <form style={{ width: "100%", display: 'flex' }}>
                            <TextField

                                value={input}
                                variant="outlined"
                                label="Send message"
                                size='small'
                                fullWidth
                                style={{ backgroundColor: 'white' }}
                                onChange={e => setInput(e.target.value)}
                            />
                            <Button type="submit" onClick={sendMessage} hidden />
                        </form>
                    </Paper>
                    <div style={{ height: '300px', marginLeft: '15px', paddingLeft: '5px', width: '95%', margin: 'auto' }}>
                        <Webcam />
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Stream);
