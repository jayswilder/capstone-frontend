import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import ForumIcon from '@material-ui/icons/Forum';
import HomeIcon from '@material-ui/icons/Home';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import EventIcon from '@material-ui/icons/Event';
import NotesIcon from '@material-ui/icons/Notes';
import SchoolIcon from '@material-ui/icons/School';
import GradeIcon from '@material-ui/icons/Grade';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logoutUser } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}));

function Navbar(props) {
    const classes = useStyles();
    if (props.user.authenticated === true) {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h5" noWrap>
                            Online Education
                    </Typography>
                        <Button variant='contained' onClick={props.logoutUser} disableElevation color='primary' component={Link} to="/">
                            <ExitToAppIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            <ListItem button component={Link} to="/dashboard">
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText>Dashboard</ListItemText>
                            </ListItem>
                            <ListItem button component={Link} to="/classroom">
                                <ListItemIcon><SlideshowIcon /></ListItemIcon>
                                <ListItemText>Online Classroom</ListItemText>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button component={Link} to="/calendar">
                                <ListItemIcon><EventIcon /></ListItemIcon>
                                <ListItemText>Calendar</ListItemText>
                            </ListItem>
                            <ListItem button component={Link} to="/lessons">
                                <ListItemIcon><NotesIcon /></ListItemIcon>
                                <ListItemText>Create Lesson</ListItemText>
                            </ListItem>
                            <ListItem button component={Link} to="/students">
                                <ListItemIcon><SchoolIcon /></ListItemIcon>
                                <ListItemText>Students</ListItemText>
                            </ListItem>

                            <ListItem button component={Link} to="/grades">
                                <ListItemIcon><GradeIcon /></ListItemIcon>
                                <ListItemText>Grades</ListItemText>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button component={Link} to="/chat">
                                <ListItemIcon><ForumIcon /></ListItemIcon>
                                <ListItemText>Classroom Chat</ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    } else {
        return null
    }
}

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    logoutUser
}
export default connect(mapStateToProps, mapActionsToProps)(Navbar)