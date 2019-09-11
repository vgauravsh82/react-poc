import React,{Fragment} from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task }) => {
  
  const { _id, description, priority, status } = task;

  return (
      <Fragment>
      <tr key={_id}>
      <td>{_id}</td>
      <td>{description}</td>
      <td>{priority}</td>
      <td>{status}</td>
      <td>Mark Resolved</td>
    </tr>
    </Fragment>
    
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskItem;
