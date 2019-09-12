import React, { Fragment, useContext, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import TaskContext from '../../context/task/taskContext';
import TaskItem from './TaskItem';
import Table from 'react-bootstrap/Table';



const TaskList = () => {

const taskContext = useContext(TaskContext);
const { tasks, getTasks, loading } = taskContext;

  useEffect(() => {
    getTasks();

    // eslint-disable-next-line
}, []);

  if (tasks !== null && tasks.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }
  
  return (
    <Fragment>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
      {tasks !== null && !loading ? (
        tasks.map(task => 
        
        (<TaskItem key={task._id} task={task}/>)

        )) : (
          <Spinner />
        )}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default TaskList;
