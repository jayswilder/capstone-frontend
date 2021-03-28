import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, ADD_STUDENT, DELETE_STUDENT } from '../../util/types';

export const loginUser = (loginData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });
    axios
        .post('https://us-central1-mycapstone-aa4cd.cloudfunctions.net/api/', loginData)
        .then((res) => {
            const authToken = res.data.token
            localStorage.setItem('cache', `${authToken}`)
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/dashboard')
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const signupUser = (signUpData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('https://us-central1-mycapstone-aa4cd.cloudfunctions.net/api/signup', signUpData)
        .then(res => {
            localStorage.setItem('cache', `${res.data.token}`)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/dashboard')
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};

export const getUserData = () => (dispatch) => {
    axios.get('https://us-central1-mycapstone-aa4cd.cloudfunctions.net/api/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const logoutUser = () => (dispatch) => {
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: SET_UNAUTHENTICATED })
}

export const addStudent = (newStudent) => (dispatch) => {
    console.log("dataActions:", newStudent)
    axios.post('https://us-central1-mycapstone-aa4cd.cloudfunctions.net/api/student', newStudent)
        .then(res => {
            console.log(res)
            dispatch({
                type: ADD_STUDENT,
                payload: newStudent
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data })
        })
}

export const deleteStudent = (student) => dispatch => {
    console.log("actions: ", student)
    axios.delete(`https://us-central1-mycapstone-aa4cd.cloudfunctions.net/api/student/${student}`)
        .then(() => {
            dispatch({ type: DELETE_STUDENT, payload: student })
        })
        .catch(err => console.log(err))
}

export const getStudents = () => (dispatch) => {
    console.log('something')
}