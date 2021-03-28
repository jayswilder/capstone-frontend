import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashboard(props) {
    const [publishedLessons, setPublishedLessons] = useState(props.user.lessons)
    const [unpublishedLessons, setUnpublishedLessons] = useState(props.user.lessons)

    const getMyLessons = () => {
        setPublishedLessons(props.user.lessons.filter(lesson => lesson.isPublished === true))
        setUnpublishedLessons(props.user.lessons.filter(lesson => lesson.isPublished === false))
    }

    let publishedLessonsMarkup = publishedLessons ? (
        publishedLessons.map((lesson, index) =>
            <Grid key={lesson.id} item >

                <Paper component={Link} to={`/lesson/${lesson.id}`} style={{ width: "150px", height: "150px", display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                    <h3 style={{ padding: "10px", margin: 0, textAlign: 'center' }}>{lesson.title}</h3>
                    <br />
                    <strong>{lesson.subject}</strong>
                </Paper>

            </Grid>)
    ) : (
        <CircularProgress />
    )

    let unpublishedLessonsMarkup = unpublishedLessons ? (
        unpublishedLessons.map((lesson, index) =>
            <Grid key={lesson.id} item>
                <Link>
                    <Paper component={Link} to={`/lesson/${lesson.id}`} style={{ width: "150px", height: "150px", display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                        <h3 style={{ padding: "10px", margin: 0, textAlign: 'center' }}>{lesson.title}</h3>
                        <br />
                        <strong>{lesson.subject}</strong>
                    </Paper>
                </Link>
            </Grid>)
    ) : (
        <CircularProgress />
    )


    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            const response = await axios.get('/lessons');
            if (mounted) {
                setPublishedLessons(props.user.lessons.filter(lesson => lesson.isPublished === true))
                setUnpublishedLessons(props.user.lessons.filter(lesson => lesson.isPublished === false))
            }
        };
        loadData();

        return () => {
            mounted = false;
        };
    }, [getMyLessons]);


    return (
        <div>
            <h2 style={{ margin: '0' }}>Welcome {props.user.credentials.firstName}! </h2>
            <br />
            <h4>Published Lessons</h4>
            <Grid container spacing={2}>
                {publishedLessonsMarkup}
            </Grid>
            <br />
            <Divider />
            <h4>Unpublished Lessons</h4>
            <Grid container spacing={2}>
                {unpublishedLessonsMarkup}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});


export default connect(mapStateToProps)(Dashboard);