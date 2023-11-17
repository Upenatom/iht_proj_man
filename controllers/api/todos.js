const Task = require("../../models/Task");
const Project = require("../../models/Project");
module.exports = { create, index, update, delete: deletetodo };
async function create(req, res) {
  try {
    let task = await Task.findById(req.params.taskid);
    let newtodo = { ...req.body, todoOwner: task.taskOwner };
    let todosArray = task.taskTodos;
    todosArray.push(newtodo);
    task.save();
    res.status(200).json("Todo added to task");
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}
async function index(req, res) {
  try {
    let task = await Task.findById(req.params.taskid).populate([
      {
        path: "taskTodos",
        populate: [{ path: "todoOwner" }],
      },
    ]);
    const taskTodos = task.taskTodos;
    //sort to ascending by added and return to frontend
    let reverseTodo = taskTodos.toReversed();

    res.status(200).json(reverseTodo);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}
async function update(req, res) {
  try {
  } catch (err) {}
}
async function deletetodo(req, res) {
  try {
  } catch (err) {}
}
