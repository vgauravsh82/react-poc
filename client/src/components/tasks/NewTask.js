import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TaskContext from '../../context/task/taskContext';

const NewTask = () => {

  const [task, setTask] = useState({
    description: '',
    priority: 'P0'
  });

  const taskContext = useContext(TaskContext);
  const {addTask} = taskContext;

  const onChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    addTask(task);
    console.log(task);
  };

  //useEffect({  }, []);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="2" name='description' onChange={onChange} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Priority</Form.Label>
        <Form.Control as="select" name='priority' onChange={onChange}>
          <option>P0</option>
          <option>P1</option>
          <option>P2</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
  </Button>
    </Form>
  );
};

export default NewTask;
