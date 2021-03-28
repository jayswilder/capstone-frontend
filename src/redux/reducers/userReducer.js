import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, ADD_EVENT, DELETE_EVENT, CREATE_LESSON, ADD_STUDENT, DELETE_STUDENT } from '../../util/types';

const initialState = {
    authenticated: false,
    credentials: {},
    lessons: [],
    events: [],
    students: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                authenticated: true,
                ...state
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            }
        case ADD_EVENT:
            return {
                ...state,
                events: [
                    action.payload,
                    ...state.events
                ]
            }
        case DELETE_EVENT:
            let index = state.events.findIndex(event => event.id === action.payload);
            // state.events.splice(index, 1);
            return {
                ...state
            }
        case CREATE_LESSON:
            return {
                ...state,
                lessons: [
                    action.payload,
                    ...state.lessons
                ]
            }
        case ADD_STUDENT:
            return {
                ...state,
                students: [
                    ...state.students,
                    action.payload
                ]
            }
        case DELETE_STUDENT:
            index = state.students.findIndex(student => student.id === action.payload);
            console.log("Index before delete: ", index)
            state.students.splice(index, 1);
            return {
                ...state
            }
        default:
            return state;
    }
}