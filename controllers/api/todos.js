const Task = require("../../models/Task");
const Todo = require("../../models/Todo");
module.exports = { create, index, update, delete: deletetodo };
async function create(req, res) {
  console.log("todo controller hit");
  try {
    let task = await Task.findById(req.params.taskid);
    const newTodo = await Todo.create({
      ...req.body,
      todoStatus: false,
      todoOwner: task.taskOwner,
    });

    console.log("Task is===>", task);
    task.taskTodos.push(newTodo._id);
    console.log("push success");
    task.save();
    res.status(200).json("Todo added to task");
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}
async function index(req, res) {
  try {
    let task = await Task.findById(req.params.taskid)
      .populate([
        {
          path: "taskTodos",
          populate: [{ path: "todoOwner" }],
        },
      ])
      .sort();
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
  const id = req.params.todoid;
  const update = req.body;
  try {
    let todo = await Todo.findByIdAndUpdate(id, update, {
      new: true,
    });
    console.log("todo====>", todo);
    res.status(200).json("OK. Todo updated");
  } catch (err) {
    console.log(err);
    console.log("Error updating todo");
  }
}
async function deletetodo(req, res) {
  try {
    let task = await Task.findById(req.params.taskid);

    //delete todo reference in project
    //find index of todo id stored in task.taskTodos
    let array = task.taskTodos;
    let index = array.indexOf(req.params.todoid);

    if (index > -1) {
      //delete and save model only if it is found
      task.taskTodos.splice(index, 1);
      task.save();
    }
    //now delete todo
    let deletedTodo = await Todo.findByIdAndDelete(req.params.todoid);
    res.status(200).json(`Todo deleted`);
  } catch (err) {
    console.log(err);
    console.log("delete todo failed");
  }
}
