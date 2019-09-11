import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
      case GET_TASKS:
        return {
          ...state,
          tasks: action.payload,
          loading: false
        };
      case ADD_TASK:
        return {
          ...state,
          tasks: [action.payload, ...state.contacts],
          loading: false
        };
      case DELETE_TASK:
        return {
          ...state,
          tasks: state.contacts.filter(
            contact => contact._id !== action.payload
          ),
          loading: false
        };
      default:
        return state;
    }
  };
  