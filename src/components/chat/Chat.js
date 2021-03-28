import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Message from './Message';
import { useState, useEffect, useRef } from 'react';
import db from '../../util/firebase';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { uuid } from 'uuidv4';

function Chat(props) {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null)

    useEffect(() => {
        db.
            collection('chat')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => doc.data()))
            )
    }, [])

    const scrollToEndOfMessages = () => { messagesEndRef.current.scrollIntoView({ behavior: "smooth" }) }
    useEffect(scrollToEndOfMessages, [messages]);

    const sendMessage = (event) => {
        event.preventDefault()

        console.log(props.user.credentials.firstName, " ", props.user.credentials.lastName, " ", props.user.credentials.userId)

        db.collection('chat').add({
            userId: props.user.credentials.userId,
            message: input,
            user: `${props.user.credentials.firstName} ${props.user.credentials.lastName}`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('')
    }



    return (
        <Paper elevation={10} className="chat">
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
                <div ref={messagesEndRef} />
            </div>

            <form style={{ width: "95%" }}>
                <TextField
                    value={input}
                    variant="outlined"
                    label="Send message"
                    fullWidth
                    onChange={e => setInput(e.target.value)}
                />
                <Button type="submit" onClick={sendMessage} hidden />
            </form>
        </Paper>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Chat)
