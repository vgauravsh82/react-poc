import {
    GET_TASKS,
    ADD_TASK,
    RESOLVE_TASK,
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
      case GET_TASKS:
        return {
          ...state,
          tasks: action.payload,
        };
      case ADD_TASK:
        return {
          ...state,
          tasks: [action.payload, ...state.tasks],
        };
      case RESOLVE_TASK:
        return {
          ...state,
          contacts: state.tasks.map(task =>
            task._id === action.payload._id ? action.payload : task
          ),
        };
      default:
        return state;
    }
  };
  