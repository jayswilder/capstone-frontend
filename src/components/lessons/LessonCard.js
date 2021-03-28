import React from 'react';
import { connect } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';


const LessonCard = (props) => {
    const id = props.match.params.id;
    const lesson = props.user.lessons.find(lesson => lesson.id === id);
    return (
        <Paper className="lesson-card" elevation={3} variant='outlined'>
            <Typography
                variant="h4"
                style={{
                    textAlign: 'center'
                }}>
                {lesson.title}
            </Typography>

            <Typography style={{
                width: "100%", margin: 'auto', height: '100% !important', overflowY: 'scroll'
            }}>
                <div style={{
                    marginTop: '20px',
                    padding: '35px 5px 35px 5px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "90%",
                    height: "fit-content",
                    margin: 'auto',
                }}
                    dangerouslySetInnerHTML={{ __html: lesson.content }} />

            </Typography>
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});


export default connect(mapStateToProps)(LessonCard);
