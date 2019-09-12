import React,{Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import TaskContext from '../../context/task/taskContext';


const TaskItem = ({ task }) => {

  
  const taskContext = useContext(TaskContext);
  const {resolveTask} = taskContext;
  
  const { _id, description, priority, status } = task;

  return (
      <Fragment>
      <tr key={_id}>
      <td>{_id}</td>
      <td>{description}</td>
      <td>{priority}</td>
      <td>{status}</td>
      <td>
        <Button disabled ={status === 'Resolve'} variant='primary' 
        size='sm' onClick={() => resolveTask(task)}>Mark Resolve</Button>
      </td>
    </tr>
    </Fragment>
    
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskItem;
