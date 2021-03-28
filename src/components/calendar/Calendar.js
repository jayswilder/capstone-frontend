import React from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import CalendarTips from './CalendarTips';
import interactionPlugin from '@fullcalendar/interaction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'
import { addCalendarEvent, deleteCalendarEvent } from '../../redux/actions/dataActions';

// const db = firebase.firestore().collection('CalendarEvents')

class Calendar extends React.Component {
    constructor(props) {
        super()
        this.state = {
            weekendsVisible: true,
            myEvents: [],
            isLoaded: false
        }
    }

    render() {
        return (
            <div>
                {/* {this.renderSidebar()} */}
                <Paper elevation={10} className='demo-app-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        height='600px'
                        weekends={this.state.weekendsVisible}
                        events={this.state.myEvents} // alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
                    />
                </Paper>
                <CalendarTips />
            </div>
        )
    }


    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps)
        if (prevProps.events !== this.props.user.events) {
            this.getMyEvents();
        }
    }

    handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection
        console.log(selectInfo)

        if (title) {
            let start = selectInfo.startStr
            let end = selectInfo.endStr
            let allDay = selectInfo.allDay

            let event = {
                title: title,
                start: start,
                end: end,
                allDay: allDay,
            }

            this.props.addCalendarEvent(event)

            this.handleEvents()
            setTimeout(function () {
                window.location.reload()
            }, 1000)
        }
    }

    handleEventClick = (clickInfo) => {
        console.log(clickInfo)
        let deleteItem = prompt(`Please confirm the title of the event to delete.

Event Title:  ${clickInfo.event.title}`)
        let id = clickInfo.event.id
        if (deleteItem === clickInfo.event.title) {
            this.props.deleteCalendarEvent(id)
            setTimeout(function () {
                window.location.reload()
            }, 1000)

        } else console.log('Event not deleted')

    }

    handleEvents = () => {
        return this.setState({
            myEvents: this.props.user.events,
        })
    }


    componentDidMount() {
        this.getMyEvents()
    }


    getMyEvents = () => {
        return this.setState({
            myEvents: this.props.user.events
        })
    }

}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

// function renderSidebarEvent(event) {
//     return (
//         <li key={event.id}>
//             <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
//             <i>{event.title}</i>
//         </li>
//     )
// }

Calendar.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    addCalendarEvent: PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
    events: state.user.events
});

const mapActionsToProps = {
    addCalendarEvent,
    deleteCalendarEvent
}

export default connect(mapStateToProps, mapActionsToProps)(Calendar)