const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

// 01: Add a task to the Task List;
function addToTasks(tasks, id, txt, prior) {
  tasks.push({ taskId: id, text: txt, priority: prior });
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addToTasks(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

// 02: Read All Tasks in the Task List.
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

// 03: Sort Tasks by priority in ascending order.
function sortTheObj(tasks) {
  tasks.sort((tsk1, tsk2) => tsk1.priority - tsk2.priority);
  return tasks;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let result = sortTheObj(tasks);
  res.json({ result });
});

// 04: Edit Task priority
function updateTaskPriority(taskId, newPriority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = newPriority;
      break;
    }
  }
}
app.get('/tasks/edit-priority', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const newPriority = parseInt(req.query.priority);

  updateTaskPriority(taskId, newPriority);

  res.json({ tasks });
});

// Q5 : Edit/Update Task text
function updateEditTxt(id, newTxt) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === id) {
      tasks[i].text = newTxt;
      break;
    }
  }
}
app.get('/tasks/edit-text', (req, res) => {
  let tskID = parseInt(req.query.taskId);
  let txt = req.query.text;
  updateEditTxt(tskID, txt);
  res.json({ tasks });
});

// Q6 : Delete a task from the task List
function deleteTsk(data, id) {
  return data.taskId !== id;
}
app.get('/tasks/delete', (req, res) => {
  let tskID = parseInt(req.query.taskId);
  tasks = tasks.filter((data) => deleteTsk(data, tskID));
  res.json({ tasks });
});

// Q7 : Filter Tasks By priority
function filterTaskByPriority(data, prior) {
  return data.priority === prior;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  tasks = tasks.filter((data) => filterTaskByPriority(data, priority));
  res.json({ tasks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
