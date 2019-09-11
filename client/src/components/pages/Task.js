import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import TaskList from '../tasks/TaskList'
import NewTask from '../tasks/NewTask'
import Button from 'react-bootstrap/Button';

const Task = () => {
  const authContext = useContext(AuthContext);
  
  const [displayAddTask, setDisplayAddTask] = useState(false);
  
  const showAddTask = () => {
    setDisplayAddTask(true);
  }

  const cancelAddTask = () => {
    setDisplayAddTask(false);
  }

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-1'>
      <Button onClick={showAddTask}>Add Task</Button>
      {displayAddTask ? (<Button onClick={cancelAddTask}>Cancel</Button>): ''}
      <div className='grid-2'>
      {displayAddTask ? (
        <NewTask />
      ) : ''}
      </div>
      <div>
        <TaskList />
      </div>

    </div>
  );
};

export default Task;
