import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import taskReducer from './taskReducer';
import axios from 'axios';


import {
    GET_TASKS,
    CONTACT_ERROR,
  } from '../types';
  

const TaskState = props => {
    const initialState = {
      tasks: [],
      loading: true,
      error: null
    };
  
    const [state, dispatch] = useReducer(taskReducer, initialState);
  
    // Get Tasks
    const getTasks = async () => {
      console.log('calling getTasks' );
      try {
        const res = await axios.get('/api/tasks');
  
        dispatch({
          type: GET_TASKS,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: CONTACT_ERROR,
          payload: err.response.msg
        });
      }
    };

    return (
      <TaskContext.Provider
        value={{
          tasks: state.tasks,
          getTasks
        }}
      >
        {props.children}
      </TaskContext.Provider>
    );
  };

  export default TaskState;
  