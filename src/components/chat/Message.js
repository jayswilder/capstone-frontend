import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function Message({ currentUserId, userId, user, message, timestamp }) {

    if (currentUserId === userId) {
        return (
            <Card variant='outlined' style={{ marginBottom: "8px", minWidth: '275px', width: '100%', color: 'white', backgroundColor: '#3F51B5' }}>
                <CardContent className="message">
                    <h4 style={{ paddingBottom: 5, margin: 0 }}>
                        {user}
                        <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>
                    </h4>
                    <Divider />
                    <p className="word-wrap">{message}</p>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card variant='outlined' style={{ marginBottom: "8px", minWidth: '275px', width: '100%', backgroundColor: '#EBEFFF' }}>
                <CardContent className="message">
                    <h4 style={{ paddingBottom: 5, margin: 0 }}>
                        {user}
                        <span className="message__timestamp" style={{ color: 'gray' }}>{new Date(timestamp?.toDate()).toUTCString()}</span>
                    </h4>
                    <Divider />
                    <p className="word-wrap">{message}</p>
                </CardContent>
            </Card>
        )
    }
}

export default Message
