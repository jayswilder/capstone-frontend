import React from 'react';
import { Popover, Typography, List, ListItem, Divider } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

export default function CalendarTips() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <HelpOutlineIcon style={{ fontSize: '3rem' }} color="primary" />
            </Typography>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <List>
                    <ListItem>
                        <Typography variant="h5" color="secondary">Calendar Tool Tips</Typography>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                    <ListItem>
                        <Typography color="primary">Select dates and you will be prompted to create a new event</Typography>
                    </ListItem>
                    <ListItem alignItems="center">
                        <Typography color="primary">Click an event to delete it</Typography>
                    </ListItem>

                </List>
            </Popover>
        </div>
    );
}
