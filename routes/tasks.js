const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Task = require('../models/Task');

// @route     GET api/tasks
// @desc      Get all tasks contacts
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/tasks
// @desc      Add new task
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, priority } = req.body;

    try {
      const newTask = new Task({
        description,
        priority,
        user: req.user.id
      });

      const task = await newTask.save();

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/tasks/:id
// @desc      Update task
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { description, priority,status } = req.body;

  // Build contact object
  const taskFields = {};
  if (description) taskFields.name = description;
  if (priority) taskFields.email = priority;
  if (status) taskFields.phone = status;
  taskFields.updated = Date.now();
  
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns contact
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
