import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import taskReducer from './taskReducer';
import axios from 'axios';


import {
    GET_TASKS,
    ADD_TASK,
    TASK_ERROR,
    RESOLVE_TASK,
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
          type: TASK_ERROR,
          payload: err.response.msg
        });
      }
    };


    // Add Contact
  const addTask = async task => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/tasks', task, config);

      dispatch({
        type: ADD_TASK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TASK_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Contact
  const resolveTask = async task => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    task.status = 'Resolve';
    console.log(task);

    try {
      const res = await axios.put(
        `/api/tasks/${task._id}`,
        task,
        config
      );

      dispatch({
        type: RESOLVE_TASK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TASK_ERROR,
        payload: err.response.msg
      });
    }
  };


return (
      <TaskContext.Provider
        value={{
          tasks: state.tasks,
          getTasks,
          addTask,
          resolveTask
        }}
      >
        {props.children}
      </TaskContext.Provider>
    );
  };

  export default TaskState;
  