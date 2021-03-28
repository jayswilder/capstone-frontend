import { ADD_EVENT, DELETE_EVENT, SET_ERRORS, CLEAR_ERRORS, CREATE_LESSON } from '../../util/types';
import axios from 'axios';


export const addCalendarEvent = (event) => dispatch => {
    axios.post('https://us-central1-mycapstone-aa4cd.cloudfunctions.net/api/calendar', event)
        .then(res => {
            dispatch({
                type: ADD_EVENT,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data })
        })
}

export const deleteCalendarEvent = (id) => dispatch => {
    axios.delete(`https://us-central1-mycapstone-aa4cd.cloudfunctions.net/api/calendar/${id}`)
        .then(() => {
            dispatch({ type: DELETE_EVENT, payload: id })
        })
        .catch(err => console.log(err))
}

export const createLesson = (lesson) => dispatch => {
    console.log("dataActions:", lesson)
    axios.post('https://us-central1-mycapstone-aa4cd.cloudfunctions.net/api/lesson', lesson)
        .then(res => {
            dispatch({
                type: CREATE_LESSON,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data })
        })
}

